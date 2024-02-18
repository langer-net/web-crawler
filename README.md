# web-crawler

## Description

This project was an exercise for me to get a deeper understanding of working with JavaScript and URLs. This web crawler 
goes through all the internal links of a given web page and counts them. Finally, it outputs a report of the results in 
the console.

## Installation

To install the project on MacOS or Linux be sure to have Node.js and nmp installed.
The run the following commands:
```BASH
git clone https://github.com/langer-net/web-crawler
cd web-crawler
npm install
```

## Usage

To then run the project use the following command with the URL you want to have crawled:
```BASH
npm start 'https://url_to_crawl.com'
```

## Versions

This project uses Node.js v20.11.0 and npm 10.2.4.

## Dependencies

The two main dependencies are `jsdom` for access to many of the web standards and `jest` for testing. 

## Testing

To execute the tests, just run:
```BASH
npm test
```

## License

This project is licensed under MIT licence.