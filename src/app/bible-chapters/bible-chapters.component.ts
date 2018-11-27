import { Component, OnInit, Input } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { BibleService } from '../bible-service/bible.service';
import { Observable, of as observableOf } from 'rxjs';

@Component({
  selector: 'app-bible-chapters',
  templateUrl: './bible-chapters.component.html',
  styleUrls: ['./bible-chapters.component.css'],
})
export class BibleChaptersComponent implements OnInit {
  selectedBook: string = 'Gen';
  selectedChapter: string = "0";

  displayBookList: any[];

  @Input()
  set book(bookName: string) {
    this.selectedBook = bookName;
    this.selectedChapter = "0";
    this.initBookChapters();
    console.log("BibleChaptersComponent: " + this.selectedBook + ", " + this.selectedChapter);
  }

  @Input()
  set chapter(chapterNum: string) {
    this.selectedChapter = chapterNum;
    console.log("BibleChaptersComponent: " + this.selectedBook + ", " + this.selectedChapter);
  } 

  /** Based on the screen size, switch from standard to one column per row */
  cards: Observable<any[]> = observableOf([]);

  constructor(private breakpointObserver: BreakpointObserver, private bibleVersesService: BibleService) {}

  ngOnInit() {
    this.initBookChapters();
  }
  
  initBookChapters(): void {
    this.bibleVersesService.getBibleChapters(this.selectedBook).subscribe(
      chapters => {
       this.cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
         map(({ matches }) => {
           if (matches) {
             return chapters.map(chapterObj => {
                 return { title: chapterObj, cols: 1, rows: 1 };
               });
           }    
           return chapters.map(chapterObj => {
             return { title: chapterObj, cols: 1, rows: 1 };
           });
         })
       );
      }
    );
 
    this.bibleVersesService.getBibleBooks().subscribe(
     books => { this.displayBookList = books; }
    );
  }

  selectChapter(chapterNum: number): void {
    this.selectedChapter = String(chapterNum);
  }

  displayBook(): string {
    if (this.displayBookList) {
      let bookObj = this.displayBookList.find(obj => obj['abbr'] == this.selectedBook);
      return bookObj['zh_tw'] + ' ' + bookObj['en'];
    } else {
      return '';
    }
  }
}
