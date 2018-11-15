import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LugaresComponent } from '../app/components/lugares/lugares.component';
import { LoginComponent } from '../app/components/login/login.component';
import { DashboardComponent } from '../app/components/dashboard/dashboard.component';
import { HomeComponent} from '../app/components/home/home.component';
import { RegistroComponent} from '../app/components/registro/registro.component';


const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'places', component: LugaresComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'registro', component: RegistroComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
