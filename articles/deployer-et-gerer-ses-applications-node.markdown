Title: Déployer et gérer ses applications Node
Author: Johann Pardanaud
Date: Sun Oct 21 2012 16:22:55 GMT+0200 (CEST)

Lorsque l’on commence à se lancer dans le développement avec Node.js, on finit par rencontrer un problème de taille : comment déployer ses applications sans trop se prendre la tête, tout en évitant de compromettre la sécurité de son serveur ? En effet, une application Node nécessite d’être lancée manuellement sur votre serveur et chaque mise à jour du code source entraîne un inévitable redémarrage de l’application. Commence alors les pires solutions inimaginables pour tenter de se simplifier la vie… et c’est là que je vais essayer de vous aider !

Avant toute chose, j’ai moi-même mis un certain temps avant d’arriver à un système de maintenance et de déploiement à peu près correct. Je me suis basé sur mes propres expériences et je ne prétends pas le moins du monde proposer ci-dessous la solution parfaite, elle mérite d’être améliorée et d’autres solutions sont peut-être plus adaptées mais, en attendant, mon système fait très bien son travail et c’est ce qui compte !

## Prérequis techniques

Afin que vous puissiez mettre en pratique ce que je vais vous expliquer ci-dessous, il vous faut :

* utiliser le système de versioning [Git](http://git-scm.com/) pour vos applications Node ;
* bien utiliser le fichier [package.json](http://package.json.jit.su/) pour installer et tenir à jour les modules de vos applications ;
* posséder un serveur dédié avec une distribution basée sur Debian (à moins que vous ne sachiez adapter les commandes à votre propre distribution). Pour ma part, par commodité, j’utilise [Ubuntu-Server](http://www.ubuntu.com/download/server).

Comme je peux concevoir que peu de personnes possède un serveur dédié à titre particulier, je ne peux alors que vous conseiller la mise en place d’une machine virtuelle ou bien l’utilisation d’une solution d’hébergement mutualisé.

À ce propos, Ryan Dahl, le créateur de Node.js, tient à jour [une liste des hébergeurs d’applications Node](https://github.com/joyent/node/wiki/Node-Hosting). À noter que, si vous optez pour un hébergement mutualisé, mon article sort alors totalement de ce cadre car les systèmes de maintenance et de mise à jour sont généralement pris en charge par les hébergeurs.

## Dossiers essentiels et création de l’utilisateur node

Pour commencer, vous devez mettre en place une structure adaptée à l’hébergement de vos applications. Pour cela, il nous faudra créer deux dossiers :

* __/var/node/__ : ce dossier contiendra les codes sources de toutes vos applications Node. Attendez avant de le créer, nous le ferons lors de la création de l’utilisateur __node__.
* __/var/log/node/__ : ce dossier a pour but de contenir vos fichiers de logs concernant vos applications. Pourquoi plusieurs fichiers ? Car nous allons créer un fichier de log par application Node, falicitant ainsi leur consultation et évitant les erreurs d’écriture. Vous pouvez immédiatement le créer.

Concernant l’utilisateur __node__, pourquoi est-il nécessaire ? Eh bien pour les mêmes raisons que l’utilisateur __www-data__ pour Apache : afin de limiter les dégâts en cas de faille de sécurité. Vos applications Node seront exécutées par l’utilisateur __node__ qui aura des droits limités sur la gestion de votre serveur, ce qui évitera de gros dégâts si une faille est située au sein d’un de vos projets. À noter que son répertoire personnel sera le dossier __/var/node/__, voici donc comment créer l’utilisateur et son répertoire personnel en même temps :

	sudo adduser node --home /var/node/

Ainsi, le dossier __/var/node/__ sera immédiatement paramétré avec l’utilisateur __node__ en tant que propriétaire. À ce propos, il nous faut aussi modifier le propriétaire du dossier __/var/log/node/__ car seul l’utilisateur __node__ va s’en servir :

	chown node:node /var/log/node/

## Organisation des dossiers de vos applications

Afin d’éviter de vous retrouver avec un fouilli comme il n’est pas permis, je vous conseille de suivre une certaine organisation de vos dossiers applicatifs. Ma solution est simple et exige tout simplement que vous donniez un nom de code à vos applications qui commence en permanence par « node- ». Pour l’exemple, nous aurons une application  « Test » dont l’identifiant sera __node-test__, cela nous donne donc l’organisation de dossiers suivante :

	/
	└── var
	    └── node
	        └── node-test
	            ├── app
	            │   └── app.js
	            └── app.git

Le dossier __app.git__ contenu au sein du dossier applicatif __node-test__ sert à contenir le dépôt Git (de type __--bare__) de votre application, tandis que le dossier __app__ contient les fichiers sources constituant votre application.

Le fichier __app.js__ est le point d’entrée de votre application, autrement dit, le fichier passé en paramètre à Node pour exécuter votre application. Pour nos futurs tests, je vous conseille de lui intégrer un petit code tel que celui fourni sur la page d’accueil du site web de Node :

	var http = require('http');
	http.createServer(function (req, res) {
	  res.writeHead(200, {'Content-Type': 'text/plain'});
	  res.end('Hello World\n');
	}).listen(1337, '127.0.0.1');
	console.log('Server running at http://127.0.0.1:1337/');

Ce qui nous permet d’obtenir le résultat suivant :

	Youmu:app johann$ node app.js &
	[1] 2215
	Server running at http://127.0.0.1:1337/
	Youmu:app johann$ curl 127.0.0.1:1337
	Hello World

Histoire de clarifier un peu les choses, voici ce que ça donnerait dans le cas où vous auriez plusieurs applications :

	/
	└── var
	    └── node
	        ├── node-test
	        │   ├── app
	        │   │   └── app.js
	        │   └── app.git
	        └── node-test2
	            ├── app
	            │   └── app.js
	            └── app.git

## Création des démons et mise en place des systèmes de log

Si il y a bien un problème particulier dans la mise en place d’une application Node c’est de quelle manière nous allons la faire démarrer : manuellement ou automatiquement ? Je pense qu’il n’est pas utile de vous préciser pourquoi la solution manuelle n’est clairement pas envisageable mais la question devient alors « comment vais-je démarrer automatiquement mon application ? ». Tout simplement grâce à un démon !

Si vous n’êtes pas familiarisé avec les systèmes Unix-like, sachez qu’un « démon » (_daemon_ en anglais) est _plus ou moins_ l’équivalent d’un service sous Windows. Il s’agit donc d’un processus qui tourne en tâche de fond et qui est lancé par le système d’exploitation selon la configuration du démon.

Il existe deux moyens de mettre en place ce type de processus, soit par le biais de l’ancien système [__init__](http://fr.wikipedia.org/wiki/Init), soit par le biais de [__Upstart__](http://upstart.ubuntu.com/). J’ai choisi de m’orienter vers la seconde solution, beaucoup plus simple à mettre en place et plus récente.

Notre script Upstart (un par application Node) devra accomplir trois tâches importantes :

* spécifier les événements sur lesquels votre application devra être démarrée ou arrêtée ;
* exécuter l’application ;
* inscrire dans le fichier de log de votre application quand cette dernière est démarrée ou arrêtée.

La première tâche est extrêmement simple à mettre en place. Commencez par créer un fichier __node-test.conf__ dans le dossier __/etc/init/__ (le dossier contenant les fichiers de configuration des démons Upstart) et ajoutez-y ces deux lignes de code :

	start on runlevel [2345]
	stop on runlevel [06]

Ces instructions indiquent à Upstart que notre script doit être exécuté lorsque les [runlevels](http://fr.wikipedia.org/wiki/Run_level) __2__, __3__, __4__ et __5__ sont appliqués par le système, tandis que le script doit être arrêté lorsque les runlevels __0__ et __6__ sont appliqués.

__Note :__ Si votre application Node a été exécutée au runlevel __2__, elle ne sera pas redémarrée si le système passe au runlevel __3__ (chose qui ne devrait probablement pas se produire sur un _serveur_ Linux), elle continuera tout simplement son exécution.

Avant de passer à la suite, il est fortement conseillé d’ajouter ces trois lignes de code :

	setgid node
	setuid node
	respawn

Les deux premières lignes indiquent que les codes de notre script devront être exécutés avec l’utilisateur et le groupe __node__, évitant ainsi de gros problèmes de sécurité en cas de faille au sein de votre application. La troisième ligne, elle, indique que l’application devra être automatiquement redémarrée en cas de fermeture inopinée.

La deuxième tâche de notre script Upstart est d’exécuter notre application lorsque les événements spécifiés plus haut sont déclenchés :

	script
    	/usr/local/bin/node /var/node/node-test/app/app.js >> /var/log/node/node-test.log 2>&1
	end script	

Ici, rien de bien compliqué, on notera simplement que nous devons faire référence à Node par le biais de son chemin complet (disponible avec un simple `which node`). Bien entendu, tout ce qui est retourné par notre application sur la sortie standard est enregistré dans son fichier de log.

__Attention !__ Pensez bien à vérifier que votre installation de Node est située au même endroit que moi car nous utilisons ici le chemin absolu !

La dernière étape est d’inscrire le démarrage et l’arrêt de notre application au sein de son fichier de log, cela se fait très simplement :

	pre-start script
	    echo "[`date +"%d-%m-%y %T"`] Starting" >> /var/log/node/node-test.log
	end script

	pre-stop script
	    echo "[`date +"%d-%m-%y %T"`] Stopping" >> /var/log/node/node-test.log
	end script

Le bloc __pre-start__ s’exécute avant le démarrage de l’application, tandis que l’autre bloc s’exécute une fois l’application arrêtée. Pour plus de clarté dans le fichier de log, on ajoute la date et l’heure.

Voilà, le démon est maintenant configuré. Pour vérifier son bon fonctionnement, essayez donc le démarrer avec `sudo start node-test`, de vérifier sa bonne exécution avec `initctl status node-test`, de regarder dans votre fichier de log les informations affichées avec `cat /var/log/node/node-test.log` et enfin de lui envoyer une requête avec `curl 127.0.0.1:1337`.

## Autoriser le démarrage et le redémarrage des applications Node

Maintenant que les démons sont paramétrés, il serait normal que l’utilisateur __node__ puisse les administrer, or ce n’est actuellement pas le cas car nous ne lui en avons pas donné l’autorisation. Pour cela, nous allons devoir éditer le fichier __/etc/sudoers/__ depuis la commande `sudo visudo`.

Une fois l’interface d’édition ouverte, rendez-vous dans la section « User privilege specification » et ajoutez-y la ligne suivante :

	node    ALL= ALL, NOPASSWD: /sbin/start node-*, /sbien/stop node-*, /sbin/restart node-*

Cela indique que l’utilisateur __node__ a maintenant le droit d’utiliser toutes les commandes du moment qu’il fourni son mot de passe.

Les commandes `sudo start node-*`, `sudo stop node-*` et `sudo restart node-*` sont aussi accessibles en indiquant ce que l’on souhaite à la place de l’étoile mais sans même taper son mot de passe. La non-exigence du mot de passe explique pourquoi nous imposons que les identifiants de vos applications commencent par « node- », si quelqu’un arrive à s’emparer d’une session de l’utilisateur __node__ il ne pourra agir que sur les services Node, rien de plus.

Vous vous demandez probablement pourquoi nous souhaitons éviter que le mot de passe soit demandé pour ces commandes ? Eh bien parce que nous allons nous en servir dans notre script Git ci-dessous. Avant de vous rendre à la partie suivante, fermez avec le raccourci __Ctrl+X__ et validez la sauvegarde, les changements sont immédiatement appliqués.

## Configuration de Git

Maintenant que notre application est apte à démarrer seule et à se relancer en cas de coupure, il nous faut configurer le dépôt Git de notre application afin de faciliter le déploiement. Pour cela, nous allons employer les « [Git Hooks](http://git-scm.com/book/en/Customizing-Git-Git-Hooks) » et plus particulièrement le hook nommé __post-update__ qui s’exécute après chaque _push_ sur le repository Git.

Commencez donc par créer votre repo au sein du dossier __/var/node/node-test/app.git/__ avec la commande `git init --bare`. Créez ensuite un fichier __post-update__ au sein du dossier __app.git/hooks/__, accordez-lui les droits d’exécution avec la commande `chmod +x post-update` et insérez le code suivant :

	#!/bin/bash
	
	echo "Updating app..."
	
	logRep="/var/log/node/"
	appName="app-name"
	
	cd ..
	unset GIT_DIR
	
	git clone app.git/ app.new/ >> $logRep$appName.log 2>&1
	
	cd app.new/
	npm update >> $logRep$appName.log 2>&1
	cd ..
	
	rm -rf app.old/ > /dev/null 2>&1
	mv app/ app.old/ > /dev/null 2>&1
	mv app.new/ app/
	
	sudo stop $appName >> $logRep$appName.log 2>&1
	sudo start $appName >> $logRep$appName.log 2>&1
	
	echo "App updated."

__Attention !__ Avant d’utiliser ce script, pensez bien à indiquer l’identifiant de votre application, ligne 6 ! Dans notre cas, il faut bien évidemment remplacer __app-name__ par __node-test__.

Je ne vais pas rentrer dans les détails mais sachez que, lorsqu’il est exécuté, ce script a pour but de :

* cloner votre répertoire Git dans un dossier temporaire (__app.new__) ;
* y installer les modules nécessaires par le biais de [NPM](https://npmjs.org/) ;
* remplacer les fichiers de votre application actuelle par le dossier temporaire ;
* relancer votre application.

Notez que les commandes essentielles utilisées au sein de ce script ont leurs flux de sortie et d’erreur redirigés vers le fichier de log de votre application, vous permettant de consulter les éventuelles erreurs suite à un déploiement échoué. Les deux commande `echo` affichent leur contenu à l’utilisateur qui effectue un _push_ vers le repo Git, enfin en console tout du moins, pour le reste ça dépend du logiciel que vous utilisez pour effectuer vos envois.

Certains seront surpris de voir que j’utilise `stop`et `start` au lieu de `restart`. En effect, cela est plus adapté pour deux raisons :

* les fichiers sources sont bien actualisés auprès de Node, ce qui n’est pas toujours le cas avec `restart` ;
* le fichier de log de votre application affichera bien l’arrêt et le démarrage, tandis qu’avec `restart`vous n’aurez que le démarrage d’affiché.

Votre système de déploiement est maintenant fin prêt ! Essayons donc de _push_ un ou plusieurs commits au sein du répertoire __/var/node/node-test/app.git/__, le code que vous y aurez intégré sera alors automatiquement exécuté avec le fichier __app.js__ en point d’entrée.

## Mettre en place le système de backup

Une chose que j’ai jugé importante d’intégrer au script fourni plus haut est la conservation de l’ancien état de votre application (dans le dossier __app.old__), afin de pouvoir faire un backup au plus vite en cas de déploiement raté. Afin d’accélérer la restauration de vos applications, je vous propose d’ajouter un fichier __reverse-app__ dans le dossier __/var/node/__, de le rendre exécutable avec `chmod +x reverse-app` et d’y inscrire le code suivant :

	#!/bin/bash
	
	appName=$(echo $1 | sed -e "s/\///g")
	cd $1
	
	rm -rf app/
	mv app.old/ app/
	
	sudo stop $appName
	sudo start $appName

Ici, le fonctionnement est très simple. Lorsque l’un de vos déploiements a échoué, allez dans le dossier __/var/node/__ et exécutez la commande suivante :

	./reverse-app identifiant-de-votre-app

Dans notre cas cela donne donc :

	./reverse-app node-test

Votre application sera ainsi réinitialisée à l’état précédant votre dernier déploiement. En revanche, la réinitialisation du dépôt Git est à votre charge si vous en avez besoin, je n’ai pas intégré cela car les besoins et les possibilités sont multiples. Ce script est là avant tout pour vous permettre un rapide backup de votre application plantée, pour le reste c’est à vous de vous débrouiller.

__Note :__ La ligne 3 est présente pour effacer un éventuel slash présent dans le nom de l’identifiant, ainsi vous pouvez commencer à écrire `./reverse-app no` et utiliser l’auto-complétion pour écrire le reste de l’identifiant. Sachant que l’auto-complétion sera effectuée à partir du nom du dossier, un slash sera ajouté, nous le retirons donc automatiquement pour pouvoir bénificier de cet avantage qu’est l’auto-complétion.

## Ajouter de nouvelles applications

L’ajout de nouvelles applications n’est pas tout aussi fastidieux mais demande tout de même quelques étapes :

* affectez lui un identifiant commencant par « node- » ;
* créez l’arborescence de son répertoire ;
* initialisez le dépôt Git ;
* créez le hook __post-update__ en prenant bien soin de lui spécifier l’identifiant de votre application et de le rendre exécutable ;
* ajoutez le fichier de configuration pour Upstart.

Cet article est maintenant terminé, j’aurais eu beaucoup de mal à l’écrire mais j’en suis plutôt content. Si vous avez repéré une coquille n’hésitez pas à me le signaler, je suis aussi preneur de toute idée que vous pourriez avoir pour améliorer (voir même remplacer, soyons fous !) mon système.