function duplicateTabs() {
    chrome.tabs.query({currentWindow: true}, function(tabs) {
        var urlArray = [];
        for (var i = 0; i < tabs.length; i++) {
            urlArray.push(tabs[i].url);
        }
        chrome.windows.create({url: urlArray});
    });
    // chrome.windows.getCurrent(null, function(window) {
    //     console.log(window);
    //     //chrome.windows.create({url: 'http://www.google.com'});
    //     console.log(window.tabs);
    //     chrome.extension.sendRequest({tabs: window.tabs});
    // })
}

function saveTabs() {

    chrome.storage.sync.clear();

    chrome.tabs.query({currentWindow: true}, function(tabs) {
        var urlArray = [];
        for (var i = 0; i < tabs.length; i++) {
            urlArray.push(tabs[i].url);
        }

        chrome.storage.sync.set({"1": urlArray});

    });
}

function openSaved() {
    chrome.storage.sync.get("1", function(urlArray) {
        console.log(urlArray);
        chrome.windows.create({url: urlArray[1]});
    });
}

document.getElementById("duplicate").addEventListener('click', duplicateTabs);
document.getElementById("save").addEventListener('click', saveTabs);
document.getElementById("openSave").addEventListener('click', openSaved);
