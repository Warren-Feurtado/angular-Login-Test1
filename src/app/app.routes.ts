import { Routes } from '@angular/router';
import { LogInFormComponent } from './log-in-form/log-in-form.component';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    {path: 'home', component: HomeComponent},
    {path: 'login', component: LogInFormComponent},
    {path: 'register', component: RegistrationFormComponent},
    {path: '', redirectTo: '/home', pathMatch:'full'},
];
