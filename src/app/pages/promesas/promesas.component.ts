import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: [],
})
export class PromesasComponent implements OnInit {
  public calendarForm: FormGroup = new FormGroup({
    date: new FormControl('', [Validators.required]),
  });
  constructor() {}

  ngOnInit(): void {}
  getDate() {
    var data = new Date();
    var year = data.toLocaleDateString();
    var hora =
      data.getHours() + ':' + data.getMinutes() + ':' + data.getSeconds();
    console.log(data);
    console.log(year);
    console.log(hora);
  }
}
