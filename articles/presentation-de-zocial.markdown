Title: Présentation de Zocial
Author: Johann Pardanaud
Date: Sun Aug 26 2012 16:16:31 GMT+0200 (CEST)

Je pense que vous n’êtes pas sans savoir que j’ai co-écrit, avec [Thunderseb][], un livre sur le [JavaScript][]. Il est aujourd’hui publié par le biais du [Site du Zéro][] et rencontre un succès plus que correct. Cependant, rédiger ce livre n’aura pas tous les jours été simple, il nous aura fallu plus d’un an et demi pour en venir à bout (en prenant notre temps tout de même). Autant vous dire qu’en un an et demi, on a largement le temps de se rendre compte qu’il peut parfois exister bien des problèmes dans la manière dont nos outils sont conçus. Et là le problème vient, en l’occurrence, du Site du Zéro.

## Quand les problèmes surviennent

Lorsque l’on écrit un cours à plusieurs, il est de bon ton de bien séparer les tâches afin d’éviter de se mettre des bâtons dans les roues. Pour cela, Thunderseb et moi-même avons choisi de nous répartir la rédaction des chapitres afin que chacun puisse écrire un chapitre sans que l’autre ne vienne le gêner pour rajouter ou supprimer quoi que ce soit. Autrement dit, si l’un d’entre nous commençait un chapitre, l’autre ne devait pas intervenir dessus jusqu’à temps que le chapitre en question soit terminé. C’était simple mais efficace et cela nous a évité bien des ennuis.

Malheureusement, il y a eu certains cas où il nous a fallu intervenir sur le chapitre de l’autre afin de rectifier un problème de dernière minute ou bien éviter d’envoyer un MP juste pour corriger une faute d’orthographe, bref, des choses toutes bêtes.

Et c’est justement dans ce genre de cas que les problèmes peuvent survenir : est-on sûr et certain que l’un des co-auteurs avec qui l’ont travaille n’est pas actuellement en train de modifier le chapitre sur lequel on souhaite apporter une correction ? Absolument pas ! Et ne comptez pas sur la _feature_ du SdZ permettant d’afficher l’activité du membre, elle est trop peu fiable.

Dans le cas où certains n’auraient pas compris l’enjeu du problème, je vais faire simple : l’utilisateur A réécrit une partie d’un chapitre, l’utilisateur B souhaite aussi faire une modification. Ces deux personnes vont alors ouvrir le même formulaire d’édition avec __le même__ contenu. Le premier utilisateur (disons le B) qui enregistrera ses modifications finira alors par les perdre si le second utilisateur (le A) enregistre lui aussi ses modifications car il aura effectué ses modifications sur une version du document qui est antérieure à la modification de l’utilisateur B.

Un système tel que Git empêche ce genre de conflits en forçant celui qui enregistre en dernier à réécrire correctement le document en tenant compte des dernières modifications des autres utilisateurs, malheureusement, le SdZ ne possède pas un tel système (et il ne me semble pas que ce soit prévu pour la v4).

## À tout problème il existe une solution

Bien que je ne sois pas développeur du SdZ, il existe des solutions pour remédier à ce problème qui est plus une source d’angoisse qu’autre chose : les userscripts ! Quel serait ici le but d’un userscript ? Permettre tout simplement de savoir si un co-auteur est actuellement en train d’éditer un chapitre auquel on souhaite accéder et fournir un chat permettant alors aux deux auteurs de communiquer afin de savoir ce qui est actuellement en train de se passer.

J’ai décidé de temporairement nommer le projet « Zocial », je ne sais pas si le nom changera dans le futur, on verra bien (proposez si vous avez des idées).

## Premier prototype et présentation technique

Contrairement à ce que vous pourriez croire, je ne viens pas vous parler de cette idée 5 minutes après l’avoir trouvée, cela fait déjà quelques mois que j’y pense. D’ailleurs, dans le cadre de la présentation d’un projet pour ma première année de BTS, j’ai eu l’occasion de réaliser un prototype de la chose et de le présenter (note maximale obtenue, youpi cotillons \o/).

Comment m’y suis-je pris ? Le concept sur papier est plutôt simple, il suffit d’un userscript afin de fournir une interface et d’un serveur capable de gérer les websockets qui se chargera de recevoir et transmettre toutes les données nécessaires à la synchronisation des statuts entre les différents auteurs d’un même projet. Puisqu’il faut un serveur capable de gérer les websockets, je pense que vous aurez compris que PHP est hors de la partie et je me suis donc dirigé vers Node.js.

