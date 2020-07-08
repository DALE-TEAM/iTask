import {Component, OnInit, ViewChild} from '@angular/core';
import {IonReorderGroup} from '@ionic/angular';
import {IonDatetime} from "@ionic/angular";

@Component({
  selector: 'app-lista-task',
  templateUrl: './lista-task.page.html',
  styleUrls: ['./lista-task.page.scss'],
})
export class ListaTaskPage implements OnInit {
  @ViewChild(IonReorderGroup) reorderGroup: IonReorderGroup;

  constructor() { }
  doReorder(ev: any) {
    // The `from` and `to` properties contain the index of the item
    // when the drag started and ended, respectively
    console.log('Dragged from index', ev.detail.from, 'to', ev.detail.to);

    // Finish the reorder and position the item in the DOM based on
    // where the gesture ended. This method can also be called directly
    // by the reorder group
    ev.detail.complete();
  }

  toggleReorderGroup() {
    this.reorderGroup.disabled = !this.reorderGroup.disabled;
  }


  ngOnInit() {
  }
  dettagli_task(){
    console.log('ciao');
  }

}
