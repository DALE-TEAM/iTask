import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { IonicStorageModule } from '@ionic/storage';
import { HttpClientModule } from '@angular/common/http';

import{ GooglePlus } from "@ionic-native/google-plus/ngx";
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgCalendarModule  } from 'ionic2-calendar';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule, 
    ReactiveFormsModule,
      NgCalendarModule,
    IonicModule.forRoot({
      mode: 'ios'
    }), 
    AppRoutingModule,
    IonicStorageModule.forRoot({
      name: 'itask',
      driverOrder: ['indexeddb', 'sqlite', 'websql']
    }),
    HttpClientModule,
    FormsModule
  ],
  providers: [
    GooglePlus,
    StatusBar,
    SplashScreen,
      LocalNotifications,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
