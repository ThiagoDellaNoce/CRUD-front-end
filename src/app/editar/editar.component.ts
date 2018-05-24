import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent implements OnInit {

  contact;

  name: String;
  email: String;
  phone: String;
  dateBorn: String;

  baseUrl;
  headers;

  status: boolean;

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) {
    // this.baseUrl = 'http://localhost:3000/';
    this.baseUrl = 'https://warm-wave-49664.herokuapp.com/';

    this.headers = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'});
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.getContactById(params['id']);
    });
  }

  // Busca o contato a ser alterado (para popula campos)
  getContactById(id) {
    this.http.get(this.baseUrl + 'contacts/edit/' + id, {headers: this.headers})
    .subscribe(
      res => { this.contact = res; },
      err => { console.log(err); }
    );
  }

  // chama serviço UPDATE
  updateContact(form: NgForm) {
    // Pega valores do formulário
    this.name = form.controls.name.value;
    this.email = form.controls.email.value;
    this.phone = form.controls.phone.value;
    this.dateBorn = form.controls.dateBorn.value;

    this.route.params.subscribe(params => {
      // Requisição HTTP
      this.http.post(this.baseUrl + 'contacts/update/' + params['id'],
        {
          'name': this.name,
          'email': this.email,
          'phone': this.phone,
          'dateBorn': this.dateBorn
        }, {headers: this.headers})
      .subscribe(
        res => {
          this.status = true;
          setInterval(() => {
            this.status = false;
            this.router.navigate(['/']);
          }, 2000 );
        },
        err => { console.log(err); }
      );

    });

  }
}
