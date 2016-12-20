import path from 'path';
import express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import HelloComponent from './app/component.jsx';

const app = express();

app.get('/', function(req, res) {
  var AppComponent = ReactDOMServer.renderToString(<HelloComponent name="andorx" />);
  res.render(path.resolve(__dirname, './build/index.ejs'), {
    reactOutput: AppComponent
  });
});
app.use(express.static('build'));

var PORT = 3000;

app.listen(PORT, function() {
  console.log('Server is listening at ' + PORT);
});