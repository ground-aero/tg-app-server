const express = require('express');
const cors = require('cors');
const events = require('events');
const ws = require('ws');

const emitter = new events.EventEmitter();

const PORT = 4000;

const app = express();

app.use(cors());
app.use(express.json());

// Всем участникам чата возвращается ответ, что был создан новый чат
app.get('/get-messages', (req, res) => {
    emitter.once('newMessage', (message) => {
        res.json(message)
    })
})

app.post('/new-messages', (req, res) => {
    const message = req.body;

    emitter.emit('newMessage', message)
    res.status(200)
})

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));