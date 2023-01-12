import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: any[] = [];

  constructor(private httpService: HttpService) { }

  ngOnInit(): void {
    this.httpService.getRecipes().subscribe((data: any) => {
      this.recipes = data;
    });
  }

  trackBy(index: any, item: any) {
    return index;
  }
}
