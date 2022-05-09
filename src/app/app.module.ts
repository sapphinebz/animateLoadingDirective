import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SupportImagesModule } from 'src/support-images/support-images.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, SupportImagesModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
