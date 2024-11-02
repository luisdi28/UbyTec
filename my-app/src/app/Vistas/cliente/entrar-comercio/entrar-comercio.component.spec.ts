import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntrarComercioComponent } from './entrar-comercio.component';

describe('EntrarComercioComponent', () => {
  let component: EntrarComercioComponent;
  let fixture: ComponentFixture<EntrarComercioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EntrarComercioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntrarComercioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
