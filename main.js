const {crawlPage} = require('./crawl.js')

function main() {
    const numArgs = process.argv.length;
    if (numArgs < 3) {
        console.error('ERROR: Please provide a URL');
        process.exit(1);
    } else if (numArgs > 3) {
        console.error('ERROR: Too many arguments! Please provide only one URL.')
        process.exit(1)
    }

    const baseURL = process.argv[2];
    console.log(`Crawler starts processing: ${baseURL}`);

    crawlPage(baseURL);
}

main();