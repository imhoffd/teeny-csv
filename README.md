# teeny-csv

Trying to be the teeny-tiniest CSV library possible. Currently 382B.

- Only parses single CSV rows at a time.
- Absolutely no options to change the following parsing rules:
  - Commas (`,`) to separate values
  - Double quotes (`"`) allowed to wrap values with commas in them
  - Escaped double quotes (`\"`) allowed within double quotes for the literal `"` character
- Handles BOMs but probably shouldn't (see https://github.com/imhoffd/teeny-csv/pull/1).
- No helpful errors.
- In general, make your CSVs better if you want to use `teensy-csv`.
- No, there aren't TypeScript types.
- Only accepting PRs that make `teeny-csv` teenier, not better.

## Install

```
npm i teeny-csv
```

## Usage

This Node example uses `readline` to read a CSV file into an array of objects keyed by header.

```javascript
const fs = require('fs');
const readline = require('readline');
const parse = require('teeny-csv');

const rs = fs.createReadStream('path/to/file.csv', { encoding: 'utf8' });
const rl = readline.createInterface({ input: rs });

// first iteration to get an array of headers (usually the first row of CSV files)
const it = rl[Symbol.asyncIterator]();
const { value } = await it.next();
const headers = parse(value);

// iterate through the rest of the file and add each row as an object in our data array
const data = [];
for await (const line of it) {
  const result = parse(line);
  data.push(Object.fromEntries(headers.map((header, i) => [header, result[i]])));
}
```
