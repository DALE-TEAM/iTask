import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {AuthGuard} from './guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'welcome',
    pathMatch: 'full'
  },
  {
    path: 'welcome',
    loadChildren: () => import('./pages/welcome/welcome.module').then( m => m.WelcomePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./pages/dashboard/dashboard.module').then( m => m.DashboardPageModule),
    canActivateChild: [AuthGuard]
  },
  {
    path: 'registration',
    loadChildren: () => import('./pages/registration/registration.module').then( m => m.RegistrationPageModule)
  },
  {
    path: 'lista-task/:id',
    loadChildren: () => import('./pages/lista-task/lista-task.module').then( m => m.ListaTaskPageModule)
  },
  {
    path: 'calendar',
    loadChildren: () => import('./pages/calendar/calendar.module').then(m => m.CalendarPageModule)
  },
  {
    path: 'add-task',
    loadChildren: () => import('./pages/add-task/add-task.module').then( m => m.AddTaskPageModule)
  },
  {
    path: 'default-task/:key',
    loadChildren: () => import('./pages/default-task/default-task.module').then( m => m.DefaultTaskPageModule)
  },
  {
    path: 'update-email',
    loadChildren: () => import('./modals/update-email/update-email.module').then( m => m.UpdateEmailPageModule)
  },
  {
    path: 'update-pass',
    loadChildren: () => import('./modals/update-pass/update-pass.module').then( m => m.UpdatePassPageModule)
  },
  {
    path: 'add-reminder',
    loadChildren: () => import('./pages/add-reminder/add-reminder.module').then( m => m.AddReminderPageModule)
  },







];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
