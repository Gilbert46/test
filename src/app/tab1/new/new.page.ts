import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-new',
  templateUrl: './new.page.html',
  styleUrls: ['./new.page.scss'],
})
export class NewPage implements OnInit {
  idField: string = ''
  puzzleFrom: FormGroup = new FormGroup({marca: new FormControl('', [Validators.required, Validators.minLength(3)]), titulo: new FormControl('', [Validators.required, Validators.minLength(3)]), categoria: new FormControl('', [Validators.required, Validators.minLength(3)]), precio: new FormControl('', [Validators.required, Validators.minLength(3)]), piezas: new FormControl('', [Validators.required, Validators.minLength(3)]), propietario: new FormControl('',[Validators.required, Validators.minLength(3)]), filepath: new FormControl(''), webviewPath: new FormControl(''), alto: new FormControl(''), ancho: new FormControl(''), año: new FormControl(''), condicion: new FormControl(''), estado: new FormControl(''), comentario: new FormGroup(''), privado: new FormGroup('') ,userid: new FormControl(''), localizacion: new FormControl('')})
  constructor(private location: Location, private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.initPage()
  }
  initPage():void {
    this.puzzleFrom.controls['privado'].setValue(false)
    this.puzzleFrom.controls['userid'].setValue(String(this.authService.idx))
  }
  addPhoto():  void {

  }
  addPuzzle(): void {

  }
  changePage(n: number): void {
    if (n == 1) this.router.navigateByUrl('/tab1/puzzles', { replaceUrl: true });
    else if (n == 2) this.router.navigateByUrl('/tab1/home', { replaceUrl: true });
    else if (n == 3) this.router.navigateByUrl('/tab1/user', { replaceUrl: true });
    else this.location.back();
  }
}
