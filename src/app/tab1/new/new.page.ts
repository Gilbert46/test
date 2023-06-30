import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { PhotoService } from '../../services/photo.service';
import { PuzzleService } from 'src/app/services/puzzle.service';

@Component({
  selector: 'app-new',
  templateUrl: './new.page.html',
  styleUrls: ['./new.page.scss'],
})
export class NewPage implements OnInit {
  idField: string = ''
  puzzleFrom: FormGroup = new FormGroup({marca: new FormControl('', [Validators.required, Validators.minLength(3)]), titulo: new FormControl('', [Validators.required, Validators.minLength(3)]), categoria: new FormControl('', [Validators.required, Validators.minLength(3)]), precio: new FormControl('', [Validators.required, Validators.minLength(3)]), piezas: new FormControl('', [Validators.required, Validators.minLength(3)]), propietario: new FormControl('',[Validators.required, Validators.minLength(3)]), filepath: new FormControl('', [Validators.required, Validators.minLength(3)]), webviewPath: new FormControl('', [Validators.required, Validators.minLength(3)]), alto: new FormControl(''), ancho: new FormControl(''), año: new FormControl(''), condicion: new FormControl(''), estado: new FormControl(''), comentario: new FormGroup(''), privado: new FormGroup('') ,userid: new FormControl(''), localizacion: new FormControl(''), id: new FormControl('')})
  constructor(private location: Location, private router: Router, private authService: AuthService, private photoService: PhotoService, private puzzleService: PuzzleService, private alertController: AlertController) { }

  ngOnInit() {
    this.initPage()
  }
  initPage():void {
    this.puzzleFrom.controls['marca'].setValue('')
    this.puzzleFrom.controls['titulo'].setValue('')
    this.puzzleFrom.controls['categoria'].setValue('')
    this.puzzleFrom.controls['precio'].setValue('')
    this.puzzleFrom.controls['piezas'].setValue('')
    this.puzzleFrom.controls['propietario'].setValue('')
    this.puzzleFrom.controls['filepath'].setValue('')
    this.puzzleFrom.controls['webviewPath'].setValue('')
    this.puzzleFrom.controls['alto'].setValue(1)
    this.puzzleFrom.controls['ancho'].setValue(1)
    this.puzzleFrom.controls['año'].setValue(2023)
    this.puzzleFrom.controls['condicion'].setValue('')
    this.puzzleFrom.controls['estado'].setValue('')
    this.puzzleFrom.controls['comentario'].setValue('')
    this.puzzleFrom.controls['privado'].setValue(false)
    this.puzzleFrom.controls['userid'].setValue(String(this.authService.idx))
    this.puzzleFrom.controls['localizacion'].setValue('')
    this.puzzleFrom.controls['id'].setValue('')
  }

  addPhoto():  void {
    this.photoService.addNewPhotoStore()
    this.stepAddPhoto()
  }

  async stepAddPhoto() {
    const promise=new Promise((resolve, reject) => {resolve(123)})
    promise.then(() => {
      setTimeout(() => {
        this.puzzleFrom.controls['filepath'].setValue(this.photoService.filepath)
        this.photoService.pathUrlImage()
        this.stepWebViewPath()
      },1000)
    })
  }
  async stepWebViewPath() {
    const promise=new Promise((resolve, reject) => {resolve(123)})
    promise.then(() => {
      setTimeout(() => {
        this.puzzleFrom.controls['webviewPath'].setValue(this.photoService.webViewPath)
      },1000)
    })
  }

  addPuzzle(): void {
    this.puzzleService.addPuzzle(this.puzzleFrom.value)
    this.showAlert('¡ FELICIDADES !', 'Puzzle añadido correctamente.')
  }

  async showAlert(head: string, msg: string) {
    const alert = await this.alertController.create({
      header: head,
      message: msg,
      buttons: ['OK']
    });
    await alert.present()
    this.changePage(2)
  }

  changePage(n: number): void {
    if (n == 1) this.router.navigateByUrl('/tab1/puzzles/'+this.authService.auth, { replaceUrl: true });
    else if (n == 2) this.router.navigateByUrl('/tab1/home/'+this.authService.auth, { replaceUrl: true });
    else if (n == 3) this.router.navigateByUrl('/tab1/user/'+this.authService.auth, { replaceUrl: true });
    else this.location.back();
  }

}
