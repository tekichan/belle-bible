import { Component, OnInit, ViewChild, Input, AfterViewInit, ElementRef } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { BibleVersesDataSource } from './bible-verses-datasource';
import { BibleService } from '../bible-service/bible.service';
import { TextToSpeechService } from '../bible-service/text-to-speech.service';
import { BibleVersesItem } from './bible-verses-item';

const delay = async (ms: number) => new Promise( resolve => setTimeout(resolve, ms) );
const countBytes = (str) => encodeURI(str).split(/%..|./).length - 1;
const voiceByteLimit = 90000;

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

  displayBook(lang: string): string {
    if (this.displayBookList) {
      let bookObj = this.displayBookList.find(obj => obj['abbr'] == this.selectedBook);
      if (lang == 'both') {
        return bookObj['zh_tw'] + ' ' + bookObj['en'];
      } else if (lang == 'en') {
        return bookObj['en'];
      } else {
        return bookObj['zh_tw'];
      }
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
        if (responseData) {
          if (responseData.startsWith("ERROR")) {
            alert("Speech can't be played. Please try next time.");
          } else {
            let playResult = this.playVoice(responseData);
            if (!playResult) {
              alert("Speech can't be played. Please try next time.");
            }                
          }
        } else {
          alert("Speech can't be played. Please try next time.");
        }
      }
      , error => {
        console.log(error);
        alert("Speech can't be played. Please try next time.");
      }
    )
  }

  playVerseItems(bookName: string, chapterName: string, verseItems: BibleVersesItem[]): void {
    let voiceContent: string = "";

    if (bookName) {
      voiceContent += bookName;
    }
    if (chapterName) {
      voiceContent += "\n" + chapterName;
    }
    if (verseItems && verseItems.length > 0) {
      while (verseItems.length > 0 &&
              countBytes(voiceContent + "\n" + verseItems[0].verse_content) <= voiceByteLimit) {
        voiceContent += "\n" + verseItems.shift().verse_content;
      }
    }
    
    if (voiceContent) {
      this.ttsService.postText(voiceContent, 'zh-hk').subscribe(
        responseData => {
          if (responseData) {
            if (responseData.startsWith("ERROR")) {
              alert("Speech can't be played. Please try next time.");
            } else {
              let playResult = this.playVoice(responseData);
              if (!playResult) {
                alert("Speech can't be played. Please try next time.");
              } else {
                this.playVerseItems(null, null, verseItems);
              }               
            }
          } else {
            alert("Speech can't be played. Please try next time.");
          }
        }
      )
    }
  }
}
