import { NgModule, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';


import { AppComponent } from './app';

@NgModule({
  declarations: [
  ],
  
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection()
  ],
  bootstrap: []
})
export class AppModule { }
