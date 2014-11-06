# CSV Share Counter

This simple node scripts reads a file called urls.csv and creates a list of the urls of the urls found from the url column. This list is iterated and sharedcount.com API is used to get the share counts for all of the urls. The sharedcount.com data is appended to the original csv and saved into a new csv called shares.csv

## Usage

- install node
- create your own urls.csv and overwrite the existing urls.csv with the urls in a column called url
- run the following commands
	npm install
	node index.js
- enjoy the results in shares.csv