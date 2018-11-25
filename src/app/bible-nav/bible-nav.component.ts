import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-bible-nav',
  templateUrl: './bible-nav.component.html',
  styleUrls: ['./bible-nav.component.css'],
})
export class BibleNavComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );
  
  isBookSelected: boolean;
  selectedBook: string;

  constructor(private breakpointObserver: BreakpointObserver) {}

  showBook(bookName: string) {
    if (bookName) {
      this.isBookSelected = false;
      this.selectedBook = bookName;
    } else {
      this.isBookSelected = false;
    }
  }

}
