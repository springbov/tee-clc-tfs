# tfs
**NodeJS wrapper for TFS command line tool.**

[![Build Status](https://travis-ci.org/ivangabriele/tfs.svg?branch=master)](https://travis-ci.org/ivangabriele/tfs)
[![NPM Version](https://img.shields.io/npm/v/tfs.svg?style=flat)](https://www.npmjs.org/package/tfs)
[![NPM Downloads](https://img.shields.io/npm/dm/tfs.svg?style=flat)](https://www.npmjs.org/package/tfs)
[![Dependency Status](https://david-dm.org/ivangabriele/tfs.svg)](https://david-dm.org/ivangabriele/tfs)
[![devDependency Status](https://david-dm.org/ivangabriele/tfs/dev-status.svg)](https://david-dm.org/ivangabriele/tfs#info=devDependencies)

## Getting Started

### Installation

    npm install -g tfs

### Notes

> For affected commands :
> - If you omit `[files]`, it will apply on the current directory.
> - You can use a relative, an absolute or a TFS path.
> - You can give multiple files/directories separated by a space.

### Commands

    Usage: tfs <command>


    Commands:

      changeset <number> [options]  Changesets information and editing.
      checkin [files] [options]     Commit pending changes.
      get [files] [options]         Retrieve a read-only copy of a file.
      undo [files] [options]        Remove pending changes from a workspace.
      workspaces [files] [options]  Display information about workspaces.
      help [cmd]                    display help for [cmd]

    Options:

      -h, --help  output usage information

## tfs changeset

    Usage: tfs-changeset <changeset number> [options]

    Options:

      -h, --help     output usage information
      -V, --verbose  Verbose mode.

## tfs checkin

    Usage: tfs-checkin [file(s)] [options]

    Options:

      -h, --help               output usage information
      -a, --author [Author]    Identifies the author of the pending changes so that one user can check in changes on behalf of another user.
      -b, --bypass             Bypasses a gated check-in requirement.
      -C, --collection         Specifies the team project collection.
      -c, --comment [Comment]  Associates a comment with the changeset.
      -N, --noprompt           Suppresses any prompts for input from you.
      -n, --notes [Note]       Provides one or more check-in notes to associate with the changeset.
      -o, --override [Reason]  Lets you override a check-in policy failure.
      -r, --recursive          Checks in all items in the specified or implied working folder and subfolders.
      -v, --validate           Lets you test checking in without actually doing it.
      -V, --verbose            Verbose mode.

## tfs get

    Usage: tfs-get [file(s)] [options]

    Options:

      -h, --help                       output usage information
      -r, --recursive                  Recursively retrieves all items that match your file(s).
      -V, --verbose                    Verbose mode.

## tfs undo

    Usage: tfs-undo [file(s)] [options]

    Options:

      -h, --help     output usage information
      -V, --verbose  Verbose mode.

## tfs workspaces

    Usage: tfs-workspaces [options]

    Options:

      -h, --help     output usage information
      -V, --verbose  Verbose mode.
