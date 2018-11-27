import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { HttpClientModule }    from '@angular/common/http';

import { AppComponent } from './app.component';
import { BibleNavComponent } from './bible-nav/bible-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { 
  MatToolbarModule
  , MatButtonModule
  , MatSidenavModule
  , MatIconModule
  , MatListModule 

  , MatCardModule, MatTreeModule, MatTableModule, MatPaginatorModule, MatSortModule, MatGridListModule, MatMenuModule
} from '@angular/material';
import { BibleVersesComponent } from './bible-verses/bible-verses.component';
import { BibleChaptersComponent } from './bible-chapters/bible-chapters.component';

@NgModule({
  declarations: [
    AppComponent,
    BibleNavComponent,
    BibleVersesComponent,
    BibleChaptersComponent
  ],
  imports: [
    BrowserModule
    , BrowserAnimationsModule

    , HttpClientModule
    
    , LayoutModule
    , MatToolbarModule
    , MatButtonModule
    , MatSidenavModule
    , MatIconModule
    , MatListModule

    , MatCardModule, MatTreeModule, MatTableModule, MatPaginatorModule, MatSortModule, MatGridListModule, MatMenuModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
