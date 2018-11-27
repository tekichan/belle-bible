import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Observable, of as observableOf } from 'rxjs';
import { map } from 'rxjs/operators';
import { BibleVersesItem } from '../bible-verses/bible-verses-item';

const bible_url = "./assets/bible_cuv_zh_tw.json";

@Injectable({
  providedIn: 'root'
})
export class BibleService {
  bibleObject: any;

  constructor(private http: HttpClient) {
  }

  public getJSON(): Observable<any> {
      return this.http.get(bible_url);
  }

  public getBibleVersesItem(bookName: string, chapterNum: number): Observable<BibleVersesItem[]> {        
      let bibleObservable: Observable<any>;
      if (this.bibleObject) {
          bibleObservable = observableOf(this.bibleObject);
      } else {
          bibleObservable = this.getJSON();
      }
      return bibleObservable.pipe(
          map(
              jsonData => jsonData['verses']
                          .filter(obj => obj['book'] == bookName && obj['chapter_num'] == chapterNum)
                          .map(obj => {
                              return {verse_num: obj['verse_num'], verse_content: obj['verse']};
                          })
          )
      );
  }

  public getBibleChapters(bookName: string): Observable<number[]> {
      let bibleObservable: Observable<any>;
      if (this.bibleObject) {
          bibleObservable = observableOf(this.bibleObject);
      } else {
          bibleObservable = this.getJSON();
      }        
      return bibleObservable.pipe(
          map(
              jsonData => jsonData['verses']
                          .filter(obj => obj['book'] == bookName)
                          .map(obj => obj['chapter_num'])
                          .filter(this.onlyUnique)
          )
      );
  }

  public getBibleBooks(): Observable<any[]> {
      let bibleObservable: Observable<any>;
      if (this.bibleObject) {
          bibleObservable = observableOf(this.bibleObject);
      } else {
          bibleObservable = this.getJSON();
      }          
      return bibleObservable.pipe(
          map(
              jsonData => jsonData['book_list']
          )
      );
  }

  private onlyUnique(value, index, self) { 
      return self.indexOf(value) === index;
  }
}
