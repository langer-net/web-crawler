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
    for (const rawUrl of rawUrls) {
        if (rawUrl.startsWith('/')) {
            urls.push(`${baseURL}${rawUrl}`);
        } else if (rawUrl.startsWith('http')) {
            urls.push(rawUrl);
        }
    }
    return urls;
}

async function crawlPage(currentUrl) {
    console.log(`Crawling ${currentUrl}`)

    try {
        const response = await fetch(currentUrl);
        if (!response.status > 399) {
            console.error(`Got HTTP error, status code: ${response.status}`);
            return;
        }

        const contentType = response.headers.get('content-type');
        if (!contentType.includes('text/html')){
            console.error(`Got non-HTML response: ${contentType}`);
            return;
        }

        const data = await response.text();
        console.log(data);

    } catch (err) {
        console.error(err.message);
    }
}

module.exports = {
    normalizeURL, getURLsFromHTML, crawlPage
}
