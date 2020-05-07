const express = require('express');
const datastore = require('nedb');

const app = express();
app.listen(3000, () => { });
app.use(express.static('public'));
app.use(express.json());

const database = new datastore('database.db');
database.loadDatabase();

app.post('/api', (request, response) => {
    const data = request.body;
    const timestamp = Date.now();
    data.timestamp = timestamp;
    database.insert(data);
    
    response.json({
        success: "ok",
        lat: data.latitude,
        lon: data.longitude,
        timestamp : timestamp,
        image64 : data.image64
    });
});

app.get('/api',(request, response) =>{
    database.find({},(err,data) => {
        if (err){
            response.end();
            return;
        }
        response.json(data);
    });    
});