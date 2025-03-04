/**
 * Describe the entry-point into the "skedulo-function" by updating the
 * array returned by the `getRoutes` method with additional routes
 */
import {
  createOptimizationRoutes,
  ResourceDependencyShape,
} from "@skedulo/optimization-manager-client";
import {
  TransformerInput,
  TransformerOutput,
} from "@skedulo/optimization-manager-client/dist/transformers/scheduleTransformer";
import { FunctionRoute } from "@skedulo/sdk-utilities";
import * as pathToRegExp from "path-to-regexp";

// tslint:disable-next-line:no-empty-interface
interface RequestPayload {}

//interface for the metadata in the featureModel
interface FeatureModelTransformMeta {
  allocations: Record<
    string,
    | {
        type: "job";
        jobId: string;
        resourceId: string | null;
        jobAllocationId: string | null;
        resourceRequirementId: string | null;
      }
    | {
        type: "activity";
        activityId: string;
      }
  >;
}

export function getCompiledRoutes() {
  return getRoutes().map((route) => {
    const regex = pathToRegExp(route.path);

    return {
      regex,
      method: route.method,
      handler: route.handler,
    };
  });
}

const transformSchedule = async (
  transformerInput: TransformerInput
): Promise<TransformerOutput> => {
  //get the metadata from the featureModel, giving us a list of modelAllocations with their Job UID populated
  const modelTransformMeta = transformerInput.featureModel
    .meta as any as FeatureModelTransformMeta;
  const jobsInModel = Object.entries(modelTransformMeta.allocations).flatMap(
    (a) =>
      a[1].type === "job"
        ? [
            {
              modelAllocationId: a[0],
              ...a[1],
            },
          ]
        : []
  );

  console.log("jobsInModel");
  console.log(jobsInModel);

  //use this array of modelAllocations to build a Map of Job UID => List of Model Allocation IDs
  let jobUIDtoModelAllocId: Map<string, string[]> = new Map();
  jobsInModel.forEach((jma) => {
    jobUIDtoModelAllocId.has(jma.jobId)
      ? jobUIDtoModelAllocId.get(jma.jobId)?.concat([jma.modelAllocationId])
      : jobUIDtoModelAllocId.set(jma.jobId, [jma.modelAllocationId]);
  });

  console.log("jobUIDtoModelAllocId");
  console.log(jobUIDtoModelAllocId);

  //then, turn using information from productData, turn this into a Map of Account UID => List of Model Allocation IDs, thus grouping our allocations by their account
  let actToAllocId: Map<string, string[]> = new Map();
  transformerInput.productData.jobs.forEach((job) => {
    if (job.AccountId) {
      const allocs = actToAllocId.get(job.AccountId) ?? [];
      actToAllocId.set(
        job.AccountId,
        allocs.concat(jobUIDtoModelAllocId.get(job.UID) ?? [])
      );
    }
  });

  console.log("actToAllocId");
  console.log(actToAllocId);

  //finally, flatten the Map into an array of ResourceDependencyShapes[]
  const resourceDependencies: ResourceDependencyShape[] = [];
  Array.from(actToAllocId.keys()).forEach((accountId) => {
    resourceDependencies.push({
      allocationIds: actToAllocId.get(accountId) ?? [],
    });
  });

  console.log("resourceDependencies");
  console.log(resourceDependencies);

  return {
    productData: transformerInput.productData,
    featureModel: {
      ...transformerInput.featureModel,
      resourceDependencies,
    },
  };
};

function getRoutes(): FunctionRoute[] {
  return [
    {
      method: "get",
      path: "/ping",
      handler: async (__, headers, method, path, skedContext) => {
        const apiServer = skedContext.auth.baseUrl;

        return {
          status: 200,
          body: { result: "pong", apiServer },
        };
      },
    },
    ...createOptimizationRoutes(transformSchedule),
  ];
}
