//////////STATUS CHANGER
// Creator: Misza13
// Credits: Voyagerfan5761 for some minor improvements
//     Modified by Xenocidic to simply use /Status as a one word indicator,
//     Modified by Kraftlos to include Sleep status
//     Modified by APerson for compatibility with {{UserStatus}}
//     Modified by RhinosF1 for compatibility with his script.
// compatible with {{User:RhinosF1/Template/StatusMonitor}}
$(function() {
  var wgUserName = mw.config.get("wgUserName");
  var wgServer = mw.config.get("wgServer");
  var wgScript = mw.config.get("wgScript");
  //Check if the config is defined
  if (typeof(statusChangerConfig) == 'undefined') {
    statusChangerConfig = {};
  }
  var setMessage = function(stat) {
    var message = stat;
    switch (message) {
      case "zzz":
        message = "asleep";
        break;
      case "BOW-A":
        message = "very busy dealing with something on-wiki";
        break;
      case "BOW-R":
        message = "very busy dealing with something on-wiki";
        break;
      case "AFK-A":
        message = "around";
        break;
      case "AFK-R":
        message = "around";
        break;
      case "WB":
        message = "on wikibreak";
        break;
      case "on":
        message = "online"
        break;
      case "off":
        message = "offline"
        break;
    }
    return message;
  };

  if (typeof(statusChangerConfig.statusList) == 'undefined') {
    statusChangerConfig.statusList = ['on', 'off', 'zzz', 'AFK-A', 'AFK-R', 'BOW-A', 'BOW-R', 'WB'];
  }

  if (typeof(statusChangerConfig.statusPage) == 'undefined') {
    statusChangerConfig.statusPage = 'User:' + wgUserName + '/Status';
  }
  var msg;
  //Add the links
  for (var i = 0; i < statusChangerConfig.statusList.length; i++) {
    var stat = statusChangerConfig.statusList[i];
    msg = setMessage(stat);
    mw.util.addPortletLink(
      "p-personal", //target tab - personal links
      wgServer + wgScript + "?title=" + statusChangerConfig.statusPage + "&action=submit&newstatus=" + stat, //link URL
      stat, //link text
      "pt-status-" + stat, //id of new button
      "I'm " + msg + "!", //hover text
      "", //???
      document.getElementById("pt-logout")); //add before logout button
  }

  if (location.href.indexOf("&action=submit&newstatus=") == -1) return; //Are we here to auto-edit the status?
  //Get new status
  statusRegExp = /&action=submit&newstatus=(.*)/;
  var status = statusRegExp.exec(location.href)[1];
  //Modify the form
  document.getElementById('wpTextbox1').value = status;
  msg = setMessage(status);
  if (status == "sleep") {
    status = "sleeping";
  }

  document.getElementById('wpSummary').value = wgUserName + " is now " + msg + ".";
  document.getElementById('wpMinoredit').checked = true;
  //Submit it!
  document.getElementById('editform').submit();
});

//[[Category:Wikipedia scripts|statusChanger]]
