import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LandingComponent } from './landing/landing.component';
import { authGuard } from './guards/auth.guard'; // Import your authGuard
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'landing', component: LandingComponent },
  {
    path: 'landing',
    component: LandingComponent,
    children: [
      { path: '', redirectTo: 'user', pathMatch: 'full' },  // Default redirect inside landing
      { path: 'user', loadChildren: () => import('./user/user.module').then(mod => mod.UserModule), canActivate: [authGuard] }, // Protect user routes
      { path: 'report', loadChildren: () => import('./report/report.module').then(mod => mod.ReportModule), canActivate: [authGuard] }, // Protect report routes
    ]
  },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
