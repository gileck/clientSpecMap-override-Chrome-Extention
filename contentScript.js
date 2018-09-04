// const code = `
// window.rendererModel.clientSpecMap[1986].appFields.platform.viewerScriptUrl = {
//     controllers: {
//         "c1": "https://localhost:5000/platformApp/controllers/controller1.js",
//         "c2": "https://localhost:5000/platformApp/controllers/controller2.js",
//         "c3": "https://localhost:5000/platformApp/controllers/controller3.js"
//     }
// };
// `;
// const file = chrome.extension.getURL('file.js');

// chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
//     console.log("Received %o from %o, frame", msg, sender.tab, sender.frameId);
//     sendResponse("Gotcha!");
// });
//
//
// chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
//     console.log({request});
//     sendResponse({farewell: "sads"})
// });

// chrome.runtime.sendMessage({greeting: "hello"}, function(response) {
//     console.log(response);
// });
chrome.runtime.sendMessage({code: true},function(code) {
//console.log(window.rendererModel);



    if (!code) return;
    console.log("EXECUTING CODE");
    console.log(code);
    var body = document.getElementsByTagName('body')[0];
    var s = document.createElement('script');
    s.setAttribute('type', 'text/javascript');
    s.innerHTML = code;
// s.setAttribute('src', file);
    body.appendChild(s);
});





