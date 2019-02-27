import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Movie, MovieAdapter, MovieDetails } from './movie';
import { MessageService } from './message.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private baseUrl = 'http://www.omdbapi.com/?';
  private apiKeyQuery = '&apikey=1d3daf33';

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private adapter: MovieAdapter
    ) { }

  getMovies(): Observable<Movie[]> {
    this.messageService.add('MovieService: Fetched Movies');
    const batmanSearchQuery = 's=Batman';
    const url = `${this.baseUrl}${batmanSearchQuery}${this.apiKeyQuery}`
    return this.http
    .get<Movie[]>(url)
    .pipe(
      map((data: any[]) => data['Search'].map(item => this.adapter.adapt(item))),
      catchError(this.handleError('getMovies', []))
    );
  }

  getMovieDetails(imdbID): Observable<MovieDetails> {
    const fullPlotQuery = '&plot=full';
    const url = `${this.baseUrl}i=${imdbID}${fullPlotQuery}${this.apiKeyQuery}`;
    return this.http.get<MovieDetails>(url).pipe(
      tap(_ => this.log(`Fetched details for Movie with imdb ID = ${imdbID}`)),
      catchError(this.handleError<MovieDetails>(`get movie details for imdb ID = ${imdbID}`))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  private log(message: string) {
    this.messageService.add( `MovieService: ${message}`);
  }
}
