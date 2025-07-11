import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from  '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProfileComponent } from './profile/profile.component';
import { PlayerComponent } from './player/player.component';
import { LandingComponent } from './landing/landing.component';
import { NavbarComponent } from './navbar/navbar.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HeadersInterceptor } from './headers.interceptor';
import { PlayerSearchComponent } from './player-search/player-search.component';
import { QRCodeModule } from 'angularx-qrcode';
import { AuthInterceptor } from './auth.interceptor';
import { LoginComponent } from './login/login.component';
import { CommonModule } from '@angular/common';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { LogoutComponent } from './logout/logout.component';
import { QrgeneratorComponent } from './qrgenerator/qrgenerator.component';
import { TeamDetailComponent } from './team-detail/team-detail.component';
import { TeamSearchComponent } from './team-search/team-search.component';
import {QrCardComponent} from "./qr-card/qr-card.component";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {GamesComponent} from "./games/games.component";

@NgModule({ declarations: [
        AppComponent,
        ProfileComponent,
        PlayerComponent,
        LandingComponent,
        NavbarComponent,
        PlayerSearchComponent,
        LoginComponent,
        EditProfileComponent,
        LogoutComponent,
        QrgeneratorComponent,
        TeamDetailComponent,
        TeamSearchComponent
    ],
    bootstrap: [AppComponent], imports: [CommonModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    QRCodeModule,
    QrCardComponent,
    NgbModule, GamesComponent], providers: [{ provide: HTTP_INTERCEPTORS, useClass: HeadersInterceptor, multi: true }, {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
        }, provideHttpClient(withInterceptorsFromDi())] })
export class AppModule { }
