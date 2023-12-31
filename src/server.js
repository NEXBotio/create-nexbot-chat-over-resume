const { createServer } = require('https');
const { parse } = require('url');
const next = require('next');
const fs = require('fs');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer(
    {
      key: fs.readFileSync('certs/localhost_site_key.pem'),
      cert: fs.readFileSync('certs/localhost_site_crt.pem')
    },
    (req, res) => {
      const parsedUrl = parse(req.url, true);
      handle(req, res, parsedUrl);
    }
  ).listen(3000, err => {
    if (err) throw err;
    console.log('> Server started on https://localhost:3000');
  });
});
