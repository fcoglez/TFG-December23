import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { PagesModule } from './pages/pages.module';
import { RouterModule } from '@angular/router';
import { PageNotfoundComponent } from './pageNotfound/pageNotfound.component';

@NgModule({
  declarations: [
    AppComponent,
    PageNotfoundComponent
  ],

  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    AuthModule,
    PagesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
