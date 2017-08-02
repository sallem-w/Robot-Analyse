# harmonie-contextor

# Installation

Le fichier de configuration se trouve dans le dossier [harmonie-contextor/Harmonie-ACS/server](Harmonie-ACS/server/config.json).

- `showMenu` : Permet d'afficher ou non le menu permettant de lancer le scenario
- `pathTemplate`: Chemin du dossier des différents template HTML
- `rootPath`: Chemin du dossier vers le fichier excel qui va être traité (pour SIRH dossier qui contient un seul fichier json)
- `addYearSearchContrac`: Représente le nombre d'années que l'on rajoute lors de la recherche d'un contrat
- `productAccesSante`: Représente le produits ACS et son correspondant le produit de sortie ACS. (Partie 2.1.2 Etape 2)
- `saveUpdate`: Permet d'activer ou non la sauvegarde des différentes modifications. Si il est à `true`, les modifications vont être sauvegardées. Si il est à `false`, les modification ne seront pas sauvegardées.

# Utilisation ACS / CMU

Il est possbile de relancer facilement un fichier excel déjà traité, il suffit de vider les champs date, statut et commentaire. Contextor ne vas pas passer sur les lignes qui contiennent ces informations.

# SIRH

Vous pouvez retrouver un exemple de fichier pivot dans [SIRH/example_template.json](SIRH/example_template.json).

# Template HTML pour les statistiques

Il faut déjà commencer par définir le `pathTemplate` du fichier de configuration.
On doit avoir une arborescence qui ressemble à :

```bash
LeCheminPathTemplate\template\LeCodeDuScenario.html

# Exemple
C:\Users\excel\template\ACS.html
```

Il y a plusieurs champs qui sont pris en compte pour l'instant. Ils doivent être écrits sous cette forme :

```html
<h1>Temps total de traitement : {{ totalTimeDuration }}></h1>
```

On a par exemple les variables `fileName`, `totalTimeDuration`, `countCaseProcessed`, `countCaseSuccessProcessed`, `countCaseFailProcessed`, `countCaseContractWithProductACS`, `countCaseProductTerminated`.
Vous pouvez retrouver des exemples de fichier html dans le dossier template qui se trouve à la racine du projet, l'intégralité des variables utilisables pour chaque scénario sont utilisés dans ces templates. Libre à vous de modifier ou créer vos propres templates avec du CSS si vous le souhaitez.

# Déploiement

Pour commencer, on va créer un dossier `deploy` dans `C:` qui va contenir tout ce qu'il faut pour que l'utilisateur lance simplement le projet.

On va mettre le dossier template dans le dossier `deploy`.

Dans contextor Studio, il faut faire `File -> Export project`, il va générer un dossier `export` qui contient un dossier et un fichier zip. 
On va copier/coller le dossier dans notre dossier `deploy`.

Ensuite, on peut créer un nouveau raccourci `Clic droit dans l'explorateur Windows -> Nouveau -> Raccourci` dans le dossier `deploy`. On va ensuite modifier dans les propriétés du raccourci `Clic doit -> Propriétés -> Onglet Cible`. 

Pour commencer il faut vider le champ `Démarrer dans :` et remplir le champ `Cible :` par :

```bash
"Chemin vers l'éxécutable CtxRun de contextor intéractive" -z "Chemin vers le dossier" -w "%APPDATA%" -p 240 -lic "Chemin vers le dossier qui content la licence (Réseau ou HTTP)"

#Exemple
"C:\Program Files\Contextor\Interactive\CtxtRun.exe" -z "C:\deploy\Harmonie-ACS_1.0" -w "%APPDATA%" -p 240 -lic "Z:\licence"
```

Pour plus d'information sur les paramètres voir la documentation sur `https://contextor.eu/dokuwiki/doku.php?id=training:interactive3:tutorials:ex_deployment` et `https://contextor.eu/dokuwiki/doku.php?id=pg:proj.licence&s[]=licence`.

Il suffit de zipper le dossier `deploy` et de le fournir aux utilisateurs.

# Lancement utilisateur

- Avoir installé Contextor Interactive sur la machine (Vérifier que l’éxécutable « C:\Program Files\Contextor\Interactive\CtxtRun.exe » existe)
- Lancer Infinite et rentre ces identifiants
- Extraire le zip dans « C : »
- Aller dans le fichier config.json pour mettre le chemin vers le dossier qui contient votre fichier Excel
- Lancer le raccourci Contextor

# Utilisation de git

Lors de notre utilisation de git sur les VDI, nous avons constaté un problème venant de l'utilisation d'un proxy. 
Pour règler ce problème il faut taper la commande suivante dans un invite de commande : 

`git config --global http.proxy http://nomUtilisateur:motDePasse@sr37cti00073507.hm.dm.ad:8080/` 

Il ne faut pas oublier de remplacer `nomUtilisateur` et `motDePasse` par vos identifiants.
