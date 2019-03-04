//////////STATUS CHANGER
// Creator: Misza13
// Credits: Voyagerfan5761 for some minor improvements
//     Modified by Xenocidic to simply use /Status as a one word indicator,
//     Modified by Kraftlos to include Sleep status
//     Modified by APerson for compatibility with {{UserStatus}}
//     Modified by RhinosF1 for compatibility with his script.
// compatible with {{User:RhinosF1/Template/StatusMonitor}}
addOnloadHook(function (){
  //Check if the config is defined
  if (typeof(statusChangerConfig) == 'undefined') {
    statusChangerConfig = {}
  }
 
  if (typeof(statusChangerConfig.statusList) == 'undefined') {
      statusChangerConfig.statusList = [ 'online', 'offline', 'sleeping', 'around(A)', 'around(R)', 'BOW(A)', 'BOW(R)' ];
  }
 
  if (typeof(statusChangerConfig.statusPage) == 'undefined') {
      statusChangerConfig.statusPage = 'User:' + wgUserName + '/Status';
  }
 var message;
  //Add the links
  for (var i=0; i<statusChangerConfig.statusList.length; i++) {
    var stat = statusChangerConfig.statusList[i];
if (stat === "sleeping") {  message = "asleep" ;
}
 else if(stat === "BOW(A)") {  message = "busy dealing with something on-wiki" ; }
  else if (stat === "BOW(R)") {  message = "very busy dealing with something on-wiki" ; }
 else if (stat === "around(A)") {  message = "around" ;}
  else if (stat === "around(R)") {  message = "around";}
    else if (stat === "online") {  message = "online";}
    else if (stat === "offline") {  message = "offline";}
    addPortletLink(
      "p-personal", //target tab - personal links
      wgServer + wgScript + "?title=" + statusChangerConfig.statusPage + "&action=submit&newstatus=" + stat, //link URL
      stat, //link text
      "pt-status-" + stat, //id of new button
      "I'm " + message + "!", //hover text
      "", //???
      document.getElementById("pt-logout")); //add before logout button
  }
 
  if (location.href.indexOf("&action=submit&newstatus=") == -1) return; //Are we here to auto-edit the status?
  //Get new status
  statusRegExp = /&action=submit&newstatus=(.*)/;
  var status = statusRegExp.exec(location.href)[1];
  //Modify the form
  document.getElementById('wpTextbox1').value = status;
  if (status == "sleep")
  { status = "sleeping"; }
  document.getElementById('wpSummary').value = wgUserName + " is now " + message +".";
  document.getElementById('wpMinoredit').checked = true;
  //Submit it!
  document.getElementById('editform').submit();
});
 
//[[Category:Wikipedia scripts|statusChanger]]
