let currentCode = "", csm = null;


chrome.storage.sync.get(["text"], function ({text}) {
    console.log(text);
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        if (request.newText || request.reset) {
            console.log("UPDATING CODE");
            currentCode = request.newText;
            chrome.tabs.getSelected(null, function(tab) {
                var code = 'window.location.reload();';
                chrome.tabs.executeScript(tab.id, {code: code});
                sendResponse();
            });

        }
        if (request.code) {
            console.log("SENDING CODE");
            sendResponse(currentCode || text);
        }
    });
});



