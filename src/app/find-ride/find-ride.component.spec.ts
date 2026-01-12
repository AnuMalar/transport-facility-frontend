import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FindRideComponent } from './find-ride.component';

describe('FindRideComponent', () => {
  let component: FindRideComponent;
  let fixture: ComponentFixture<FindRideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FindRideComponent, HttpClientTestingModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FindRideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
