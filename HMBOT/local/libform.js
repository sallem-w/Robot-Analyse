ctx.formF = (function () {

	var formF = {};

	var civilite = {
		GRC: ['MME', 'MLLE', 'M'],
		Infinite: ['MME', 'MLLE', 'M']
	};
	formF.civilite = civilite

	var typeAssure = [
		{ "GRC": "Principale", "Infinite": "ASSPRI" },
		{ "GRC": "Conjoint", "Infinite": "CONJOI" },
		{ "GRC": "Enfant", "Infinite": "ENFANT" },
		{ "GRC": "Autre", "Infinite": "RATTAC" }
		];
		
	
	formF.typeAssure=typeAssure;
	
	
	var typeAdresse = {
		Domicile: 'Domicile',
		Professionnelle: 'Professionnelle',
		Temporaire: 'Temporaire'
	};
	formF.typeAdresse = typeAdresse;

//	var typeVoie = {
//		GRC: ['R', 'AV', 'BD', 'RTE'],
//		Infinite: ['RUE', 'AVENUE', 'BOULEVARD', 'ROUTE']
//	}
//	formF.typeVoie = typeVoie;

	var typeCommunication = {
		telephoneDomicile : {
				nature : 'TELP',
				type : 'DOM'
		},
		telephonePortable : {
				nature : 'TELP',
				type : 'MOB'
		},
		telephoneBureau : {
				nature : 'TELP',
				type : 'PROF'
		},
		adresseMail : {
			nature : 'MAIL',
			type : 'MPCP'
		},
		fax : {
			nature : 'MAIL',
			type : 'PROF'
		}
	}

	formF.typeCommunication=typeCommunication;
	
	var codeOffre = [ 
		{"offre" :"HSP","code":"PPSTA002 - PART HPA"}
	];
	formF.codeOffre=codeOffre;
	var codeGestion = [
		{ "codeGRC" :"CG GRC", "ER-Infinite" :"ER Infinite", "groupeGestionInfinite" :"GG° Infinite", "centreGestionInfinite" :"CG Infinite" }, 
		{ "codeGRC" :"DGS 06 SE", "ER-Infinite" :"P", "groupeGestionInfinite" :"PPSTD06", "centreGestionInfinite" :"PCGANTIBE" }, 
		{ "codeGRC" :"DGS 10/08 NE", "ER-Infinite" :"P", "groupeGestionInfinite" :"PPSTDA", "centreGestionInfinite" :"PCGTROYES" }, 
		{ "codeGRC" :"DGS 11 NARBONNE SO", "ER-Infinite" :"P", "groupeGestionInfinite" :"PPSTD11", "centreGestionInfinite" :"PCGNARBON" }, 
		{ "codeGRC" :"DGS 14 BN", "ER-Infinite" :"P", "groupeGestionInfinite" :"PPSTDN", "centreGestionInfinite" :"PCGCAEN" }, 
		{ "codeGRC" :"DGS 18 CI", "ER-Infinite" :"P", "groupeGestionInfinite" :"PPSTD18", "centreGestionInfinite" :"PCGBOURGE" }, 
		{ "codeGRC" :"DGS 22 STBRIEUC BN", "ER-Infinite" :"P", "groupeGestionInfinite" :"PPSTD", "centreGestionInfinite" :"PCGSTBRIE" }, 
		{ "codeGRC" :"DGS 27 BN", "ER-Infinite" :"P", "groupeGestionInfinite" :"PPSTDN", "centreGestionInfinite" :"PCGEVREUX" }, 
		{ "codeGRC" :"DGS 29 BREST BN", "ER-Infinite" :"P", "groupeGestionInfinite" :"PPSTD", "centreGestionInfinite" :"PCGBREST" }, 
		{ "codeGRC" :"DGS 29 QUIMPER BN", "ER-Infinite" :"P", "groupeGestionInfinite" :"PPSTD", "centreGestionInfinite" :"PCGQUIMPR" }, 
		{ "codeGRC" :"DGS 35 BN", "ER-Infinite" :"P", "groupeGestionInfinite" :"PPSTD", "centreGestionInfinite" :"PCGRENNES" }, 
		{ "codeGRC" :"DGS 36 CI", "ER-Infinite" :"P", "groupeGestionInfinite" :"PPSTD36", "centreGestionInfinite" :"PCGCHATEA" }, 
		{ "codeGRC" :"DGS 37 CI", "ER-Infinite" :"P", "groupeGestionInfinite" :"PPSTD37", "centreGestionInfinite" :"PCGTOURS" }, 
		{ "codeGRC" :"DGS 44 AT", "ER-Infinite" :"P", "groupeGestionInfinite" :"PPSTD44", "centreGestionInfinite" :"PCGNANTES" }, 
		{ "codeGRC" :"DGS 44 LA CONCELLOISE AT", "ER-Infinite" :"P", "groupeGestionInfinite" :"PPSTD44", "centreGestionInfinite" :"PCGCONCEL" }, 
		{ "codeGRC" :"DGS 45 CI", "ER-Infinite" :"P", "groupeGestionInfinite" :"PPSTDV", "centreGestionInfinite" :"PCGORLEAN" }, 
		{ "codeGRC" :"DGS 49 AT", "ER-Infinite" :"P", "groupeGestionInfinite" :"PPSTD49", "centreGestionInfinite" :"PCGANGERS" }, 
		{ "codeGRC" :"DGS 51 NE", "ER-Infinite" :"P", "groupeGestionInfinite" :"PPSTDE", "centreGestionInfinite" :"PCGREIMS" }, 
		{ "codeGRC" :"DGS 52 NE", "ER-Infinite" :"P", "groupeGestionInfinite" :"PPSTDE", "centreGestionInfinite" :"PCGCHAUMO" }, 
		{ "codeGRC" :"DGS 53 AT", "ER-Infinite" :"P", "groupeGestionInfinite" :"PPSTD", "centreGestionInfinite" :"PCGLAVAL" }, 
		{ "codeGRC" :"DGS 54 NE", "ER-Infinite" :"P", "groupeGestionInfinite" :"PPSTDE", "centreGestionInfinite" :"PCGNANCY" }, 
		{ "codeGRC" :"DGS 55 NE", "ER-Infinite" :"P", "groupeGestionInfinite" :"PPSTDE", "centreGestionInfinite" :"PCGBARLED" }, 
		{ "codeGRC" :"DGS 56 BN", "ER-Infinite" :"P", "groupeGestionInfinite" :"PPSTD", "centreGestionInfinite" :"PCGVANNES" }, 
		{ "codeGRC" :"DGS 57 NE", "ER-Infinite" :"P", "groupeGestionInfinite" :"PPSTDE", "centreGestionInfinite" :"PCGMETZ" }, 
		{ "codeGRC" :"DGS 61 BN", "ER-Infinite" :"P", "groupeGestionInfinite" :"PPSTDN", "centreGestionInfinite" :"PCGALENCO" }, 
		{ "codeGRC" :"DGS 63 SE", "ER-Infinite" :"P", "groupeGestionInfinite" :"PPSTD63", "centreGestionInfinite" :"PCGCLERMO" }, 
		{ "codeGRC" :"DGS 63 THIERS MUTUALITE SE", "ER-Infinite" :"P", "groupeGestionInfinite" :"PPSTD6T", "centreGestionInfinite" :"PCGTHIERS" }, 
		{ "codeGRC" :"DGS 69 SE", "ER-Infinite" :"P", "groupeGestionInfinite" :"PPSTDX", "centreGestionInfinite" :"PCGSTETIE" }, 
		{ "codeGRC" :"DGS 71 CI", "ER-Infinite" :"P", "groupeGestionInfinite" :"PPSTDE", "centreGestionInfinite" :"PCGCHALON" }, 
		{ "codeGRC" :"DGS 72 AT", "ER-Infinite" :"P", "groupeGestionInfinite" :"PPSTDE", "centreGestionInfinite" :"PCGLEMANS" }, 
		{ "codeGRC" :"DGS 76 LE HAVRE BN", "ER-Infinite" :"P", "groupeGestionInfinite" :"PPSTDN", "centreGestionInfinite" :"PCGLEHAVR" }, 
		{ "codeGRC" :"DGS 78 CI", "ER-Infinite" :"P", "groupeGestionInfinite" :"PPSTD75", "centreGestionInfinite" :"PCGCHATOU" }, 
		{ "codeGRC" :"DGS 81 SO", "ER-Infinite" :"P", "groupeGestionInfinite" :"PPSTDT", "centreGestionInfinite" :"PCGALBI" }, 
		{ "codeGRC" :"DGS 85 AT", "ER-Infinite" :"P", "groupeGestionInfinite" :"PPSTD85", "centreGestionInfinite" :"PCGLAROCH" }, 
		{ "codeGRC" :"DGS 86 AT", "ER-Infinite" :"P", "groupeGestionInfinite" :"PPSTD86", "centreGestionInfinite" :"PCGPOITIE" }, 
		{ "codeGRC" :"DGS 87 SO", "ER-Infinite" :"P", "groupeGestionInfinite" :"PPSTD87", "centreGestionInfinite" :"PCGLIMOGE" }, 
		{ "codeGRC" :"DGS 88 NE", "ER-Infinite" :"P", "groupeGestionInfinite" :"PPSTDE", "centreGestionInfinite" :"PCGGOLBEY" }, 
		{ "codeGRC" :"DGS 89 CI", "ER-Infinite" :"P", "groupeGestionInfinite" :"PPSTDR", "centreGestionInfinite" :"PCGAUXERR" }
]
	
	formF.codeGestion=codeGestion;
	
	
	
	
	
	
	
	
	
	
	
	
	var typeVoie = [
		{ "code": "ABE", "lib_court": "ABBAYE", "lib_long": "ABBAYE" },
		{ "code": "ACH", "lib_court": "ACH", "lib_long": "ANCIEN CHEMIN" },
		{ "code": "AGL", "lib_court": "AGGLOMM", "lib_long": "AGGLOMERATION" },
		{ "code": "AIRE", "lib_court": "AIRE", "lib_long": "AIRE" },
		{ "code": "ALL", "lib_court": "ALLEE", "lib_long": "ALLEE" },
		{ "code": "ANSE", "lib_court": "ANSE", "lib_long": "ANSE" },
		{ "code": "ARC", "lib_court": "ARCADES", "lib_long": "ARCADES" },
		{ "code": "ART", "lib_court": "ANC RTE", "lib_long": "ANCIENNE ROUTE" },
		{ "code": "AUT", "lib_court": "AUTOROUTE", "lib_long": "AUTOROUTE" },
		{ "code": "AV", "lib_court": "AV", "lib_long": "AVENUE" },
		{ "code": "BAST", "lib_court": "BASTION", "lib_long": "BASTION" },
		{ "code": "BCH", "lib_court": "BAS CHEM", "lib_long": "BAS CHEMIN" },
		{ "code": "BCLE", "lib_court": "BOUCLE", "lib_long": "BOUCLE" },
		{ "code": "BD", "lib_court": "BD", "lib_long": "BOULEVARD" },
		{ "code": "BEGI", "lib_court": "BEGI", "lib_long": "BEGUINAGE" },
		{ "code": "BER", "lib_court": "BERGE", "lib_long": "BERGE" },
		{ "code": "BOIS", "lib_court": "BOIS", "lib_long": "BOIS" },
		{ "code": "BRE", "lib_court": "BARRIERE", "lib_long": "BARRIERE" },
		{ "code": "BRG", "lib_court": "BOURG", "lib_long": "BOURG" },
		{ "code": "BSTD", "lib_court": "BASTIDE", "lib_long": "BASTIDE" },
		{ "code": "BUT", "lib_court": "BUTTE", "lib_long": "BUTTE" },
		{ "code": "CALE", "lib_court": "CALE", "lib_long": "CALE" },
		{ "code": "CAMP", "lib_court": "CAMP", "lib_long": "CAMP" },
		{ "code": "CAR", "lib_court": "CARREFOUR", "lib_long": "CARREFOUR" },
		{ "code": "CARE", "lib_court": "CARE", "lib_long": "CARRIERE" },
		{ "code": "CARR", "lib_court": "CARRE", "lib_long": "CARRE" },
		{ "code": "CAU", "lib_court": "CARREAU", "lib_long": "CARREAU" },
		{ "code": "CAV", "lib_court": "CAV", "lib_long": "CAVEE" },
		{ "code": "CCAL", "lib_court": "CENTRE CCIAL", "lib_long": "CENTRE COMMERCIAL" },
		{ "code": "CGNE", "lib_court": "CAMPAGNE", "lib_long": "CAMPAGNE" },
		{ "code": "CHE", "lib_court": "CHEMIN", "lib_long": "CHEMIN" },
		{ "code": "CHEM", "lib_court": "CHEMINEMENT", "lib_long": "CHEMINEMENT" },
		{ "code": "CHEZ", "lib_court": "CHEZ", "lib_long": "CHEZ" },
		{ "code": "CHI", "lib_court": "CHARMILLE", "lib_long": "CHARMILLE" },
		{ "code": "CHL", "lib_court": "CHALET", "lib_long": "CHALET" },
		{ "code": "CHP", "lib_court": "CHAPELLE", "lib_long": "CHAPELLE" },
		{ "code": "CHS", "lib_court": "CHAUSSEE", "lib_long": "CHAUSSEE" },
		{ "code": "CHT", "lib_court": "CHATEAU", "lib_long": "CHATEAU" },
		{ "code": "CHV", "lib_court": "CHV", "lib_long": "CHEMIN VICINAL" },
		{ "code": "CITE", "lib_court": "CITE", "lib_long": "CITE" },
		{ "code": "CLOI", "lib_court": "CLOITRE", "lib_long": "CLOITRE" },
		{ "code": "CLOS", "lib_court": "CLOS", "lib_long": "CLOS" },
		{ "code": "COL", "lib_court": "COL", "lib_long": "COL" },
		{ "code": "COLI", "lib_court": "COLLINE", "lib_long": "COLLINE" },
		{ "code": "COR", "lib_court": "CORNICHE", "lib_long": "CORNICHE" },
		{ "code": "COTE", "lib_court": "COTE", "lib_long": "COTEAU" },
		{ "code": "COTT", "lib_court": "COTTAGE", "lib_long": "COTTAGE" },
		{ "code": "COUR", "lib_court": "COUR", "lib_long": "COUR" },
		{ "code": "CPG", "lib_court": "CAMPING", "lib_long": "CAMPING" },
		{ "code": "CRS", "lib_court": "COURS", "lib_long": "COURS" },
		{ "code": "CRX", "lib_court": "CROIX", "lib_long": "CROIX" },
		{ "code": "CST", "lib_court": "CASTEL", "lib_long": "CASTEL" },
		{ "code": "CTR", "lib_court": "CONTOUR", "lib_long": "CONTOUR" },
		{ "code": "CTRE", "lib_court": "CENTRE", "lib_long": "CENTRE" },
		{ "code": "DARS", "lib_court": "DARSE", "lib_long": "DARSE" },
		{ "code": "DEG", "lib_court": "DEGRE", "lib_long": "DEGRE" },
		{ "code": "DIG", "lib_court": "DIGUE", "lib_long": "DIGUE" },
		{ "code": "DOM", "lib_court": "DOMAINE", "lib_long": "DOMAINE" },
		{ "code": "DSC", "lib_court": "DESCENTE", "lib_long": "DESCENTE" },
		{ "code": "ECL", "lib_court": "ECLUSE", "lib_long": "ECLUSE" },
		{ "code": "EGL", "lib_court": "EGLISE", "lib_long": "EGLISE" },
		{ "code": "EN", "lib_court": "ENCEINTE", "lib_long": "ENCEINTE" },
		{ "code": "ENC", "lib_court": "ENCLOS", "lib_long": "ENCLOS" },
		{ "code": "ENV", "lib_court": "ENCLAVE", "lib_long": "ENCLAVE" },
		{ "code": "ESC", "lib_court": "ESCALIER", "lib_long": "ESCALIER" },
		{ "code": "ESP", "lib_court": "ESPLANADE", "lib_long": "ESPLANADE" },
		{ "code": "ESPA", "lib_court": "ESPACE", "lib_long": "ESPACE" },
		{ "code": "ETNG", "lib_court": "ETANG", "lib_long": "ETANG" },
		{ "code": "FG", "lib_court": "FAUBOURG", "lib_long": "FAUBOURG" },
		{ "code": "FON", "lib_court": "FONTAINE", "lib_long": "FONTAINE" },
		{ "code": "FORM", "lib_court": "FORUM", "lib_long": "FORUM" },
		{ "code": "FORT", "lib_court": "FORT", "lib_long": "FORT" },
		{ "code": "FOS", "lib_court": "FOSSE", "lib_long": "FOSSE" },
		{ "code": "FOYR", "lib_court": "FOYER", "lib_long": "FOYER" },
		{ "code": "FRM", "lib_court": "FERME", "lib_long": "FERME" },
		{ "code": "GAL", "lib_court": "GALERIE", "lib_long": "GALERIE" },
		{ "code": "GARE", "lib_court": "GARE", "lib_long": "GARE" },
		{ "code": "GARN", "lib_court": "GARENNE", "lib_long": "GARENNE" },
		{ "code": "GBD", "lib_court": "GBD", "lib_long": "GRAND BOULEVARD" },
		{ "code": "GDEN", "lib_court": "GDEN", "lib_long": "GRAND ENSEMBLE" },
		{ "code": "GPE", "lib_court": "GROUPE", "lib_long": "GROUPE" },
		{ "code": "GPT", "lib_court": "GROUPEMENT", "lib_long": "GROUPEMENT" },
		{ "code": "GR", "lib_court": "GRANDE RUE", "lib_long": "GRANDE RUE" },
		{ "code": "GRI", "lib_court": "GRILLE", "lib_long": "GRILLE" },
		{ "code": "GRIM", "lib_court": "GRIMPETTE", "lib_long": "GRIMPETTE" },
		{ "code": "HAM", "lib_court": "HAMEAU", "lib_long": "HAMEAU" },
		{ "code": "HCH", "lib_court": "HAUT CHEMIN", "lib_long": "HAUT CHEMIN" },
		{ "code": "HIP", "lib_court": "HIPPODROME", "lib_long": "HIPPODROME" },
		{ "code": "HLE", "lib_court": "HALLE", "lib_long": "HALLE" },
		{ "code": "HLM", "lib_court": "HLM", "lib_long": "HLM" },
		{ "code": "ILE", "lib_court": "ILE", "lib_long": "ILE" },
		{ "code": "IMM", "lib_court": "IMMEUB", "lib_long": "IMMEUBLE" },
		{ "code": "IMP", "lib_court": "IMP", "lib_long": "IMPASSE" },
		{ "code": "JARD", "lib_court": "JARDIN", "lib_long": "JARDIN" },
		{ "code": "JTE", "lib_court": "JETEE", "lib_long": "JETEE" },
		{ "code": "LD", "lib_court": "LIEU DIT", "lib_long": "LIEU DIT" },
		{ "code": "LEVE", "lib_court": "LEVEE", "lib_long": "LEVEE" },
		{ "code": "LOT", "lib_court": "LOT.", "lib_long": "LOTISSEMENT" },
		{ "code": "MAIL", "lib_court": "MAIL", "lib_long": "MAIL" },
		{ "code": "MAN", "lib_court": "MANOIR", "lib_long": "MANOIR" },
		{ "code": "MAR", "lib_court": "MARCHE", "lib_long": "MARCHE" },
		{ "code": "MAS", "lib_court": "MAS", "lib_long": "MAS" },
		{ "code": "MET", "lib_court": "METRO", "lib_long": "METRO" },
		{ "code": "MF", "lib_court": "MAIS FOREST", "lib_long": "MAISON FORESTIERE" },
		{ "code": "MLN", "lib_court": "MOULIN", "lib_long": "MOULIN" },
		{ "code": "MTE", "lib_court": "MONTEE", "lib_long": "MONTEE" },
		{ "code": "MUS", "lib_court": "MUSEE", "lib_long": "MUSEE" },
		{ "code": "NTE", "lib_court": "NLE RTE", "lib_long": "NOUVELLE ROUTE" },
		{ "code": "PAE", "lib_court": "PTE AVENUE", "lib_long": "PETITE AVENUE" },
		{ "code": "PAL", "lib_court": "PALAIS", "lib_long": "PALAIS" },
		{ "code": "PARC", "lib_court": "PARC", "lib_long": "PARC" },
		{ "code": "PAS", "lib_court": "PASSAGE", "lib_long": "PASSAGE" },
		{ "code": "PASS", "lib_court": "PASSE", "lib_long": "PASSE" },
		{ "code": "PAT", "lib_court": "PATIO", "lib_long": "PATIO" },
		{ "code": "PAV", "lib_court": "PAVILLON", "lib_long": "PAVILLON" },
		{ "code": "PCH", "lib_court": "PCH", "lib_long": "PCH" },
		{ "code": "PERI", "lib_court": "PERIPH.", "lib_long": "PERIPHERIQUE" },
		{ "code": "PIM", "lib_court": "PET.IMP.", "lib_long": "PETITE IMPASSE" },
		{ "code": "PKG", "lib_court": "PARKING", "lib_long": "PARKING" },
		{ "code": "PL", "lib_court": "PLACE", "lib_long": "PLACE" },
		{ "code": "PLAG", "lib_court": "PLAGE", "lib_long": "PLAGE" },
		{ "code": "PLAN", "lib_court": "PLAN", "lib_long": "PLAN" },
		{ "code": "PLCI", "lib_court": "PLACIS", "lib_long": "PLACIS" },
		{ "code": "PLE", "lib_court": "PASSLLE", "lib_long": "PASSERELLE" },
		{ "code": "PLN", "lib_court": "PLAINE", "lib_long": "PLAINE" },
		{ "code": "PLT", "lib_court": "PLATEAU", "lib_long": "PLATEAU" },
		{ "code": "PN", "lib_court": "PASS.NIV", "lib_long": "PASSAGE A NIVEAU" },
		{ "code": "PNT", "lib_court": "POINTE", "lib_long": "POINTE" },
		{ "code": "PONT", "lib_court": "PONT", "lib_long": "PONT" },
		{ "code": "PORQ", "lib_court": "PORTIQUE", "lib_long": "PORTIQUE" },
		{ "code": "PORT", "lib_court": "PORT", "lib_long": "PORT" },
		{ "code": "POT", "lib_court": "POTERNE", "lib_long": "POTERNE" },
		{ "code": "POUR", "lib_court": "POURTOUR", "lib_long": "POURTOUR" },
		{ "code": "PRE", "lib_court": "PRE", "lib_long": "PRE" },
		{ "code": "PROM", "lib_court": "PROMENADE", "lib_long": "PROMENADE" },
		{ "code": "PRQ", "lib_court": "PRESQU'ILE", "lib_long": "PRESQU'ILE" },
		{ "code": "PRT", "lib_court": "PETIT.RTE", "lib_long": "PETITE ROUTE" },
		{ "code": "PRV", "lib_court": "PARVIS", "lib_long": "PARVIS" },
		{ "code": "PSTY", "lib_court": "PERISTYLE", "lib_long": "PERISTYLE" },
		{ "code": "PTA", "lib_court": "PETITE ALLEE", "lib_long": "PETITE ALLEE" },
		{ "code": "PTE", "lib_court": "PORTE", "lib_long": "PORTE" },
		{ "code": "PTR", "lib_court": "PETITE RUE", "lib_long": "PETITE RUE" },
		{ "code": "QU", "lib_court": "QUAI", "lib_long": "QUAI" },
		{ "code": "QUA", "lib_court": "QUARTIER", "lib_long": "QUARTIER" },
		{ "code": "R", "lib_court": "RUE", "lib_long": "RUE" },
		{ "code": "RAC", "lib_court": "RACCOURCI", "lib_long": "RACCOURCI" },
		{ "code": "RAID", "lib_court": "RAIDILLON", "lib_long": "RAIDILLON" },
		{ "code": "REM", "lib_court": "REMPART", "lib_long": "REMPART" },
		{ "code": "RES", "lib_court": "RES.", "lib_long": "RESIDENCE" },
		{ "code": "RLE", "lib_court": "RUELLE", "lib_long": "RUELLE" },
		{ "code": "ROC", "lib_court": "ROC", "lib_long": "ROC" },
		{ "code": "ROQT", "lib_court": "ROQUET", "lib_long": "ROQUET" },
		{ "code": "RPE", "lib_court": "RAMPE", "lib_long": "RAMPE" },
		{ "code": "RPT", "lib_court": "ROND POINT", "lib_long": "ROND POINT" },
		{ "code": "RTD", "lib_court": "ROTONDE", "lib_long": "ROTONDE" },
		{ "code": "RTE", "lib_court": "ROUTE", "lib_long": "ROUTE" },
		{ "code": "SEN", "lib_court": "SEN", "lib_long": "SEN" },
		{ "code": "SQ", "lib_court": "SQUARE", "lib_long": "SQUARE" },
		{ "code": "STA", "lib_court": "STATION", "lib_long": "STATION" },
		{ "code": "STDE", "lib_court": "STADE", "lib_long": "STADE" },
		{ "code": "TOUR", "lib_court": "TOUR", "lib_long": "TOUR" },
		{ "code": "TPL", "lib_court": "TPL", "lib_long": "TERRE PLEIN" },
		{ "code": "TRA", "lib_court": "TRAVERSE", "lib_long": "TRAVERSE" },
		{ "code": "TRN", "lib_court": "TERRAIN", "lib_long": "TERRAIN" },
		{ "code": "TRT", "lib_court": "TERTRE", "lib_long": "TERTRE" },
		{ "code": "TSSE", "lib_court": "TERRASSE", "lib_long": "TERRASSE" },
		{ "code": "VAL", "lib_court": "VAL", "lib_long": "VAL" },
		{ "code": "VCHE", "lib_court": "VIEUX CHEM", "lib_long": "VIEUX CHEMIN" },
		{ "code": "VEN", "lib_court": "VENELLE", "lib_long": "VENELLE" },
		{ "code": "VGE", "lib_court": "VILLAGE", "lib_long": "VILLAGE" },
		{ "code": "VIA", "lib_court": "VIA", "lib_long": "VIA" },
		{ "code": "VLA", "lib_court": "VILLA", "lib_long": "VILLA" },
		{ "code": "VOI", "lib_court": "VOIE", "lib_long": "VOIE" },
		{ "code": "VTE", "lib_court": "VIEILLE RTE", "lib_long": "VIEILLE ROUTE" },
		{ "code": "ZA", "lib_court": "ZA", "lib_long": "ZONE D'ACTIVITE" },
		{ "code": "ZAC", "lib_court": "ZAC", "lib_long": "ZONE D'AMENAGEMENT CONCERTE" },
		{ "code": "ZAD", "lib_court": "ZAD", "lib_long": "ZONE D'AMENAGEMENT DIFFERE" },
		{ "code": "ZI", "lib_court": "ZI", "lib_long": "ZONE INDUSTRIELLE" },
		{ "code": "ZONE", "lib_court": "ZONE", "lib_long": "ZONE" },
		{ "code": "ZUP", "lib_court": "ZUP", "lib_long": "ZUP" }
	];

	
formF.typeVoie = typeVoie;

	
	/// Gamme des produits ( suceptible de changer )
	
	var gammeProd = [
{"gamme" : "Harmonie Santé Particuliers", "codeGRC" : "HLP100", "codeOffreInfinite" : "PPSTA002", "codeProduitInfinite" : "TPSAHLP100", "acs" : "N", "pp" : "N" },
{"gamme" : "Harmonie Santé Particuliers", "codeGRC" : "HLP200", "codeOffreInfinite" : "PPSTA002", "codeProduitInfinite" : "TPSAHLP200", "acs" : "N", "pp" : "N" },
{"gamme" : "Harmonie Santé Particuliers", "codeGRC" : "HLP300", "codeOffreInfinite" : "PPSTA002", "codeProduitInfinite" : "TPSAHLP300", "acs" : "N", "pp" : "N" },
{"gamme" : "Harmonie Santé Particuliers", "codeGRC" : "HLP400", "codeOffreInfinite" : "PPSTA002", "codeProduitInfinite" : "TPSAHLP400", "acs" : "N", "pp" : "N" },
{"gamme" : "Harmonie Santé Particuliers", "codeGRC" : "HLP500", "codeOffreInfinite" : "PPSTA002", "codeProduitInfinite" : "TPSAHLP500", "acs" : "N", "pp" : "N" },
{"gamme" : "Harmonie Santé Particuliers", "codeGRC" : "HLP600", "codeOffreInfinite" : "PPSTA002", "codeProduitInfinite" : "TPSAHLP600", "acs" : "N", "pp" : "N" },
{"gamme" : "Harmonie Santé Particuliers", "codeGRC" : "HPAESS", "codeOffreInfinite" : "PPSTA002", "codeProduitInfinite" : "TPSAHPAESS", "acs" : "N", "pp" : "N" },
{"gamme" : "Harmonie Santé Particuliers", "codeGRC" : "HPAHOS", "codeOffreInfinite" : "PPSTA002", "codeProduitInfinite" : "TPSAHPAHOS", "acs" : "N", "pp" : "N" },
{"gamme" : "Harmonie Santé Particuliers", "codeGRC" : "HPA100", "codeOffreInfinite" : "PPSTA002", "codeProduitInfinite" : "TPSAHPA100", "acs" : "N", "pp" : "N" },
{"gamme" : "Harmonie Santé Particuliers", "codeGRC" : "HPA200", "codeOffreInfinite" : "PPSTA002", "codeProduitInfinite" : "TPSAHPA200", "acs" : "N", "pp" : "N" },
{"gamme" : "Harmonie Santé Particuliers", "codeGRC" : "HPA202", "codeOffreInfinite" : "PPSTA002", "codeProduitInfinite" : "TPSAHPA202", "acs" : "N", "pp" : "N" },
{"gamme" : "Harmonie Santé Particuliers", "codeGRC" : "HPA300", "codeOffreInfinite" : "PPSTA002", "codeProduitInfinite" : "TPSAHPA300", "acs" : "N", "pp" : "N" },
{"gamme" : "Harmonie Santé Particuliers", "codeGRC" : "HPA302", "codeOffreInfinite" : "PPSTA002", "codeProduitInfinite" : "TPSAHPA302", "acs" : "N", "pp" : "N" },
{"gamme" : "Harmonie Santé Particuliers", "codeGRC" : "HPA400", "codeOffreInfinite" : "PPSTA002", "codeProduitInfinite" : "TPSAHPA400", "acs" : "N", "pp" : "N" },
{"gamme" : "Harmonie Santé Particuliers", "codeGRC" : "HPA402", "codeOffreInfinite" : "PPSTA002", "codeProduitInfinite" : "TPSAHPA402", "acs" : "N", "pp" : "N" },
{"gamme" : "Harmonie Santé Particuliers", "codeGRC" : "HPA500", "codeOffreInfinite" : "PPSTA002", "codeProduitInfinite" : "TPSAHPA500", "acs" : "N", "pp" : "N" },
{"gamme" : "Harmonie Santé Particuliers", "codeGRC" : "HPA600", "codeOffreInfinite" : "PPSTA002", "codeProduitInfinite" : "TPSAHPA600", "acs" : "N", "pp" : "N" },
{"gamme" : "Harmonie Santé Particuliers", "codeGRC" : "HPB00", "codeOffreInfinite" : "PPSTA002", "codeProduitInfinite" : "TPIBHPB00", "acs" : "N", "pp" : "N" },
{"gamme" : "Harmonie Santé Particuliers", "codeGRC" : "EAC100", "codeOffreInfinite" : "PPSTA002", "codeProduitInfinite" : "TPSAEAC100", "acs" : "N", "pp" : "N" },
{"gamme" : "Harmonie Santé Particuliers", "codeGRC" : "EAC200", "codeOffreInfinite" : "PPSTA002", "codeProduitInfinite" : "TPSAEAC200", "acs" : "N", "pp" : "N" },
{"gamme" : "Harmonie Santé Particuliers", "codeGRC" : "EAS100", "codeOffreInfinite" : "PPSTA002", "codeProduitInfinite" : "TPSAEAS100", "acs" : "N", "pp" : "N" },
{"gamme" : "Harmonie Santé Particuliers", "codeGRC" : "EAS200", "codeOffreInfinite" : "PPSTA002", "codeProduitInfinite" : "TPSAEAS200", "acs" : "N", "pp" : "N" },
{"gamme" : "Harmonie Santé Particuliers", "codeGRC" : "HPH15", "codeOffreInfinite" : "PPSTA002", "codeProduitInfinite" : "TPPHHPH15", "acs" : "N", "pp" : "O" },
{"gamme" : "Harmonie Santé Particuliers", "codeGRC" : "HPH30", "codeOffreInfinite" : "PPSTA002", "codeProduitInfinite" : "TPPHHPH30", "acs" : "N", "pp" : "O" },
{"gamme" : "Harmonie Santé Particuliers", "codeGRC" : "HPH45", "codeOffreInfinite" : "PPSTA002", "codeProduitInfinite" : "TPPHHPH45", "acs" : "N", "pp" : "O" },
{"gamme" : "Harmonie Santé Particuliers", "codeGRC" : "HDA20", "codeOffreInfinite" : "PPSTA002", "codeProduitInfinite" : "TPDAHDA20", "acs" : "N", "pp" : "N" },
{"gamme" : "Harmonie Santé Particuliers", "codeGRC" : "HDA40", "codeOffreInfinite" : "PPSTA002", "codeProduitInfinite" : "TPDAHDA40", "acs" : "N", "pp" : "N" },
{"gamme" : "Harmonie Santé Particuliers", "codeGRC" : "HDA60", "codeOffreInfinite" : "PPSTA002", "codeProduitInfinite" : "TPDAHDA60", "acs" : "N", "pp" : "N" },
{"gamme" : "Harmonie Santé Particuliers", "codeGRC" : "HRA15", "codeOffreInfinite" : "PPSTA002", "codeProduitInfinite" : "TPRAHRA15", "acs" : "N", "pp" : "N" },
{"gamme" : "Harmonie Santé Particuliers", "codeGRC" : "HRA30", "codeOffreInfinite" : "PPSTA002", "codeProduitInfinite" : "TPRAHRA30", "acs" : "N", "pp" : "N" },
{"gamme" : "Harmonie Santé Particuliers", "codeGRC" : "HRA45", "codeOffreInfinite" : "PPSTA002", "codeProduitInfinite" : "TPRAHRA45", "acs" : "N", "pp" : "N" },
{"gamme" : "Accès Santé ACS", "codeGRC" : "ACSA", "codeOffreInfinite" : "PPSTA001", "codeProduitInfinite" : "TPSAACSA", "acs" : "O", "pp" : "N" },
{"gamme" : "Accès Santé ACS", "codeGRC" : "ACSB", "codeOffreInfinite" : "PPSTA001", "codeProduitInfinite" : "TPSAACSB", "acs" : "O", "pp" : "N" },
{"gamme" : "Accès Santé ACS", "codeGRC" : "ACSC", "codeOffreInfinite" : "PPSTA001", "codeProduitInfinite" : "TPSAACSC", "acs" : "O", "pp" : "N" },
{"gamme" : "Accès Santé ACS", "codeGRC" : "RLACSA", "codeOffreInfinite" : "PPSTA001", "codeProduitInfinite" : "TPSARLACSA", "acs" : "O", "pp" : "N" },
{"gamme" : "Accès Santé ACS", "codeGRC" : "RLACSB", "codeOffreInfinite" : "PPSTA001", "codeProduitInfinite" : "TPSARLACSB", "acs" : "O", "pp" : "N" },
{"gamme" : "Accès Santé ACS", "codeGRC" : "RLACSC", "codeOffreInfinite" : "PPSTA001", "codeProduitInfinite" : "TPSARLACSC", "acs" : "O", "pp" : "N" },
{"gamme" : "Accès Santé ACS", "codeGRC" : "RLSACSA", "codeOffreInfinite" : "PPSTA001", "codeProduitInfinite" : "TPSARLSACA", "acs" : "N", "pp" : "N" },
{"gamme" : "Accès Santé ACS", "codeGRC" : "RLSACSB", "codeOffreInfinite" : "PPSTA001", "codeProduitInfinite" : "TPSARLSACB", "acs" : "N", "pp" : "N" },
{"gamme" : "Accès Santé ACS", "codeGRC" : "RLSACSC", "codeOffreInfinite" : "PPSTA001", "codeProduitInfinite" : "TPSARLSACC", "acs" : "N", "pp" : "N" },
{"gamme" : "Accès Santé ACS", "codeGRC" : "SACSA", "codeOffreInfinite" : "PPSTA001", "codeProduitInfinite" : "TPSASACSA", "acs" : "N", "pp" : "N" },
{"gamme" : "Accès Santé ACS", "codeGRC" : "SACSB", "codeOffreInfinite" : "PPSTA001", "codeProduitInfinite" : "TPSASACSB", "acs" : "N", "pp" : "N" },
{"gamme" : "Accès Santé ACS", "codeGRC" : "SACSC", "codeOffreInfinite" : "PPSTA001", "codeProduitInfinite" : "TPSASACSC", "acs" : "N", "pp" : "N" },
{"gamme" : "Accès Santé ACS", "codeGRC" : "DCACS1", "codeOffreInfinite" : "PPSTA001", "codeProduitInfinite" : "TPOBDCACS1", "acs" : "O", "pp" : "N" },
{"gamme" : "Accès Santé ACS", "codeGRC" : "DCACS2", "codeOffreInfinite" : "PPSTA001", "codeProduitInfinite" : "TPOBDCACS2", "acs" : "O", "pp" : "N" },
{"gamme" : "Accès Santé ACS", "codeGRC" : "HPH15", "codeOffreInfinite" : "PPSTA001", "codeProduitInfinite" : "TPPHHPH15", "acs" : "N", "pp" : "O" },
{"gamme" : "Accès Santé ACS", "codeGRC" : "HPH30", "codeOffreInfinite" : "PPSTA001", "codeProduitInfinite" : "TPPHHPH30", "acs" : "N", "pp" : "O" },
{"gamme" : "Accès Santé ACS", "codeGRC" : "HPH45", "codeOffreInfinite" : "PPSTA001", "codeProduitInfinite" : "TPPHHPH45", "acs" : "N", "pp" : "O" },
{"gamme" : "Accès Santé ACS", "codeGRC" : "HDA20", "codeOffreInfinite" : "PPSTA001", "codeProduitInfinite" : "TPDAHDA20", "acs" : "N", "pp" : "N" },
{"gamme" : "Accès Santé ACS", "codeGRC" : "HDA40", "codeOffreInfinite" : "PPSTA001", "codeProduitInfinite" : "TPDAHDA40", "acs" : "N", "pp" : "N" },
{"gamme" : "Accès Santé ACS", "codeGRC" : "HDA60", "codeOffreInfinite" : "PPSTA001", "codeProduitInfinite" : "TPDAHDA60", "acs" : "N", "pp" : "N" },
{"gamme" : "Accès Santé ACS", "codeGRC" : "HRA15", "codeOffreInfinite" : "PPSTA001", "codeProduitInfinite" : "TPRAHRA15", "acs" : "N", "pp" : "N" },
{"gamme" : "Accès Santé ACS", "codeGRC" : "HRA30", "codeOffreInfinite" : "PPSTA001", "codeProduitInfinite" : "TPRAHRA30", "acs" : "N", "pp" : "N" },
{"gamme" : "Accès Santé ACS", "codeGRC" : "HRA45", "codeOffreInfinite" : "PPSTA001", "codeProduitInfinite" : "TPRAHRA45", "acs" : "N", "pp" : "N" },
{"gamme" : "Accès Santé ACS", "codeGRC" : "HPB00", "codeOffreInfinite" : "PPSTA001", "codeProduitInfinite" : "TPIBHPB00", "acs" : "N", "pp" : "N" },
{"gamme" : "Harmonie Santé Territoriale", "codeGRC" : "EAC10T", "codeOffreInfinite" : "PESTA008", "codeProduitInfinite" : "TESAEAC10T", "acs" : "N", "pp" : "N" },
{"gamme" : "Harmonie Santé Territoriale", "codeGRC" : "EAC20T", "codeOffreInfinite" : "PESTA008", "codeProduitInfinite" : "TESAEAC20T", "acs" : "N", "pp" : "N" },
{"gamme" : "Harmonie Santé Territoriale", "codeGRC" : "EAS10T", "codeOffreInfinite" : "PESTA008", "codeProduitInfinite" : "TESAEAS10T", "acs" : "N", "pp" : "N" },
{"gamme" : "Harmonie Santé Territoriale", "codeGRC" : "EAS20T", "codeOffreInfinite" : "PESTA008", "codeProduitInfinite" : "TESAEAS20T", "acs" : "N", "pp" : "N" },
{"gamme" : "Harmonie Santé Territoriale", "codeGRC" : "HLR100", "codeOffreInfinite" : "PESTA008", "codeProduitInfinite" : "TESAHLR100", "acs" : "N", "pp" : "N" },
{"gamme" : "Harmonie Santé Territoriale", "codeGRC" : "HLR200", "codeOffreInfinite" : "PESTA008", "codeProduitInfinite" : "TESAHLR200", "acs" : "N", "pp" : "N" },
{"gamme" : "Harmonie Santé Territoriale", "codeGRC" : "HLR300", "codeOffreInfinite" : "PESTA008", "codeProduitInfinite" : "TESAHLR300", "acs" : "N", "pp" : "N" },
{"gamme" : "Harmonie Santé Territoriale", "codeGRC" : "HLR400", "codeOffreInfinite" : "PESTA008", "codeProduitInfinite" : "TESAHLR400", "acs" : "N", "pp" : "N" },
{"gamme" : "Harmonie Santé Territoriale", "codeGRC" : "HLR500", "codeOffreInfinite" : "PESTA008", "codeProduitInfinite" : "TESAHLR500", "acs" : "N", "pp" : "N" },
{"gamme" : "Harmonie Santé Territoriale", "codeGRC" : "HLR600", "codeOffreInfinite" : "PESTA008", "codeProduitInfinite" : "TESAHLR600", "acs" : "N", "pp" : "N" },
{"gamme" : "Harmonie Santé Territoriale", "codeGRC" : "HTR100", "codeOffreInfinite" : "PESTA008", "codeProduitInfinite" : "TESAHTR100", "acs" : "N", "pp" : "N" },
{"gamme" : "Harmonie Santé Territoriale", "codeGRC" : "HTR200", "codeOffreInfinite" : "PESTA008", "codeProduitInfinite" : "TESAHTR200", "acs" : "N", "pp" : "N" },
{"gamme" : "Harmonie Santé Territoriale", "codeGRC" : "HTR202", "codeOffreInfinite" : "PESTA008", "codeProduitInfinite" : "TESAHTR202", "acs" : "N", "pp" : "N" },
{"gamme" : "Harmonie Santé Territoriale", "codeGRC" : "HTR300", "codeOffreInfinite" : "PESTA008", "codeProduitInfinite" : "TESAHTR300", "acs" : "N", "pp" : "N" },
{"gamme" : "Harmonie Santé Territoriale", "codeGRC" : "HTR302", "codeOffreInfinite" : "PESTA008", "codeProduitInfinite" : "TESAHTR302", "acs" : "N", "pp" : "N" },
{"gamme" : "Harmonie Santé Territoriale", "codeGRC" : "HTR400", "codeOffreInfinite" : "PESTA008", "codeProduitInfinite" : "TESAHTR400", "acs" : "N", "pp" : "N" },
{"gamme" : "Harmonie Santé Territoriale", "codeGRC" : "HTR402", "codeOffreInfinite" : "PESTA008", "codeProduitInfinite" : "TESAHTR402", "acs" : "N", "pp" : "N" },
{"gamme" : "Harmonie Santé Territoriale", "codeGRC" : "HTR500", "codeOffreInfinite" : "PESTA008", "codeProduitInfinite" : "TESAHTR500", "acs" : "N", "pp" : "N" },
{"gamme" : "Harmonie Santé Territoriale", "codeGRC" : "HTR600", "codeOffreInfinite" : "PESTA008", "codeProduitInfinite" : "TESAHTR600", "acs" : "N", "pp" : "N" },
{"gamme" : "Harmonie Santé Territoriale", "codeGRC" : "HPH15", "codeOffreInfinite" : "PESTA008", "codeProduitInfinite" : "TEPHHPH15", "acs" : "N", "pp" : "O" },
{"gamme" : "Harmonie Santé Territoriale", "codeGRC" : "HPH30", "codeOffreInfinite" : "PESTA008", "codeProduitInfinite" : "TEPHHPH30", "acs" : "N", "pp" : "O" },
{"gamme" : "Harmonie Santé Territoriale", "codeGRC" : "HPH45", "codeOffreInfinite" : "PESTA008", "codeProduitInfinite" : "TEPHHPH45", "acs" : "N", "pp" : "O" },
{"gamme" : "Harmonie Santé Territoriale", "codeGRC" : "HDA20", "codeOffreInfinite" : "PESTA008", "codeProduitInfinite" : "TEDAHDA20", "acs" : "N", "pp" : "N" },
{"gamme" : "Harmonie Santé Territoriale", "codeGRC" : "HDA40", "codeOffreInfinite" : "PESTA008", "codeProduitInfinite" : "TEDAHDA40", "acs" : "N", "pp" : "N" },
{"gamme" : "Harmonie Santé Territoriale", "codeGRC" : "HDA60", "codeOffreInfinite" : "PESTA008", "codeProduitInfinite" : "TEDAHDA60", "acs" : "N", "pp" : "N" },
{"gamme" : "Harmonie Santé Territoriale", "codeGRC" : "HRA15", "codeOffreInfinite" : "PESTA008", "codeProduitInfinite" : "TERAHRA15", "acs" : "N", "pp" : "N" },
{"gamme" : "Harmonie Santé Territoriale", "codeGRC" : "HRA30", "codeOffreInfinite" : "PESTA008", "codeProduitInfinite" : "TERAHRA30", "acs" : "N", "pp" : "N" },
{"gamme" : "Harmonie Santé Territoriale", "codeGRC" : "HRA45", "codeOffreInfinite" : "PESTA008", "codeProduitInfinite" : "TERAHRA45", "acs" : "N", "pp" : "N" },
{"gamme" : "Harmonie Santé Territoriale", "codeGRC" : "HPB00", "codeOffreInfinite" : "PESTA008", "codeProduitInfinite" : "TEIBHPB00", "acs" : "N", "pp" : "N" }
];
	
	
	formF.gammeProd = gammeProd;
	
	
	return formF;
})();

