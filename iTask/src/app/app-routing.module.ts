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
    path: 'add-task/:id',
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
  {
    path: 'calendar',
    loadChildren: () => import('./pages/calendar/calendar.module').then(m => m.CalendarPageModule)
  },
  {
    path: 'search',
    loadChildren: () => import('./modals/search/search.module').then( m => m.SearchPageModule)
  },
  {
    path: 'info-reminder/:id',
    loadChildren: () => import('./pages/info-reminder/info-reminder.module').then( m => m.InfoReminderPageModule)
  },
  {
    path: 'share',
    loadChildren: () => import('./modals/share/share.module').then(m => m.SharePageModule)
  },
  {
    path: 'task-details/:id',
    loadChildren: () => import('./pages/task-details/task-details.module').then( m => m.TaskDetailsPageModule)
  },



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
