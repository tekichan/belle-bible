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
3. Run `npm install --save @angular/material @angular/cdk @angular/animations` to download Angular Material. Run `npm install --save hammerjs` to download HammerJS for gesture support.
4. Run `ng generate @angular/material:nav bible-nav` to generate the overall navigation look.
5. Run `ng generate @angular/material:table bible-verses` to generate the page of verses in a data table format.
6. Run `ng generate component [component-name]` to generate components. The command is very helpful as it automatically configures **app.module.ts** to include the components.
```Shell
ng generate component bible-chapters
ng generate component bible-help
```
7. Modify **app.module.ts** to include essential framework modules.
```TypeScript
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
8. Modify **app.module.ts** to include **BibleHelpComponent** as one of entryComponents because we will load BibleHelpComponent with MatBottomSheet imperatively.
```TypeScript
...
  entryComponents: [BibleHelpComponent],
...
```
9. Modify **styles.css** to adapt a pre-built theme of Angular Material. Ref: [Theming your Angular Material app](https://material.angular.io/guide/theming)
```CSS
@import "~@angular/material/prebuilt-themes/indigo-pink.css";
html, body { height: 100%; }
body { margin: 0; font-family: Roboto, "Helvetica Neue", sans-serif; }
```

10. Modify **index.html** to include Material icons.
```HTML
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" rel="stylesheet">
```

11.  Modify html files to implement the "view" components.
- `app.component.html` includes **app-bible-nav** only to show bible-nav component when the app starts.
- `bible-nav.component.html`
- `bible-chapters.component.html`
- `bible-verses.component.html`
- `bible-help.component.html`

12. Run `ng generate interface bible-verses-item` under **src/app/bible-verses** folder to generate an interface file for displayed verse line item. Then modify the content for display.
```TypeScript
export interface BibleVersesItem {
    verse_num: number;
    verse_content: string;
}
```

13. Create **bible-service** to integrate external resources or data set. `bible.service.ts` is to retrieve bible content, which is stored in the same location. `text-to-speech.service.ts` is to request Text-To-Spech service from a third party TTS provider.
```Shell
mkdir bible-service
ng generate service bible-service/bible
ng generate service bible-service/text-to-speech
ng generate class bible-service/text-to-speech.config
```

14. Implement logics in **ts** files and presentation styles in **css** files. Copy asset files such as Bible's content **bible_cuv_zh_tw.json** and Cross' image **cross.png** to **assets** folder.

15. Run `ng serve` for a local development server. Preview the app in the serve. Fine tune codes and logics.

16. Build the app for production deployment.
```Shell
ng build --prod --base-href "https://tekichan.github.io/belle-bible/"
```

17.  Deploy the app to Github Pages. Browse the app at [https://tekichan.github.io/belle-bible/](https://tekichan.github.io/belle-bible/).
```Shell
ngh --dir=dist/belle-bible
```

## Tutorial

You can find this app's tutorial at YouTube > [Agile Way To Build an App with Angular CLI](https://youtu.be/iDLbqXY7yXE).


## Appendix A: *A little bit about Angular CLI*
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

## Appendix B: *Get started with angular-cli-ghpages*
### Installation & Setup
This command has the following prerequisites:

- `Node.js 8.2.0` or higher which brings you `npm 5.2.0` which brings you [`npx`]
- Git 1.7.6 or higher
- __optional__: Angular project created via [angular-cli](https://github.com/angular/angular-cli)

To install the command run the following:

```Shell
npm i angular-cli-ghpages --save-dev
```

### Usage
Execute `npx ngh` in order to deploy the project with a build from `dist` folder.  
__Note: you have to create the  `dist` folder in before (e.g. `ng build --prod`)__

```Shell
ng build --prod --base-href "https://USERNAME.github.io/REPOSITORY_NAME/"
npx ngh [OPTIONS]
```

If you want to push to `gh-pages` on the same repository with your default credentials, then just enter `npx ngh` without any options.

### Usage with Angular CLI 6 or higher

With Angular CLI 6 the build artifacts will be put in a subfolder under `dist`.
Please take a look at the `dist` folder to see whether there is a subfolder with your project's name or not.
If yes, you need to specify the deploy directory manually then when using this tool:

```Shell
npx ngh --dir=dist/[PROJECTNAME]
```

## Appendix C: Fix webpack-dev-server vulnerability (Jan 2019)

It is reported that a known low severity security vulnerability detected in webpack-dev-server < 3.1.11. 

[Issue #13342](https://github.com/angular/angular-cli/issues/13342) advises how to resolve it.

```Shell
npm install webpack-dev-server --save-dev
npm audit fix
ng update --all --force
npm i typescript@">=3.1.6 <3.3.0" --save-dev --save-exact --force
```

## Authors
- Teki Chan *tekichan@gmail.com*
