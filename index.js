const fetch = require('node-fetch');
const convert = require('xml-js');
const express = require('express');
const cors = require('cors')

const app = express();
app.use(cors());
const port = 3000;

app.get('/api', async (req, res) => {
    const url = req.query.url;
    console.log(url);
    const data = await hentData(url);
    res.json(JSON.parse(data));
})
  
  app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`)
})

const hentData = async (url) => {
    const svar = await fetch(url);
    const xml = await svar.text();
    const data = convert.xml2json(xml, {compact: true, spaces: 4});
    return data;
}

hentData("https://data.stortinget.no/eksport/stortingsperioder");
