const express = require('express');
const path = require('path');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// not doing hbs or view engine setup quite yet, need
// to see how that would work with bootsrap/react

app.listen(3000);
