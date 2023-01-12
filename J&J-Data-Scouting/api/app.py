import binascii
import hashlib
import os
import ast
import re
import sys
import uuid
from dotenv import load_dotenv, find_dotenv
from datetime import datetime
from functools import wraps

from flask import Flask, g, request, send_from_directory, abort, request_started
from flask_cors import CORS
from flask_restful import Resource, reqparse
from flask_restful_swagger_2 import Api, swagger, Schema
from flask_json import FlaskJSON, json_response
import pandas as pd
import json

from neo4j import GraphDatabase, basic_auth
from neo4j.exceptions import Neo4jError
import neo4j.time


load_dotenv(find_dotenv())

app = Flask(__name__)
CORS(app)
FlaskJSON(app)

api = Api(app, title="J&J Data Scouting API", api_version="0.0.1")

# To configure response type
@api.representation('application/json')
def output_json(data, code, headers=None):
    return json_response(data_=data, headers_=headers, status_=code)

def env(key, default=None, required=True):
    """
    Retrieves environment variables and returns Python natives. The (optional)
    default will be returned if the environment variable does not exist.
    """
    try:
        value = os.environ[key]
        return ast.literal_eval(value)
    except (SyntaxError, ValueError):
        return value
    except KeyError:
        if default or not required:
            return default
        raise RuntimeError("Missing required environment variable '%s'" % key)

DATABASE_USERNAME = env('DATABASE_USERNAME')
DATABASE_PASSWORD = env('DATABASE_PASSWORD')
DATABASE_URL = env('DATABASE_URL')
app.config['SECRET_KEY'] = env('SECRET_KEY')

driver = GraphDatabase.driver(DATABASE_URL, auth=basic_auth(DATABASE_USERNAME, str(DATABASE_PASSWORD)))

# Sets up a neo4j db connection
def get_db():
    if not hasattr(g, 'neo4j_db'):
        g.neo4j_db = driver.session()
    return g.neo4j_db

# Closes our neo4j db connection when done
@app.teardown_appcontext
def close_db(error):
    if hasattr(g, 'neo4j_db'):
        g.neo4j_db.close()

#---------------------------Data Model Objects---------------------------#
class KeyIndicatorModel(Schema):
    type = 'object'
    properties = {
        'id': {
            'type': 'integer',
        },
        'name': {
            'type': 'string',
        }
    }

class KeyTargetBasedActionModel(Schema):
    type = 'object'
    properties = {
        'id': {
            'type': 'integer',
        },
        'name': {
            'type': 'string',
        }
    }

class KeyTechnologyModel(Schema):
    type = 'object'
    properties = {
        'id': {
            'type': 'integer',
        },
        'name': {
            'type': 'string',
        }
    }

class CompanyModel(Schema):
    type = 'object'
    properties = {
        'id': {
            'type': 'integer',
        },
        'name': {
            'type': 'string',
        },
        'websiteUrl': {
            'type': 'string',
        }
    }

def serialize_key_indicator(key_term):
    return {
        'id': key_term['id'],
        'name': key_term['name'],
    }

def serialize_key_target_based_action(key_term):
    return {
        'id': key_term['id'],
        'name': key_term['name'],
    }

def serialize_key_technology(key_term):
    return {
        'id': key_term['id'],
        'name': key_term['name'],
    }

def serialize_company(company):
    return {
        'id': company['id'],
        'name': company['name'],
        'website_url': company['websiteUrl'],
    }

#---------------------------API Endpoints---------------------------#
class ApiDocs(Resource):
    def get(self, path=None):
        if not path:
            path = 'index.html'
        return send_from_directory('swaggerui', path)

class KeyIndicatorList(Resource):
    @swagger.doc({
        'tags': ['key_terms'],
        'summary': 'Get all key indicators',
        'description': 'Returns a list of all key indicators',
        'responses': {
            '200': {
                'description': 'A list of key indicators',
                'schema': {
                    'type': 'array',
                    'items': KeyIndicatorModel,
                }
            }
        }
    })
    def get(self):
        def get_key_indicators(tx):
            return list(tx.run('MATCH (indicator:KeyIndicator) SET indicator.id=id(indicator) RETURN indicator'))
        db = get_db()
        result = db.read_transaction(get_key_indicators)
        return [serialize_key_indicator(record['indicator']) for record in result]

class KeyTargetBasedActionList(Resource):
    @swagger.doc({
        'tags': ['key_terms'],
        'summary': 'Get all key target based actions',
        'description': 'Returns a list of all key target based actions',
        'responses': {
            '200': {
                'description': 'A list of key target based actions',
                'schema': {
                    'type': 'array',
                    'items': KeyTargetBasedActionModel,
                }
            }
        }
    })
    def get(self):
        def get_key_tgt_based_actions(tx):
            return list(tx.run('MATCH (action:KeyTargetBasedAction) SET action.id=id(action) RETURN action'))
        db = get_db()
        result = db.read_transaction(get_key_tgt_based_actions)
        return [serialize_key_target_based_action(record['action']) for record in result]

class KeyTechnologyList(Resource):
    @swagger.doc({
        'tags': ['key_terms'],
        'summary': 'Get all key technologies',
        'description': 'Returns a list of all key technologies',
        'responses': {
            '200': {
                'description': 'A list of key technologies',
                'schema': {
                    'type': 'array',
                    'items': KeyTechnologyModel,
                }
            }
        }
    })
    def get(self):
        def get_key_technologies(tx):
            return list(tx.run('MATCH (technology:KeyTechnology) SET technology.id=id(technology) RETURN technology'))
        db = get_db()
        result = db.read_transaction(get_key_technologies)
        return [serialize_key_technology(record['technology']) for record in result]

class CompanyList(Resource):
    @swagger.doc({
        'tags': ['companies'],
        'summary': 'Get all companies',
        'description': 'Returns a list of all companies',
        'responses': {
            '200': {
                'description': 'A list of companies',
                'schema': {
                    'type': 'array',
                    'items': CompanyModel,
                }
            }
        }
    })
    def get(self):
        def get_companies(tx):
            return list(tx.run('MATCH (company:Company) RETURN company'))
        db = get_db()
        result = db.read_transaction(get_companies)
        return [serialize_company(record['company']) for record in result]

#TODO: 
#CompanyListByKeyIndicator
#CompanyListByKeyTargetBasedAction
#CompanyListByKeyTechnology

api.add_resource(ApiDocs, '/docs', '/docs/<path:path>')
api.add_resource(KeyIndicatorList, '/api/v0/key_indicators')
api.add_resource(KeyTargetBasedActionList, '/api/v0/key_target_based_actions')
api.add_resource(KeyTechnologyList, '/api/v0/key_technologies')
api.add_resource(CompanyList, '/api/v0/companies')

class Companies(Resource):
    # Here, we should look at our Neo4j database and return all companies
    # TODO add docstring
    def get(self):
        with open('sample-website-info.json') as f_stream:
            data = json.load(f_stream)
            return {'data': data}, 200
    pass

    # TODO add get request for retrieving relevant documents based on a query term.

    # Upon receiving a POST call from the front-end containing all of the companies in an excel spreadsheet, upload them to the Neo4J database appropriately here.
    # See Register Class
    def post(self):
        return {'data': 'placeholder'}, 200
    pass


api.add_resource(Companies, '/companies')

if __name__ == '__main__':
    app.run()  # runs our flask App, for convenience but see readme for proper way to run program
