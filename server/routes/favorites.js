var express = require('express');
var router = express.Router();
var bodyParser = require("body-parser");
var path = require('path');
var pg = require('pg');
var app = express();
var connectionString = 'postgres://localhost:5432/adoptpet'

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
})); //probably not needed
//bring in favorites
router.get('/', function(req, res) {
    //var results = [];
    console.log("GET /favorites/");
    pg.connect(connectionString, function(err, client, done) {
        if (err) {
            console.log("Database connction failed");
            res.sendStatus(500);
        }

        client.query('SELECT * FROM favorites', function(err, result) {
            done();

            if (err) {
                console.log("Query failed: ", err);
                res.sendStatus(500);
            }
            console.log("result: ", result.rows);
            res.send(result.rows);
        })
    })
});


router.post('/', function(req, res) {
    var pet = req.body;

    var Favorite = {
        id: pet.id,
        name: pet.name,
        description: pet.description,
   };

    pg.connect(connectionString, function(err, client, done) {
        if (err) {
            res.sendStatus(500);
        }

        client.query('INSERT INTO adoptpet (petid, petname, petdescription) ' +
            'VALUES ($1, $2, $3)', [Favorite.id, Favorite.name, Favorite.description],
            function(err, result) {
                done();

                if (err) {
                    res.sendStatus(500);
                } else {
                    res.sendStatus(201);
                }
            });
    });
});


module.exports = router;
