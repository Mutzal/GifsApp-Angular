import { Component } from '@angular/core';
import { GifsService } from './gifs/services/gifs.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'gifs-app';

  constructor( private gifsService: GifsService ){}

  get sideList(){
    return [...this.gifsService.tagsHistory];
  }


}
