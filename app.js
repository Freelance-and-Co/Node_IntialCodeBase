const express = require('express');
const bodyParser = require('body-parser');
const createError = require('http-errors');
const cors = require('cors');
const IndexRoute = require('./routes');

class App{
    constructor(){
        this.app = express();
        this.StarterFunction();
    }

    async StarterFunction(){
        this.app.use(cors({
            origin: '*'
        }))
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));

        //default route
        this.app.get("/welcome", async (req, res, next) => {
            res.send({
                "status": 200,
                "message": "Hi Started Successfully"
            })
        })
        await new IndexRoute(this.app).intializeRoutes();

        // Handling Undefined route
        this.app.use(async (req, res, next) => {
            next(createError.NotFound("URL not found. Please enter valid URL"))
        })

        // Error Handler
        this.app.use((err, req, res, next) => {
            res.status(err.status || 500)
            res.send({
                "status": err.status || 500,
                "message": err.message
            })
        })
    }

    async listen() {
        this.app.listen(process.env.PORT, (err) => {
            if (err) {
                console.log("Error while running the express application", err);
            }
            else {
                console.log(`Express application running on port ${process.env.PORT}`);
            }
        })
    }
}

module.exports = App;