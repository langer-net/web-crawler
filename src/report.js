function printReport(pages) {
    console.log('');
    console.log('------------------------------');
    console.log('REPORT')
    console.log('------------------------------');
    const sortedPages = sortPages(pages);
    for (const page of sortedPages) {
        const url = page[0];
        const count = page[1];
        console.log(`Found ${count} internal links to ${url}`)
    }
}

function sortPages(pages) {
    let pagesArr = Object.entries(pages);
    pagesArr.sort((pageA, pageB) => {
        return pageB[1] - pageA[1];
    });
    return pagesArr;
}

module.exports = {
    printReport, sortPages
}