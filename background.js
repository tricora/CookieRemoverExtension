chrome.browserAction.onClicked.addListener(function(tab) {
    chrome.cookies.getAll({
        url: tab.url
    }, function(cookies) {
        var url = new URL(tab.url);
        var domain = url.hostname;
        if (cookies.length === 0) {
            alert(`"${domain}"\nNo cookies found for this domain.`);
            return;
        }
        if (confirm(`"${domain}"\nDo you want to remove all cookies for this domain?`)) {
            cookies.forEach(function(cookie) {
                chrome.cookies.remove({
                    url: url.origin,
                    name: cookie.name
                });
            });
        }
    });
});