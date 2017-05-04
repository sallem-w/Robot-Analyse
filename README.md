# harmonie-contextor

# Installation

Le fichier de configuration doit se trouver dans `C:\contextor-config\config.json`.

Exemple de template du fichier de configuration : 

```json
{
    "pathTemplate": "C:\\Users\\excel\\template\\",
    "ACS": {
        "rootPath": "C:\\Users\\excel\\ACS-20170420-1\\",
        "addYearSearchContract": 30,
        "excel": {
            "startColumnIndex": 2,
            "startRowIndex": 1,
            "columnIndex": {
                "individualContract": 1,
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
        }
    }
}

```

# Template HTML pour les statistiques

Il faut déjà commencer par définir le `pathTemplate` du fichier de configuration.
On doit avoir une arborescence qui ressemble à :

```bash
LeCheminPathTemplate\template\LeCodeDuScenario.html

# Exemple
C:\Users\excel\template\ACS.html
```

Il n'y a que quatres champs qui sont pris en compte pour l'instant. Ils doivent être écrit sous cette forme :

```html
<h1>Temps total de traitement : {{ totalTimeDuration }}></h1>
```

On a les variables `fileName`, `totalTimeDuration`, `countCaseProcessed`, `countCaseSuccessProcessed`.
Vous pouvez retrouver un exemple de fichier html dans le dossier template qui se trouve à la racine du projet.

# Déploiement

Dans contextor Studio, il faut faire `File -> Export project`, il va générer un dossier `export` qui contient un dossier et un fichier zip. 
Il suffit de fournir le fichier zip au personne qui s'occupe du déploiement. (Ne pas oublier de fournir le fichier de configuration et les différents template html).

# Lancement utilisateur

Aprés avoir bien récupérer le fichier zip et vérifier que Contextor intéractive est bien installé sur la machine, on peut créer un nouveau raccourci `Clic droit dans l'explorateur Windows -> Nouveau -> Raccourci`. On va ensuite modifier dans les propriétés du raccourci `Clic doit -> Propriétés -> Onglet Cible`. 

Pour commencer il faut vider le champ `Démarrer dans :` et remplir le champ `Cible :` par :

```bash
"Chemin vers l'éxécutable CtxRun de contextor intéractive" -z "Chemin vers le fichier zip" -w "%APPDATA%" -p 240

#Exemple
"C:\Program Files\Contextor\Interactive\CtxtRun.exe" -z "C:\deploy\Harmonie-ACS_1.0.zip" -w "%APPDATA%" -p 240
```

Pour plus d'information sur les paramètres voir la documentation sur `https://contextor.eu/dokuwiki/doku.php?id=training:interactive3:tutorials:ex_deployment`.
