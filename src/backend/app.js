const express = require('express');
const path = require('path');
const app = express();
const db = require('./db');
const port = process.env.PORT || 3001;

db.connect().then(dbo => {
    app.get('/rest/events', (req, res) => {
        dbo.collection('events').find({}).toArray((err, results) => {
            if(err) throw err;
            res.send(results);
        });
    });

    app.use(express.static(path.join(__dirname, '../../build')));

    app.get('*', function (req, res) {
        res.sendFile(path.join(__dirname, '../../build', 'index.html'));
    });

    app.listen(port, () => console.log(`Example app listening on port ${port}!`));
});