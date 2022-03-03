import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaEtapaComponent } from './alta-etapa.component';

describe('AltaEtapaComponent', () => {
  let component: AltaEtapaComponent;
  let fixture: ComponentFixture<AltaEtapaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AltaEtapaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AltaEtapaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
