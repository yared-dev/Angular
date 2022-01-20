import { Component, OnInit } from '@angular/core';
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

  ngOnInit(): void {
    this.getUsuario().then((users) => {
      console.log(users);
    });
    
  }
  getUsuario() {
    const promesa = new Promise((res) => {
      fetch('https://reqres.in/api/users?page=2')
        .then((res) => res.json())
        .then((body) => console.log(body.data));
    });
    return promesa;
  }
  getDate() {
    console.log(this.calendarForm.value);
  }
}
