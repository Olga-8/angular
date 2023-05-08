import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { AboutModule } from './features/about/about.module';
import { SharedModule } from './shared/shared.module';




@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    CoreModule,
    AboutModule,
    SharedModule,
    RouterModule,
    HttpClientModule,
    AppRoutingModule //need to be last
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
