import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponce } from '../interfaces/gifs.interfaces';

const GIPHY_API_KEY = 'UMZd81dXdcUrAYiskapHoFBIclzB7V4r';


@Injectable({
  providedIn: 'root'
})
export class GifsService {

  public gifList: Gif[] = [];

  private _tagsHistory: string[] = [];
  private serviceUrl: string     = 'https://api.giphy.com/v1/gifs';

  constructor( private http: HttpClient ) { }

  get tagsHistory(){
    return [...this._tagsHistory];
  }

  public searchTag(tag: string):void{
    if( tag.length === 0 ) return;
    this.organizeHistory(tag);

    const params = new HttpParams()
      .set('api_key', GIPHY_API_KEY)
      .set('limit', '10')
      .set('q', tag );


    this.http.get<SearchResponce>( `${ this.serviceUrl }/search`,{ params })
      .subscribe( resp => {

        this.gifList = resp.data;

      })
  }


  private organizeHistory(tag: string):void{
    tag = tag.toLowerCase();

    if( this._tagsHistory.includes(tag) ){
      this._tagsHistory = this._tagsHistory.filter( (oldTag) => oldTag !== tag );
    }
    this._tagsHistory.unshift( tag );
    this._tagsHistory = this._tagsHistory.splice(0,10);
  }

}
