import { Component, OnInit, ViewChild, Input, AfterViewInit } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { BibleVersesDataSource } from './bible-verses-datasource';
import { BibleService } from '../bible-service/bible.service';

@Component({
  selector: 'app-bible-verses',
  templateUrl: './bible-verses.component.html',
  styleUrls: ['./bible-verses.component.css'],
})
export class BibleVersesComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: BibleVersesDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['verse_num', 'verse_content'];

  displayBookList: any[];

  selectedBook: string = 'Gen';
  selectedChapter: string = "1";

  constructor(private bibleVersesService: BibleService) {
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
     verseItems => {this.dataSource = new BibleVersesDataSource(
      this.paginator
      , this.sort
      , verseItems);
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
}
