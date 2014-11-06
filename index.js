var parse = require('csv-parse'),
  fs = require('fs'),
  http = require('http'),
  stringify = require('csv-stringify'),
  _ = require('lodash');

var shares = [];
var apiKey = 'WRITE YOUR API KEY HERE';

var file = fs.readFileSync('urls.csv');
parse(file, {
  columns: true,
}, function(err, rows) {
  rows.forEach(function(row, index) {
    var response = '';
    var url = 'http://free.sharedcount.com/?url=' + encodeURIComponent(row.url) + '&apikey=' + apiKey
    //console.log(url);
    http.get(url, function(res) {
      res.on('data', function(chunk) {
        response += chunk;
      });
      res.on('end', function(chunk) {
      	response = JSON.parse(response);
        row.stumble_upon = response.StumbleUpon;
        row.reddit = response.Reddit;
        row.facebook_shares = response.Facebook.share_count;
        row.facebook_likes = response.Facebook.like_count;
        row.facebook_comments = response.Facebook.comment_count;
        row.facebook_total = response.Facebook.total_count;
        row.delicious = response.Delicious;
        row.google_plus = response.GooglePlusOne;
        row.buzz = response.Buzz;
        row.twitter = response.Twitter;
        row.diggs = response.Diggs;
        row.pinterest = response.Pinterest;
        row.linkedin = response.LinkedIn;
        row.shares_total = response.StumbleUpon + response.Reddit + response.Facebook.share_count + response.Delicious + response.GooglePlusOne + response.Buzz + response.Twitter + response.Diggs + response.Pinterest + response.LinkedIn;
        shares.push(row);
        if (shares.length == rows.length) {
          shares = _.sortBy(shares, function(share) {
          	return share.shares_total;
          });
          shares.reverse();
          shares.unshift(Object.keys(row));
          stringify(shares, function(err, csv) {
            fs.writeFile('shares.csv', csv, function(err) {
              if (err) {
                console.log(err);
              } else {
                console.log("The file was saved!");
              }
            });
          });
        }
      });
    }).on('error', function(e) {
      console.log("Got error: " + e.message);
    });
  });
});
