import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { AuthService } from '../../services/auth.service';
//import  { AvatarService } from '../../services/avatar.service'
import { User } from '../../interfaces/user';


@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {
  passw: string = ''
  user: User = {email:'',password:'',name:'',adrece:'',phone:'',id:''}
  userForm: FormGroup = new FormGroup({email:new FormControl('',[Validators.required,Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{3,3}$')]),password:new FormControl ('',[Validators.required,Validators.minLength(6)]),password2:new FormControl ('',[Validators.required,Validators.minLength(6)]),name:new FormControl('',[Validators.required,Validators.minLength(5)]),adrece: new FormControl ('',[Validators.required,Validators.minLength(5)]),phone:new FormControl('',[Validators.required, Validators.maxLength(9),Validators.minLength(9)])})
  constructor(private fB:FormBuilder,private authService:AuthService,private router:Router, private location:Location, private alertController:AlertController/* private avatarService: AvatarService*/) { }

  ngOnInit() {
    this.initUser()
  }

  initUser() {
    const idField = String(this.authService.idx);
    this.authService.getUsuari(idField).subscribe(res => {this.user={email:res.email,password:res.password,name:res.name,adrece:res.adrece,phone:res.phone,id:res.id}})
    this.intoFormulary()
  }

  async intoFormulary() {
    const promise = new Promise ((resolve, reject) => {resolve(123)})
    promise.then(() => {
      setTimeout(() => {
        this.userForm.controls['email'].setValue(this.user.email)
        this.userForm.controls['password'].setValue(this.user.password)
        this.userForm.controls['password2'].setValue(this.user.password)
        this.userForm.controls['name'].setValue(this.user.name)
        this.userForm.controls['adrece'].setValue(this.user.adrece)
        this.userForm.controls['phone'].setValue(this.user.phone)
        this.chPw()
      },500)
    })
  }

  chPw(): void {
    this.passw=this.userForm.controls['password'].value
  }

  changeAvatar() {
    //this.avatarService.newAvatarStore()
  }

  update(): void {
    this.user={email:this.userForm.controls['email'].value, password:this.userForm.controls['password'].value,name:this.userForm.controls['name'].value,adrece:this.userForm.controls['adrece'].value,phone:this.userForm.controls['phone'].value,id:this.user.id}
    this.authService.updateUser(this.user);
    this.showAlert('Usuario: '+this.user.name, 'ha modificado sus datos correctamente !!')
  }

  async showAlert(head: string, msg: string) {
    const alert = await this.alertController.create({
      header: head,
      message: msg,
      buttons: ['OK']
    });
    await alert.present()
    this.changePage(2);
  }
  changePage(n: number): void {
    if (n == 1) this.router.navigateByUrl('/tab1/new/'+this.authService.auth, { replaceUrl: true })
    else if (n == 2) this.router.navigateByUrl('/tab1/home/'+this.authService.auth, { replaceUrl: true })
    else if (n == 3) this.router.navigateByUrl('/tab1/puzzles/'+this.authService.auth, { replaceUrl: true })
    else this.location.back()
  }

}
