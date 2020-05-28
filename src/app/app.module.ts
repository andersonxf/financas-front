import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule, LOCALE_ID} from '@angular/core';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing.module';
import { SegurancaModule } from './seguranca/seguranca.module';

@NgModule({
  declarations: [
    AppComponent,    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    SegurancaModule,
    AppRoutingModule,
    
  ],
  providers: [  
    { provide: LOCALE_ID, useValue: 'pt'}  
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
