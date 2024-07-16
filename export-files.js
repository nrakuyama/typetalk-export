import fs from 'fs';
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import { parse } from 'csv-parse/sync';
import got from 'got';

const main = async () => {
  const args = yargs(hideBin(process.argv))
    .options({
      csvfile: {
        type: 'string',
        describe: 'path to attachments csv file',
        demandOption: true,
        alias: 'c'
      },
      token: {
        type: 'string',
        describe: 'token for Typetalk bot',
        demandOption: true,
        alias: 't'
      },
      output: {
        type: 'string',
        describe: 'directory to export attachment files',
        demandOption: false,
        default: '.',
        alias: 'o'
      }
    })
    .parseSync();

  const { csvfile, token, output }  = args;
  const records = parse(fs.readFileSync(csvfile), { columns: true });
  fs.mkdirSync(output, { recursive: true });
  const headers = { 'X-TYPETALK-TOKEN': token };

  for (const r of records) {
    const url = r['添付ファイル URL (API)'];
    const title = r['添付ファイル名'];
    const rawBody = (await got.get(url, { headers })).rawBody;
    fs.writeFileSync(`${output}/${title}`, rawBody);
    console.log(title);
  }
}

await main();
