import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { Title, BrowserModule } from '@angular/platform-browser';

import { routingComponents, appRouting, } from './app.routing';
import { VideoComponent } from './videos/video.component';
import { ArticleComponent } from './articles/articles.component';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';
import { ResponsiveModule } from 'ngx-responsive';
import { SearchComponent } from './services/search/search.component';
import { DropdownModule } from "ngx-dropdown";
import { PanelModule } from './services/panel/panel.module';
import { HttpClientModule } from '@angular/common/http';
import { ServicesModule } from './services/ServicesModule';
import { AnekdotModule } from './anekdots/anekdotModule';
import { firebase } from '../environments/firebase.config';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabase } from 'angularfire2/database';

import { UploadModule } from './services/uploads/shared/upload.module';
import { SafePipe } from './services/pipes/safe.pipe';
import { ReversePipe } from './services/pipes/reversePipe';






const config = {
  apiKey: "AIzaSyDEju-yxMf3mxuIZEuSigeygODsOk5ixBg",
  authDomain: "ninagra-ba195.firebaseapp.com",
  databaseURL: "https://ninagra-ba195.firebaseio.com",
  projectId: "ninagra-ba195",
  storageBucket: "ninagra-ba195.appspot.com",
  messagingSenderId: "890441192904"
};


@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    VideoComponent,
    ArticleComponent,
    SafePipe,
    ReversePipe

  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    appRouting,
    ResponsiveModule,
    DropdownModule,
    PanelModule,
    HttpClientModule,
    AnekdotModule,
    ServicesModule,
    AngularFireModule.initializeApp(firebase),
    AngularFireModule,

    UploadModule



  ],
  providers: [SearchComponent, HttpClientModule, AngularFireDatabase
  //   {
  //   provide: 'externalUrlRedirectResolver',
  //   useValue: (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  //     window.location.href = (route.data as any).externalUrl;
  //   }
  // }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
