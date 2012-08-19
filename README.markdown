# jQueryum Annihilationem

This is my personal blog, a fork from [howtonode.org][] project (created by [Tim Caswell][]). I made some changes to adapt the project to my use :

* The skin has been entirely remade by myself with [Simplex][], a modification of [Twitter Bootstrap][] stylesheet.
* The templates have been rewritten to use Bootstrap stylesheet. I’ve also translated them in French and removed some useless informations (like node version on each article).
* The server has been __very slightly__ recoded. The `server/server.js` file has been replaced by the `app.js` file, using the Connect module, that’s all.

## Installation

Although It’s my personal blog, you can clone this git repository to use it as your own. Before using it, make sure to edit the `app.js` file to avoid incorrect parameters :

	var connect = require('connect'),
	    wheat = require('wheat');
	
	var app = connect()
	    .use(connect.logger(':date | :remote-addr | :referrer | HTTP/:http-version | :method | :url | :status | :res[content-length] | :response-time | :user-agent')) // You can adapt this to your needs
	    .use(wheat())
	.listen(3001, '127.0.0.1'); // Change the port and the interface

After that, you can update and start the server :

	npm update
	node app

## Personalization

The personalization is in three steps :

* Modify the `description.markdown` file which provides a description for the blog.
* Create your own author file. See [howtonode.org][]’s repository to learn the format to use.
* Edit the `skin/article.haml` file to assign your own Disqus account.

[howtonode.org]: https://github.com/creationix/howtonode.org
[Tim Caswell]: https://github.com/creationix
[Simplex]: http://bootswatch.com/simplex/
[Twitter Bootstrap]: http://twitter.github.com/bootstrap/