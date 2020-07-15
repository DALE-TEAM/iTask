import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ModalController} from "@ionic/angular";
import {Router} from "@angular/router";

@Component({
  selector: 'app-share',
  templateUrl: './share.page.html',
  styleUrls: ['./share.page.scss'],
})
export class SharePage implements OnInit {
id;
word:any;
  constructor( private modalCtrl: ModalController,
               private router: Router
  ) { }

  shareForm = new FormGroup({
  email: new FormControl('', [
    Validators.required,
    Validators.minLength(2),
  ]),
    id: new FormControl('', [
      Validators.required,
      Validators.minLength(1),
    ]),
  });

  async closeModal(){
    await this.modalCtrl.dismiss();
    await this.router.navigateByUrl('dashboard');

  }

  emailShared(){
    this.word = `${this.id}`;
    console.log('Email: ' + this.shareForm.value.email);
    console.log('Id: ' + this.word);

  }

  ngOnInit() {
  }

}
