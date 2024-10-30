import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CarreraComponent } from './carrera/carrera.component';

export const routes: Routes = [
    {
        path:'',
        component: HomeComponent,
        title: 'Home'
    },
    {
        path:'carrera',
        component: CarreraComponent,
        title: 'Carrera'
    },
    {
        path:'**',
        redirectTo: '',
        pathMatch: 'full'
    }
];
