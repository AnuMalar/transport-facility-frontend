import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '', redirectTo: 'home', pathMatch: 'full'
    },
    {
        path: 'home',
        loadComponent: () => import('./home/home.component').then(c => c.HomeComponent)
    },
    {
        path: 'ride',
        loadComponent: () => import('./add-ride/add-ride.component').then(c => c.AddRideComponent)
    },
    {
        path: 'find-ride',
        loadComponent: () => import('./find-ride/find-ride.component').then(c => c.FindRideComponent)
    }
];