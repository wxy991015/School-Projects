import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { RecipesComponent } from './recipes/recipes.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { HomeComponent } from './home/home.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { SingleRecipeComponent } from './single-recipe/single-recipe.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { LoggedInHomeComponent } from './logged-in-home/logged-in-home.component';
import { PantryComponent } from './pantry/pantry.component'
import { AddRecipeComponent } from './add-recipe/add-recipe.component';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'login', component: SignInComponent },
  { path: 'register', component: SignUpComponent },
  { path: 'recipe-search', component: RecipesComponent, canActivate: [AuthGuard] },
  { path: 'recipe-list', component: RecipeListComponent, canActivate: [AuthGuard] },
  { path: 'home', component: HomeComponent },
  { path: 'single-view', component: SingleRecipeComponent, canActivate: [AuthGuard] },
  { path: 'sidebar', component: SidebarComponent, canActivate: [AuthGuard] },
  { path: 'logged-in-home', component: LoggedInHomeComponent, canActivate: [AuthGuard] },
  { path: 'add-recipe', component: AddRecipeComponent, canActivate: [AuthGuard] },
  { path: 'pantry', component: PantryComponent, canActivate: [AuthGuard] }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
