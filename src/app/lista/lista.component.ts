import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { CookieService } from 'ngx-cookie';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {

  contacts;

  baseUrl;
  headers;

  data;

  constructor(private http: HttpClient, private router: Router, private _cookieService: CookieService) {
    this.baseUrl = 'https://warm-wave-49664.herokuapp.com/';

    this.headers = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'});
   }

  ngOnInit() {

    if (this.getCookie() != null) {
      this.getContacts();
    } else {
      this.router.navigate(['/login']);
    }
   }

  // chama serviço READ
  getContacts() {
    this.http.get(this.baseUrl + 'contacts/', {headers: this.headers})
    .subscribe(
      res => {
        this.contacts = res;
      },
      err => {
        console.log(err);
      }
    );
  }

  // chama serviço DELETE
  deleteContact(id) {
    this.http.get(this.baseUrl + 'contacts/delete/' + id, {headers: this.headers})
    .subscribe(
      res => {
        alert(res);
        this.router.navigate(['/listar']);
      },
      err => {
        console.log(err);
      }
    );
  }

  getCookie() {
    return this._cookieService.get('token');
  }
}

