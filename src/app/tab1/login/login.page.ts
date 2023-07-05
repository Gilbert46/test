import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import { UserCredential } from '@angular/fire/auth';
//import { Plugins } from '@capacitor/core';
//const { share } = Plugins;
import { Share } from '@capacitor/share'

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  isLog: boolean[] = [false, false]
  msgAction: string = ''
  credentials:FormGroup=new FormGroup({email:new FormControl('',[Validators.required,Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{3,3}$')]),password:new FormControl ('',[Validators.required,Validators.minLength(6)]),name:new FormControl('',[Validators.required,Validators.minLength(5)]),adrece: new FormControl ('',[Validators.required,Validators.minLength(5)]),phone:new FormControl('',[Validators.required,Validators.maxLength(9),Validators.minLength(9)]),id:new FormControl ('')})
  constructor(private fb: FormBuilder, private loadingController: LoadingController, private alertController: AlertController, private authService: AuthService, private router: Router) { }
  ngOnInit() {
    this.setIsLog(false)
  }
  async login() {
    const loading = await this.loadingController.create()
		await loading.present()
		const user = await this.authService.login(this.credentials.value)
		await loading.dismiss()
    this.steepReques(user!)
  }
  async register() {
    const loading = await this.loadingController.create()
		await loading.present()
    const user = await this.authService.register(this.credentials.value)
		await loading.dismiss()
    this.steepReques(user!)
  }
  async steepReques(user: UserCredential) {
    const promise=new Promise((resolve, reject) => {resolve(123)})
    promise.then(() => {
      setTimeout(() => {
        if (user) {
          this.router.navigateByUrl('/tab1/home/'+this.authService.auth, { replaceUrl: true })
        } else {
          this.isLog[1] = true
          this.showAlert('usuario no válido', 'Alguno de los campos no son correctos')
        }
      },1000)
    })
  }
  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present()
  }
  resetPassword(email: string, pw:string): void {
    this.authService.newPassword(email, pw)
  }
  shareApp(): void {
    Share.share({
      title: 'Puzzle-Pop',
      text: 'Esta es la nueva aplicación para aficionados a los puzzles, pruevala',
      url: 'http://puzzle-21pop.web.app/',
      //dialogTitle: 'Compartir con...',
    });
  }
  setIsLog(st: boolean): void {
    if (!st) {
      this.credentials.controls['name'].setValue('XXXXXXX')
      this.credentials.controls['adrece'].setValue('XXXXXXX')
      this.credentials.controls['phone'].setValue('999999999')
      this.msgAction = 'Opción cambiar a REGISTRAR una cuenta de la web'
    }
    else {
      this.credentials.controls['name'].setValue('')
      this.credentials.controls['adrece'].setValue('')
      this.credentials.controls['phone'].setValue('')
      this.msgAction = 'Opción cambiar a ENTRAR en tu cuenta de la web'
    }
    this.isLog[0] = st
    this.isLog[1] = false
    this.credentials.controls['email'].setValue('')
    this.credentials.controls['password'].setValue('')

  }
}
