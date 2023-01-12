# API Documentation

## Recipes
### Bulk
| Endpoint | Type   | Description                                                |
| -------- | ------ | ---------------------------------------------------------- |
| /recipes | POST   | add new recipe                                             |
| /recipes | GET    | get recipes based on query (no query = return all recipes) |
| /recipes | PUT    | update all recipes                                         |
| /recipes | DELETE | delete all recipes                                         |

### Single
| Endpoint    | Type   | Description                    |
| ----------- | ------ | ------------------------------ |
| /recipe/:id | GET    | get specific recipe from ID    |
| /recipe/:id | PUT    | update specific recipe with ID |
| /recipe/:id | DELETE | delete specific recipe with ID | 