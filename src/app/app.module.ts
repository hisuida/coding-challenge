import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { JwBootstrapSwitchNg2Module } from 'jw-bootstrap-switch-ng2';

import { AppComponent } from './app.component';
import { MoviesComponent } from './movies/movies.component';
import { MessagesComponent } from './messages/messages.component';

@NgModule({
  declarations: [
    AppComponent,
    MoviesComponent,
    MessagesComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    JwBootstrapSwitchNg2Module
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
