const express = require('express');
const app = express();
const port = 3000;
const router = require('./server/routes');

app.use(express.json());

// Set up our routes
app.use('/reviews', router);

app.get('/reviews', (req, res) => res.json({ message: 'Hello World' }));

app.listen(port, () => console.log(`App listening on port ${port}!`));
