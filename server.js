const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const port = process.env.PORT || 5000;
const app = express();


const returnParseDate = (domain) => { 
    console.log(domain);
    return domain;
}




app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/parseData', (req, res) => { 
    const domain = req.query.domain;
    const readyData = returnParseDate(domain);
    res.send(readyData);
});

app.listen(port, () => console.log(`Listening on port ${port}`));