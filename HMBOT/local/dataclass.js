

/** @constructor */
var dataClass = function() {
	this.scenarioConfig = '';
	this.codeScenario = '';
	this.nomScenario = '';
	this.nomFichierConfigScenario = '';
  this.webData = {
    url:'',
    tabDeBordURL:'', 
    identifiant:'', 
    motDePasse:'' 
   };
  this.varGlobales = { //globalVariables
    ligneCourante:'', //currentRow
    indexDerniereLigne:'', //indexLastRow
     controlSeul:'' //controlSeul
  };
	this.contratCourantAdhesion = {};
};

