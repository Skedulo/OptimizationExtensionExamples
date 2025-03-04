# Skedulo Optimization Extension Examples

An set of example Skedulo Optimisation Extensions.

## About

Optimization extensions enable you to create custom scheduling logic to meet the specific needs of your organization, enhancing scheduling workflows. With these extensions, you can build, deploy, and apply your own rules more efficiently through Skedulo’s platform, reducing both time and effort. They are built using Skedulo’s connected functions.

You can read more about [Optimization Extensions](https://docs.skedulo.com/developer-guides/manage-and-schedule-work/optimization-of-schedules/extensions-transformers/) or [Connected Functions](https://developer.skedulo.com/developer-guides/integration-and-automation/skedulo-functions/introduction-to-functions/) on the Skedulo Docs site.

# Examples

This repository contains the following examples:

## Basic Example

This example extension allocates every job to a single resource by creating a single `resourceDependency` record.

## Same Resource Per Account

This example extension allocates every job with the same account, to the same resource by merging data from the `featureModel` and `productData`, then creating a list of `resourceDependency` records grouped by account.

## Usage

These examples are intended to be deployed with the Skedulo CLI.

In order to deploy them, you will need to log in to a tentant, this can be done with the following command

`sked tenant login web` or `sked tenant login token` if you wish to use an access token.

You will be prompted for your tenant name, and be asked if you wish to generate a long lived token.

For more on the Skedulo CLI see this [getting started video](https://www.youtube.com/watch?v=gxvs-KezZvc) or the [documentation.](https://developer.skedulo.com/developer-guides/cli/skedulo-cli-introduction/)

### Deployment/Modification (upsert)

You can use the following command to deploy these examples to your tenant, replacing `<state-file>` with the filename for the example you wish to deploy.

`sked artifacts function upsert -f <state-file>`

### Deletion (delete)

You can use the following command to delete these examples from your tenant, replacing `<state-file>` with the filename for the example you wish to delete.

`sked artifacts function delete -f <state-file>`

### Getting Help

Please see the [Optimisation Extension documation](https://docs.skedulo.com/developer-guides/manage-and-schedule-work/optimization-of-schedules/extensions-transformers/), or get in touch with your Customer Success Manager.
