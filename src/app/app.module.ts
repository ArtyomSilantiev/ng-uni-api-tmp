import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

import { UserService } from './services/user.service';
import { LocalStorageService } from './services/local-storage.service';
import { ApiService } from './services/api.service';

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        NgbModule
    ],
    providers: [UserService, LocalStorageService, ApiService],
    bootstrap: [AppComponent]
})
export class AppModule {}
