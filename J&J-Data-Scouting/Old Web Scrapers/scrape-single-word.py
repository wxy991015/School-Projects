import scrapy
from scrapy.crawler import CrawlerProcess
from scrapy.spiders import CrawlSpider, Rule
from scrapy.linkextractors import LinkExtractor
from scrapy.exceptions import CloseSpider
import numpy as np
import pandas as pd
import time

#Global Variables
titleList = []
descList = []
textList = []
h1textList = []
h2textList = []
h3textList = []
h4textList = []
h5textList = []
mainDict = {}
linkDict = {}
startTime = 0.0
nowTime = 0.0
domainTime = 60

#a class to store information about a website
class site:
	def __init__(self, name, link):
		self.name = name
		self.link = link
		self.domain = link[8:]
	indiList = []
	targList = []
	techList = []
	allWords = 0
	allIndi = 0
	allTarg = 0
	allTech = 0

class bigScan(CrawlSpider):
	global domainTime, nowTime, startTime
	rules = (
		Rule(LinkExtractor(), callback='parse_item', follow=True),
	)

	def parse_item(self, response):
		#self.log('crawling'.format(response.url))
		for sel in response.xpath('//div'):
			title = sel.xpath('a/text()').extract()
			desc = sel.xpath('text()').extract()
			text = sel.xpath('p/text()').extract()
			h1text = sel.xpath('h1/text()').extract()
			h2text = sel.xpath('h2/text()').extract()
			h3text = sel.xpath('h3/text()').extract()
			h4text = sel.xpath('h4/text()').extract()
			h5text = sel.xpath('h5/text()').extract()
			titleList.append(title)
			descList.append(desc)
			textList.append(text)
			h1textList.append(h1text)
			h2textList.append(h2text)
			h3textList.append(h3text)
			h4textList.append(h4text)
			h5textList.append(h5text)
		nowTime = time.perf_counter()
		if nowTime - startTime > domainTime:
			raise CloseSpider(reason='Time Limit Reached')


#Goes Through each word in list
def allFrequency(list, site):
	for piece in list:
		freq(piece, site)

	#Counts frequency of a word in sentence and puts it into the main dictionary
def freq(strz, site):
	# break the string into list of words 
	strz = strz[0].split()
	for word in strz:
		site.allWords +=1
		w = word.lower()
		if w not in mainDict:
			mainDict[w] = 1
		else:
			mainDict[w] += 1

#Convert Pandas data structure to Dictionary
def pandasToDict(pand):
	temp = pand.values.tolist()
	listLower = []
	for sublist in temp:
		for value in sublist:
			listLower.append(value.lower())
	return dict.fromkeys(listLower, 1)

def checkWords(oneSite):
	#tup = [(k, round(v/oneSite.allWords,5)) for k, v in mainDict.items()]	#Convert dict to list of touples
	#tup = [(k, v, round(v/oneSite.allWords,7)) for k, v in mainDict.items()]
	tup = [(k, v) for k, v in mainDict.items()]
	tups = sorted(tup, key = lambda x:x[1], reverse=True) #Sort by frequency of word count - more commone words first

	#Compare words found to words desired and put them in lists
	for h in tups: 
		#print(h[0])
		if h[0] in keyIndiDict:
			oneSite.indiList.append(h)
		if h[0] in keyTargDict:
			oneSite.targList.append(h)
		if h[0] in keyTechDict:
			oneSite.techList.append(h)

#Percentage frequency of terms based on how many times they appear in their list
def frequencyPercent(oneSite):
	for x in oneSite.indiList:
		oneSite.allIndi += x[1]
	for x in oneSite.targList:
		oneSite.allTarg += x[1]
	for x in oneSite.techList:
		oneSite.allTech += x[1]

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

#------------------------------------------------------------------------------
#Start Program

#Read in data
xls = pd.ExcelFile('RPI Dataset.xlsx')
company_data = pd.read_excel(xls, 'Company Data')
keyIndi = pd.read_excel(xls, 'Key Indications')
keyTarg = pd.read_excel(xls, 'Key Target-based Actions')
keyTech = pd.read_excel(xls, 'Key Technologies')

#Process key words into dictionaries
keyIndiDict = pandasToDict(keyIndi)
keyTargDict = pandasToDict(keyTarg)
keyTechDict = pandasToDict(keyTech)

print(keyTargDict)


originalName = "Advanced Cell Diagnostics Inc"
originalLink = "https://acdbio.com/" 

#originalName = "Raydiant Oximetry Inc"
#originalLink = "https://regenacy.com/"


if originalLink[-1] == "/":
	originalLink = originalLink[:-1]
print(originalLink)

oneS = site(originalName, originalLink)
#scrapeOneWebsite(oneS, oneS.link, 0)
startTime = time.perf_counter()
domainTime = 30			#Set the time for the scraper to run
process = CrawlerProcess()
process.crawl(bigScan, name=oneS.name ,start_urls=[oneS.link], allowed_domains=[oneS.domain], DEPTH_LIMIT = 2, COOKIES_ENABLED = False, SCHEDULER_ORDER = 'BFO')
	#
process.start()

allFrequency(list(filter(None, np.array(titleList))),oneS)
allFrequency(list(filter(None, np.array(descList))),oneS)
allFrequency(list(filter(None, np.array(textList))),oneS)
allFrequency(list(filter(None, np.array(h1textList))),oneS)
allFrequency(list(filter(None, np.array(h2textList))),oneS)
allFrequency(list(filter(None, np.array(h3textList))),oneS)
allFrequency(list(filter(None, np.array(h4textList))),oneS)
allFrequency(list(filter(None, np.array(h5textList))),oneS)

checkWords(oneS)

frequencyPercent(oneS)

print("")
print("")
print("")
print("Website: " + oneS.name)
print("URL:     " + oneS.link)
print("All Words Counted: " + str(oneS.allWords))
print("")

print("Key Indications -----")
print(oneS.indiList)
print("")

print("Key Target-based Actions -----")
print(oneS.targList)
print("")

print("Key Technologies -----")
print(oneS.techList)