import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InfoReminderPage } from './info-reminder.page';

describe('InfoReminderPage', () => {
  let component: InfoReminderPage;
  let fixture: ComponentFixture<InfoReminderPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoReminderPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InfoReminderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
