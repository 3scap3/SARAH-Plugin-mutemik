//url pour activation manuel :
//http://127.0.0.1:8080/sarah/mutemik?macro=activer

exports.action = function(data, callback, config, SARAH){
	
console.log('=========================================================================================================================================');
console.log('INFOS contenu data.macro :' + data.macro);
console.log('INFOS Nombre de kinect definis :' + config.modules.mutemik.nombre_kinect);
console.log('INFOS index du kinect1 :' + config.modules.mutemik.index_kinect1);
console.log('INFOS index du kinect2 :' + config.modules.mutemik.index_kinect2);
console.log('INFOS Valeur de re_up_defaut_timer :' + config.modules.mutemik.re_up_defaut_timer);
console.log('INFOS Chemin du repertoire plugin de sarah :' + config.modules.mutemik.path_plugin_sarah);

var nmbr_kinect_def = config.modules.mutemik.nombre_kinect
var ndx_kinect1 = config.modules.mutemik.index_kinect1
var ndx_kinect2 = config.modules.mutemik.index_kinect2
var timer_reup = config.modules.mutemik.re_up_defaut_timer
var path_plugin_sarah = config.modules.mutemik.path_plugin_sarah

var date = new Date();
	
	// si macro passer en param = activer/desactiver 	
	if (data.macro == 'desactiver') {

		SARAH.askme("combien de tant ?", {    
			"une minutes" 		: '1',
			"dis minutes" 		: '10',
			"vin minutes" 	: '20',
			"trente minute" 	: '30',
			"une demi heure" 	: '30',
			"soissante minutes" 		: '60',
			"une heure" 		: '60',},
			10000, 
			function(answer, end)
			{ // the selected answer or false
				var reponse = answer
				//if (typeof answer == 'undefined' ||  answer == false) {
				if (reponse == 'undefined' ||  reponse == false || !reponse ) 
				{	
					//answer = timer_reup;
					//end;
					//end(); // MUST be called when job done
					//callback({'tts': "Je reste a l'ecoute."});
					console.log('INFOS REPONSE: ' + reponse);
					//SARAH.speak("Je reste a l'ecoute.", end);
					
					SARAH.speak("Je reste a l'ecoute.", function(){
						end(); // MUST be called when job done
					});
				}
				else 
				{
					console.log('INFOS REPONSE: ' + reponse);
					
					//Vocaliser pour ete sur que l ordre est compris
					SARAH.speak('Je coupe mes micros pendant : ' + reponse + ' minutes', function(){

						console.log('INFOS : Je coupe mes micros pendant : ' + reponse + ' minutes');
							
						// Lauching script or app
						//ouverture du gestionnaire de son :
						SARAH.runApp('mmsys.cpl');
						
						//execution du script vbs de desactivation :
						var exec = require('child_process').exec;
						var param = nmbr_kinect_def + ' ' + ndx_kinect1 + ' ' + ndx_kinect2 ;
						var process = path_plugin_sarah + 'mutemik\\mutemikDesactiver.vbs ' + param ;
						//var process = '%CD%/plugins/mutemik/mutemikDesactiver.vbs ' + param ;
						console.log('INFOS var process : ' + process);
						console.log('INFOS parametre du vbs : ' + param);
					  
						var child = exec(process,
						function (error, stdout, stderr) {
						if (error !== null) console.log('exec error: ' + error);
						});	
						
						mafonction(reponse);
					
					end(); // MUST be called when job done
					});
					
				}		
			});
			
			function mafonction(reponse)
			{
					 var HEURES = date.getHours() 
					 var MINUTES = date.getMinutes()
					 var SECONDES = date.getSeconds()
					
					 //var SECONDES_PLUS_TEMP = SECONDES + reponse;
					 //var SECONDES_PLUS_TEMP = parseInt(SECONDES) + parseInt(reponse);
					 var MINUTES_PLUS_TEMP = parseInt(MINUTES) + parseInt(reponse);
					
					
					//Pour mettre le format horraire correct
					if (HEURES < 10)
					{
						HEURES = '0' + HEURES;
					}	
					
					if (MINUTES_PLUS_TEMP < 10)
					{
						MINUTES_PLUS_TEMP = '0' + MINUTES_PLUS_TEMP;
					}	
					
					
					text = HEURES + ' ' + MINUTES + ' ' + SECONDES;
					text2 = HEURES + ' ' + MINUTES_PLUS_TEMP + ' ' + SECONDES;
					
					console.log('heure de depart : ' + text);
					console.log('heure plus ' + reponse + ' Minutes : ' + text2);
					
					var path_requette_curl = path_plugin_sarah + '\mutemik\\curl http://127.0.0.1:8080/sarah/mutemik?macro=activer'
					console.log('requette curl ' + path_requette_curl);
					
					//planification de la reactivation :
					var exec = require('child_process').exec;
					var process = 'SCHTASKS /Create /TN up_kineck_task /TR "' + path_requette_curl + '" /SC ONCE /SD %DATE% /ST ' + HEURES + ':' + MINUTES_PLUS_TEMP + ' /F';
					
					var child = exec(process,
					function (error, stdout, stderr) 
						{
						if (error !== null) console.log('exec error: ' + error);
						});
						console.log('=========================================================================================================================================');
			}
	}
		
	if (data.macro == 'activer') {
		
		console.log('INFOS : Je reactive mes micros');
		
		//Vocaliser pour ete sur que l ordre est compris
		//SARAH.speak('Je remet le son de mon micros');
		SARAH.speak("J'active mon micros", function(){
			// Lauching script or app
			SARAH.runApp('mmsys.cpl');
			
			var exec = require('child_process').exec;
			//var process = '%CD%/plugins/mutemik/mutemikActiver.vbs';
			var param = nmbr_kinect_def + ' ' + ndx_kinect1 + ' ' + ndx_kinect2 ;
			console.log('INFOS parametre du vbs : ' + param);
			var process = path_plugin_sarah + 'mutemik\\mutemikActiver.vbs ' + param ;
		  
			var child = exec(process,
			function (error, stdout, stderr) {
				if (error !== null) console.log('exec error: ' + error);
			});
			
			console.log('=========================================================================================================================================');
		})

	}

	//======================================================//
	
	// si macro = manager	
	if (data.macro == 'manager') {
		
		console.log('INFOS : Affichage du gestionnaire audio');
		
		//Vocaliser pour ete sur que l ordre est compris
		SARAH.speak('Voici mon gestionnaire de son');
		
		// Lauching script or app
		SARAH.runApp('mmsys.cpl');
		
		//callback();
		//callback({'tts': "L'action a échoué"});
		// callback();
		console.log('=========================================================================================================================================');
	}
	
// callback({'tts': "c'est fait."});
callback({});
}   