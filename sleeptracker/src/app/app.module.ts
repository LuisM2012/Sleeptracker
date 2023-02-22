import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { HistoryPageComponent } from './pages/history-page/history-page.component';
import { TimePageComponent } from './pages/time-page/time-page.component';
import { RatePageComponent } from './pages/rate-page/rate-page.component';
import { LogPageComponent } from './pages/log-page/log-page.component';
import { DailyPageComponent } from './pages/daily-page/daily-page.component';
import { SettingsPageComponent } from './pages/settings-page/settings-page.component';

@NgModule({
  declarations: [
    AppComponent, 
    HistoryPageComponent, 
    HomePageComponent,
    TimePageComponent,
    RatePageComponent,
    LogPageComponent,
    DailyPageComponent,
    SettingsPageComponent
    ],
  imports: [FormsModule, BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
