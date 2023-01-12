# Database & API Setup Instructions

## Setting up the Database
See supporting documentation provided within Final Report for Neo4J database design. Cypher startup script is currently needed to automatically set up database.

## Setting Up Database Connection
Create your .env file and enter the credentials according to the format:
```
DATABASE_USERNAME="<username>"
DATABASE_PASSWORD="<password>"
DATABASE_URL="<url>"
```

These can be found in your Neo4J database by going to your project's connection details.

## Installing Requirements & Running API
To start the Flask API, run:
```
cd api
pip3 install -r requirements.txt
export FLASK_APP=app.py
flask run
```