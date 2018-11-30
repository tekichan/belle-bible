import { Component, OnInit, ViewChild, Input, AfterViewInit, ElementRef } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { BibleVersesDataSource } from './bible-verses-datasource';
import { BibleService } from '../bible-service/bible.service';
import { TextToSpeechService } from '../bible-service/text-to-speech.service';
import { BibleVersesItem } from './bible-verses-item';

async function delay(ms: number) {
  return new Promise( resolve => setTimeout(resolve, ms) );
}
@Component({
  selector: 'app-bible-verses',
  templateUrl: './bible-verses.component.html',
  styleUrls: ['./bible-verses.component.css'],
})
export class BibleVersesComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('audioPlayback') audioPlayerRef: ElementRef;

  dataSource: BibleVersesDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['verse_num', 'verse_content'];

  displayBookList: any[];
  verseItems: BibleVersesItem[];

  selectedBook: string = 'Gen';
  selectedChapter: string = "1";

  constructor(private bibleVersesService: BibleService, private ttsService: TextToSpeechService) {
  }

  @Input()
  set book(bookName: string) {
    this.selectedBook = bookName;
  }

  @Input()
  set chapter(chapterNum: string) {
    this.selectedChapter = chapterNum;
  }  

  ngOnInit() {
    this.dataSource = new BibleVersesDataSource(
      this.paginator
      , this.sort
      , []
    );
   this.bibleVersesService.getBibleVersesItem(this.selectedBook, Number(this.selectedChapter)).subscribe(
     verseItems => {
        this.verseItems = verseItems
        this.dataSource = new BibleVersesDataSource(
                          this.paginator
                          , this.sort
                          , this.verseItems
        );
     }
   );
   this.bibleVersesService.getBibleBooks().subscribe(
    books => { this.displayBookList = books; }
    );
  }

  displayBook(): string {
    if (this.displayBookList) {
      let bookObj = this.displayBookList.find(obj => obj['abbr'] == this.selectedBook);
      return bookObj['zh_tw'] + ' ' + bookObj['en'];
    } else {
      return '';
    }
  }

  playVoice(contentB64: string): boolean {
    let audio = this.audioPlayerRef.nativeElement;
    if (!audio.src || audio.paused || audio.ended) {
      audio.src = contentB64;
      audio.load();
      audio.play();
      return true;
    } else {
      return false;
    }
  }

  playVerse(verseContent: string): void {
    this.ttsService.postText(verseContent, 'zh-hk').subscribe(
      responseData => {
        this.playVoice(responseData);
      }
    )
  }

  playVerseItems(bookName: string, chapterName: string, verseItems: BibleVersesItem[]): void {
    if (bookName) {
      this.ttsService.postText(bookName, 'zh-hk').subscribe(
        responseData => {
          let playResult = this.playVoice(responseData);
          if (playResult) {
            this.playVerseItems(null, chapterName, verseItems);
          } else {
            delay(500);
            this.playVerseItems(bookName, chapterName, verseItems);            
          }
        }
      )
    }
    if (chapterName) {
      this.ttsService.postText(chapterName, 'zh-hk').subscribe(
        responseData => {
          let playResult = this.playVoice(responseData);
          if (playResult) {
            this.playVerseItems(null, null, verseItems);
          } else {
            delay(500);
            this.playVerseItems(null, chapterName, verseItems);            
          }
        }
      )
    }
    if (verseItems && verseItems.length > 0) {
      let verseItem = verseItems.shift();
      this.ttsService.postText(verseItem.verse_content, 'zh-hk').subscribe(
        responseData => {
          let playResult = this.playVoice(responseData);
          if (playResult) {
            this.playVerseItems(null, null, verseItems);
          } else {
            delay(500);
            verseItems.unshift(verseItem);
            this.playVerseItems(null, null, verseItems);            
          }
        }
      )
    }
  }
}
