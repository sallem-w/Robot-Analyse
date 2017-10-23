

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
    ligneCourante:0, //currentRow
    indexDerniereLigne:0, //indexLastRow
     controlSeul:false //controlSeul
  }
};
		