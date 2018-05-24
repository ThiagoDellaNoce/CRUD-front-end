import { Component, OnInit } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {

  contacts;

  baseUrl;
  headers;

  constructor(private http: HttpClient) {
    // this.baseUrl = 'http://localhost:3000/';
    this.baseUrl = 'https://warm-wave-49664.herokuapp.com/';

    this.headers = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'});
   }

  ngOnInit() {
    this.getContacts();
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
        console.log(res);
      },
      err => {
        console.log(err);
      }
    );
  }
}

