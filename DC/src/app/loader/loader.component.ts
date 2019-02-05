import { Component, OnInit } from '@angular/core';
import { Input } from "@angular/core";

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {
  
  @Input('loading')
  loading:boolean=false;
  constructor() { }

  ngOnInit() {
  }

}
