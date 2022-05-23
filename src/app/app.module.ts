import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { AppComponent } from './app.component';
import { SignatureComponent } from './signature/signature.component';

@NgModule({
  declarations: [AppComponent, SignatureComponent],
  imports: [BrowserModule, NgxExtendedPdfViewerModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
