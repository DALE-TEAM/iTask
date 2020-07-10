import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DefaultTaskPage } from './default-task.page';

describe('DefaultTaskPage', () => {
  let component: DefaultTaskPage;
  let fixture: ComponentFixture<DefaultTaskPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DefaultTaskPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DefaultTaskPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
