import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule, LOCALE_ID } from '@angular/core';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing.module';
import { registerLocaleData } from '@angular/common';
import ptBr from '@angular/common/locales/pt';
import { SegurancaModule } from './seguranca/seguranca.module';
registerLocaleData(ptBr);

@NgModule({
  declarations: [
    AppComponent,    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    SegurancaModule,
    AppRoutingModule    
  ],
  providers: [    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
