import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BibleService } from '../bible-service/bible.service';
import { MatBottomSheet } from '@angular/material';
import { BibleHelpComponent } from '../bible-help/bible-help.component';

@Component({
  selector: 'app-bible-nav',
  templateUrl: './bible-nav.component.html',
  styleUrls: ['./bible-nav.component.css'],
})
export class BibleNavComponent implements OnInit {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );
  
  selectedBook: string;
  selectedChapter: string = "0";

  showOldTest: boolean = false;
  showNewTest: boolean = false;

  bookList: any[];
  oldTestament: any[];
  newTestament: any[];

  randomVerse: any;

  constructor(
    private breakpointObserver: BreakpointObserver
    , private bibleVersesService: BibleService
    , private bottomSheet: MatBottomSheet
  ) {}

  ngOnInit() {
   this.bibleVersesService.getBibleBooks().subscribe(
    books => { 
      this.bookList = books;
      this.oldTestament = books.filter(bookObj => bookObj['testament'] == 'old').map(bookObj => bookObj['abbr']);
      this.newTestament = books.filter(bookObj => bookObj['testament'] == 'new').map(bookObj => bookObj['abbr']);
      }
    );
    this.showHomepage();
  }

  showBook(bookName: string) {
    if (bookName) {
      this.selectedBook = bookName;
      this.selectedChapter = "0";
      console.log("BibleNavComponent: " + this.selectedBook);
    }
  }

  displayBook(bookName: string): string {
      let bookObj = this.bookList.find(obj => obj['abbr'] == bookName);
      return bookObj['zh_tw'];
  }

  toggleTestament(testament: string): void {
    if (testament == 'old') {
      this.showOldTest = !this.showOldTest;
    } else if (testament == 'new') {
      this.showNewTest = !this.showNewTest;
    }
  }

  showHomepage(): void {
    this.selectedBook = null;
    this.selectedChapter = "0";
    this.bibleVersesService.getBibleVerses().subscribe(
      verseItems => {
        let randomIdx = Math.floor(Math.random() * verseItems.length);
        this.randomVerse = verseItems[randomIdx];
      }
    )
  }

  showHelp(): void {
    this.bottomSheet.open(BibleHelpComponent);
  }
}
