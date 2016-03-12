// document.addEventListener('DOMContentLoaded', initDOM, false);

$(document).ready(initDOM);

function initDOM() {
    setUpCurrent();

    $(document).on("click", ".session", function() {
        if ($(this).parent().attr('id') === 'current') {
            chrome.windows.getCurrent({ populate: true }, function(window) {
                var windowData = {};
                windowData.tabs = [];
                window.tabs.forEach(function(tab) {
                    windowData.tabs.push({
                        url: tab.url,
                        title: tab.title,
                        favicon: (tab.favIconUrl !== '' && tab.favIconUrl !== undefined) ? tab.favIconUrl : '',
                        pinned: (tab.pinned) ? true : false
                    });
                });
                // windowData = JSON.stringify(windowData);
                // console.log(windowData);
                //  chrome.extension.sendRequest({tabs: windowData.tabs});
                // console.log(window.tabs);
            });
        }
        // var windowId = parseInt($(this).parent().parent().attr('id').substring(4),10);
        // chrome.extension.sendRequest({tabs: TCWindows[windowId].tabs});
    });
}

function getCurrentWindowData(callback) {

}

function setUpCurrent() {
    chrome.windows.getAll({ populate: true }, function(windows) {
        windows.forEach(function(currentWindow) {
            var winString = '<div class="session">';
            currentWindow.tabs.forEach(function(tab) {
                var favicon = (tab.favIconUrl !== '' && tab.favIconUrl !== undefined) ? tab.favIconUrl : 'chrome://favicon/' + tab.url;
                winString += '<img class="tabimg" src="' + favicon + '"/>';
            });
            winString += '</div>';
            $("#current").append(winString);
        });
    });
}


// OLD JAVASCRIPT CODE BELOW


// function duplicateTabs() {
//     chrome.tabs.query({currentWindow: true}, function(tabs) {
//         var urlArray = [];
//         for (var i = 0; i < tabs.length; i++) {
//             urlArray.push(tabs[i].url);
//         }
//         chrome.windows.create({url: urlArray});
//     });
//     // chrome.windows.getCurrent(null, function(window) {
//     //     console.log(window);
//     //     //chrome.windows.create({url: 'http://www.google.com'});
//     //     console.log(window.tabs);
//     //     chrome.extension.sendRequest({tabs: window.tabs});
//     // })
// }
//
// function clearData() {
//     chrome.storage.sync.clear();
//     reloadButtons();
// }
//
// function saveTabs() {
//     chrome.tabs.query({currentWindow: true}, function(tabs) {
//         var urlArray = [];
//         for (var i = 0; i < tabs.length; i++) {
//             urlArray.push(tabs[i].url);
//         }
//
//         numSaved(function(num) {
//             var key = num;
//             var obj = {};
//             obj[key] = urlArray;
//             chrome.storage.sync.set(obj);
//         });
//
//         //reloadButtons();
//
//     });
// }
//
// function printDetails() {
//     numSaved(function(numSaved) {
//         console.log(numSaved);
//     });
//     chrome.storage.sync.get(null, function(allObjects) {
//         //console.log(Object.keys(allObjects).length);
//         console.log(allObjects);
//     });
//     //reloadButtons();
// }
//
// function numSaved(callback) {
//     chrome.storage.sync.get(null, function(allObjects) {
//         callback(Object.keys(allObjects).length);
//     });
// }
//
// function reloadButtons() {
//     // window.location.reload();
//     // numSaved(function(num) {
//     //     for (var i = 0; i < num; i++) {
//     //         var button = document.createElement("input");
//     //         button.type = "button";
//     //         button.value = i;
//     //         button.id = i.toString();
//     //         button.addEventListener('click', function() {
//     //             chrome.storage.sync.get(button.value, function(urlArray) {
//     //                 chrome.windows.create({url: urlArray});
//     //             });
//     //         });
//     //         document.getElementById("buttonHolder").appendChild(button);
//     //     }
//     // });
// }
//
// window.onload = function() {
//     document.getElementById("duplicateTabs").addEventListener("click", duplicateTabs);
//     document.getElementById("saveTabs").addEventListener("click", saveTabs);
//     document.getElementById("printDetails").addEventListener("click", printDetails);
//     document.getElementById("clearData").addEventListener("click", clearData);
//     document.getElementById("reloadButtons").addEventListener("click", reloadButtons);
// };
