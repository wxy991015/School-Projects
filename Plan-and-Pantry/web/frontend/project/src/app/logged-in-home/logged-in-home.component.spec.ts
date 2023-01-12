import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { LoggedInHomeComponent } from './logged-in-home.component';

describe('LoggedInHomeComponent', () => {
  let component: LoggedInHomeComponent;
  let fixture: ComponentFixture<LoggedInHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoggedInHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoggedInHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
