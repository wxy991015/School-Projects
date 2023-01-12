import { Component, OnInit } from '@angular/core';
import { FileUploadService } from '../services/file-upload.service';
import { HttpService } from '../services/http.service';

import { FormBuilder } from '@angular/forms';


interface Measurements {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.css']
})
export class AddRecipeComponent implements OnInit {

  // Variable to store shortLink from api response
  shortLink: string = "";
  loading: boolean = false; // Flag variable
  file: any = null; // Variable to store file
  ingredients: any[] = [];
  instructions: any[] = [];
  recipe: any = <JSON>{};

  constructor(private fileUploadService: FileUploadService, private httpService: HttpService) { }

  ngOnInit(): void {
  }

  addIngredient() {
    this.ingredients.push({ "name": "", "amount": 0, "measurement": "" });
  }

  removeIngredient(index: number) {
    this.ingredients.splice(index, 1);
  }

  addInstruction() {
    this.instructions.push("");
  }

  removeInstruction(index: number) {
    this.ingredients.splice(index, 1);
  }

  addRecipe(title: string, total_time: string, cook_time: string, prep_time: string, servings: string, category: string) {
    this.recipe.title = title;
    this.recipe.author = JSON.parse(localStorage.getItem('user')!).uid;
    this.recipe.time = {};
    this.recipe.time.total_time = total_time;
    this.recipe.time.cook_time = cook_time;
    this.recipe.time.prep_time = prep_time;
    this.recipe.servings = servings;
    this.recipe.category = category;
    this.recipe.ingredients = this.ingredients;
    this.recipe.instructions = this.instructions;

    console.log(this.recipe);

    this.httpService.postRecipe(this.recipe).subscribe((data: any) => {
      this.recipe = {};
    });
  }

  // On file Select
  onChange(event: any) {
    this.file = event.target.files[0];
  }

  trackBy(index: any, item: any) {
    return index;
  }

  // OnClick of button Upload
  onUpload() {
    this.loading = !this.loading;
    console.log(this.file);
    this.fileUploadService.upload(this.file).subscribe(
      (event: any) => {
        if (typeof (event) === 'object') {

          // Short link via api response
          this.shortLink = event.link;

          this.loading = false; // Flag variable 
        }
      }
    );
  }
}


