import scrapy
from scrapy.crawler import CrawlerProcess
import numpy as np
import pandas as pd
import xlsxwriter as xl
import json

titleList = []
linkList = []
descList = []
textList = []

#Maybe look for site maps

#Global dictionary for the entire website
mainDict = {}

website = "https://acdbio.com/"
websiteName = "Advanced Cell Diagnostics Inc"

#website = "http://www.infraredx.com/"
#websiteName = "InfraReDx Inc"

#website = "http://www.leukocare.de"
#websiteName = "LEUKOCARE AG"

#website = ""
#websiteName = ""

def allFrequency(list):
	for piece in list:
		freq(piece)

	#Counts frequency of a word in sentence and puts it into the main dictionary
def freq(str):
	# break the string into list of words 
	str = str[0].split()
	for word in str:
		w = word.lower()
		if w not in mainDict:
			mainDict[w] = 1
		else:
			mainDict[w] += 1



class TestSpider(scrapy.Spider):
   name = "mySpider"
   #allowed_domains = ["dmoz.org"]
   
   start_urls = [
      website
    ]
   def parse(self, response):
      for sel in response.xpath('//div'):
         title = sel.xpath('a/text()').extract()
         link = sel.xpath('a/@href').extract()
         desc = sel.xpath('text()').extract()
         text = sel.xpath('p/text()').extract()
         #x = sel.xptah('div/text()').extract()
         #print(title, link, desc)
         titleList.append(title)
         linkList.append(link)
         descList.append(desc)
         textList.append(text)
         #textList.append(x)


#Convert Pandas data structure to Dictionary
def pandasToDict(pand):
	temp = pand.values.tolist()
	#keyTechList = []
	listLower = []
	for sublist in temp:
		for value in sublist:
			#keyTechList.append(value)
			listLower.append(value.lower())

	return dict.fromkeys(listLower, 1)



#Run main program
#if __name__ == "__main__":

xls = pd.ExcelFile('RPI Dataset.xlsx')
company_data = pd.read_excel(xls, 'Company Data')
keyIndi = pd.read_excel(xls, 'Key Indications')
keyTarg = pd.read_excel(xls, 'Key Target-based Actions')
keyTech = pd.read_excel(xls, 'Key Technologies')


keyIndiDict = pandasToDict(keyIndi)
keyTargDict = pandasToDict(keyTarg)
keyTechDict = pandasToDict(keyTech)

#print(keyTargDict)

#Scrape the website
process = CrawlerProcess()
process.crawl(TestSpider)
process.start()

titleList = np.array(titleList)				#convert to numpy array
titleList = list(filter(None, titleList))	#remove empty list objects

textList = np.array(textList)
textList = list(filter(None, textList))





#print(textList)
allFrequency(textList)
allFrequency(titleList)

tup = [(k, v) for k, v in mainDict.items()]				#Convert dict to list of touples
tups = sorted(tup, key = lambda x:x[1], reverse=True)	#Sort by frequency of word count - more commone words first

indiList = []
targList = []
techList = []
indiDict = {}
targDict = {}
techDict = {}

#Compare words found to words desired and put them in lists
for h in tups: 
	#print(h[0])
	if h[0] in keyIndiDict:
		indiList.append(h)
		temp = {h[0]:h[1]}
		indiDict.update(temp)
	if h[0] in keyTargDict:
		targList.append(h)
		temp = {h[0]:h[1]}
		targDict.update(temp)
	if h[0] in keyTechDict:
		techList.append(h)
		temp = {h[0]:h[1]}
		techDict.update(temp)




print("")
print("")
print("")
print("Website: " + websiteName)
print("URL:     " + website)
print("")

print("Key Indications -----")
print(indiList)
print("")

print("Key Target-based Actions -----")
print(targList)
print("")

print("Key Technologies -----")
print(techList)
	


#Eport dat to JSON

#jsonTest = json.dumps(techDict)

#print(jsonTest)

"""
websites = {}
websites['website_data'] = []
websites['website_data'].append({
	'company_name' : websiteName,
	'website_url' : website,
	'key_indications' : indiList,
	'key_target' : targList,
	'key_technologies' : techList
	})


with open('website.json', 'w') as outfile:
    json.dump(websites, outfile)
"""

"""
#Makes a exel document to push info to
workbook = xl.Workbook('website.xlsx')
ws = workbook.add_worksheet()
titleLine = workbook.add_format({'bold': True, 'font_size': 16})
ws.set_row(0,5, titleLine)

#Write the title lines
ws.write('A1', 'Company Name')
ws.write('B1', 'Website URL')
ws.write('C1', 'Key Indications')
ws.write('D1', 'Key Target-based Actions')
ws.write('E1', 'Key Technologies')

#Writes the data
ws.write('A2', str(websiteName))
ws.write('B2', website)
ws.write('C2', str(indiList))
ws.write('D2', str(targList))
ws.write('E2', str(techList))

#Close the exel file
workbook.close()
"""