Ne connaissant rien à cette plateforme à l’époque où j’ai réalisé mon prototype, j’ai eu la malchance de me compliquer dangereusement la vie en utilisant des outils tel que [ws][] au lieu de [Socket.io][] (pour la gestion des websockets). Idem pour les bases de données, croyant que Node.js ne possédait pas encore de driver pour MySQL, je me suis orienté vers une BDD NoSQL nommée [CouchDB][] plutôt que d’utiliser le driver MySQL de [NodeJSDB][]. Enfin bref, je suis arrivé à un résultat très peu avancé (mais fonctionnel) basé sur un échange de données sous forme de JSON :

	{
		"section": "talks",
		"method": "send",
		"params": [
			"identifiant_de_la_conversation",
			"Message de test !"
		]
	}

Les requêtes JSON étaient alors interprétées par une méthode chargée de rediriger le tableau de paramètres vers la fonction capable de le traiter.

## Après le prototype

Bien entendu, je n’ai pas l’intention d’en rester là. La présentation de mon prototype ayant plutôt plu, j’ai décidé de continuer plus sérieusement le projet pour arriver à un résultat final avant la fin de mon BTS afin de pouvoir présenter tout cela pour le diplôme. Mais vous vous en foutez probablement et c’est bien normal, ce qui compte c’est que ça pourrait être utile et ouvrir la voie à d’autres idées permettant d’étendre le projet.

Plutôt que de me baser sur ce que j’avais déjà écrit pour le prototype, j’ai décidé de repartir depuis une base saine afin d’appliquer le fameux proverbe « Thinking outside the box ». Après un bon paquet de recherches et de tests en tout genre je suis arrivé à lister les modules nécessaires au développement du projet :

* [Express][] pour gérer les routes du site web ainsi que la configuration des environnements de développement.
* [Jade][] pour générer les pages HTML du site web mais aussi celle du client.
* [Socket.io][] pour gérer les communications entre client et serveur.
* [DB MySQL][] (du projet [NodeJSBD][]) pour interagir avec la base de données (qui contiendra les comptes utilisateurs ainsi que l’historique des conversations).
* [UglifyJS][] pour réduire les scripts JS fournis dans le userscript.
* [HTML Minifier][] : utilisé pour minifier les codes HTML contenus dans le userscript (cela dit il n’est pas certain que ça me serve, Jade semble minifier tout seul les rendus qu’il produit).

J’ai plus ou moins commencé à tâtonner le développement, j’essaierai de mettre au plus tôt le projet en ligne sur Github.

### Limitations techniques

Il y a malheureusement quelques contraintes au développement du projet. D’une part, puisqu’il s’agit d’un userscript, on a forcément l’inconvénient d’être dépendant du moindre changement au niveau du code HTML (voir même JS) du site sur lequel on applique des modifications, il faudra donc un suivi constant. Autre chose, le SdZ ne possède pas encore d’API publique, ce qui m’empêchera dans un premier temps d’utiliser les comptes des utilisateurs du SdZ et donc de connaître les tutoriels qu’ils ont publiés ou non. J’ai déjà trouvé comment résoudre ce genre de problème mais cela demandera un sacré effort en attendant l’API promise pour la v4 du SdZ.

Maintenant, la question subsidiaire est : vais-je terminer ce projet sachant que j’ai la sale habitude de ne jamais le faire ? À cela je répondrais « wait & see » =°

Dernière chose, pour ceux qui ont eu le courage de me lire, c’est cadeau :

<iframe width="100%" height="450" scrolling="no" frameborder="no" src="http://w.soundcloud.com/player/?url=http%3A%2F%2Fapi.soundcloud.com%2Fusers%2F1749607&show_artwork=true"></iframe>

[Thunderseb]: http://www.siteduzero.com/membres-294-1398.html
[JavaScript]: http://www.siteduzero.com/tutoriel-3-309961-dynamisez-vos-sites-web-avec-javascript.html
[Site du Zéro]: http://www.siteduzero.com/
[ws]: http://einaros.github.com/ws/
[Socket.io]: http://socket.io/
[CouchDB]: http://couchdb.apache.org/
[NodeJSDB]: http://nodejsdb.org/
[Express]: http://expressjs.com/
[Jade]: https://github.com/visionmedia/jade
[DB MySQL]: http://nodejsdb.org/db-mysql/
[UglifyJS]: https://github.com/mishoo/UglifyJS/
[HTML Minifier]: https://github.com/kangax/html-minifier