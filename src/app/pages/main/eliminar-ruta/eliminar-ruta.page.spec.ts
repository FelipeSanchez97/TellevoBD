import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EliminarRutaPage } from './eliminar-ruta.page';

describe('EliminarRutaPage', () => {
  let component: EliminarRutaPage;
  let fixture: ComponentFixture<EliminarRutaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EliminarRutaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
