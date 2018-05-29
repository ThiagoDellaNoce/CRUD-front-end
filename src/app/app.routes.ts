import { Routes } from '@angular/router';

import { CadastroComponent } from './cadastro/cadastro.component';
import { ListaComponent } from './lista/lista.component';
import { EditarComponent } from './editar/editar.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

export const appRoutes: Routes = [
  { path: '', component: ListaComponent },
  { path: 'listar', component: ListaComponent },
  { path: 'cadastrar', component: CadastroComponent },
  { path: 'editar/:id', component: EditarComponent },

  { path: 'login', component: LoginComponent},
  { path: 'signup', component: SignupComponent},
  { path: '**', component: ListaComponent}
];
