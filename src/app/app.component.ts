import { Component } from '@angular/core';

import { CookieService } from 'ngx-cookie';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private _cookieService: CookieService) {

  }

  sair() {
    // return this._cookieService.get('token');
    return this._cookieService.remove('token');
  }
 }
