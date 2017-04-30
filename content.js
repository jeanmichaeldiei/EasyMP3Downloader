// content.js


chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if( request.message === "clicked_browser_action" ) {
      //Checking if URL is valid
      var firstHref = $(location).attr('href'); //Getting current URL
      console.log(firstHref);

      var check = "https://www.youtube.com/watch?v="
      var pos = firstHref.indexOf(check);
      if(pos == 0) {
        chrome.runtime.sendMessage({"message": "download-url", "url": firstHref});
      }
    }
    else if( request.message === "tab-update") {
        chrome.runtime.sendMessage({"message": "url-message", "url": document.location.href});
      }
  }
);