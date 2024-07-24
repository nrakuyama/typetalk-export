import fs from 'fs';
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import { parse } from 'csv-parse/sync';
import got from 'got';

const getStdin = async () => {
  for await (const chunk of process.stdin) {
    const input = chunk.toString().trim();
    if (input) return input;
  }
};

const parseArgs = () => {
  return yargs(hideBin(process.argv))
    .options({
      csvfile: {
        type: 'string',
        describe: 'path to attachments csv file',
        demandOption: true,
        alias: 'c'
      },
      output: {
        type: 'string',
        describe: 'directory to export attachment files',
        demandOption: false,
        default: './output',
        alias: 'o'
      }
    })
    .parseSync();
}

const main = async () => {
  const { csvfile, output } = parseArgs();
  const records = parse(fs.readFileSync(csvfile), { columns: true });

  console.log('Input token for Typetalk bot.');
  const token = await getStdin();
  const headers = { 'X-TYPETALK-TOKEN': token };

  fs.mkdirSync(output, { recursive: true });

  for (const r of records) {
    const url = r['添付ファイル URL (API)'];
    const title = r['添付ファイル名'];
    const rawBody = (await got.get(url, { headers })).rawBody;
    fs.writeFileSync(`${output}/${title}`, rawBody);
    console.log(title);
  }
}

main();
