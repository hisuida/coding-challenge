import { Component, OnInit } from '@angular/core';
import { Movie } from '../movie';
import { MovieService } from '../movie.service';


@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {
  movies: Movie[];
  selectedMovie: Movie;
  constructor(private movieService: MovieService) {
    this.movies = [];
   }

  ngOnInit() {
    this.getMovies();
  }

  getMovies(): void {
    this.movieService.getMovies()
        .subscribe((movies: any[]) => {
          movies.forEach(movie => {
            this.movieService.getMovieDetails(movie.ImdbID).subscribe((movieDetails: Movie) => {
              movie.Plot = movieDetails.Plot;
              movie.Rated = movieDetails.Rated;
              movie.Released = movieDetails.Released;
              movie.Runtime = movieDetails.Runtime;
            });
            let localPosterUrl = (movie.PosterUrl).split("https://m.media-amazon.com/images/M/")[1];
            movie.PosterUrl = 'assets/img/'+localPosterUrl;
            movie.ImdbUrl = 'https://www.imdb.com/title/tt8108200' + movie.ImdbID;
          });
          this.movies = movies
        });
  }

}
