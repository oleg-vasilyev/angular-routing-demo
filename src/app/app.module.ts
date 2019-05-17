import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule, ROUTING_COMPONENT } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserContactInfoComponent } from './user-contact-info/user-contact-info.component';

@NgModule({
  declarations: [
    AppComponent,
    ROUTING_COMPONENT,
    UserContactInfoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
