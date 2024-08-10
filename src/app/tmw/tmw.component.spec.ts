import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TmwComponent } from './tmw.component';

describe('TmwComponent', () => {
  let component: TmwComponent;
  let fixture: ComponentFixture<TmwComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TmwComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TmwComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
