import { Injectable } from "@angular/core";
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http'; 
import { Observable, throwError } from 'rxjs';

import { ttsApiKey } from './text-to-speech.config';
import { catchError } from "rxjs/operators";

const tts_url = "https://api.voicerss.org/";

@Injectable({
    providedIn: 'root'
})
export class TextToSpeechService {
    constructor(private http: HttpClient) {
    }

    public postText(textToSpeech: string, textLocal: string): Observable<string> {
        let postHeaders = new HttpHeaders()
            .set('Content-Type', 'application/x-www-form-urlencoded');

        const postBody = new HttpParams()
            .set('key', ttsApiKey)
            .set('hl', textLocal)
            .set('src', textToSpeech)
            .set('b64', 'true')
        ;
    
        return this.http.post(
            tts_url
            , postBody.toString()
            , {
                headers: postHeaders
                , responseType: 'text'
            }
        )
        .pipe(
            catchError(this.handleError)
        );
    }

    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
          // A client-side or network error occurred. Handle it accordingly.
          console.error('An error occurred:', error.error.message);
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,
          console.error(
            `Backend returned code ${error.status}, ` +
            `body was: ${error.error}`);
        }
        // return an observable with a user-facing error message
        return throwError(
          'Something bad happened; please try again later.');
      };    
}