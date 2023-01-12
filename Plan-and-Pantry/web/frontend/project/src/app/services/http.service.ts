import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private httpClient: HttpClient) { }

  public getRecipes() {
    return this.httpClient.get("http://localhost:3000/recipes");
  }

  public getRecipe(id: string) {
    return this.httpClient.get("http://localhost:3000/recipe/" + id);
  }


  public postRecipe(data: JSON) {
    return this.httpClient.post("http://localhost:3000/recipes", {
      body: data
    });
  }

  public putRecipes(data: JSON) {
    return this.httpClient.put("http://localhost:3000/recipes", {
      body: data
    });
  }

  public putRecipe(id: string, data: JSON) {
    return this.httpClient.put("http://localhost:3000/recipe/" + id, {
      body: data
    });
  }

  public deleteRecipes() {
    return this.httpClient.delete("http://localhost:3000/recipes");
  }

  public deleteRecipe(id: string) {
    return this.httpClient.delete("http://localhost:3000/recipe" + id);
  }
}
