'use strict';

//import * as http from "http";

import * as http from "http";

//const http = require('http');
const path = require('path');
const fs = require('fs');
//import * as path from 'path';
//import * as fs from 'fs';

const server = http.createServer((req: http.IncomingMessage, res: http.ServerResponse) => {
  // Build file path
  let filePath: string = path.join(__dirname, 'public', req.url === '/' ? 'index.html' : req.url);

  // Extension of file
  const extname: string = path.extname(filePath);

  // Initial content type
  let contentType: string = '';

  // Check ext and set content type
  switch (extname) {
    case '.js':
      contentType = 'text/javascript';
      break;
    case '.css':
      contentType = 'text/css';
      break;
    case '.json':
      contentType = 'application/json';
      break;
    case '.png':
      contentType = 'image/png';
      break;
    case '.jpg':
      contentType = 'image/jpg';
      break;
    default:
      contentType = 'text/html';
  }

  // Check if contentType is text/html but no .html file extension
  if (contentType === 'text/html' && extname === '') filePath += '.html';

  // Read File
  fs.readFile(filePath, (err: NodeJS.ErrnoException | null, content: string | Buffer) => {
    if (err) {
      if (err.code === 'ENOENT') {
        // Page not found
        fs.readFile(path.join(__dirname, 'public', '404.html'), (err: NodeJS.ErrnoException | null, content: string | Buffer) => {
          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.end(content, 'utf8');
        });
      } else {
        //  Some server error
        res.writeHead(500);
        res.end(`Server Error: ${err.code}`);
      }
    } else {
      // Success
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf8');
    }
  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
