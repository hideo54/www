import axios from 'axios';
import cheerio from 'cheerio';
import fs from 'fs/promises';
import { Storage } from '@google-cloud/storage';
import dayjs from 'dayjs';

const storage = new Storage({keyFilename: 'key.json'});

const url = 'https://github.com/hideo54';

const saveGrossSvg = async () => {
    const html = (await axios.get(url)).data;
    const $ = cheerio.load(html);
    const svg = $('svg.js-calendar-graph-svg');
    const svgStr = $.html(svg);
    await fs.writeFile('tmp.svg', svgStr);
    if (process.env.NODE_ENV === 'development') {
        const filename = dayjs().format('YYYY-MM-DD');
        await storage.bucket('img.hideo54.com').upload('tmp.svg', {
            destination: `github-gross/${filename}.svg`,
            public: true,
        });
    }
};

saveGrossSvg();
