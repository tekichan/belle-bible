# Belle's Bible (belle-bible)
### A simple bible app with Angular Material with Text To Speech (TTS) service in Cantonese.
[![License](https://img.shields.io/badge/license-MIT-green.svg)](/doc/LICENSE) 

## Introduction
This is a simple Single Page Application (SPA) to provide TTS service in Cantonese for Traditional Chinese (zh-TW) Bible as Chinese Union Version (CUV). This app makes use of [Angular](https://angular.io/) as a frontend framework and [Angular Material](https://material.angular.io/) to fulfill [Material Design](https://material.io/) as visual principle.

## Prerequisites
1. Install [NodeJS](https://nodejs.org) with [NPM](https://www.npmjs.com/)
2. Install Angular, [Angular CLI](https://github.com/angular/angular-cli), Angular Material
3. Register a TTS Service. Here we use a free service provided by [Voice RSS](http://www.voicerss.org/)
4. Install [angular-cli-ghpages](https://www.npmjs.com/package/angular-cli-ghpages) for deploying a production build to [Github Pages](https://pages.github.com/)

## Getting Started
### High Level Design
![High Level Design](/doc/bellebible_highleveldesign.png)

The app runs with app.component.ts which is a default entry point of Angular app. It uses bible-nav to define the whole frame with menu bar, side bar and the container of the main content. The menu bar points to bible-help for everywhere help screen. The side bar can trigger the change of the main content to show bible-chapters to list chapters of a selected book. After a chapter is selected, verses of the chapter will show. bible-service consists of service classes, which bridge this app with the remote data sources, such as another asset path or TTS provider.

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
