import { Component } from '@angular/core';
import {AppService} from "../app.service";
import {ActivatedRoute} from "@angular/router";
import {AuthService} from "../auth.service";
import {AnalyticsService} from "../analytics.service";
import {QRCodeModule} from "angularx-qrcode";

@Component({
  selector: 'app-qr-card',
  standalone: true,
  imports: [
    QRCodeModule
  ],
  templateUrl: './qr-card.component.html',
  styleUrl: './qr-card.component.sass'
})
export class QrCardComponent {


  url: string;

  constructor(){
    this.url = window.location.href;
  }
}
