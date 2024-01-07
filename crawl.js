const {JSDOM} = require('jsdom')

function normalizeURL(url) {
    const urlObject = new URL(url);
    let fullPath = `${urlObject.hostname}${urlObject.pathname}`;
    if (fullPath.length > 0 && fullPath.slice(-1) === '/') {
        fullPath = fullPath.slice(0, -1);
    }
    return fullPath;
}

// Maybe needs fixing?
function getURLsFromHTML(htmlBody, baseURL) {
    const dom = new JSDOM(htmlBody);
    const links = [...dom.window.document.querySelectorAll('a')];
    const rawUrls = links.map(link => link.href);
    const urls = [];
    for (rawUrl of rawUrls) {
        if (rawUrl.startsWith('/')) {
            urls.push(`${baseURL}${rawUrl}`);
        } else if (rawUrl.startsWith('http')) {
            urls.push(rawUrl);
        }
    }
    return urls;
}

module.exports = {
    normalizeURL, getURLsFromHTML
}
