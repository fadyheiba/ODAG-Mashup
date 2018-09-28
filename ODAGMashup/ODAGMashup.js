var prefix = window.location.pathname.substr( 0, window.location.pathname.toLowerCase().lastIndexOf( "/extensions" ) + 1 );
var config = {
	host: window.location.hostname,
	prefix: prefix,
	port: window.location.port,
	isSecure: window.location.protocol === "https:"
};
require.config( {
	baseUrl: ( config.isSecure ? "https://" : "http://" ) + config.host + (config.port ? ":" + config.port: "") + config.prefix + "resources"
} );

require( ["js/qlik"], function ( qlik ) {
		$("#hideSelections").click(function() {
			$( "#selectionAppSelections" ).toggle();
		});
		$("#hideSelections").click(function() {
			$( "#analysisText" ).toggle();
		});
		$("#hideSelections").click(function() {
			$( "#selectionAppDash" ).toggle();
		});
		$("#hideSelections").click(function() {
			$( "#appNav" ).toggle();
		});
		
		$("#hideSelections").click(function() {
		$("#IFrameDiv iframe").toggleClass('short');
		});
		$("#hideSelections").click(function() {
		$("#IFrameDiv iframe").toggleClass('tall');
		});
			

	qlik.setOnError( function ( error ) { alert( error.message ); });
/*   <---CHANGE SUMMARY APP ID HERE--->   */	
	var summaryAppID = 'ea49d1f0-e4dd-4918-b139-362735cdeab7';
	var app = qlik.openApp(summaryAppID);

	app.getObject('selectionAppSelections', 'CurrentSelections');
/*   <---CHANGE SUMMARY FILTER BOX ID HERE--->   */	
	app.getObject('selectionAppDash','wAGQ'); //
	app.getObject('appNav', 'AppNavigationBar', { 
/*   <---CHANGE DETAILS TEMPLATE SHEET ID HERE--->   */
		sheetId: "wAGQ", openAppCallback: function ( appId, targetSheetId ) {
/*   <---CHANGE DETAILS TEMPLATE SHEET ID HERE--->   */
			var defaultSheetID = "wAGQ";

			var iframeHTML = document.getElementById('generatedIFrame');
			iframeHTML.src = (config.isSecure ? "https://" : "http://" ) + config.host + (config.port ? ":" + config.port : "" ) + "/sense/app/" + appId + "/sheet/" + defaultSheetID + "/state/analysis/options/clearselections";
			console.log("Generated app ID: " + appId + " and target sheetID is: " + targetSheetId);
			console.log("Generated Link: " + iframeHTML.src);
		}
  	});
	$("#resetAnalysis").click(function(){
		app.clearAll();
        var iframeHTML = document.getElementById('generatedIFrame');
/*   <---CHANGE SUMMARY APP URL HERE--->   */
		iframeHTML.src = 'https://sensedemo7/single/?appid=ea49d1f0-e4dd-4918-b139-362735cdeab7&sheet=wAGQ';
    });
} );