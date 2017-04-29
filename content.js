// content.js
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if( request.message === "clicked_browser_action" ) {
      //var firstHref = $("a[href^='http']").eq(0).attr("href");
      var firstHref = $(location).attr('href'); //Getting current URL
      console.log(firstHref);

      // This line is new!
      
      //check if url is https://www.youtube.com/watch?v=
      var check = "https://www.youtube.com/watch?v="
      var pos = firstHref.indexOf(check);
      //console.log(pos);
      if(pos == 0) {
        
        chrome.runtime.sendMessage({"message": "download-url", "url": firstHref});
      }
    }
  }
);