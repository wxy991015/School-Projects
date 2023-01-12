import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-pantry',
  templateUrl: './pantry.component.html',
  styleUrls: ['./pantry.component.css']
})
export class PantryComponent implements AfterViewInit {

  constructor() {
  }

  ngAfterViewInit(): void {
    var pantry_list = ["Apples","Bananas","Oranges","Beets", "Watermelon", "Mango"];
    var fridge_list = ["Carrots","Asparagus","Broccoli", "Grapes", "Greek Yogurt","Milk","Half & Half","Eggs"];
    var freezer_list =["Frozen Pizza","Tatter Tots","Chicken Strips","Totino's Pizza Rolls"];
    var spices_list = ["Garlic Powder", "Ground Cinnamon", "Nutmeg", "Cumin", "Basil", "Onion Powder", "Oregano", "Paprika", "Chili Powder"];

    //console.log("dkjndkajsndsj");
    this.makeItems(pantry_list, "pantryList", "pantry");
    this.makeItems(fridge_list, "fridgeList", "fridge");
    this.makeItems(freezer_list, "freezerList", "freezer");
    this.makeItems(spices_list, "spiceList", "spice");
  }

  public makeItems(flist:string[], location:string, abreviation:string) {

      document.getElementById(location).innerHTML = "";
      //console.log(location)
      //console.log("VV DIV TO HIT VV")
      //console.log(outsideDiv);
      var fn = 0;
      for (var f of flist){

        var iname = f;
        var inum = abreviation + fn;
        var template =  '<label class="itm" style="display:block" for='+inum+'><div class="card-body">'+
                          '<input id='+inum+' style="margin-right:5px" type="checkbox" name='+abreviation+' />'+
                            iname+'</div></label>'
        
        //console.log(template);
        document.getElementById(location).innerHTML += template;
        fn ++;
      }
    }

  
}
