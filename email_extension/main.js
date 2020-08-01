//Searches each possible email combination in new tab

searchGoogle = function (word) {
    chrome.tabs.query({ windowType: 'normal' }, function (tabs) {
        chrome.tabs.query({ 'active': true, 'windowId': chrome.windows.WINDOW_ID_CURRENT },
            function (tabs) {
                var query = word.selectionText;
                var emailArray = setEmailFormats(word)
                let link = document.createElement('a');
                link.href = tabs[0].url;
                var hostname = link.hostname;
                hostname = setHostNameFormat(hostname)



                chrome.tabs.query({}, function (tabs) {
                    chrome.tabs.remove(tabs[tabs.length - 1].id);

                });
                chrome.tabs.create({ url: "https://www.google.com/search?q=" + "'" + emailArray[2] + '@' + hostname + "'" + "&rlz=1C1SQJL_enUS858US864&oq=hey&aqs=chrome.0.69i59l2j0j46j0j46l2j0.402j1j9&sourceid=chrome&ie=UTF-8" });


            }
        );



    });

};


setEmailFormats = function (word) {
    var query = word.selectionText;
    query = query.toLowerCase()
    var array = []

    var firstNameLastName = query.split(" ").join("")
    var firstName = query.split(' ')[0];
    var lastName = query.split(' ')[1];
    var firstNameDotLastName = firstName + '.' + lastName



    array.push(query);
    array.push(firstNameLastName);
    array.push(firstName, lastName);
    array.push(lastName);
    array.push(firstNameDotLastName)

    return array
}

setHostNameFormat = function (hostname) {
    if (hostname.includes("www.")) {
        hostname = hostname.substring(hostname.indexOf(".") + 1);
    }
    if (hostname.includes("google.com")) {
        hostname = "gmail.com"
    }
    if (hostname.includes("en.")) {
        hostname = hostname.substring(hostname.indexOf(".") + 1);
    }
    return hostname


}

chrome.contextMenus.create({
    title: "Search in Google",
    contexts: ["selection"],  // ContextType
    onclick: searchGoogle // A callback function
});
