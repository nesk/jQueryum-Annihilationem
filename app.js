var connect = require('connect'),
    wheat = require('wheat');

var app = connect()
	.use(connect.favicon())
    .use(connect.logger(':date | :remote-addr | :referrer | HTTP/:http-version | :method | :url | :status | :res[content-length] | :response-time | :user-agent'))
    .use(wheat(__dirname))
.listen(3001, '127.0.0.1', function() {
	console.log('Listening on 127.0.0.1:3001');
});