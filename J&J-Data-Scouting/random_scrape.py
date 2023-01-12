import numpy as np
import pandas as pd
import xlsxwriter as xl
import os

#Picks a determined number of random websites from all of the websites.
def randomSites(allData, howMany):
	#print(allData[2])
	listData = allData.values
	#print(listData)
	toDo = list()
	for x in range(howMany):
		rr = tuple(random.choice(listData))
		if rr in toDo:
			x -= 1
		else:
			toDo.append(rr)
	return toDo

#Start Program ----------------------------------------------------------------
#Read in data
xls = pd.ExcelFile('RPI_Dataset.xlsx')

#In order to scrape all websites in a .xlsx file Use the following two lines
#Remember to comment lines 92 & 93
company_data = pd.read_excel(xls, 'Company Data')
compdict = company_data.values

#In order to scrape a certain number of random websites use the two lines bellow
#Remember to comment lines 86 & 87
#howManySites = 2
#compdict = randomSites(company_data, howManySites)

#print(compdict)
#time.sleep(10)

for x in compdict:
	#print(str(x[1]))
	#time.sleep(10)
	send = "python3 oneCall.py"+" '"+str(x[0])+"' "+str(x[1])+" "+str(0)
	print(send)
	os.system(send)
