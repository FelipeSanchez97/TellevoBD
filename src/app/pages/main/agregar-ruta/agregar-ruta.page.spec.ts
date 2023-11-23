import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgregarRutaPage } from './agregar-ruta.page';

describe('AgregarRutaPage', () => {
  let component: AgregarRutaPage;
  let fixture: ComponentFixture<AgregarRutaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AgregarRutaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
