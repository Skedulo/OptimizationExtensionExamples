# Skedulo Optimisation Extension Example

An example of a Skedulo Optimisation Extension

## Extension

Optimization extensions enable you to create custom scheduling logic to meet the specific needs of your organization, enhancing scheduling workflows. With these extensions, you can build, deploy, and apply your own rules more efficiently through Skedulo’s platform, reducing both time and effort. They are built using Skedulo’s connected functions.

This example extension allocates every job to a single resource by creating a `resourceDependency`, you can read more about Optimisation extensions on the [Skedulo docs](https://docs.skedulo.com/developer-guides/manage-and-schedule-work/optimization-of-schedules/extensions-transformers/) site.


## Usage

This extension is intended to be deployed with the Skedulo CLI.

In order to deploy it, you will need to log in to a tentant, this can be done with the following command

`sked tenant login web` or `sked tenant login token` if you wish to use an access token.

You will be prompted for your tenant name, and be asked if you wish to generate a long lived token.

### Deployment/Modification (upsert)

Run the following command to deploy the example to your tenant.

`sked artifacts function upsert -f state.json`

### Deletion (delete)

Run the following command to delete the extension.

`sked artifacts function delete -f state.json`

### Getting Help

Please see the [Optimisation Extension documation](https://docs.skedulo.com/developer-guides/manage-and-schedule-work/optimization-of-schedules/extensions-transformers/), or get in touch with your Customer Success Manager.
