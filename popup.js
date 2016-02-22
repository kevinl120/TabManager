




// JAVASCRIPT CODE BELOW


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

        numSaved(function(num) {
            var key = num;
            var obj = {};
            obj[key] = urlArray;
            chrome.storage.sync.set(obj)
        });

        reloadButtons();

    });
}

function printDetails() {
    numSaved(function(numSaved) {
        console.log(numSaved);
    });
    chrome.storage.sync.get(null, function(allObjects) {
        //console.log(Object.keys(allObjects).length);
        console.log(allObjects);
    });
}

function numSaved(callback) {
    chrome.storage.sync.get(null, function(allObjects) {
        callback(Object.keys(allObjects).length);
    });
}

function reloadButtons() {
    // numSaved(function(num) {
    //     for (var i = 0; i < num; i++) {
    //         var button = document.createElement("input");
    //         button.type = "button";
    //         button.value = i;
    //         button.id = i.toString();
    //         button.addEventListener('click', function() {
    //             chrome.storage.sync.get(button.value, function(urlArray) {
    //                 chrome.windows.create({url: urlArray});
    //             })
    //         });
    //         document.body.appendChild(button);
    //     }
    // });
}

window.onload = function() {
    document.getElementById("duplicateTabs").addEventListener("click", duplicateTabs);
    document.getElementById("saveTabs").addEventListener("click", saveTabs);
    document.getElementById("printDetails").addEventListener("click", printDetails);
    document.getElementById("clearData").addEventListener("click", clearData);
    //reloadButtons();
};
