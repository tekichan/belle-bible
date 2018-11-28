import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BibleHelpComponent } from './bible-help.component';

describe('BibleHelpComponent', () => {
  let component: BibleHelpComponent;
  let fixture: ComponentFixture<BibleHelpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BibleHelpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BibleHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
