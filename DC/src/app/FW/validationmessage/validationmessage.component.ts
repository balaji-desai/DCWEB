import { Component, OnInit } from '@angular/core';
import { FormControl } from "@angular/forms";
import { Input } from "@angular/core";

@Component({
  selector: 'app-validationmessage',
  templateUrl: './validationmessage.component.html',
  styleUrls: ['./validationmessage.component.css']
})
export class ValidationmessageComponent implements OnInit {

  _me:any;
  errorsmsg:string;
  public Control:FormControl;
  @Input("control")
  set controlVale(value)
  {
    if(value && value != null)
      {
        this.Control = value;
        this._me = this;
      }
  }
  
  @Input('errormodel')
  public errormodel:{[key: string]: string};

  errorwithmessage = {
    required:"this field requierd.",
    minlength:"invalid minimum length",
    maxlength:"invalid maximum length",
    email:"invalid email."

  };
  
  constructor() { }

  ngOnInit() {
    this.errorsmsg = "";
  }

  validateControl(_me)
  {
    if(!_me.Control || _me.Control == null)
      {
        throw "pass form control";
      }
      _me.errorsmsg = "";
    if(_me.Control.dirty && _me.Control.valid == false)
      {
        for(var cont in _me.Control.errors)
          {
            if(_me.errormodel && _me.errormodel != null)
              {
                _me.errorsmsg = _me.errormodel[cont] ? _me.errormodel[cont]:null;
              }else{
                _me.errorsmsg = _me.errorwithmessage[cont] ? _me.errorwithmessage[cont].toString():null;
              }
            return;
          }
      }
  }

}
