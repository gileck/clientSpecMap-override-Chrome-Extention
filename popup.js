const exampleCode = `window.rendererModel.clientSpecMap[1986].appFields.platform.viewerScriptUrl = "https://localhost:5000/viewerscript.js"`;

document.getElementById('saveButton').addEventListener('click', () => {
    const text = document.getElementById('text').value;
    chrome.storage.sync.get(["history"], function ({history}) {
        if (!history) {
            history = [];
        }
        if (text && !history.includes(text)) {
            history.push(text);
        }
        chrome.storage.sync.set({text, history}, function () {
            console.log("saved");
            chrome.runtime.sendMessage({newText: text}, function (response) {
                window.close();
            });
        });
    });
});
document.getElementById('clearButton').addEventListener('click', () => {
    document.getElementById('text').value = "";
    chrome.runtime.sendMessage({reset: true}, function (response) {
        window.close();
    });
    chrome.storage.sync.set({text: ""}, function () {
    });
});

document.getElementById('cleanHistory').addEventListener('click', () => {
    chrome.storage.sync.set({history: []}, function () {
    });
});
document.getElementById('showHistory').addEventListener('click', () => {
    chrome.storage.sync.get(["history"], function ({history}) {
        document.getElementById('text').value = "";
        history.forEach(str => {
            document.getElementById('text').value = document.getElementById('text').value + str
            document.getElementById('text').value += "\n\n\n"
        })
        // document.getElementById('text').innerText = JSON.stringify(history);
    });
});
document.getElementById('exampleButton').addEventListener('click', () => {
    document.getElementById('text').value = exampleCode;
});
document.addEventListener('DOMContentLoaded', function () {
    chrome.storage.sync.get(["text", "history"], function ({text, history}) {
        console.log({history});
        if (text) {
            document.getElementById('text').value = text;
        }
    });
}, false);