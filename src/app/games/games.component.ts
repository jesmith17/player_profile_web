import {Component, Input} from '@angular/core';
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {Game} from "../models/game";

@Component({
  selector: 'app-games',
  standalone: true,
    imports: [
        DatePipe,
        NgForOf,
        NgIf
    ],
  templateUrl: './games.component.html',
  styleUrl: './games.component.sass'
})
export class GamesComponent {

  @Input() games?: Game[];

}
