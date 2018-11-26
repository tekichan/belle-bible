import { Component, OnInit, ViewChild, Input, AfterViewInit } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { BibleVersesDataSource } from './bible-verses-datasource';
import { BibleVersesService } from './bible-verses.service';

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

  selectedBook: string;

  constructor(private bibleVersesService: BibleVersesService) {
  }

  @Input()
  set book(bookName: string) {
    this.selectedBook = bookName;
  }

  ngOnInit() {
    this.dataSource = new BibleVersesDataSource(
      this.paginator
      , this.sort
      , []
    );
    this.bibleVersesService.getJSON().subscribe(
      jsonData => {
        this.dataSource = new BibleVersesDataSource(
          this.paginator
          , this.sort
          , jsonData['books']
          .filter(obj => obj['book'] == this.selectedBook && obj['chapter_num'] == 1)
          .map(obj => {
            return {verse_num: obj['verse_num'], verse_content: obj['verse']};
          })
        );
      }
    );
  }
}
