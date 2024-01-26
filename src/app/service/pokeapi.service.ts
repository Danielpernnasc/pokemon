import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokeapiService {

  private url: string = 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=100';
  private urlDetails: string = 'https://pokeapi.co/api/v2/pokemon';
  



  constructor(private http: HttpClient) { }

  get apiListAllPokemons(): Observable<any>{
    return this.http.get<any>(this.url).pipe(
        // tap(res => res),
        // tap(res => {
        //     // res.results.map((resPokemons: any) => {
        //     //     this.apiGetPokemon(resPokemons.url).subscribe({
        //     //       next: (res) => resPokemons.status = res
        //     //     });
        //     // }) 
        //     //console.log(res, 'Todos os Pokemos')
        // })
        tap(res => {
            res.results.map((resPokemons: any) => {
            this.apiGetPokemon(resPokemons.url).subscribe({
              next: (res) => resPokemons.status = res
              });
        }) 
          console.log(res, 'Todos os Pokemos')
        })
    )
  }

  get apiDetailsAllPokemons(): Observable<any>{
    return this.http.get<any>(this.urlDetails).pipe(
      tap(res => res),
      tap(res => {
        console.log(res, 'Detalhes');
      })
    )
  }

  public apiGetPokemon(url: string):Observable<any>{
      return this.http.get<any>(url).pipe(
        map(
          res => res
          //res => console.log(res, 'GETPOKEMON') //resposta da api no metodo get
        )
      )
  }

  
}
