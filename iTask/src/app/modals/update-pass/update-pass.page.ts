import { Component, OnInit } from '@angular/core';
import { ModalController, LoadingController, AlertController, ToastController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import * as jwt_decode from 'jwt-decode';


@Component({
  selector: 'app-update-pass',
  templateUrl: './update-pass.page.html',
  styleUrls: ['./update-pass.page.scss'],
})
export class UpdatePassPage implements OnInit {

  updateForm: FormGroup;
  token: any;
  Uid: any;
  
  constructor(  
    private modalCtrl: ModalController, 
    private formBuilder: FormBuilder,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private userServ: UserService) {

      this.updateForm = this.formBuilder.group({
        newPass: ['', Validators.compose([
          Validators.required,
          Validators.minLength(8)
        ])],
        confPass: ['', Validators.compose([
          Validators.required,
          Validators.minLength(8)
        ])]
      }, {
        validators: this.passMatching.bind(this)
      });
   }
  
  passMatching(formGroup: FormGroup){
    const { value: password } = formGroup.get('newPass');
    const { value: confirmPassword } = formGroup.get('confPass');
    return password === confirmPassword ? null : { passwordNotMatch: true };
  }
  ngOnInit() {
    this.token = localStorage.getItem('token');
    let decoded = jwt_decode(this.token);
    this.Uid = decoded['user_id'];
  }
  
  async closeModal(){
    await this.modalCtrl.dismiss();
  }

  async update(){
    const loading = await this.loadingCtrl.create({ message: 'Modifica in corso...' });
    await loading.present();
    this.userServ.updatePass(this.updateForm.value, this.Uid).subscribe(
        // If success
        async () => {
          const toast = await this.toastCtrl.create({ message: 'Password Modificata correttamente', duration: 2000, color: 'dark' });
          await toast.present();
          loading.dismiss();
          this.updateForm.reset();
          await this.modalCtrl.dismiss();
        },
        // If there is an error
          async () => {
            const alert = await this.alertCtrl.create({ message: 'Errore', buttons: ['OK'] });
            loading.dismiss();
            await alert.present();
        }
    );
  }
}
