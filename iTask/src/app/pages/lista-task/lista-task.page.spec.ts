import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListaTaskPage } from './lista-task.page';

describe('ListaTaskPage', () => {
  let component: ListaTaskPage;
  let fixture: ComponentFixture<ListaTaskPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaTaskPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListaTaskPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
