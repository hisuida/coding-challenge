import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Movie, MovieAdapter } from './movie';
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
    return this.http
    .get<Movie[]>(this.baseUrl + batmanSearchQuery + this.apiKeyQuery)
    .pipe(
      map((data: any[]) => data['Search'].map(item => this.adapter.adapt(item))),
      catchError(this.handleError('getMovies', []))
    );
  }

  getMovieDetails(imdbId) {
    this.messageService.add('MovieService: Fetched Detail of Movie');
    return this.http.get<Movie>(this.baseUrl + `i=${imdbId}` + this.apiKeyQuery)
    .pipe(
      tap(_ => this.log('fetched details')),
      catchError(this.handleError('getMovieDetails', []))
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
