    const express = require('express')
    const app = express()
    const morgan = require('morgan')
    const sequelize = require('./db/sequelize')
    const port = 3000
    
    app.get('/', (req, res) => {
      res.send('Hello World!');
    });

    sequelize.initDb();

    app
        .use(morgan('dev'))
        .use(express.json())
    
    app.listen(port, () => {
        console.log(`L'app sur le port ${port}`)
    })