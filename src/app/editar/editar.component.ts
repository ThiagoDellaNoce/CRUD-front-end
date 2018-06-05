import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { CookieService } from 'ngx-cookie';

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

  statusEdit: boolean;

  data;

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router, private _cookieService: CookieService) {

    this.baseUrl = 'https://warm-wave-49664.herokuapp.com/';

    this.headers = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'});
  }

  ngOnInit() {
    if (this.getCookie() != null) {
      this.route.params.subscribe(params => {
        this.getContactById(params['id']);
      });
    } else {
      this.router.navigate(['/login']);
    }
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
          this.statusEdit = true;
          // setInterval(() => {
          //   this.statusEdit = false;
          //   // this.router.navigate(['/']);
          // }, 2000 );
        },
        err => { console.log(err); }
      );

    });

  }

  getCookie() {
    return this._cookieService.get('token');
  }
}
