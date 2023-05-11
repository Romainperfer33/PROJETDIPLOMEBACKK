    const express = require('express')
    const app = express()
    const morgan = require('morgan')
    const sequelize = require('./db/sequelize')
    const port = 3000
    
    sequelize.initDb();

    app
        .use(morgan('dev'))
        .use(express.json())

    const stageRouter = require ('./routes/stageRoutes')
    const userRouter = require ('./routes/userRoutes')

    app.use('/api/stages', stageRouter)
    app.use('/api/users', userRouter)
    
    app.listen(port, () => {
        console.log(`L'app sur le port ${port}`)
    })