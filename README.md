#NodePieSpy


[![Social graph of #node.js](./media/nodepiespy_nodejs.png)](http://tuhoojabotti.github.io/NodePieSpy-Client/)

*A program for analyzing IRC chat logs in a fun interactive way inspired by [piespy](www.jibble.org/piespy/).*

## Features

 * Modular structure
   * Easy to expand with new heuristics and algorithms.
 * JSON based REST-like backend
   * Very simple to use with AJAX.
 * Code documentation with JSDoc:
   * http://tuhoojabotti.github.io/NodePieSpy/
 * Frontend here with [D3.js](http://d3js.org/):
   * https://github.com/tuhoojabotti/NodePieSpy-Client
 * API currently running here:
   * http://lahdenvuo.info/social/channel/node.js.json

## Install procedure

Requirements: Node.js version 0.10.11

* Run "npm install" inside NodePieSpy directory to download the required dependencies
* Edit NodePieSpy/lib/index.js file to fit your needs (channels, log files path, port)
* Create directory for the server api and add a rewrite rule that redirects requests to server ( e.g. Using apache .htaccess file: RewriteRule ^(.*)$ http://nodepie.server.spy:port/$1 [P] )
* Run the server with “node index.js” and configure the client

## License (MIT)

Copyright (c) 2013-2014 Ville Lahdenvuo

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
