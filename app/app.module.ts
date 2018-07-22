import { NgModule } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { HomeComponent } from './components/home.component';
import { CommonService } from './services/common.service';
import { Angular2FontawesomeModule } from 'angular2-fontawesome';
 
@NgModule({
  imports: [BrowserModule, ReactiveFormsModule, HttpModule, Angular2FontawesomeModule],
  declarations: [AppComponent, HomeComponent],
  providers: [CommonService,{ provide: APP_BASE_HREF, useValue: '/' }],
  bootstrap: [AppComponent]
})

export class AppModule {
  
}