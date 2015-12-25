//
// Server
//
var http = require('http');
var path = require('path');
var fs = require('fs');
var mime = require('mime');

function send404(res) {
  res.write('Not Found.');
  res.end();
}

function sendStaticFile(res, filepath) {
  fs.exists(filepath, function(exist) {
    if (exist) {
      fs.readFile(filepath, function(err, data) {
        if (err) {
          send404(res);
        } else {
          res.writeHeader(200, {
            'Content-Type': mime.lookup(path.basename(filepath))
          });
          res.end(data);
        }
      });
    } else {
      send404(res);
    }
  });
}

var server = http.createServer(function(req, res) {
  var filepath = './public/index.html';
  if (req.url !== '/') {
    filepath = path.join('./public', req.url);
  }

  sendStaticFile(res, filepath);
});

server.listen(4000, function() {
  console.log('Server started at port 4000.');
});