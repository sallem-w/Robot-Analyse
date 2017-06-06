# harmonie-contextor

# Installation

Le fichier de configuration doit se trouver dans `C:\deploy\config.json`.

Exemple de template du fichier de configuration : 

```json
{
    "pathTemplate": "C:\\Users\\excel\\template\\",
    "ACS": {
        "rootPath": "C:\\Users\\excel\\ACS-20170420-1\\",
        "controlOnly": true,
        "controlContribution": true,
        "saveUpdate": true,
        "addYearSearchContract": 30,
        "excel": {
            "startColumnIndex": 1,
            "startRowIndex": 2,
            "columnIndex": {
                "individualContract": 1,
                "insuredIdentifiant": 6,
                "insuredName": 7,
                "insuredSurName": 8,
                "subscribedCodeProduct": 9,
                "ACSCertificateStartDate": 14,
                "ACSCertificateEndDate": 15,
                "scheduleCode": 16,
                "paymentTypeLabel": 17,
                "dateProceedContract": 18,
                "statusContract": 19,
                "commentContract": 20
            }
        },
         "productAccesSante": {
            "TPSAACSA": "TPSASACSA",
            "TPSAACSB": "TPSASACSB",
            "TPSAACSC": "TPSASACSC",
            "TPSARLACSA": "TPSARLSACA",
            "TPSARLACSB": "TPSARLSACB",
            "TPSARLACSC": "TPSARLSACC"
        }
    },

    "CMU":{
        "rootPath": "C:\\Users\\excel\\CMU-1\\", 
        "controlOnly": false,
        "controlContribution": false,
        "saveUpdate": false,
        "autoConnect": true,
        "excel": {
            "startRowIndex": 5,
            "startColumnIndex": 1,
            "columnIndex":{
                "name": 1,
                "firstName": 2,
                "individualContract": 3,
                "type": 4,
                "icStartDate": 5,
                "icEndDate": 6,
                "suscribedCodeProduct": 7,
                "subscribedProductStartDate": 8,
                "subscribedProductEndDate": 9,
                "nbDayCMUCover": 10,
                "particularSituationStartDate": 11,
                "particularSituationEndDate": 12,
                "managementCenterCode": 13,
                "dateProceedContract": 14,
                "statusContract": 15,
                "commentContract": 16
            }
        }
    }
}

```

- `pathTemplate`: Chemin du dossier des différents template HTML
- `rootPath`: Chemin du dossier vers le fichier excel qui va être traité
- `addYearSearchContrac`: Représente le nombre d'années que l'on rajoute lors de la recherche d'un contrat
- `productAccesSante`: Représente le produits ACS et son correspondant le produit de sortie ACS. (Partie 2.1.2 Etape 2)
- `saveUpdate`: Permet d'activer ou non la sauvegarde des différentes modifications. Si il est à `true`, les modifications vont être sauvegardées. Si il est à `false`, les modification ne seront pas sauvegardées.
# Utilisation

Il est possbile de relancer facilement un fichier excel déjà traité, il suffit de vider les champs date, statut et commentaire. Contextor ne vas pas passer sur les lignes qui contiennent ces informations.

# Template HTML pour les statistiques

Il faut déjà commencer par définir le `pathTemplate` du fichier de configuration.
On doit avoir une arborescence qui ressemble à :

```bash
LeCheminPathTemplate\template\LeCodeDuScenario.html

# Exemple
C:\Users\excel\template\ACS.html
```

Il n'y a que quatre champs qui sont pris en compte pour l'instant. Ils doivent être écrits sous cette forme :

```html
<h1>Temps total de traitement : {{ totalTimeDuration }}></h1>
```

On a les variables `fileName`, `totalTimeDuration`, `countCaseProcessed`, `countCaseSuccessProcessed`.
Vous pouvez retrouver un exemple de fichier html dans le dossier template qui se trouve à la racine du projet.

# Déploiement

Pour commencer, on va créer un dossier `deploy` dans `C:` qui va contenir tout ce qu'il faut pour que l'utilisateur lance simplement le projet.

On va mettre le dossier template et le fichier `config.json` dans le dossier `deploy`.

Dans contextor Studio, il faut faire `File -> Export project`, il va générer un dossier `export` qui contient un dossier et un fichier zip. 
On va copier/coller le dossier dans notre dossier `deploy`.

Ensuite, on peut créer un nouveau raccourci `Clic droit dans l'explorateur Windows -> Nouveau -> Raccourci` dans le dossier `deploy`. On va ensuite modifier dans les propriétés du raccourci `Clic doit -> Propriétés -> Onglet Cible`. 

Pour commencer il faut vider le champ `Démarrer dans :` et remplir le champ `Cible :` par :

```bash
"Chemin vers l'éxécutable CtxRun de contextor intéractive" -z "Chemin vers le dossier" -w "%APPDATA%" -p 240

#Exemple
"C:\Program Files\Contextor\Interactive\CtxtRun.exe" -z "C:\deploy\Harmonie-ACS_1.0" -w "%APPDATA%" -p 240
```

Pour plus d'information sur les paramètres voir la documentation sur `https://contextor.eu/dokuwiki/doku.php?id=training:interactive3:tutorials:ex_deployment`.

Il suffit de zipper le dossier `deploy` et de le fournir aux utilisateurs.

# Lancement utilisateur

- Avoir installé Contextor Interactive sur la machine (Vérifier que l’éxécutable « C:\Program Files\Contextor\Interactive\CtxtRun.exe » existe)
- Se connecter à  Infinite
- Extraire le zip dans « C : »
- Aller dans le fichier config.json pour mettre le chemin vers le dossier qui contient votre fichier Excel
- Lancer le raccourci Contextor
