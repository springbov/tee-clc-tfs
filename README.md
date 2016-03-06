# tfs
**NodeJS wrapper for TFS command line tool.**

[![Build Status](https://travis-ci.org/ivangabriele/tfs.svg?branch=master)](https://travis-ci.org/ivangabriele/tfs)
[![npm version](https://badge.fury.io/js/tfs.svg)](https://badge.fury.io/js/tfs)
[![Dependency Status](https://david-dm.org/ivangabriele/tfs.svg)](https://david-dm.org/ivangabriele/tfs)
[![devDependency Status](https://david-dm.org/ivangabriele/tfs/dev-status.svg)](https://david-dm.org/ivangabriele/tfs#info=devDependencies)

---

## Getting Started

> If you're a NodeJS developer whishing to use it as a dependency,
> there is a module exposing all commands and described in the
> [NodeJS API](#nodejs-api).

### Installation

    npm install -g tfs

## Usage

    Usage: tfs <cmd>

## Commands

```
add [itemspec] [options]       Adds files and folders to version control.
checkin [itemspec] [options]   Commits pending changes in the current workspace.
checkout [itemspec] [options]  Makes the local file writable, and changes its status to "edit".
get [itemspec] [options]       Get the latest version of files and folders.
history [itemspec] [options]   Displays the revision history for one or more files, folders or both.
info [itemspec] [options]      Displays information about items under version control.
status [itemspec] [options]    Displays information about pending changes.
undo <itemspec> [options]      Removes pending changes from a workspace.
help [cmd]                     Displays help for [cmd].
```

## Get more information about each command

Since `tfs` is a wrapper, it only check and execute commands via `TF.exe` command line tool. So to know how to use each command, just check the [**Tf Command-Line Utility Commands** official documentation](https://msdn.microsoft.com/en-us/library/cc31bk2e.aspx).

Also don't hesitate to use the `help` command, i.e. :

    tfs [cmd] -h, --help

Or :

    tfs help [cmd]

## Options:

      -h, --help  output usage information

### Good to know

> For `[itemspec]` commands :
> - If you omit `[itemspec]`, it will apply on the current directory.
> - You can use a relative, an absolute or a TFS path.
> - You can give multiple files/directories separated by a space.

---

## NodeJS API

You can install **tfs** as a dependency for your NodeJS projects :

    npm install tfs --save

### Usage example

> Some commands, like **status**, have extra-properties in their response.<br>
> To get real-life examples of common commands, check [this Github directory](https://github.com/ivangabriele/vscode-tfs/tree/master/lib/tfs).

To recursively get the status (pending changes) of files within D:\MyBranch\MyProject,
admitting that this project is source-versionned via TFS,
you could write the following code :

    var tfs = require('tfs');

    var callback = function(responseError, response) {
      if (responseError) {
        console.error(responseError.error);
        return;
      }

      console.log(response.message);
      console.log(response.status);
    }

    tfs('status', 'D:/MyProject/MyBranch', {
      recursive: true
    }, callback);

### tfs description

    tfs(command, [items, [options, [callback]]]);

#### _command_

    {String} TFS command to execute.

#### _items_

    {Array} File(s) or changeset number.
            Can be null/undefined to use the current path.

#### _options_

    {Object} TFS command options. Can be null/undefined.

#### _callback_

    {Function} Function to call back once command executed.
               Will be called back with 2 arguments: error, response.

               error: {
                 error:   {String},
                 isError: true
               }

               response: {
                 message: {String},
                 isError: false
               }
