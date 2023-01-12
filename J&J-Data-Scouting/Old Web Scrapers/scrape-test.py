import scrapy
from scrapy.crawler import CrawlerProcess
from scrapy.spiders import CrawlSpider, Rule
from scrapy.linkextractors import LinkExtractor
from scrapy.exceptions import CloseSpider
from bs4 import BeautifulSoup
import numpy as np
import pandas as pd
import time
import sys
import string
import re

#Global Variables
textList = []
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


class bigScan(CrawlSpider):
	global domainTime, nowTime, startTime
	rules = (
		Rule(LinkExtractor(), callback='parse_item', follow=True),
	)

	def parse_item(self, response):
		html = response.body
		soup = BeautifulSoup(html, 'lxml')
		text = soup.get_text()
		textList.append(text)
		#print(textList)
		#sys.exit('done')

		nowTime = time.perf_counter()
		if nowTime - startTime > domainTime:
			raise CloseSpider(reason='Time Limit Reached')


#Goes Through each word in list
def allFrequency(list, site):
	for piece in list:
		#print(piece)
		#freq(piece, site)
		site.allWords +=1
		w = piece.lower()
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
	tup = [(k, v)  for k, v in mainDict.items()]
	tups = sorted(tup, key = lambda x:x[1], reverse=True) #Sort by frequency of word count - more commone words first
	#print(tups)
	#Compare words found to words desired and put them in lists
	for h in tups: 
		#print(h[0])
		if h[0] in keyIndiDict:
			oneSite.indiList.append(h)
		if h[0] in keyTargDict:
			oneSite.targList.append(h)
		if h[0] in keyTechDict:
			oneSite.techList.append(h)




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


originalName = "Advanced Cell Diagnostics Inc"
originalLink = "https://acdbio.com/" 

if originalLink[-1] == "/":
	originalLink = originalLink[:-1]
print(originalLink)

oneS = site(originalName, originalLink)
#scrapeOneWebsite(oneS, oneS.link, 0)
startTime = time.perf_counter()
domainTime = 1			#Set the time for the scraper to run
process = CrawlerProcess()
process.crawl(bigScan, name=oneS.name ,start_urls=[oneS.link], allowed_domains=[oneS.domain], DEPTH_LIMIT = 2, COOKIES_ENABLED = False, SCHEDULER_ORDER = 'BFO')
process.start()

#file = open("temp.txt","w")
llst = [string for string in textList if string != ""]
#list(filter(None, np.array(textList)))

finalList = []
for x in llst:
	z = re.sub('[^a-zA-Z0-9 \n\.]', ' ', x)
	tempt = z.split()
	tem2 = [string for string in tempt if string != ""]
	for y in tem2:
		#remv = re.escape(string.punctuation)
		#z = re.sub(r'['+remv+']', '', y)
		#z = re.sub('[^a-zA-Z0-9 \n\.]', ' ', y)
		finalList.append(y.strip())
		#file.write(y.strip() + "\n")
#file.close()
#sys.exit()
#print(finalList)
allFrequency(finalList,oneS)

checkWords(oneS)

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