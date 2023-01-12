import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';

import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '../environments/environment';

import { ReactiveFormsModule } from '@angular/forms';
import { RecipesComponent } from './recipes/recipes.component';
import { HomeComponent } from './home/home.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { SingleRecipeComponent } from './single-recipe/single-recipe.component';
import { LoggedInHomeComponent } from './logged-in-home/logged-in-home.component';
import { PantryComponent } from './pantry/pantry.component';
import { AddRecipeComponent } from './add-recipe/add-recipe.component';

import { AuthService } from "./services/auth.service";

import { MatSelectModule } from '@angular/material/select';
import { MdbAccordionModule } from 'mdb-angular-ui-kit/accordion';
import { MdbCarouselModule } from 'mdb-angular-ui-kit/carousel';
import { MdbCheckboxModule } from 'mdb-angular-ui-kit/checkbox';
import { MdbCollapseModule } from 'mdb-angular-ui-kit/collapse';
import { MdbDropdownModule } from 'mdb-angular-ui-kit/dropdown';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MdbModalModule } from 'mdb-angular-ui-kit/modal';
import { MdbPopoverModule } from 'mdb-angular-ui-kit/popover';
import { MdbRadioModule } from 'mdb-angular-ui-kit/radio';
import { MdbRangeModule } from 'mdb-angular-ui-kit/range';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';
import { MdbScrollspyModule } from 'mdb-angular-ui-kit/scrollspy';
import { MdbTabsModule } from 'mdb-angular-ui-kit/tabs';
import { MdbTooltipModule } from 'mdb-angular-ui-kit/tooltip';
import { MdbValidationModule } from 'mdb-angular-ui-kit/validation';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    SignUpComponent,
    RecipesComponent,
    HomeComponent,
    SidebarComponent,
    RecipeListComponent,
    SingleRecipeComponent,
    LoggedInHomeComponent,
    PantryComponent,
    AddRecipeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIconModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatDividerModule,
    MatSidenavModule,
    MatSelectModule,
    MdbAccordionModule,
    MdbCarouselModule,
    MdbCheckboxModule,
    MdbCollapseModule,
    MdbDropdownModule,
    MdbFormsModule,
    MdbModalModule,
    MdbPopoverModule,
    MdbRadioModule,
    MdbRangeModule,
    MdbRippleModule,
    MdbScrollspyModule,
    MdbTabsModule,
    MdbTooltipModule,
    MdbValidationModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig, 'plan-and-pantry'),

  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
