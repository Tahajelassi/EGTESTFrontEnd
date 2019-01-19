import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastrModule} from 'ngx-toastr';
import {CdserviceService} from './shared/cdservice.service';
import {CdsComponent} from './home/cds/cds.component';
import {CdComponent} from './home/cd/cd.component';
import {CdListComponent} from './home/cd-list/cd-list.component';
import {MatDatepickerModule, MatNativeDateModule} from '@angular/material';
import {DatePipe} from '@angular/common';
import {CdElementComponent} from './home/cd-list/cd-element/cd-element.component';


@NgModule({
  declarations: [
    AppComponent,
    CdsComponent,
    CdComponent,
    CdListComponent,
    CdElementComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ToastrModule.forRoot()
  ],
  providers: [CdserviceService, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule {
}
