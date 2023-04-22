const express = require('express');
const path = require('path');
const { engine } = require('express-handlebars');

const app = express();
const port = process.env.port || 3000;

app.use(express.static(path.join(__dirname, './public')));

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, './views'));

app.get('/', (req, res) => {
  res.render('home', { meta_title: 'Tomato Timer' });
});

app.listen(port, () => {
  console.log(`App listening at: http://localhost:${port}`);
});
