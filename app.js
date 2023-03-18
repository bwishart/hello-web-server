require('dotenv').config()
const express = require('express')


const app = express()
app.use(express.json());

// JSON body logger middleware, logs incoming json bodies
// app.use((req, res, next) => {
//     console.log("Request body:");
//     console.log(JSON.stringify(req.body));
//     next();
// });

// debugger

// Define the ports
const PORT                  = process.env.PORT;

const index = '<ul><p>Hello World!</p>\
                   <li><a href="/help">/help</a></li>\
                   <li><a href="/help?qs=somevalue">/help?qs=somevalue</a></li>\
                   </ul>'


app.get('', (req, res) => {
    console.log('GET /')
    res.send(index)
})

app.get('/help', (req, res) => {
    console.log('GET /help')
    // console.log('req:', req)
    console.log('query', req.query)
    let response = '<h2>Help page</h2>'
    
    if (req.query.qs) {
        const qs = req.query.qs
        response = response + '<p>qs:' + JSON.stringify(qs)
    }
    res.send(response)
})


app.get('*', (req, res) => {
    res.sendStatus(404)
    res.send({
        msg: 'URL not found'
    })
})

app.listen(PORT, () => {
    console.log('Server is up on port ' + PORT.toString())
})

