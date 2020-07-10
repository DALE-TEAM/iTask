import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddReminderPage } from './add-reminder.page';

describe('AddReminderPage', () => {
  let component: AddReminderPage;
  let fixture: ComponentFixture<AddReminderPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddReminderPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddReminderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
