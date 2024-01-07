const {describe, test, expect} = require('@jest/globals');
const { sortPages } = require('../src/report.js')

describe('report module', () => {
    test('sortPages: example', () => {
        const input = {
            url1: 5,
            url2: 1,
            url3: 2,
            url4: 13,
            url5: 7
        }
        const actual = sortPages(input)
        const expected = [
            ['url4', 13],
            ['url5', 7],
            ['url1', 5],
            ['url3', 2],
            ['url2', 1]
        ]
        expect(actual).toEqual(expected)
    })

    test('sortPages: empty', () => {
        const input = {}
        const actual = sortPages(input)
        const expected = []
        expect(actual).toEqual(expected)
    })
})