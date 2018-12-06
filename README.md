# Belle's Bible (belle-bible)
### A simple bible app with Angular Material with Text To Speech (TTS) service in Cantonese.
[![License](https://img.shields.io/badge/license-MIT-green.svg)](/doc/LICENSE) 

## Introduction
This is a simple Single Page Application (SPA) to provide TTS service in Cantonese for Traditional Chinese (zh-TW) Bible as Chinese Union Version (CUV). This app makes use of [Angular](https://angular.io/) as a frontend framework and [Angular Material](https://material.angular.io/) to fulfill [Material Design](https://material.io/) as visual principle.

The app has been published to Github Pages at [https://tekichan.github.io/belle-bible/](https://tekichan.github.io/belle-bible/). The app is responsive, so it can be properly opened with a desktop web browser or a mobile web browser.

## Prerequisites
1. Install [NodeJS](https://nodejs.org) with [NPM](https://www.npmjs.com/)
2. Install Angular, [Angular CLI](https://github.com/angular/angular-cli), Angular Material
3. Register a TTS Service. Here we use a free service provided by [Voice RSS](http://www.voicerss.org/)
4. Install [angular-cli-ghpages](https://www.npmjs.com/package/angular-cli-ghpages) for deploying a production build to [Github Pages](https://pages.github.com/)

## Getting Started
### High Level Design
![High Level Design](/doc/bellebible_highleveldesign.png)

The app runs with app.component.ts which is a default entry point of Angular app. It uses bible-nav to define the whole frame with menu bar, side bar and the container of the main content. The menu bar points to bible-help for everywhere help screen. The side bar can trigger the change of the main content to show bible-chapters to list chapters of a selected book. After a chapter is selected, verses of the chapter will show. bible-service consists of service classes, which bridge this app with the remote data sources, such as another asset path or TTS provider.

### Build App Skeleton
The next step is to create the app folder and essential components according to the high level design.

1. Run `ng new belle-bible` to create an app folder. The fundamental components and configurations have been in place. A Hello-World style app is available. You can run `ng serve` to run the app in your local machine and navigate it at `http://localhost:4200/`.
2. Run `cd belle-bible` to access the app folder. 
3. Run `ng generate component [component-name]` to generate components. The command is very helpful as it automatically configures **app.module.ts** to include the components.
```
ng generate component bible-nav
ng generate component bible-chapters
ng generate component bible-verses
ng generate component bible-help
```
4. Modify **app.module.ts** to include essential framework modules.
```
...
import { HttpClientModule }    from '@angular/common/http';
...
// Import Modules from Angular Material
import { LayoutModule } from '@angular/cdk/layout';
import { 
  MatToolbarModule
  , MatButtonModule
  , MatSidenavModule
  , MatIconModule
  , MatListModule 
  , MatCardModule
  , MatTreeModule
  , MatTableModule
  , MatPaginatorModule
  , MatSortModule
  , MatGridListModule
  , MatMenuModule
  , MatBottomSheetModule
} from '@angular/material';
...
  imports: [
...
    , HttpClientModule   
    , LayoutModule
    , MatToolbarModule
    , MatButtonModule
    , MatSidenavModule
    , MatIconModule
    , MatListModule
    , MatCardModule
    , MatTreeModule
    , MatTableModule
    , MatPaginatorModule
    , MatSortModule
    , MatGridListModule
    , MatMenuModule
    , MatBottomSheetModule
  ],
...  
```
5. Modify **app.module.ts** to include **BibleHelpComponent** as one of entryComponents because we will load BibleHelpComponent with MatBottomSheet imperatively.
```
...
  entryComponents: [BibleHelpComponent],
...
```
6. Modify **index.html** to include Material icons.
```
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" rel="stylesheet">
```

## *A little bit about Angular CLI*
### Development server
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Code scaffolding
Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Build
Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

### Running unit tests
Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests
Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

### Further help
To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Authors
- Teki Chan *tekichan@gmail.com*
