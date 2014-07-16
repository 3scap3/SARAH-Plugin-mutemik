//url pour activation manuel :
//http://127.0.0.1:8080/sarah/mutemik?macro=activer

exports.action = function(data, callback, config, SARAH){
	
console.log('=========================================================================================================================================');
console.log('INFOS contenu data.macro :' + data.macro);
console.log('INFOS Nombre de kinect definis :' + config.modules.mutemik.nombre_kinect);
console.log('INFOS index du kinect1 :' + config.modules.mutemik.index_kinect1);
console.log('INFOS index du kinect2 :' + config.modules.mutemik.index_kinect2);
console.log('INFOS Chemin du repertoire plugin de sarah :' + config.modules.mutemik.path_plugin_sarah);

var nmbr_kinect_def = config.modules.mutemik.nombre_kinect
var ndx_kinect1 = config.modules.mutemik.index_kinect1
var ndx_kinect2 = config.modules.mutemik.index_kinect2
var path_plugin_sarah = config.modules.mutemik.path_plugin_sarah

var date = new Date();

	// si macro passer en param = activer/desactiver (mode vocal)	
	if (data.macro == 'desactiver' && data.manuel == 'false' ) {

		SARAH.askme("combien de tant ?", {  
			"une minute" 		: '1',
			"unne minute" 		: '1',
			"cinq minutes" 		: '5',
			"dix minutes" 		: '10',
			"di minutes" 		: '10',
			"quinze minutes" 		: '15',
			"vin minutes" 	: '20',
			"trente minutes" 	: '30',
			"quarante minutes" 	: '40',
			"cinquante minutes" 	: '50',
			"soixante minutes" 		: '60',
			"une heure" 		: '60',},
			10000, 
			function(answer, end)
			{ // the selected answer or false
				var reponse = answer
				//if (typeof answer == 'undefined' ||  answer == false) {
				if (reponse == 'undefined' ||  reponse == false || !reponse ) 
				{	
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
						//SARAH.runApp('mmsys.cpl');
						
						//execution du script vbs de desactivation avec nircmd:
						var exec = require('child_process').exec;
						//var param = nmbr_kinect_def + ' ' + ndx_kinect1 + ' ' + ndx_kinect2 ;
						
						//C:\Users\mike\Desktop\SARAH\WSRRelease316PreProd\plugins\mutemik\nircmd setsysvolume 0 "Microphone Array" 1
						var process = path_plugin_sarah + 'mutemik\\nircmd setsysvolume 0 "Microphone Array" 1';
						
						console.log('INFOS var process : ' + process);

					  
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
					//Horraire local :
					var HEURES = date.getHours() 
					var MINUTES = date.getMinutes()
					var SECONDES = date.getSeconds()
						 
					minutes_conv_heures = Math.floor(reponse/60)+"h"+(reponse%60);
					console.log('Math.floor : ' + minutes_conv_heures);
					 
					result = minutes_conv_heures.split('h')
					console.log('HEURES : ' + result[0]);
					console.log('MINUTES : ' + result[1]);
					var HEURES_DELAY = result[0];
					var MINUTES_DELAY = result[1];
					
					var HEURES_PLUS_TEMP = parseInt(HEURES) + parseInt(HEURES_DELAY);
					var MINUTES_PLUS_TEMP = parseInt(MINUTES) + parseInt(MINUTES_DELAY);
					
					//Pour mettre le format horraire local correct
					if (HEURES < 10)
					{
						HEURES = '0' + HEURES;
					}	
					
					if (MINUTES < 10)
					{
						MINUTES = '0' + MINUTES;
					}	
					
					if (HEURES_PLUS_TEMP < 10)
					{
						HEURES_PLUS_TEMP = '0' + HEURES_PLUS_TEMP;
					}	
					
					
					if (MINUTES_PLUS_TEMP < 10)
					{
						MINUTES_PLUS_TEMP = '0' + MINUTES_PLUS_TEMP;
					}	
					
					//Pour mettre le format horraire delay correct
					if (HEURES_DELAY < 10)
					{
						HEURES_DELAY = '0' + HEURES_DELAY;
					}	
					
					if (MINUTES_DELAY < 10)
					{
						MINUTES_DELAY = '0' + MINUTES_DELAY;
					}	
					
					

					
					text = HEURES + ' ' + MINUTES + ' ' + SECONDES;
					text2 = HEURES_PLUS_TEMP + ' ' + MINUTES_PLUS_TEMP + ' ' + SECONDES;
					
					console.log('heure de depart : ' + text);
					console.log('heure plus ' + reponse + ' Minutes : ' + text2);
					
					var path_requette_curl = path_plugin_sarah + '\mutemik\\curl http://127.0.0.1:8383/sarah/mutemik?macro=activer'
					console.log('requette curl ' + path_requette_curl);
					
					//planification de la reactivation :
					var exec = require('child_process').exec;
					var process = 'SCHTASKS /Create /TN up_kineck_task /TR "' + path_requette_curl + '" /SC ONCE /SD %DATE% /ST ' + HEURES_PLUS_TEMP + ':' + MINUTES_PLUS_TEMP + ' /F';
					
					var child = exec(process,
					function (error, stdout, stderr) 
						{
						if (error !== null) console.log('exec error: ' + error);
						});
						console.log('=========================================================================================================================================');
			}
	}
	
	//// si macro passer en param = activer/desactiver (mode manuel)	
	// 	192.168.0.7:8383/sarah/mutemik?macro=activer&manuel=true
	if (data.macro == 'desactiver' && data.manuel == 'true' ) {
		
					//Vocaliser pour ete sur que l ordre est compris
					SARAH.speak('Désactivation manuel Je coupe mes micros .', function(){

						console.log('INFOS : Je coupe mes micros.');
							
						//execution du script vbs de desactivation avec nircmd:
						var exec = require('child_process').exec;
						//var param = nmbr_kinect_def + ' ' + ndx_kinect1 + ' ' + ndx_kinect2 ;
						
						//C:\Users\mike\Desktop\SARAH\WSRRelease316PreProd\plugins\mutemik\nircmd setsysvolume 0 "Microphone Array" 1
						var process = path_plugin_sarah + 'mutemik\\nircmd setsysvolume 0 "Microphone Array" 1';
						
						console.log('INFOS var process : ' + process);

					  
						var child = exec(process,
						function (error, stdout, stderr) {
						if (error !== null) console.log('exec error: ' + error);
						});
						
					});
					
				}		
	// Activation dans tous les cas (manuel et vocal) si data.macro = activer 
 	if (data.macro == 'activer') {
		
		console.log('INFOS : Je reactive mes micros');
		
		//Vocaliser pour ete sur que l ordre est compris
		//SARAH.speak('Je remet le son de mon micros');
		SARAH.speak("J'active mon micros", function(){
			// Lauching script or app
			//SARAH.runApp('mmsys.cpl');
			
			var exec = require('child_process').exec;
			//var param = nmbr_kinect_def + ' ' + ndx_kinect1 + ' ' + ndx_kinect2 ;
			//console.log('INFOS parametre du vbs : ' + param);
			
			//var process = path_plugin_sarah + 'mutemik\\mutemikActiver.vbs ' + param ;
		    var process = path_plugin_sarah + 'mutemik\\nircmd setsysvolume 65536 "Microphone Array" 1';
			console.log('INFOS var process : ' + process);
				
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