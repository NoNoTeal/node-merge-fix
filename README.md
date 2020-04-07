Please refer to [the original](https://npmjs.com/package/node-merge) package's README.md

# Includes

A [fix](https://github.com/steerapi/node-merge/pull/2) for "undefined merge"
Fixes [path.existsSync](https://github.com/steerapi/node-merge/commit/f4ea6b3237eb88ac6ae594e9e23874849715900d)

## New feature(s)

### 1.1.2

Adds a silent option so your console is not spammed with results. Will also remove entries from `_results`.

### 1.2.0 

Added a deleteFile option. Option will do this: When merging a folder with another folder, if folder A contains files folder B doesn't have, instead of being merged, the folder is more or less being replaced. 