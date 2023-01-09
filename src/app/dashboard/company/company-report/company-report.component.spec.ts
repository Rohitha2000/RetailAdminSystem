import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyReportComponent } from './company-report.component';

describe('CompanyReportComponent', () => {
  let component: CompanyReportComponent;
  let fixture: ComponentFixture<CompanyReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanyReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
