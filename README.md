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
add [itemspec] [options]                  Adds files and folders to TFS.
branch [olditem] [newitem] [options]      Creates a new branch.
branches [itemspec] [options]             Displays the history of a branch for a specified file or folder.
changeset [options]                       Displays information about and lets you change the attributes, such as comments and check-in.
checkin [itemspec]                        Commits pending changes in the current workspace to TFS.
checkout [options]                        Makes the local file writable, and changes its Pending Change status to "edit" in the workspace.
configure [options]                       Enables an administrator to view and change TFS settings.
delete [itemspec] [options]               Removes items from TFS and deletes them.
destroy [options]                         Permanently delete version-controlled files from TFS.
diff [itemspec] [itemspec2] [options]     Displays differences between two local/server files.
dir [itemspec] [options]                  Displays all or some of the contents of the server for Team Foundation version control.
folderdiff [targetPath] [options]         Displays differences between local/server directories.
get [options]                             Retrieves a read-only copy of files and folders from TFS.
history [itemspec] [options]              Displays the revision history for one or more files, folders or both.
label [labelname] [options]               Attaches a label to or removes a label from a TFS file or folder.
labels [options]                          Displays the list of labels in the server for Team Foundation version control.
localversions [itemspec] [options]        Displays the version of one or more items in a workspace.
lock [itemspec] [options]                 Locks or unlocks a file or folder.
merge [source] [destination] [options]    Applies changes from one branch into another.
merges [destination] [options]            Displays detailed information about past merges.
permission [options]                      Modifies the user ACL and displays authorization settings.
properties [itemspec] [options]           Displays information about items under version control.
rename [olditem] [newitem] [options]      Rename a file or folder.
resolve [options]                         Lets you resolve conflicts.
rollback [itemspec] [options]             Roll back changesets.
shelve [options]                          Stores a set of pending changes, together with pending check-in.
shelvesets [shelvesetname] [options]      Displays information about a set of shelved changes.
status [itemspec] [options]               Displays information about pending changes to items in one or more workspaces.
undelete [options]                        Restores items that were previously deleted.
undo [itemspec] [options]                 Removes pending changes from a workspace.
unlabel [labelname] [itemspec] [options]  Removes an item from an existing label.
unshelve [itemspec] [options]             Restores shelved file revisions, check-in.
view [itemspec] [options]                 Retrieves a specific version of a file to a temporary folder on your computer and displays it.
workfold [localfolder] [options]          Creates, modifies, or displays information about the mappings.
workspace [options]                       Lets you create, delete, view, or modify properties and mappings associated with a workspace.
workspaces [options]                      Displays information about workspaces.
help [cmd]                                display help for [cmd]
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

#### Synchronous commands

> All commands excepted **checkout** and **status** are executed synchronously.
> From version 1.4, they will all become asynchonous to be able to catch original output errors.

To recursively get latest files within D:\MyBranch\MyProject and D:/MyOtherProject/MyOtherBranch,
admitting that this project is source-versionned via TFS,
you could write the following code :

    var tfs = require('tfs');

    tfs('get', 'D:/MyProject/MyBranch D:/MyOtherProject/MyOtherBranch', {
      recursive: true
    });

If you prefer to use the current directory, you can ommit the second parameter or set it to null.

#### Asynchronous commands

>> Only for **checkout** and **status**.

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
    }

    tfs('status', 'D:/MyProject/MyBranch', {
      recursive: true
    }, callback);

#### Asynchronous commands

Some commands, like **status**, have extra-properties in their response.
To get real-life examples of common commands, check [this Github directory](https://github.com/ivangabriele/vscode-tfs/tree/master/lib/tfs).

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
