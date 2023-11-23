import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViajeProgramadoPage } from './viaje-programado.page';

describe('ViajeProgramadoPage', () => {
  let component: ViajeProgramadoPage;
  let fixture: ComponentFixture<ViajeProgramadoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ViajeProgramadoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
