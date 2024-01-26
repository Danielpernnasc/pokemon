import { Component, OnInit } from '@angular/core';
import { PokeapiService } from 'src/app/service/pokeapi.service';

@Component({
  selector: 'poke-list',
  templateUrl: './poke-list.component.html',
  styleUrls: ['./poke-list.component.scss']
})
export class PokeListComponent implements OnInit {

  private setAllPokemons: any;
 public getAllPokemons: any;

 public apiError: boolean = false;
  constructor(
    private pokeApiService: PokeapiService
  ){}

  ngOnInit(): void {

    this.pokeApiService.apiListAllPokemons.subscribe({
      next: (res) => {
        this.setAllPokemons = res.results
        this.getAllPokemons = this.setAllPokemons;
    
        
      }, error: (res) => {
        console.log(res);
        this.apiError = true
      }
    })
  }

  public getSearch(value: string){
       const filter = this.setAllPokemons.filter((res: any) => {
        //const filter = filtrar os pokemons
        return !res.name.indexOf(value.toLowerCase());
      });
      // console.log(value);
      this.getAllPokemons = filter;
     
  }

}
