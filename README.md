# doc-cli

![](https://travis-ci.org/cnio/doc-cli.svg?branch=master)
[![npm version](https://badge.fury.io/js/doc-cli.svg)](https://badge.fury.io/js/doc-cli)
[![NPM Downloads][downloads-image]][downloads-url]

[npm-image]: https://img.shields.io/npm/v/doc-cli.svg
[npm-url]: https://npmjs.org/package/doc-cli
[downloads-image]: https://img.shields.io/npm/dm/doc-cli.svg
[downloads-url]: https://npmjs.org/package/doc-cli

> api document cli. You can easily write api document to markdown by using command-line, just type some keywords even nothing.

## Installation
```
npm i doc-cli -g
```
## Usage

### doc -h

```
  Usage: doc [options] [command]


  Commands:

    help            Get help on doc-cli
    new [options]   Create a new api document

  Options:

    -h, --help     output usage information
    -V, --version  output the version number

```

### example

```
➜  ~ doc new
api name: account
type: (post)
url: /api/user/account
Request Parameters Length: (0) 2
Parameter Name: username
Required: (true)
Type: (string)
Description: 用户名
Parameter Name: password
Required: (true)
Type: (string)
Description: 密码
Response Type: (JSON)
Response Parameters Length: (0)
About to write to /home/joe/account.json:

{
  "name": "account",
  "type": "POST",
  "url": "/api/user/account",
  "params": [
    {
      "Name": "username",
      "Required": "true",
      "Type": "string",
      "Description": "用户名"
    },
    {
      "Name": "password",
      "Required": "true",
      "Type": "string",
      "Description": "密码"
    }
  ]
}


Is this ready? (yes)
```
When typed `Enter`, you can see `account.md` file as follows. and actual in you current directory.

#### account
###### Request Type

 - POST

###### URL

 - /api/user/account

###### Request Parameters
| Name | Required | Type | Description |
| ---- | -------- | ---- | ----------- |
| username | true | string | 用户名 |
| password | true | string | 密码 |


## Lisense

The MIT License (MIT)

Copyright (c) 2016 CNIO

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.


