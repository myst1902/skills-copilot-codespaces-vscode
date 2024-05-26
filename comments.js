// Create web server
// Create a web server that listens to requests on port 8080. It should respond to requests to /comments in the following way:
// If a GET request is sent to /comments, it should return an array of comments. You can just make up some comments for this assignment.
// If a POST request is sent to /comments, it should add a new comment to the list of comments.
// The list of comments can be stored in memory on the server for this assignment. It does not have to be stored in a database.

var http = require('http');
var url = require('url');
var comments = [];

var server = http.createServer(function(request, response) {
  var urlParts = url.parse(request.url);
  if(urlParts.pathname === '/comments') {
    if(request.method === 'GET') {
      response.writeHead(200, {'Content-Type': 'application/json'});
      response.end(JSON.stringify(comments));
    } else if(request.method === 'POST') {
      var newComment = '';
      request.on('data', function(data) {
        newComment += data;
      });
      request.on('end', function() {
        comments.push(JSON.parse(newComment));
        response.end('Comment added');
      });
    }
  } else {
    response.writeHead(404, {'Content-Type': 'text/plain'});
    response.end('Not Found');
  }
});

server.listen(8080);