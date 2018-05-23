import { Component, OnInit } from '@angular/core';

import { NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  name: String;
  email: String;
  phone: String;
  dateBorn: String;

  baseUrl;
  headers;

  constructor(private http: HttpClient) {
    this.baseUrl = 'http://localhost:3000/';
    this.headers = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'});
  }

  ngOnInit() { }

  // chama serviço CREATE
  form_submit(f: NgForm) {
    // pega valores do formulário
    this.name = f.controls.name.value;
    this.email = f.controls.email.value;
    this.phone = f.controls.phone.value;
    this.dateBorn = f.controls.dateBorn.value;

    // requisição HTTP
    this.http.post(this.baseUrl + 'contacts/add',
      {
        'name': this.name,
        'email': this.email,
        'phone': this.phone,
        'dateBorn': this.dateBorn
      }, {headers: this.headers})
    .subscribe(
      res => { console.log(res); },
      err => { console.log(err); }
    );

  }
}
