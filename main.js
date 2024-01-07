const {formatBaseURL, crawlPage} = require('./crawl.js')
const {printReport} = require('./report.js')

async function main() {
    const numArgs = process.argv.length;
    if (numArgs < 3) {
        console.error('ERROR: Please provide a URL');
        process.exit(1);
    } else if (numArgs > 3) {
        console.error('ERROR: Too many arguments! Please provide only one URL.');
        process.exit(1);
    }

    const baseURL = formatBaseURL(process.argv[2]);
    console.log(`Crawler starts processing: ${baseURL}`);

    const pages = await crawlPage(baseURL, baseURL, {});
    printReport(pages);

    process.exit(0);
}

main();