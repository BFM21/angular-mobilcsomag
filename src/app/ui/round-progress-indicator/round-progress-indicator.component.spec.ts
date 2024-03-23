import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoundProgressIndicatorComponent } from './round-progress-indicator.component';

describe('RoundProgressIndicatorComponent', () => {
  let component: RoundProgressIndicatorComponent;
  let fixture: ComponentFixture<RoundProgressIndicatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoundProgressIndicatorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RoundProgressIndicatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
