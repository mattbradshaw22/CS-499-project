import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FindNearbyAnimal } from './find-nearby-animal';

describe('FindNearbyAnimal', () => {
  let component: FindNearbyAnimal;
  let fixture: ComponentFixture<FindNearbyAnimal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FindNearbyAnimal],
    }).compileComponents();

    fixture = TestBed.createComponent(FindNearbyAnimal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
