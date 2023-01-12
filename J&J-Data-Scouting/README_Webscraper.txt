Documentation for the Web Scraper

-------------------------------------------------------------------------------
Installation & basic use

First in order to run this software you will need Python3 installed on your machine.
You will also need several Python3 Libraries which are listed bellow
	scrapy
	numpy
	pandas
	pickle
	xlsxwriter
These can be installed with pip


There are currently two manual ways to run the web scraper. 
It will be run automatically when triggered by the backend, after data is input through the front end
	Option 1:
		Manually input one websites name and URL into scrape.py
		The data will then be printed out into the console
	Option 2:
		Place an excel file into the root directory and and run random_scrape.py - which then automatically runs oneCall.py
		The name of the file is kind of misleading, it can be structured instead of random
		Use RPI_Dataset.xlsx as an example for the format of the excel
		Line 83 is where you set the name of the file you want to read in
		Lines 87 & 88 are used to scrape all websites in the file
		Lines 92 & 93 are used to scrape a predetermined number of random websites form the file

In order to run either of the above programs you would use the following commands
	python3 scrape.py
	python3 random_scrape.py






-------------------------------------------------------------------------------
An basic explanation of the web scraper - in case you want to change anything
	Both webscraper files have additional comments in them as well for more detailed explanation

The web scraper itself is located in two different documents depending on which of the two options you chose in the first section
Those file being...
	scrape.py & oneCall.py

Currently the code in both only differs in how they output data. 
The scraping functionality of both works exactly the same way.
As such only scrape.py will be explained, but all of its information can be used on oneCall.py too

---------------------------------------
Options to change within scrape.py

The first option to change is dataset which websites will be pulled from
	Line 172

The second option to change is the websites name and URL
	Lines 184 & 185

The third option to change is how long the web scraper will spend on one website. The default is 60 seconds because this seems to be an adequate amount of time to find a good amount of data without taking too long. 
	Line 196