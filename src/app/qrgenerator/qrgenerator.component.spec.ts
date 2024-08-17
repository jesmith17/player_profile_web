import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QrgeneratorComponent } from './qrgenerator.component';

describe('QrgeneratorComponent', () => {
  let component: QrgeneratorComponent;
  let fixture: ComponentFixture<QrgeneratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QrgeneratorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QrgeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
