import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsRespone } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string = 'ZYh1Zru5GLVLR2SB99CUAVMMz6si88n6'
  private serviceUrl: string = 'http://api.giphy.com/v1/gifs'

  private _historial: string[] = [];

  //cambiaremos any por su tipo
  public resultados: Gif[] = [];

  //localstorage

  


  get historial() {
    
    return [...this._historial];
  }

  //constructor 

  constructor(private http: HttpClient){
    
    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    this.resultados = JSON.parse(localStorage.getItem('resultados')!) || [];


    // if ( localStorage.getItem('historial')){
    //   this._historial = JSON.parse(localStorage.getItem('historial')!);
    // }
  }

  buscarGifs(query:string = '') {

    query = query.trim().toLocaleLowerCase();
    

    if ( !this._historial.includes( query )  ) {
      this._historial.unshift(query);
      this._historial = this._historial.splice(0,10);

      localStorage.setItem('historial', JSON.stringify(this._historial));

     
    }

   
  //consumir la API con fetch

    // fetch('http://api.giphy.com/v1/gifs/search?api_key=ZYh1Zru5GLVLR2SB99CUAVMMz6si88n6&q=dragon ball&limit=10')
    // .then(resp => {
    //   resp.json().then(data=> {
    //     console.log(data);
    //   })
    // })


    // http params 

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '10')
      .set('q', query);


    //consumir la API con HTTP

    this.http.get<SearchGifsRespone>(`${this.serviceUrl}/search`, { params})
        .subscribe((resp) => {
          this.resultados = resp.data;
          localStorage.setItem('resultados', JSON.stringify(this.resultados));
        })


  }


  


}
