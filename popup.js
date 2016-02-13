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

function clearData() {
    chrome.storage.sync.clear();
}

function saveTabs() {

    chrome.tabs.query({currentWindow: true}, function(tabs) {
        var urlArray = [];
        for (var i = 0; i < tabs.length; i++) {
            urlArray.push(tabs[i].url);
        }

        if (typeof numSaved() != 'undefined') {
            var saveString = numSaved().toString;
            chrome.storage.sync.set({saveString: urlArray});
        } else {
            chrome.storage.sync.set({"0": urlArray});
        }

        reloadButtons();

    });
}

function printDetails() {
    chrome.storage.sync.get(null, function(allObjects) {
        console.log(Object.keys(allObjects).length);
        console.log(allObjects);
    });
}

function numSaved() {
    chrome.storage.sync.get(null, function(allObjects) {
        console.log(Object.keys(allObjects).length);
        return Object.keys(allObjects).length;
    });
}

function reloadButtons() {
    for (var i = 0; i < numSaved(); i++) {
        var button = document.createElement("input");
        button.type = "button";
        button.value = i.toString();
        button.addEventListener('click', function(){
            chrome.storage.sync.get(button.value, function(urlArray) {
                console.log(urlArray);
            });
        });
        // button.onclick = function(i) {
        //     // var string = Integer.toString(i);
        //     chrome.storage.sync.get(i, function(urlArray) {
        //         console.log(urlArray);
        //         //chrome.windows.create({url: urlArray[i]});
        //     });
        // };
        document.body.appendChild(button);
    }
}

window.onload = function() {
    reloadButtons();
};

document.getElementById("duplicate").addEventListener('click', duplicateTabs);
document.getElementById("save").addEventListener('click', saveTabs);
document.getElementById("printDetails").addEventListener('click', printDetails);
document.getElementById("clearData").addEventListener('click', clearData);
