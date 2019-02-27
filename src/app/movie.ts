import { Injectable } from '@angular/core';
import { Adapter } from './adapter';

export class Movie {
    constructor(
        public Title: string,
        public ImdbID: string,
        public ImdbUrl: string,
        public PosterUrl: string,
        public Year: string,
        public movieDetails: MovieDetails
    ) {}

}

export class MovieDetails {
    constructor(
        public Plot: string,
        public Released: string,
        public Rated: string,
        public Runtime: string,
    ) {}
}


@Injectable({
    providedIn: 'root'
})
export class MovieAdapter implements Adapter<Movie> {

  adapt(item: any): Movie {
    return new Movie(
      item.Title,
      item.ImdbID,
      item.ImdbUrl,
      item.Poster,
      item.Year,
      new MovieDetails(
          item.Plot,
          item.Released,
          item.Rated,
          item.Runtime
      )
    );
  }
}