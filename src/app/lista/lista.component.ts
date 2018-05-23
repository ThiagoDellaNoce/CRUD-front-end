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

  constructor(private http: HttpClient) {
    this.baseUrl = 'http://localhost:3000/';
   }

  ngOnInit() {
    this.getContacts();
   }

  // chama serviço READ
  getContacts() {
    const headers = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'});

    this.http.get(this.baseUrl + 'contacts/', {headers: headers})
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
    const headers = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'});

    this.http.get(this.baseUrl + 'contacts/delete/' + id, {headers: headers})
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

