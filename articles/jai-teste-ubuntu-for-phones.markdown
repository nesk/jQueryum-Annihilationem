Title: J’ai testé Ubuntu for phones
Author: Johann Pardanaud
Date: Thu Feb 21 2013 23:15:35 GMT+0100 (CET)

Voilà bien quelques temps que je n’ai pas écrit de nouvel article, il faut dire que les nouvelles sur mes avancées en programmation ne sont pas nombreuses. On peut évoquer la sortie de mon robot Twitter [It’s Friday](http://friday.jpardanaud.com/) que j’ai entièrement recodé de PHP à Node.js, mais ça s’arrête là.

Et ça tombe bien, car je ne tiens pas à vous parler ici de programmation mais de smartphones et plus particulièrement de l’arrivée d’un nouvel OS mobile : [Ubuntu for phones](http://www.ubuntu.com/devices/phone). Si vous ne connaissez pas encore cet OS, je vous invite à regarder [la vidéo de présentation][1] (« made like Apple » tellement y’a du « amazing » et « brilliant » en tout genre), cela vous aidera d’ailleurs à mieux comprendre de quoi je parle tout au long de l’article.

Il était prévu qu’une _Developer Preview_ soit disponible le 21 février pour les __Galaxy Nexus__ et les __Nexus 4__. Il se trouve que je possède le __Galaxy Nexus__ et comme cet OS m’a particulièrement fait de l’œil j’ai décidé de braver quelques dangers et de flasher une ROM complètement instable sur mon appareil.

## Installation

Il se trouve que __Canonical__ (la société conceptrice d’__Ubuntu__) a plutôt bien prévu les choses et a fourni [une documentation](https://wiki.ubuntu.com/Touch/Install) correcte pour _flasher_ la ROM de leur OS mobile. Cependant, voyant qu’il fallait pour cela avoir une partition avec une distribution _Debian-like_ d’installée, j’ai décidé de chercher une autre solution que j’ai évidemment trouvée [sur XDA-Developers](http://forum.xda-developers.com/showthread.php?p=38285911#post38285911).

Hop, ni une, ni deux, je fais une sauvegarde de mon téléphone avec [ClockworkMod](http://www.clockworkmod.com/), puis un _reset factory_ et je lance l’installation des deux fichiers spécifiés sur le forum XDA. Après quelques minutes d’angoisse pendant lesquelles j’espérais ne pas me retrouver avec une brique entre les mains, ma patience [a fini par payer](https://twitter.com/Nesquik69/status/304697552647884801).

## Première impression

Le système est relativement beau, j’accroche assez peu à l’interface par défaut d’Ubuntu Desktop mais l’interface mobile est plutôt élégante, bien que je doute qu’elle plaise à tout le monde. Dès que l’appareil est allumé, vous êtes accueilli par un joli _lockscreen_ (bien que Canonical estime que ça n’en est _pas_ un, si ça peut leur faire plaisir...), cependant il est encore bien statique mais je ne doute pas qu’avec le temps des animations seront ajoutées et rendront le tout bien plus dynamique.

En parlant de dynamisme, le système en l’état actuel est complètement à l’opposé de ce terme. Tout est statique : les notifications contiennent de faux évènements qui réapparaissent à chaque redémarrage de l’appareil, un bon nombre d’applications ne font qu’afficher une image de ce à quoi elles ressembleront une fois leur développement terminé, etc... De même, il manque encore beaucoup de fonctionnalités ou certaines d’entre elles sont incomplètes (par exemple, le réseau téléphonique ne fonctionnait pas pour moi). Bref, __Ubuntu for phones__ est une belle coquille vide pour le moment, mais il y a quand même bien des choses à dire !

__Note :__ Comme vous pouvez vous en douter, le système en est à un stade très peu avancé. Il n’existe donc pas de solution connue pour prendre des captures d’écrans, aussi je vais essayer de vous décrire au mieux les choses... sans images ! Regardez donc la [vidéo de présentation][1] dont je vous ai parlé, vous aurez au moins une idée de la chose.

## Les écrans de verrouillage et d’accueil

Pour quitter le _lockscreen_ et atteindre la page d’accueil il vous faut utiliser une première _gesture_ qui consiste à faire entrer votre doigt sur l’écran par le côté gauche. Cela affiche alors une liste de vos applications favorites, dont l’écran d’accueil. Le point positif de ce système de déverrouillage est que vous n’avez pas forcément besoin d’aller sur la page d’accueil pour déverrouiller votre appareil puis ensuite lancer l’application souhaitée, non, vous pouvez directement choisir de lancer votre application depuis le _lockscreen_, pour peu qu’elle soit listée dans vos favoris.

L’écran d’accueil est quelque peu particulier et ne rempli clairement pas le même rôle que ceux d’__iOS__ et d’__Android__. Il n’est pas prévu seulement pour lancer vos applications, il regroupe tout un écosystème orienté autour de vos médias, vos applications, vos évènements, etc... Ce n’est pas le système de notifications, non, disons qu’il s’agit d’un espace de découverte listant vos dernières actions (les musiques que vous avez téléchargées, les applications que vous avez installées, celles qui sont ouvertes, etc...). Je suis assez peu convaincu par cette présentation car elle risque d’être rapidement submergée d’informations mais j’estime qu’elle a largement le temps d’évoluer et que nous verrons bien ce que cela donne, surtout que tout n’est pas présent sur une seule page, vous pouvez afficher des informations plus spécifiques en changeant d’onglet par un simple _swipe_ vers la gauche ou la droite (à la manière des onglets d’Android).

## La navigation au sein de l’OS

Vous l’aurez compris, les _gestures_ sont les gestes que vous pouvez accomplir pour effectuer certaines actions sur le système, ce sont même vos seuls outils d’interaction avec l’OS car il n’y a aucun bouton de retour vers l’accueil ou de retour arrière, tout se fait par le biais de gestes.

Le concept d’un OS mobile avec quasiment aucun bouton physique hormis ceux du volume et celui de veille/arrêt n’est pas nouveau, __Blackberry__ (anciennement __RIM__) l’avait très bien introduit avec sa [Playbook](http://fr.blackberry.com/playbook-tablet.html) (et maintenant sur smartphone avec le [Z10](http://fr.blackberry.com/smartphones/blackberry-z10.html)). Le changement principal entre la __Playbook__ et __Ubuntu for phones__ se situe au niveau du matériel : le premier OS est implémenté sur une tablette qui possède des bords tactiles entourant l’écran, tandis que le second se base sur les deux derniers __Nexus__ conçus par __Google__. Ce choix d’appareils n’est pas anodin, ce sont les seuls smartphones Android à avoir supprimé les boutons physiques devenus inutiles à partir de la version 4.0 d’__Android__. En attendant que Canonical entame la commercialisation d’appareils conçus spécialement pour leur OS mobile (à partir de 2014 aux dernières nouvelles), il a fallu se rabattre sur des appareils proches des besoins de leur système.

Les _gestures_ sont très bien conçues et permettent une navigation plutôt fluide, on craint cependant assez fréquemment de faire tomber le téléphone par terre lorsque l’on navigue à une main, mais cela doit être un coup de main à prendre. Les situations où ces gestes peuvent se révéler gênants sont lorsque vous souhaitez cliquer sur un bouton situé tout à gauche de l’écran, le menu des applications favorites va apparaître au lieu de cliquer sur le bouton, vous devrez alors vous y reprendre à plusieurs fois pour enfin appuyer sur votre bouton. Cela sera sûrement résolu dans le futur mais traduit tout de même un problème dûs aux téléphones __Android__ qui ne possèdent pas de bords tactiles comme la __Playbook__ ou le __Z10__. Bien évidemment, cela n’est pas intentionnel mais on peut alors espérer que __Canonical__ ait la bonne idée d’intégrer des bords tactiles sur ses futurs appareils pour exploiter au maximum les _gestures_.

Un autre point noir dans l’utilisation unique des _gestures_, vous pouvez faire un retour arrière vers votre précédente application, mais qu’en est-il du retour au sein de la même application ? Voici un exemple très simple : vous vous rendez dans la galerie d’images où vous décidez de visualiser l’une d’entre elles en plein écran, comment faites-vous pour revenir à la liste des images ? J’ai mis un moment avant de trouver, il faut faire apparaître les contrôles de l’application avec une _gesture_ depuis le bas de l’écran puis cliquer sur « Back », avouez que c’est assez peu pratique...

## La barre d’état et le système de notifications

Voici probablement un des points qui m’a le plus enchanté sur ce nouvel OS ! La barre d’état est extrêmement bien conçue du fait de son exploitation pour y intégrer des options et des informations sur l’état du système.

Son utilisation est très simple, posez le doigt sur une des icônes de cette barre, commencez à le baisser et déplacez-le de gauche à droite pour naviguer rapidement entre les menus fournis par les différentes icônes. Le résultat est bluffant de fluidité, l’accès à certaines options est rapide et le système de notifications est aussi présent au sein des menus de la barre d’état.

Les notifications sont tout aussi interactives que chez les OS concurrents, on peut répondre immédiatement à un message en cliquant dessus sans pour autant quitter l’application courante, on peut rappeler quelqu’un, etc... Il n’y a rien d’extraordinaire de ce côté là mais il n’existe au moins pas de retard notable par rapport aux autres OS mobiles.

## Les applications

On aborde ici le point le plus négatif sur l’état actuel du système. La plupart des applications ne sont que de simples redirections vers des sites mobiles (Facebook, Twitter, Gmail, etc...) tandis que les autres ne font qu’afficher une image de ce à quoi elles ressembleront une fois leur développement terminé (Ski Safari, Music, etc...). En soit, le développement d’__Ubuntu for phones__ n’en est qu’à ses débuts, il est donc normal de constater cela, cependant __Canonical__ s’est bien gardé de le signaler avant la sortie de la _Developer Preview_.

Il existe cependant quelques applications qui sont d’ores-et-déjà fonctionnelles (bien qu’incomplètes), on peut par exemple citer parmi elles l’appareil photo et la galerie. La première prend des images de piètre qualité (le capteur photo du Galaxy Nexus n’aide pas beaucoup non plus) mais fonctionne, bien que la caméra avant ne soit pas encore supportée. La seconde permet de visualiser toutes vos images par date, par album ou en vrac (en cliquant sur le titre de l’application), mais le _pinch-to-zoom_ n’est pas encore supporté pour zoomer sur les photos.

## Le système en général

Le système est très rapide pour démarrer, mais je pense que cela est essentiellement dû au fait qu’il est encore très vide, toutefois je souhaite qu’ils arriveront à le maintenir à un délai de démarrage relativement court. D’ailleurs, le démarrage est relativement stressant la première fois car il n’y a pas encore d’animation de _boot_, ce qui laisse place à un écran noir et peut vous stresser quelque peu si vous aviez déjà peur de _brick_ votre appareil, une image quelconque affichée à l’écran aurait été la bienvenue.

Le système des contrôles de chaque application (affichable avec une _gesture_ depuis le bas de l’écran) est efficace mais ne s’affiche pas lorsque le clavier est présenté. Si vous continuez la _gesture_ d’affichage des contrôles sur la moitié de l’écran vous afficherez alors le système avancé pour interagir avec les commandes de votre application et ceci est relativement impressionant : toutes les commandes de l’application courante sont concentrées au sein d’un panel dans lequel vous pouvez faire une recherche efficace. Cela peut permettre à des applications avancées de concentrer un maximum de possibilités au sein d’une interface propre et épurée.

Chaque application peut choisir de faire disparaître la barre d’état si besoin. Vous me direz que c’est déjà possible sur __iOS__ et __Android__, cependant il existe ici un avantage : la barre d’état peut-être réaffichée en permanence.

## Conclusion

Mon essai d’__Ubuntu for phones__ aura été assez court (pas plus d’une heure et demie) mais aura amplement suffit face au peu de possibilités actuellement présentes. Je ne saurais que vous recommander d’attendre une prochaine version plus complète avant de vous lancer dans l’installation de cet OS, vous allez perdre pas mal de temps pour peu de choses.

D’un point de vue général, j’apprécie énormément ce système, on y trouve un vent frais de nouveautés et j’estime que cela va aller en s’améliorant, notamment avec la version du système pour tablette qui est déjà disponible mais que je n’ai pas pu tester faute d’appareil compatible.

Il faut maintenant que __Canonical__ arrive à convaincre les développeurs que son système est intéressant, cela est possible notamment grâce à un seul de leurs arguments : vous ne codez et ne compilez qu’une seule fois votre projet, celui-ci sera alors (à terme) immédiatement exécutable sur chaque mouture d’__Ubuntu__. Reste à voir si le système, dans sa version finale, arrivera à convaincre les utilisateurs.

[1]: http://www.youtube.com/watch?v=cpWHJDLsqTU