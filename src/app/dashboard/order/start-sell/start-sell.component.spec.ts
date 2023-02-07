import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartSellComponent } from './start-sell.component';

describe('StartSellComponent', () => {
  let component: StartSellComponent;
  let fixture: ComponentFixture<StartSellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StartSellComponent ],
      imports:[HttpClientTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StartSellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
