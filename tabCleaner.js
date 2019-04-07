chrome.runtime.onInstalled.addListener(function() {
  console.log("Tabulous is running!");
});

// > Listen for Commands

chrome.commands.onCommand.addListener(command => {

// Checks if tab is unpinned => pins it. Else, checks if tab is pinned => unpins it.

  if (command === "pin-tab") {
  
    chrome.tabs.query({ active: true, currentWindow: true, pinned: false }, function(tab) {
      chrome.tabs.update(tab[0].id, { pinned: true });   
    });

    chrome.tabs.query({ active: true, currentWindow: true, pinned: true }, function(tab) {
      chrome.tabs.update(tab[0].id, { pinned: false });
    });
  }

  // Closes all unpinned tabs.

  if (command === "close-tabs") {
    console.log("closed unpinned tabs")
    chrome.tabs.query({ pinned: false }, function(tab) {
      tab.forEach(function(el) {
        chrome.tabs.remove(el.id);
      });
    });
  }

 // Pins all/Unpins all tabs.
 if (command === "pin-all") {
 
    chrome.tabs.query({ active: true, currentWindow: true, pinned: false }, function(tab) {
      chrome.tabs.query({ currentWindow: true }, 
        function(tab){
          tab.forEach(function(el){
            chrome.tabs.update(el.id, {pinned: true})})});
    });
 }

  if (command === "(un)pin-all") {
  
    chrome.tabs.query({ active: true, currentWindow: true, pinned: true }, function(tab) {
      chrome.tabs.query({ currentWindow: true }, 
        function(tab){
          tab.forEach(function(el){
            chrome.tabs.update(el.id, {pinned: false})})});
    });
 }

});

// > Context Menu Items

let closeUnpinnedTabs = {
  id: "closeUnpinnedTabs",
  title: "Close Unpinned Tabs",
  contexts: ["all"]
};

let pinAllToggle = {
  id: "pinToggle",
  title: "(Un)pin-all",
  contexts: ["all"]
};

chrome.contextMenus.create(closeUnpinnedTabs);

chrome.contextMenus.onClicked.addListener(function(clicked) {
  if (clicked.menuItemId === "closeUnpinnedTabs") {
    chrome.tabs.query({ pinned: false }, function(tab) {
      tab.forEach(function(el) {
        chrome.tabs.remove(el.id);
      });
    });
  }

  // ! Depracated
  // chrome.contextMenus.create(pinAllToggle);

  // if (clicked.menuItemId === "pinToggle") {
  //   chrome.tabs.query({ currentWindow: true }, function(tab) {
  //     tab.forEach(function(el) {
  //       if (el.pinned === false) {
  //         chrome.tabs.update(el.id, { pinned: true });
  //       } else
  //         tab.forEach(function(el) {
  //           chrome.tabs.update(el.id, { pinned: false });
  //         });
  //     });
  //   });
  // }
});
