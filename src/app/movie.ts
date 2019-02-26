import { Injectable } from '@angular/core';
import { Adapter } from './adapter';

export class Movie {
    constructor(
        public Title: string,
        public Released: string,
        public Rated: string,
        public Runtime: string,
        public ImdbID: string,
        public ImdbUrl: string,
        public PosterUrl: string,
        public Plot: string
    ) {}

}


@Injectable({
    providedIn: 'root'
})
export class MovieAdapter implements Adapter<Movie> {

  adapt(item: any): Movie {
    return new Movie(
      item.Title,
      item.Released,
      item.Rated,
      item.Runtime,
      item.imdbID,
      item.imdbUrl,
      item.Poster,
      item.Plot
    );
  }
}