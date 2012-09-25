Title: Chrome et les pages custom des extensions : ARGH !
Author: Johann Pardanaud
Date: Tue Sep 25 2012 23:32:42 GMT+0200 (CEST)

Il y a peu j’ai commencé à développer une extension pour Chrome nommée « OpenImg ». Son principe est simple : fournir des menus contextuels pour afficher les images de background d’une page web, il y a aussi l’ajout d’un bouton pour afficher une image dans l’onglet courant (Chrome ne proposant que l’ouverture dans un nouvel onglet). Vous pouvez d’ores-et-déjà la télécharger sur le [Chrome Web Store][] et obtenir son code sur [Github][].

Tant qu’à continuer sur ma lancée, je me suis dit qu’il serait intéressant d’ajouter quelques statistiques lors de l’ouverture de ces images, tels que la largeur, la hauteur et le poids ; ces informations ne sont pas simples à obtenir par le biais de Chrome. Pour cela, je pensais qu’il serait judicieux non pas d’ouvrir directement l’image comme je le fais actuellement dans  _OpenImg_ avec ce code :

	chrome.tabs.create({
	    url: 'http://example.com/image.png'
	});

Mais plutôt dans une page HTML hébergée au sein de mon extension que j’ouvrirais alors en lieu et place de l’image et qui se chargerait finalement de charger cette dernière et d’en afficher les statistiques, mais... grave erreur !

## Quand Chrome s’en mêle

Sur le principe, mon code est censé fonctionner sans problème mais ça c’était en oubliant un facteur important pour une extension Chrome : Chrome lui-même ! Contrairement à ce que l’on a souvent tendance à penser, ce dernier n’est pas exempt de bugs et il se trouve que je viens de faire l’amer découverte de l’un d’entre eux, me plongeant dans une profonde rage jusqu’à temps que je trouve d’où tout cela pouvait venir.

Alors, que s’est-il passé ? Eh bien mettons-nous dans un contexte plus simple que ma propre extension. Prenons une extension toute bête dont le répertoire est structuré de cette manière :

	| ext_example/
	    | manifest.json
	    | background.js
	    | custom_page.html

Son fonctionnement est le suivant : le script `background.js` est exécuté et ajoute un menu contextuel à toutes vos pages web permettant d’ouvrir le fichier `custom_page.html` dans l’onglet courant. Vous pouvez [télécharger l’archive][] pour essayer par vous-même.

__Attention !__ Précisons que j’effectue actuellement mes tests avec la version 22 de Chrome que je viens à l’instant même de mettre à jour (faites donc une vérification), la version 21 a un comportement différent et encore plus chaotique, on peut dire qu’il y a du progrès dans un sens... Notons que les problèmes rencontrés sous la v22 restent quasiment identiques sous les versions 23 et 24 de Chromium (la 24 étant la plus récente).

Maintenant, passons aux tests, essayez donc d’ouvrir [Google.fr][] (à titre d’exemple) puis faites un clique-droit et appuyez sur « Test page custom ». Normalement, vous devriez être redirigé vers la page `custom_page.html`, tout fonctionne jusque là. Maintenant, essayez donc de faire « Précédent » dans l’historique de votre navigateur puis « Suivant », et là c’est le drame, la page custom de notre extension ne se charge plus et vous obtenez en lieu et place une page blanche.

Attendez, ce n’est pas fini ! Une fois que vous avez constaté que la page custom ne se chargeait plus, revenez sur la page de Google en revenant dans l’historique, et bam : une page blanche ! Soudain, une idée vous vient en tête, rafraîchir la page pour retrouver le contenu de Google, ok, vous essayez et là vous entrez en phase « WTF » : la page reste blanche et la barre d’adresse contient l’URL `swappedout://`. La seule solution qui vous reste est alors de fermer l’onglet et de le rouvrir, pratique n’est-ce pas ?

__Point culture inutile :__ L’URL `swappedout://` est utilisée par Chrome lorsqu’une page web est remplacée par une autre page dont le processus de rendu est différent de la page précédente (c’est clairement commenté [dans le code de Chrome][]). Ce qui ne paraît pas très surprenant sachant que le rendu d’une page web classique diffère du rendu d’une page spécifique à une extension (dans le sens où les environnements ne sont pas les mêmes), l’un fourni des accès aux API de Chrome, l’autre non. Bref, on peut supposer que Chrome gère encore très mal le passage d’un environnement classique à un environnement d’extension au sein d’un même onglet, mais ce n’est que mon propre avis et il ne vaut pas grand chose pour le coup.

Au fait, pour ceux qui n’ont pas Chrome sous la main ou qui ont tout simplement la flemme de tester, voici une vidéo de démonstration :

<div class="iframe-centered">
<iframe width="640" height="480" src="http://www.youtube.com/embed/DyyIYDLidaY?rel=0" frameborder="0" allowfullscreen></iframe>
</div>

Bon, au final, on a vu ce qui ne marche pas, c’est-à-dire quasiment tout mais est-ce qu’il y a au moins une chose qui fonctionne ? Eh bien oui ! Si, au lieu de revenir à la page custom par le biais de l’historique, vous utilisez à chaque fois le menu contextuel alors ça fonctionnera à chaque coup (mais seulement à partir de la v22 de Chrome, la 21 ne gère même pas ça).

## Quid des solutions ?

Pour le moment, deux solutions me sont venues en tête, l’une est absolument ignoble et l’autre semble politiquement correcte :

* La solution abjecte serait de supprimer votre page custom de l’historique de Chrome (à l’aide de l’[API History][]) afin d’éviter un malencontreux « Suivant » qui provoquerait alors inévitablement une erreur chez l’utilisateur. Inutile de vous dire que cette solution est à bannir.
* La solution la plus efficace dépend, elle, des cas d’utilisation. N’ayant réfléchit qu’à mon propre cas, _OpenImg_ en l’occurence, j’en suis venu à la conclusion que le plus simple serait d’ouvrir l’image comme je le fais actuellement sur le version stable de mon extension puis d’injecter du CSS et du Javascript dans la page web générée suite à l’ouverture de l’image. Cela implique donc que vous ayez une page web de base à ouvrir (qui ne soit pas contenue dans votre extension) et que vous ayez le courage de modifier le DOM de la page en JS car, dans mon cas cela est assez simple, mais pour des présentations complexes cela risque d’être un enfer.

Notons que la deuxième solution est à privilégier pour ma part car elle apporte une chose à laquelle je n’avais pas pensé : l’URL de l’image est toujours affichée dans la barre d’adresse, alors que l’utilisation d’une page custom ne permet pas cela.

## Conclusion

Cet article n’a pas vraiment de but « éducatif » mais j’ai jugé utile de parler de ce problème dans le cas où vous viendriez à le rencontrer par vous-même, le bug ne semble pas prêt de s’arranger au vu des futures versions de Chrome. Je vais regarder de mon côté si cela a déjà été reporté, je serais surpris de constater que je suis le premier à rencontrer ce soucis.

[Github]: https://github.com/Nesk/OpenImg
[Chrome Web Store]: https://chrome.google.com/webstore/detail/fioijbjjojnlpnlkfjnnheedakekdgcb
[télécharger l’archive]: chrome-et-les-pages-custom-des-extensions-argh/ext_example.zip
[Google.fr]: http://www.google.fr/
[dans le code de Chrome]: http://src.chromium.org/svn/trunk/src/content/public/common/url_constants.cc
[API History]: http://diveintohtml5.info/history.html