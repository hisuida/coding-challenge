import { Component, OnInit } from '@angular/core';
import { Movie } from '../movie';
import { MovieService } from '../movie.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {
  movies: Movie[];
  filteredMovies: Movie[];
  year: string;
  filters = {};

  constructor(private movieService: MovieService) {
    this.movies = [];
   }

  ngOnInit() {
    this.getMovies();
  }

  private applyFilters() {
    this.filteredMovies = _.filter(this.movies, _.conforms(this.filters));
  }

  filterByRule(property: string, rule: any, operator: string) {
    if (operator === 'greater') {
      this.filters[property] = val => Number(val) >= Number(rule);
    } else {
      this.filters[property] = val => Number(val) < Number(rule);
    }
    this.applyFilters();
  }

  getMovies(): void {
    this.movieService.getMovies()
    .subscribe(movies => {
      this.movies = movies;
      if (this.movies && this.movies.length) {
        this.getMovieDetails(this.movies);
        this.applyFilters();
      }
    });
  }

  getMovieDetails(movies): void {
    movies.forEach((movie) => {
      const imdbID = movie.ImdbID;
      this.movieService.getMovieDetails(imdbID).subscribe(
        movieDetails => {
          movie.movieDetails.Plot = movieDetails.Plot;
          movie.movieDetails.Released = movieDetails.Released;
          movie.movieDetails.Rated = movieDetails.Rated;
          movie.movieDetails.Runtime = movieDetails.Runtime;
        }
      );
      const localPosterUrl = (movie.PosterUrl).split('https://m.media-amazon.com/images/M/')[1];
      movie.PosterUrl = `assets/img/${localPosterUrl}`;
      movie.ImdbUrl = `https://www.imdb.com/title/${imdbID}`;
    });
  }

  removeFilter(property: string) {
    delete this.filters[property];
    this[property] = null;
    this.applyFilters();
  }
}
