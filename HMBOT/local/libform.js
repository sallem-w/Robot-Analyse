﻿ctx.formF = (function () {

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

	return formF;
})();

