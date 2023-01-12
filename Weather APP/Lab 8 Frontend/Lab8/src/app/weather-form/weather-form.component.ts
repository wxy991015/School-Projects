import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Form, FormGroup, FormControl } from '@angular/forms';
import { Observable, throwError } from 'rxjs';

@Component({
  selector: 'app-weather-form',
  templateUrl: './weather-form.component.html',
  styleUrls: ['./weather-form.component.css']
})
export class WeatherFormComponent implements OnInit {
  constructor(private httpClient: HttpClient) { }
  inputCity: String = "";
  weatherData: any;
  length_check = true;
  is_empty = false;
  get = false;
  post = false;
  put: any;
  delete: any;
  cannot_get = false;
  is_existed = false;
  cannot_update = false;
  cannot_delete = false;

  ngOnInit(): void {
    this.inputCity = "";
    this.weatherData = null;
  }

  getRequest(): any {
    let api: String = "";
    if (this.inputCity == "") {
      this.is_empty = true;
      throwError;
    } else {
      api = "/db/" + this.inputCity;
      console.log(api);
      this.is_empty = false;
    }

    return this.httpClient.get("http://localhost:3000" + api).subscribe(data => {
      this.weatherData = data;
      if (!this.weatherData)
      {
        this.cannot_get = true;
      }
    });
  }

  postRequest(): any {
    let api: String = "";
    this.length_check = false;
    if (this.inputCity == "") {
      this.is_empty = true;
      throwError;
    } else {
      this.post = true;
      api = "/db/" + this.inputCity;
    }

    var data = {
    }

    return this.httpClient.post("http://localhost:3000" + api, data).subscribe(data => {
      this.weatherData = data;
      console.log(this.weatherData);
      if (this.weatherData)
      {
        this.post = false;
        this.is_existed = true;
      }
    })
  }

  putRequest(): any {
    let api: String = "";
    if (this.inputCity == "") {
      this.is_empty = true;
      throwError;
    } else {
      api = "/db/" + this.inputCity;
      //this.length_check = false;
      console.log(api);
    }

    var newobj = {}
    return this.httpClient.put("http://localhost:3000" + api, newobj).subscribe((data) => {
      this.weatherData = data;
      console.log(data);
      if (this.weatherData)
      {
        //this.is_existed = true;
        this.put = true;
      } else 
      {
        this.put = false;
        this.cannot_update = true;
      }
    })
  }

  deleteRequest(): Object {
    let api: String = "";
    if (this.inputCity == "") {
      this.is_empty = true;
      throwError;
    } else {
      this.delete = true;
      api = "/db/" + this.inputCity;
      console.log(api);
    }

    return this.httpClient.delete("http://localhost:3000" + api).subscribe((data: Object) => {
      console.log("data has been deleted");
      console.log(data);
      this.weatherData = data;
      if (!this.weatherData)
      {
        this.cannot_delete = true;
        this.delete = false;
      }
    })
  }
}

