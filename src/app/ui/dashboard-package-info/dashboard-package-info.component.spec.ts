import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardPackageInfoComponent } from './dashboard-package-info.component';

describe('DashboardPackageInfoComponent', () => {
  let component: DashboardPackageInfoComponent;
  let fixture: ComponentFixture<DashboardPackageInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardPackageInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashboardPackageInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
