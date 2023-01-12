import scrapy
from scrapy.crawler import CrawlerProcess
from scrapy.spiders import CrawlSpider, Rule
from scrapy.linkextractors import LinkExtractor
from scrapy.exceptions import CloseSpider
import numpy as np
import pandas as pd
import time
import json
import sys

keyIndiDict = {}
keyTargDict = {}
keyTechDict = {}

#Global Variables
#These variables can be expanded to include any type of HTML tag.
#These are only the lists used to store found items. 
#To add a new tag type to scrape you will need to add them in the web scraper bellow.
titleList = list()
descList = list()
textList = list()
h1textList = list()
h2textList = list()
h3textList = list()
h4textList = list()
h5textList = list()
mainDict = dict()
linkDict = dict()
startTime = 0.0
nowTime = 0.0
domainTime = 60

#a class to store information about a website
class site:
	def __init__(self, name, link):
		#All items with "self" are declared when creating the class
		self.name = name
		self.link = link
		self.domain = link[8:]
	#The following variables are used to store data within the class
	tempIndiDict = dict()
	tempTargDict = dict()
	tempTechDict = dict()
	indiList = list()
	targList = list()
	techList = list()
	#These variables are used to cap the amount of time the scraper will run on one website
	allIndi = 0
	allTarg = 0
	allTech = 0

#This is the class that scrapes websites
class bigScan(CrawlSpider):
	global domainTime, nowTime, startTime
	#This rule section allows you to add constraints to the scraper
	rules = (
		Rule(LinkExtractor(), callback='parse_item', follow=True),
	)

	def parse_item(self, response):
		#The scraper is set to look into each "div" element
		for sel in response.xpath('//div'):
			#These are the tags that are collected by the scraper
			#In order to add a new tag you need to make a new variable here following the given style
			#You will also need to make a new list.append() bellow, and a new list as a global variable above
			title = sel.xpath('a/text()').extract()
			desc = sel.xpath('text()').extract()
			text = sel.xpath('p/text()').extract()
			h1text = sel.xpath('h1/text()').extract()
			h2text = sel.xpath('h2/text()').extract()
			h3text = sel.xpath('h3/text()').extract()
			h4text = sel.xpath('h4/text()').extract()
			h5text = sel.xpath('h5/text()').extract()
			#The following ".append()" statements add the scraped data to global variables
			titleList.append(title)
			descList.append(desc)
			textList.append(text)
			h1textList.append(h1text)
			h2textList.append(h2text)
			h3textList.append(h3text)
			h4textList.append(h4text)
			h5textList.append(h5text)
		#This function checks how long the web scraper has been running and will stop it if the time exceeds the given time
		nowTime = time.perf_counter()
		if nowTime - startTime > domainTime:
			raise CloseSpider(reason='Time Limit Reached')


#Goes Through each sentence in the scraped data
def allFrequency(list, oneSite):
	for piece in list:
		freq(piece, site)

	#Counts frequency of a word or term (set of words) and stores them in a dictionary
def freq(strz, oneSite):
	for x in strz:
		#Check if each key indicator exists within the sentence
		for key in keyIndiDict:
			if key.lower() in x.lower():		#Make the sentence and the key all lower case
				if key in oneSite.tempIndiDict.keys():	#If the key is found then do one of two things
					oneSite.tempIndiDict[key] += 1 	#Option 1: If the key is already in the dictionary then increase its count by one
				else:
					oneSite.tempIndiDict[key] = 1 	#Option 2: if the key is not already in the dictionary then define it and set its value to one
		#The next two for loops work the same way as the first one
		for key in keyTargDict:
			if key.lower() in x.lower():
				if key in oneSite.tempTargDict.keys():
					oneSite.tempTargDict[key] += 1
				else:
					oneSite.tempTargDict[key] = 1 
		for key in keyTechDict:
			if key.lower() in x.lower():
				if key in oneSite.tempTechDict.keys():
					oneSite.tempTechDict[key] += 1
				else:
					oneSite.tempTechDict[key] = 1 

#Convert Pandas data structure to Dictionary
#This is used to read in the excel file data
def pandasToDict(pand):
	temp = pand.values.tolist()
	listLower = []
	for sublist in temp:
		for value in sublist:
			listLower.append(value.lower())
	return dict.fromkeys(listLower, 1)

#Convert the temporary dictionaries into lists of tuples
#The structure of the tuples are ("website name", "website URL")
def convertToList(oneSite):
	oneSite.indiList = [(k, v) for k, v in oneSite.tempIndiDict.items()]
	oneSite.targList = [(k, v) for k, v in oneSite.tempTargDict.items()]
	oneSite.techList = [(k, v) for k, v in oneSite.tempTechDict.items()]
	oneSite.indiList.sort(key=lambda x:x[1], reverse=True)
	oneSite.targList.sort(key=lambda x:x[1], reverse=True)
	oneSite.techList.sort(key=lambda x:x[1], reverse=True)

