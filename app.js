const express = require("express"),
		app = express(),
	  newsAPI = require("newsapi"),
	  ejs     = require("ejs"),
	  keys    = require("./config/keys.js"),
	  newsapi = new newsAPI(keys.NEWS_API.KEY);

app.set("view engine", "ejs");
app.use(express.static(__dirname + '/public'));


function GetFormattedDate() {
    var todayTime = new Date();
    var month = format(todayTime .getMonth() + 1);
    var day = format(todayTime .getDate());
    var year = format(todayTime .getFullYear());
    return month + "/" + day + "/" + year;
}
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