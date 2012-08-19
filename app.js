var connect = require('connect'),
    wheat = require('wheat');

var app = connect()
	.use(connect.favicon())
    .use(connect.logger(':date | :remote-addr | :referrer | HTTP/:http-version | :method | :url | :status | :res[content-length] | :response-time | :user-agent'))
    .use(wheat())
.listen(3001, '127.0.0.1');