const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const http = require('http').Server(app);
const {port} = require('./config/settings');

global.Models = require('./config/models');
const cors = require('cors');

(async () => {
    try {
        app.use(cors());
        app.use(bodyParser.urlencoded({extended: true}));
        app.use(bodyParser.json());
        
        app.use(express.static('assets'));
        require('./config/routes')(app, express);

        http.listen(port, () => {
            console.log(`listening on *:${port}`);
        });
    } catch (err) {
        console.log(err);
    }
})();