#Percentage frequency of terms based on how many times they appear in their list
#This function finds the percentage of how much a term appeared when compared to all of the other terms
#For example: Let's say "Assay" appeared 5 times out of a total of 23 terms. 5/23 = 0.2174 in frequency
def frequencyPercent(oneSite):
	#These for loops count the total number of terms in each of the three categories
	for x in oneSite.indiList:
		oneSite.allIndi += x[1]
	for x in oneSite.targList:
		oneSite.allTarg += x[1]
	for x in oneSite.techList:
		oneSite.allTech += x[1]
	#Each of these if statements walks through all of the terms in their respective categories,
	#and divides the number of times a term was found by the total number of terms
	if oneSite.allIndi > 0:
		for y in range(len(oneSite.indiList)):
			tmp = list(oneSite.indiList[y])
			tmp.append(round(oneSite.indiList[y][1]/oneSite.allIndi,3))
			oneSite.indiList[y] = tuple(tmp)
	if oneSite.allTarg > 0:
		for y in range(len(oneSite.targList)):
			tmp = list(oneSite.targList[y])
			tmp.append(round(oneSite.targList[y][1]/oneSite.allTarg,3))
			oneSite.targList[y] = tuple(tmp)
	if oneSite.allTech > 0:
		for y in range(len(oneSite.techList)):
			tmp = list(oneSite.techList[y])
			tmp.append(round(oneSite.techList[y][1]/oneSite.allTech,3))
			oneSite.techList[y] = tuple(tmp)			

#Start Program ----------------------------------------------------------------

#Read in data from the given excel document
#TO use a different document you would need to change its name in the line bellow
xls = pd.ExcelFile('RPI_Dataset.xlsx')
company_data = pd.read_excel(xls, 'Company Data')
keyIndi = pd.read_excel(xls, 'Key Indications')
keyTarg = pd.read_excel(xls, 'Key Target-based Actions')
keyTech = pd.read_excel(xls, 'Key Technologies')

#Process key words into dictionaries
keyIndiDict = pandasToDict(keyIndi)
keyTargDict = pandasToDict(keyTarg)
keyTechDict = pandasToDict(keyTech)

originalName = sys.argv[1]
originalLink = sys.argv[2]
row = sys.argv[3]

#remove the slash at the end of the original link
if originalLink[-1] == "/":
	originalLink = originalLink[:-1]

#Create the website object for the given URL
oneS = site(originalName, originalLink)
#Start a timer
startTime = time.perf_counter()
#Set the time for the scraper to run on the given website in second (One minute is a good time to run for)
domainTime = 60
#The next three lines start the web scraper
process = CrawlerProcess()
process.crawl(bigScan, name=oneS.name ,start_urls=[oneS.link], allowed_domains=[oneS.domain], DEPTH_LIMIT = 2, COOKIES_ENABLED = False, SCHEDULER_ORDER = 'BFO')
process.start()
#Console message to show that the scraper is still running
print()	
print("--------------------------------------------------------------------------------")
print("Now parsing the retrieved data for", oneS.name, ". This may take a while.")
print("--------------------------------------------------------------------------------")

#The functions that categorize the found data
#A new line like the ones bellow would need to be added in order to add a new tag to be scraped
allFrequency(list(filter(None, np.array(titleList, dtype=object))),oneS)
allFrequency(list(filter(None, np.array(descList, dtype=object))),oneS)
allFrequency(list(filter(None, np.array(textList, dtype=object))),oneS)
allFrequency(list(filter(None, np.array(h1textList, dtype=object))),oneS)
allFrequency(list(filter(None, np.array(h2textList, dtype=object))),oneS)
allFrequency(list(filter(None, np.array(h3textList, dtype=object))),oneS)
allFrequency(list(filter(None, np.array(h4textList, dtype=object))),oneS)
allFrequency(list(filter(None, np.array(h5textList, dtype=object))),oneS)

#Will convert the temporary dictionaries into a list of tuples
convertToList(oneS)

#Add the frequency percentages to the list of generated tuples
frequencyPercent(oneS)

#Bellow is the code to export the information from one website to a .json file for use in the database
fileName = 'websites.json'	#Change this line to change the file name
tmpDict = {'company_name' : oneS.name, 'website_url' : oneS.link, 'key_indications' : oneS.indiList, 'key_target' : oneS.targList, 'key_technologies' : oneS.techList}
	
with open(fileName, "r") as file:
	data = json.load(file)
data.append(tmpDict)
with open(fileName, "w") as file:
    json.dump(data, file)