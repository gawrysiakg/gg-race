import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusPipeComponent } from './status-pipe.component';

describe('StatusPipeComponent', () => {
  let component: StatusPipeComponent;
  let fixture: ComponentFixture<StatusPipeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatusPipeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StatusPipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
