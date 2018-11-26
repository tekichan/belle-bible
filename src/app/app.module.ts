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

  , MatCardModule, MatTreeModule, MatTableModule, MatPaginatorModule, MatSortModule
} from '@angular/material';
import { BibleVersesComponent } from './bible-verses/bible-verses.component';

@NgModule({
  declarations: [
    AppComponent,
    BibleNavComponent,
    BibleVersesComponent
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

    , MatCardModule, MatTreeModule, MatTableModule, MatPaginatorModule, MatSortModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
