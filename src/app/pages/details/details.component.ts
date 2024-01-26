import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';

import { PokeapiService } from 'src/app/service/pokeapi.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  private urlDetails: string = 'https://pokeapi.co/api/v2/pokemon';
  private urlName: string = 'https://pokeapi.co/api/v2/pokemon-species';


   public pokemon: any;
   public isLoading: boolean = false;
   public apiError: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private pokeApiService: PokeapiService
  ){}

ngOnInit(): void {
  this.getPokemon();
}

 public getPokemon(){
  // get pokemon()
    const id = this.activatedRoute.snapshot.params['id'];
    const pokemon = this.pokeApiService.apiGetPokemon(`${this.urlDetails}/${id}`);
    const name = this.pokeApiService.apiGetPokemon(`${this.urlName}/${id}`);

    return forkJoin([pokemon, name]).subscribe({
      next: (res) => {
        this.pokemon = res
        console.log(this.pokemon /*ou*/ /*res*/);
        this.isLoading = true;
      },
      error: (res) => {
        this.pokemon = res;
        this.apiError = true;
      }
    })

  }
}
