import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import { UserCredential } from '@angular/fire/auth';
//import { Plugins } from '@capacitor/core';
//const { share } = Plugins;
import { Share } from '@capacitor/share';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  isLog: boolean[] = [false, false, false]
  msgAction: string[] = []
  nLeg: number = 0
  credentials:FormGroup=new FormGroup({email:new FormControl('',[Validators.required,Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{3,3}$')]),password:new FormControl ('',[Validators.required,Validators.minLength(6)]),name:new FormControl('',[Validators.required,Validators.minLength(5)]),adrece: new FormControl ('',[Validators.required,Validators.minLength(5)]),phone:new FormControl('',[Validators.required,Validators.maxLength(9),Validators.minLength(9)]),id:new FormControl ('')})
  constructor(private formBuilder: FormBuilder, private loadingController: LoadingController, private alertController: AlertController, private authService: AuthService, private router: Router, private translate: TranslateService) { }

  ngOnInit() {
    this.setIsLog(false, 0)
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
          if (this.nLeg == 0) this.showAlert('usuario no válido', 'Alguno de los campos no son correctos')
          else if (this.nLeg == 1) this.showAlert('usuari no vàlid', 'Un dels dos camps no són correctes')
          else if (this.nLeg == 2) this.showAlert('user not valid', "Any rows aren't correct")
        }
      },1000)
    })
  }

  public setFlag(st: boolean) {
    this.isLog[2] = st
    if (!st) {
      const lng = document.getElementById('select')! as HTMLOptionElement
      this.translate.setDefaultLang(String(lng.value))
      this.translate.use(String(lng.value))
      if (String(lng.value) == 'es') {
        this.nLeg = 0
        if (!this.isLog[0]) this.msgAction[0] = 'Opción cambiar a REGISTRAR una cuenta de la web'
        else this.msgAction[0] = 'Opción cambiar a ENTRAR en tu cuenta de la web'
      }
      if (String(lng.value) == 'ca') {
        this.nLeg = 1
        if (!this.isLog[1]) this.msgAction[1] = 'Opció canviar a REGISTRAR una conta de la web'
        else this.msgAction[1] = 'Opció canviar a COMENÇAR en la seva conta de la web'
      }
      if (String(lng.value) == 'en') {
        this.nLeg = 2
        if (!this.isLog[2]) this.msgAction[2] = 'Option change to REGISTRED a count of web'
        else this.msgAction[2] = 'Option change to GO ON a count of web'
      }
    }
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
    let cadena: string = ''
    if (this.nLeg == 0) cadena = 'Esta es la nueva aplicación para aficionados a los puzles, pruevala'
    else if (this.nLeg == 1) cadena = 'Aquesta és la nova aplicació per aficionats als trencaclosquets, proba-la'
    else if (this.nLeg == 2) cadena = "It's the new aplication for amateur to puzzles, take it"
    Share.share({
      title: 'Puzzle-Pop',
      text: cadena,
      url: 'http://puzzle-21pop.web.app/',
      //dialogTitle: 'Compartir con...',
    });
  }

  setIsLog(st: boolean, n: number): void {
    if (!st) {
      this.credentials.controls['name'].setValue('XXXXXXX')
      this.credentials.controls['adrece'].setValue('XXXXXXX')
      this.credentials.controls['phone'].setValue('999999999')
      if (n == 0) this.msgAction[n] = 'Opción cambiar a REGISTRAR una cuenta de la web'
      if (n == 1) this.msgAction[n] = 'Opció canviar a REGISTRAR una conta de la web'
      if (n == 2) this.msgAction[n] = 'Option change to REGISTRED a count of web'
    }
    else {
      this.credentials.controls['name'].setValue('')
      this.credentials.controls['adrece'].setValue('')
      this.credentials.controls['phone'].setValue('')
      if (n == 0) this.msgAction[n] = 'Opción cambiar a ENTRAR en tu cuenta de la web'
      if (n == 1) this.msgAction[n] = 'Opció canviar a COMENÇAR en la seva conta de la web'
      if (n == 2) this.msgAction[n] = 'Option change to GO ON your count of web'
    }
    this.isLog[0] = st
    this.isLog[1] = false
    this.credentials.controls['email'].setValue('')
    this.credentials.controls['password'].setValue('')
  }

}

