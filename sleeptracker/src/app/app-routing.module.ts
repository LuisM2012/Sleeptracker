import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { DailyPageComponent } from './pages/daily-page/daily-page.component';
import { HistoryPageComponent } from './pages/history-page/history-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LogPageComponent } from './pages/log-page/log-page.component';
import { RatePageComponent } from './pages/rate-page/rate-page.component';
import { SettingsPageComponent } from './pages/settings-page/settings-page.component';
import { TimePageComponent } from './pages/time-page/time-page.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomePageComponent
  },
  {
    path: 'history',
    component: HistoryPageComponent
  },
  {
    path: 'rate',
    component: RatePageComponent
  },
  {
    path: 'log/:id',
    component: LogPageComponent
  },
  {
    path: 'time',
    component: TimePageComponent
  },
  {
    path: 'daily',
    component: DailyPageComponent
  },
  {
    path: 'settings',
    component: SettingsPageComponent
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
