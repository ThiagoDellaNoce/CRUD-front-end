import { Routes } from '@angular/router';

import { CadastroComponent } from './cadastro/cadastro.component';
import { ListaComponent } from './lista/lista.component';
import { EditarComponent } from './editar/editar.component';

export const appRoutes: Routes = [
  { path: '', component: ListaComponent },
  { path: 'listar', component: ListaComponent },
  { path: 'cadastrar', component: CadastroComponent },
  { path: 'editar/:id', component: EditarComponent },
  { path: '**', component: ListaComponent}
];
