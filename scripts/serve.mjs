#!/usr/bin/env node
import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..', 'public');
const port = Number(process.env.PORT || 8787);

const types = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.mjs': 'text/javascript',
  '.json': 'application/json',
  '.xml': 'text/xml',
  '.txt': 'text/plain',
  '.md': 'text/markdown',
};

http
  .createServer((req, res) => {
    let urlPath = decodeURIComponent(req.url.split('?')[0]);
    if (urlPath.endsWith('/') && urlPath !== '/') {
      urlPath = urlPath.slice(0, -1);
    }
    let file = path.join(root, urlPath === '/' ? 'index.html' : urlPath);
    if (fs.existsSync(file) && fs.statSync(file).isDirectory()) {
      file = path.join(file, 'index.html');
    }
    if (!fs.existsSync(file)) {
      res.writeHead(404);
      res.end('Not found');
      return;
    }
    const ext = path.extname(file);
    res.writeHead(200, { 'Content-Type': types[ext] || 'application/octet-stream' });
    fs.createReadStream(file).pipe(res);
  })
  .listen(port, () => console.log(`Serving ${root} at http://127.0.0.1:${port}`));