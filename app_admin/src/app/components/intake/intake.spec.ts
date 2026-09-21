// Purpose: Verifies the Angular animal intake component can be created by the test harness.
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Intake } from './intake';

describe('Intake', () => {
  let component: Intake;
  let fixture: ComponentFixture<Intake>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Intake],
    }).compileComponents();

    fixture = TestBed.createComponent(Intake);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
