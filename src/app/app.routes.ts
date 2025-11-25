import { Routes } from '@angular/router';
import {CosmeticList} from './components/web/cosmetic-list/cosmetic-list';
import {CosmeticEdit} from './components/web/cosmetic-edit/cosmetic-edit';

export const routes: Routes = [
  { path: '', redirectTo: 'cosmetic-list', pathMatch: 'full' },
  { path: 'cosmetic-list', component: CosmeticList },
  { path: 'cosmetic-edit', component: CosmeticEdit },
  { path: 'cosmetic-edit/:id', component: CosmeticEdit },
  { path: '**', redirectTo: 'cosmetic-list', pathMatch: 'full' },
];
