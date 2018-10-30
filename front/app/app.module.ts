import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

import { UserService } from '../services/user.service';
import { LocalStorageService } from '../services/local-storage.service';
import { ApiService } from 'front/services/api.service';

@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule, AppRoutingModule, HttpClientModule],
    providers: [UserService, LocalStorageService, ApiService],
    bootstrap: [AppComponent]
})
export class AppModule {}
