# Skedulo Optimization Extension Examples

A set of example Skedulo Optimisation Extensions.

## About

Optimization extensions enable you to create custom scheduling logic to meet the specific needs of your organization, enhancing scheduling workflows. With these extensions, you can build, deploy, and apply your own rules more efficiently through Skedulo’s platform, reducing both time and effort. They are built using Skedulo’s connected functions.

You can read more about [Optimization Extensions](https://docs.skedulo.com/developer-guides/manage-and-schedule-work/optimization-of-schedules/extensions-transformers/) or [Connected Functions](https://developer.skedulo.com/developer-guides/integration-and-automation/skedulo-functions/introduction-to-functions/) on the Skedulo Docs site.

## Examples

This repository contains the following examples:

### Basic Example

This example extension allocates every job to a single resource by creating a single `resourceDependency` record.

### Same Resource Per Account

This example extension allocates every job with the same account, to the same resource by merging data from the `featureModel` and `productData`, then creating a list of `resourceDependency` records grouped by account.

## Usage

These examples are intended to be deployed with the Skedulo CLI.

In order to deploy them, you will need to log into a tenant, this can be done with the following command

`sked tenant login web` or `sked tenant login token` if you wish to use an access token.

You will be prompted for your tenant name, and be asked if you wish to generate a long lived token.

For more on the Skedulo CLI see this [getting started video](https://www.youtube.com/watch?v=gxvs-KezZvc) or the [documentation.](https://developer.skedulo.com/developer-guides/cli/skedulo-cli-introduction/)

### Deployment/Modification

You can use the following command to deploy these examples to your tenant, replacing `<state-file>` with the filename for the example you wish to deploy.

`sked artifacts function upsert -f <state-file>`

### Testing

You can test your Optimization Extensions by running them locally using the following command (run at the root directory of the extension)

`sked function dev . -p 3000`

This will run the function locally on port 3000, allowing you to make a `POST` request to the test endpoint at `http://localhost:3000/test-optimization-transformer` to verify the functionality of your Optimization Extension.

Included in this repository is an [example payload.](https://github.com/Skedulo/OptimizationExtensionExamples/blob/main/ExampleTestPayload.json) Ensure you change the `resourceIds`, `jobIds` and `regionId` to valid record UIDs from your Skedulo tenant.

### Deletion

You can use the following command to delete these examples from your tenant, replacing `<state-file>` with the filename for the example you wish to delete.

`sked artifacts function delete -f <state-file>`

## Getting Help

Please see the [Optimisation Extension documentation](https://docs.skedulo.com/developer-guides/manage-and-schedule-work/optimization-of-schedules/extensions-transformers/), or get in touch with your Customer Success Manager.
