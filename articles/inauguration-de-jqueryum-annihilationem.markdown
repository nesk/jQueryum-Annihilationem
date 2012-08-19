Title: Inauguration de jQueryum Annihilationem
Author: Johann Pardanaud
Date: Sun Aug 19 2012 03:06:59 GMT+1

Eeeet voilà ! Après 2 ou 3 jours de recherche et de peaufinage, mon deuxième blog est enfin d’aplomb. Il faut dire que je n’ai pas choisi la manière la plus simple qui soit pour monter un blog, ce qui explique le délai de mise en place.

## Structure de ce blog

Plutôt que de passer par le biais d’un système tel que [Wordpress][], j’ai choisi de m’orienter vers un type de moteur qui commence à émerger : ceux se basant sur un ensemble de fichiers gérés par un moteur de versioning tel que __Git__, ce qui signifie que les articles ne sont pas enregistrés au sein d’une base de données mais directement dans des fichiers. Afin de simplifier la tâche de l’auteur et de lui épargner un temps d’écriture considérablement long en raison de l’atroce verbosité du HTML, les articles sont directement rédigés en Markdown.

Concrètement, qu’est-ce que cela change pour l’auteur ? Tout d’abord, pas la peine de se coltiner une interface web pour écrire son article, il suffit de prendre son éditeur de texte préféré et c’est parti, roulez jeunesse ! Pour ma part, j’utilise l’éditeur [ByWord][] qui est vraiment bien fichu et spécialement conçu pour écrire en Markdown.

Un autre avantage réside dans l’utilisation du moteur de versioning : tout est enregistré à intervalles différents, vous pouvez facilement modifier vos articles et éventuellement revenir à une version précédente.

## Outils utilisés

Certains sont au courant mais je vais me permettre de le rappeler : mon dada technologique du moment est [Node.js][], j’ai d’ailleurs fini par faire l’acquisition d’un serveur dédié (un Kimsufi 2G) afin de pouvoir m’en servir librement sur un véritable environnement de production. Je ne vous fait donc pas de dessin, il me fallait un blog tournant sous Node.js. Et ça tombe bien car une pointure du développement sous node ([Tim Caswell][]) a créé un système de blog tournant sous cette même plateforme et avec un moteur de versioning qui n’est autre que Git !

Le moteur de ce blog se nomme [Wheat][], il est connu pour être le moteur du blog communautaire [howtonode.org][]. Je me suis donc mis en tête l’idée de m’en servir pour mon propre blog.

Le problème de ce moteur c’est qu’il est assez peu personnalisable sauf en allant fourrer le nez directement dans son code interne (chose que je n’ai pas eu le courage de faire, dans l’immédiat). Ainsi, on se retrouve avec certaines limitations pas dramatiques mais quelque peu gênantes :

* L’anglais est obligatoire pour certaines choses, tel que les dates. Il est possible de tweaker ça facilement car Wheat utilise le module [Datetime][] qui possède une traduction française en attente dans la liste des « Pull Request ». Bon, je ne m’en suis pas encore occupé par contre, je redoute les éventuels bugs à venir.
* Le moteur de templating est basé sur la syntaxe du HAML, on ne peut pas le changer pour un autre du style [Jade][].
* Les templates ne peuvent que accéder aux variables définies par Wheat. Par exemple, je voulais afficher un cadre « À propos de l’auteur » sur la page d’accueil mais Wheat ne fourni pas les variables nécessaires à cela sur le template `index.haml`, je n’ai donc pas pu le faire. Pour résoudre ça, il faudrait aller modifier les variables envoyées par Wheat directement dans son code source.
* Les fichiers fournissant le contenu du blog (articles, fiches d’auteurs, description du blog) sont dépendants du repository Git utilisé pour archiver les versions du code source. Ainsi, j’ai un dossier `blog` qui contient tout les codes source, et bien je ne peux pas placer les dossiers `articles` et `authors` ailleurs que dans ce dossier, sinon il ne seront pas archivés par le repo Git du dossier `blog`. Je dirais que c’est surtout ça le plus chiant, cela impose l’auteur à écrire ses articles parmi les fichiers source du blog...

