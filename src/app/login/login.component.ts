import { Component, OnInit } from '@angular/core';

import { NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { CookieService } from 'ngx-cookie';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  name: String;
  email: String;
  password: String;

  baseUrl;
  headers;

  data;

  constructor(private http: HttpClient, private router: Router, private _cookieService: CookieService) {
    this.baseUrl = 'https://warm-wave-49664.herokuapp.com/';

    this.headers = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'});

  }

  ngOnInit() {
    if (this.getCookie() != null) {
      this.router.navigate(['/']);
    }
   }

  // chama serviço CREATE
  form_submit(f: NgForm) {
    // pega valores do formulário
    this.email = f.controls.email.value;
    this.password = f.controls.password.value;

    // requisição HTTP
    this.http.post(this.baseUrl + 'user/authenticate',
      {
        'email': this.email,
        'password': this.password
      }, {headers: this.headers})
    .subscribe(
      res => {
        this.data = res;

        this.putCookie(this.data.token);
        this.router.navigate(['/']);
      },
      err => {
        console.log(err);
      }
    );
  }

  getCookie() {
    return this._cookieService.get('token');
  }

  putCookie(value) {
    return this._cookieService.put('token', value);
  }
}
