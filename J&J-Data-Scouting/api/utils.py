"""
Utility for converting the sample-website info file to the proper format.
"""

__author__ = "Colton Zecca"
__version__ = "0.1.0"
__license__ = "MIT"

import json

def main():
    jsonFile = open('api/sample-website-info-large.json', 'r')
    data = json.load(jsonFile)
    # nCompanies = take(10, data.items())
    # Iterating through the json
    # list
    print(data)
    # for i in data[:10]:
    #     print(i)
    
    # Closing file
    jsonFile.close()


if __name__ == "__main__":
    main()