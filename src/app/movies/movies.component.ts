import { Component, OnInit, OnDestroy } from '@angular/core';
import { Movie } from '../movie';
import { MovieService } from '../movie.service';
import * as _ from 'lodash';
declare var $: any;

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit, OnDestroy {
  movies: Movie[];
  filteredMovies: Movie[];
  filters = {};
  filterModels = [];
  subscriptions = [];
  movieDetailsLoaded: Promise<boolean>;

  constructor(private movieService: MovieService) {
    this.movies = [];
    this.filterModels = [
      {name: 'Show All', value: 'none'},
      {name: `2000's`, value: '2000'},
      {name: `1900's`, value: '1900'}
    ];
   }

  ngOnInit() {
    this.getMovies();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  private applyFilters() {
    this.filteredMovies = _.filter(this.movies, _.conforms(this.filters));
  }

  filterByYear(filterModel) {
    if (filterModel.value === 'none') {
      this.removeFilter('Year');
    } else if (filterModel.value === '2000') {
      this.filters['Year'] = val => val.startsWith('20');
    } else {
      this.filters['Year'] = val => val.startsWith('19');
    }
    this.applyFilters();
  }

  getMovies(): void {
    const movieSubscription = this.movieService.getMovies()
    .subscribe(movies => {
      this.movies = movies;
      if (this.movies && this.movies.length) {
        this.getMovieDetails(this.movies);
      }
      this.applyFilters();
    });
    this.subscriptions.push(movieSubscription);
  }

  getMovieDetails(movies): void {
    movies.forEach((movie) => {
      const imdbID = movie.imdbID;
      const movieDetailsSubscription = this.movieService.getMovieDetails(imdbID).subscribe(
        movieDetails => {
          movie.movieDetails.Plot = movieDetails.Plot;
          movie.movieDetails.Released = movieDetails.Released;
          movie.movieDetails.Rated = movieDetails.Rated;
          movie.movieDetails.Runtime = movieDetails.Runtime;
          this.movieDetailsLoaded = Promise.resolve(true);
        }
      );
      this.subscriptions.push(movieDetailsSubscription);
      const localPosterUrl = (movie.PosterUrl).split('https://m.media-amazon.com/images/M/')[1];
      movie.PosterUrl = `assets/img/${localPosterUrl}`;
      movie.imdbUrl = `https://www.imdb.com/title/${imdbID}`;
    });
  }

  removeFilter(property: string) {
    delete this.filters[property];
    this[property] = null;
    this.applyFilters();
  }
}
