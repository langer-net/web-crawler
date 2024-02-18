const {JSDOM} = require('jsdom')

function formatBaseURL(baseURL) {
    const urlObj = new URL(baseURL);
    let formattedURL = `${urlObj.protocol}//${urlObj.hostname}`;
    if (formattedURL.length > 0 && formattedURL.slice(-1) === '/') {
        formattedURL = formattedURL.slice(0, -1);
    }
    return formattedURL;
}

async function crawlPage(baseURL, currentURL, pages) {
    const baseURLObj = new URL(baseURL);
    const currentURLObj = new URL(currentURL);
    if (currentURLObj.hostname !== baseURLObj.hostname) {
        return pages;
    }

    const normalizedURL = normalizeURL(currentURL);
    if (pages[normalizedURL] > 0) {
        pages[normalizedURL]++;
        return pages
    }
    if (currentURL !== baseURL) {
        pages[normalizedURL] = 1;
    } else {
        pages[normalizedURL] = 0;
    }

    const htmlBody = await crawlCurrentPage(currentURL);

    let nextURLs = []
    if (htmlBody) {
        nextURLs = getURLsFromHTML(htmlBody, baseURL);
    }

    for (const nextURL of nextURLs) {
        pages = await crawlPage(baseURL, nextURL, pages);
    }

    return pages;
}

function normalizeURL(url) {
    const urlObj = new URL(url);
    let fullPath = `${urlObj.hostname}${urlObj.pathname}`;
    if (fullPath.length > 0 && fullPath.slice(-1) === '/') {
        fullPath = fullPath.slice(0, -1);
    }
    return fullPath;
}

async function crawlCurrentPage(currentURL) {
    console.log(`Currently crawling ${currentURL}`)

    try {
        const response = await fetch(currentURL);
        if (!response.status > 399) {
            console.log(`Got HTTP error, status code: ${response.status}`);
            return;
        }

        const contentType = response.headers.get('content-type');
        if (!contentType.includes('text/html')) {
            console.log(`Got non-HTML response: ${contentType}`);
            return;
        }

        return await response.text();

    } catch (err) {
        console.log(err.message);
    }
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

module.exports = {
    formatBaseURL, crawlPage, getURLsFromHTML, normalizeURL
}
