import { Component, OnInit } from '@angular/core';
import { Movie, MovieDetails } from '../movie';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {
  movies: Movie[];
  constructor(private movieService: MovieService) {
    this.movies = [];
   }

  ngOnInit() {
    this.getMovies();
  }

  getMovies(): void {
    this.movieService.getMovies()
    .subscribe(movies => {
      this.movies = movies;
      if(this.movies && this.movies.length) {
        this.getMovieDetails(this.movies);
      }
    });
  }

  getMovieDetails(movies): void {
    movies.forEach((movie) => {
      let imdbID = movie.ImdbID;
      this.movieService.getMovieDetails(imdbID).subscribe(
        movieDetails => {
          movie.movieDetails.Plot = movieDetails.Plot;
          movie.movieDetails.Released = movieDetails.Released;
          movie.movieDetails.Rated = movieDetails.Rated;
          movie.movieDetails.Runtime = movieDetails.Runtime;
        }
      )
      let localPosterUrl = (movie.PosterUrl).split("https://m.media-amazon.com/images/M/")[1];
      movie.PosterUrl = `assets/img/${localPosterUrl}`;
      movie.ImdbUrl = `https://www.imdb.com/title/${imdbID}`;
    })
  }
}
