const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');

app.use(cors())
app.get('/absences', (req, res) => {
    res.sendFile(path.join(__dirname, './json_files/absences.json'));
});
app.get('/members', (req, res) => {
    res.sendFile(path.join(__dirname, './json_files/members.json'));
});

app.listen(5000, () => console.log(`connected to the server!`));