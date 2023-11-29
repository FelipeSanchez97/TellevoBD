import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VerViajesProgramadosPage } from './ver-viajes-programados.page';

describe('VerViajesProgramadosPage', () => {
  let component: VerViajesProgramadosPage;
  let fixture: ComponentFixture<VerViajesProgramadosPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(VerViajesProgramadosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