Mais bon, hormis ces 3 défauts, Wheat est plutôt efficace et _semble_ correspondre à mon mode de fonctionnement (on verra ça à l’usage).

À noter que le moteur de ce blog ne possède pas de système de gestion des commentaires, il faut donc passer par des outils tel que [Disqus][], au moins cela permet de disposer d’une interface complète de gestion des commentaires.

## Modifications apportées

Au début, j’étais parti dans l’idée de garder le même design que celui utilisé par [howtonode.org][] étant donné qu’il est vraiment pas mal. Cependant, l’idée d’avoir le même design qu’un autre blog m’a un peu freiné dans cet élan. J’ai donc commencé à voir comment modifier le templating du blog.

Bon, avant de me mettre à cela, je ne connaissais rien au HAML, mais au final c’est vraiment identique à n’importe quel moteur de templating, on trouve une syntaxe à peu près similaire sur tous les moteurs. J’ai donc pu modifier le design comme je le voulais.

Comme je suis plutôt mauvais en terme de design et de choix de couleurs, je me suis orienté vers [Bootstrap][] (classique). Après avoir refait une bonne partie du design, il m’a fallu choisir un pattern pour le fond du blog, je ne voulais pas laisser un fond blanc, c’est toujours un peu triste. Seulement, allez trouver un pattern qui va bien avec Bootstrap, AH ! C’est juste la misère... J’ai fini par trouver celui que je voulais, nommé [Light Wool][], mais il ne convenait pas aux couleurs de Bootstrap. Plutôt que de chercher un nouveau pattern, j’ai donc cherché si il n’y avait pas des modifications du jeu de couleurs de Bootstrap et j’ai fini par trouver [Simplex][] qui, au final, convient parfaitement.

Pour le titre du blog, je cherchais une police manuscrite afin d’avoir un rendu sympathique et bien intégré dans le thème d’un blog. J’ai fini par trouver [Canadian Penguin][] qui est plutôt agréable à l’oeil =)

Voilà pour le design ! J’ai aussi apporté une très légère modification au point d’entrée du blog en supprimant le fichier `server/server.js` et en créant le fichier `app.js` qui ne contient, au final, que ce bout de code :

<inauguration-de-jqueryum-annihilationem/app.js>

Le port 3001 s’explique par le simple fait que j’utilise le serveur HTTP [Nginx][] pour rediriger les requêtes en fonction du nom de domaine.

## La suite ?

Wheat est un moteur de blog bien fichu mais réservé à quelques utilisations bien particulières. On peut le dompter un peu pour arriver à peu près à ce que l’on souhaite mais on ne peut pas en faire ce que l’on veut. J’envisagerais bien de faire un fork du projet pour l’adapter à une utilisation générale mais, dans l’immédiat, je n’ai pas trop le courage ^^’

Pour le moment, je vais m’efforcer de continuer mes projets actuels, dont un outil permettant de faciliter les échanges communautaires sur le Site du Zéro (j’en parlerai dans un autre article). Je ferai aussi en sorte de tenir ce blog à jour et d’éviter qu’il tombe en léthargie pendant 6 mois...

Sur ce, merci de m’avoir lu. J’essayerai de faire un article plus technique la prochaine fois ;)

[Wordpress]: http://wordpress.com/
[ByWord]: http://bywordapp.com/
[Node.js]: http://nodejs.org/
[Tim Caswell]: http://creationix.com/
[Wheat]: https://github.com/creationix/wheat
[howtonode.org]: http://howtonode.org/
[Jade]: http://jade-lang.com/
[Disqus]: http://disqus.com/
[Bootstrap]: http://twitter.github.com/bootstrap/
[Light Wool]: http://subtlepatterns.com/light-wool/
[Simplex]: http://bootswatch.com/simplex/
[Canadian Penguin]: http://www.dafont.com/fr/canadian-penguin.font
[Nginx]: http://wiki.nginx.org/Main
[Datetime]: https://github.com/joehewitt/datetime