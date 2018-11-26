import { HttpClient } from '@angular/common/http'; 
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { BibleVersesItem } from './bible-verses-item';

@Injectable({ providedIn: 'root' })
export class BibleVersesService {
    constructor(private http: HttpClient) {
    }

    public getJSON(): Observable<any> {
        return this.http.get("./assets/bible_cuv_zh_tw.json");
    }
}