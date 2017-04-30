// background.js

chrome.tabs.onUpdated.addListener( function (tabId, changeInfo, tab) {
  if (changeInfo.status == 'loading') {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      var activeTab = tabs[0];
      chrome.tabs.sendMessage(activeTab.id, {"message": "tab-update"});
    });

  chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if( request.message === "url-message" ) {
      var url = request.url;
      var check = "https://www.youtube.com/watch?v=";
      var pos = url.indexOf(check);
      if(pos == 0) {
        chrome.browserAction.setIcon({
        path: "iconGreen.png"});
      }
      else {
        chrome.browserAction.setIcon({
        path: "icon.png"});
    }
    }}); 
  }  
});

// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function(tab) {
  // Send a message to the active tab
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, {"message": "clicked_browser_action"});
  });
});

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
   
    if( request.message === "download-url" ) {
      var apiCall = "http://www.youtubeinmp3.com/fetch/?format=JSON&video="
      var complete = apiCall + request.url;
      //alert(complete);
      $.getJSON(complete, function(json) {
        //alert(json.link);
          chrome.tabs.create({"url": json.link});
      });
    }
  }
);
