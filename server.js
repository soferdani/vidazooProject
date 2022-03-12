const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const port = process.env.PORT || 5000;
const app = express();
const axios = require('axios');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

const returnParseDate = async (domain) => { 
    const rowAds = await axios.get(`https://${domain}/ads.txt`)
    const parseData = {}
    rowAds.data.split('\n').forEach(element => { 
        if (element.includes('.')) {
            const domainName = element.split(',')[0]
            if (!domainName.includes('#')) {       
                if (Object.keys(parseData).includes(domainName)) {
                    parseData[domainName] += 1
                } else {
                    parseData[domainName] = 1
                }
            }
        }
    });
    return parseData;
}

app.post('/parseData', async (req, res) => { 
    try {
        const domain = req.body.domain;
        const readyData = await returnParseDate(domain);
        res.send(readyData);
    } catch (error) { 
        res.send("error");
    }
});

app.listen(port, () => console.log(`Listening on port ${port}`));