const express = require("express"),
		app = express(),
	  newsAPI = require("newsapi"),
		ejs     = require("ejs"),
		keys    = require("./config/keys.js"),
		compromise = require("compromise"),
		brain = require("brain.js"),
		newsapi = new newsAPI(keys.NEWS_API.KEY);

app.set("view engine", "ejs");
app.use(express.static(__dirname + '/public'));

// const doc = nlp('dinosaur');
// doc.nouns().toPlural();
// console.log(doc.out('text'));

const network = new brain.NeuralNetwork();
network.train([
	{ input: [0, 0, 0], output: [0] },
	{ input: [0, 0, 1], output: [0] },
	{ input: [0, 1, 1], output: [0] },
	{ input: [1, 0, 1], output: [1] },
	{ input: [1, 1, 1], output: [1] }
]);

const output = network.run([0, 0, 1]);

console.log(`Probability: ${output}`);

// To query /v2/everything
// You must include at least one q, source, or domain
newsapi.v2.everything({
	sources: 'nytimes',
	domains: 'nytimes.com',
	from: '2019-01-16', // YYYY/MM/DD
	to: '2019-02-01',
	language: 'en',
	sortBy: 'relevancy'
  }).then(response => {
	  app.get("/", (req, res, next) => {
		res.render("index", 
		{
			response: response
		});
	  });
  });

app.listen(keys.PORT, () => {
	console.log(`Server running on port ${keys.PORT}!`);
});