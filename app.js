const app     = require("express")(),
	  newsAPI = require("newsapi"),
	  keys    = require("./config/keys.js"),
	  newsapi = new newsAPI(keys.NEWS_API.KEY);

app.get("/", (req, res, next) => {
	res.send("Hi");
});

// To query /v2/everything
// You must include at least one q, source, or domain
newsapi.v2.everything({
	q: 'bitcoin',
	sources: 'bbc-news,the-verge',
	domains: 'bbc.co.uk, techcrunch.com',
	from: '2019-01-12', // YYYY/MM/DD
	to: '2019-02-01',
	language: 'en',
	sortBy: 'relevancy'
  }).then(response => {
	console.log(response);
	
	
  });

app.listen(keys.PORT, () => {
	console.log("Server running!");
});