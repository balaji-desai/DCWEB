import { Directive } from '@angular/core';
import { ElementRef } from "@angular/core";
import { Renderer2 } from "@angular/core";
import { Input } from "@angular/core";

@Directive({
  selector: 'Validation'
})
export class ValidationDirective {

  @Input('name')
  public name:String;
  @Input('message')
  public message:{[key: string]: string};
  private $loadercontrol;
  errorwithmessage = {
    required:"this field requierd.",
    minlength:"invalid minimum length",
    maxlength:"invalid maximum length",
    email:"invalid email."

  };

}
