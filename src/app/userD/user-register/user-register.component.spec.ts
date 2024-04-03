import { ComponentFixture, TestBed } from '@angular/core/testing';

import { USerRegisterComponent } from './user-register.component';

describe('StudentCrudComponent', () => {
  let component: USerRegisterComponent;
  let fixture: ComponentFixture<USerRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [USerRegisterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(USerRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
