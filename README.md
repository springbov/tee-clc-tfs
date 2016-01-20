# tfs
**NodeJS wrapper for TFS command line tool.**

[![Build Status](https://travis-ci.org/ivangabriele/tfs.svg?branch=master)](https://travis-ci.org/ivangabriele/tfs)
[![NPM Version](https://img.shields.io/npm/v/tfs.svg?style=flat)](https://www.npmjs.org/package/tfs)
[![NPM Downloads](https://img.shields.io/npm/dm/tfs.svg?style=flat)](https://www.npmjs.org/package/tfs)
[![Dependency Status](https://david-dm.org/ivangabriele/tfs.svg)](https://david-dm.org/ivangabriele/tfs)
[![devDependency Status](https://david-dm.org/ivangabriele/tfs/dev-status.svg)](https://david-dm.org/ivangabriele/tfs#info=devDependencies)

## Getting Started

### Installation

    npm install tfs
    npm link

`npm link` allow you to use `tfs` command anywhere within you file system.

### Usage

    D:\>cd workspace
    D:\>Workspace>

### Commands

> For any command :
> - If you omit `[files]`, it will apply on the current directory.
> - You can use a relative, an absolute or a TFS path.
> - You can give multiple files/directories separated by a space.

    changeset [files] &lt;options&gt;
    checkin   [files] &lt;options&gt;
    get       [files] &lt;options&gt;
    undo      [files] &lt;options&gt;

## tfs get
