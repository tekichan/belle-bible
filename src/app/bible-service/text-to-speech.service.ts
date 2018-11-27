import { Injectable } from "@angular/core";
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http'; 
import { Observable } from 'rxjs';

import { ttsApiKey } from './text-to-speech.config';

const tts_url = "https://api.voicerss.org/";

@Injectable({
    providedIn: 'root'
})
export class TextToSpeechService {
    constructor(private http: HttpClient) {
    }

    public postText(textToSpeech: string, textLocal: string): Observable<any> {
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
    }
}