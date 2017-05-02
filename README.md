# harmonie-contextor

# Install

Exemple template config file : 

```json
{
    "pathTemplate": "C:\\Users\\excel\\template\\",
    "ACS": {
        "rootPath": "C:\\Users\\excel\\ACS-20170420-1\\",
        "excel": {
            "startColumnIndex": 2,
            "startRowIndex": 1,
            "columnIndex": {
                "individualContract": 1,
                "insuredName": 7,
                "insuredSurName": 8,
                "subscribedProduct": 10,
                "ACSCertificateStartDate": 14,
                "ACSCertificateEndDate": 15,
                "scheduleCode": 16,
                "paymentTypeLabel": 17
            }
        }
    }
}

```

# Template statistic - HTML

Define `pathTemplate` in config file, arborescence :

```bash
YourPath/template/YouScenario.html
```