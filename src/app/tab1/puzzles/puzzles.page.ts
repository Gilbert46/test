import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { Puzzle } from '../../interfaces/puzzle';
import { AuthService } from '../../services/auth.service';
import { PuzzleService } from '../../services/puzzle.service';
import { DlimatgeService } from 'src/app/services/dlimatge.service';
import { GoogleMap } from '@capacitor/google-maps';
import { environment } from 'src/environments/environment';
import { Geolocation } from '@capacitor/geolocation';
import { MapsService } from 'src/app/services/maps.service';
import { Share } from '@capacitor/share'
import { LatLng } from '@capacitor/google-maps/dist/typings/definitions';


@Component({
  selector: 'app-puzzles',
  templateUrl: './puzzles.page.html',
  styleUrls: ['./puzzles.page.scss'],
})
export class PuzzlesPage implements OnInit {

  constructor(private formBuilder: FormBuilder,private authService: AuthService, private location: Location, private router: Router, private puzzleService: PuzzleService, private dlimatgeService: DlimatgeService, private mapsService: MapsService) {}

  title: string = ''
  idField: string = ''
  index: number = 0
  columne: number = 6
  npage: number = 0
  blPages: boolean[] = []
  flag: boolean[] = [false, false, false]
  puzzle: Puzzle = {marca:'',titulo:'',categoria:'',precio:0,piezas:0,propietario:'',filepath:'',webviewPath:'',alto:0,ancho:0,ano:2020,condicion:'',estado:'',privado:false,comentario:'',userid:'',localizacion:'',id:''}
  puzzles : Puzzle[] = []
  puzzleForm: FormGroup  = new FormGroup({marca:new FormControl({value:'', disabled:this.flag[2]},[Validators.required,Validators.minLength(3)]),titulo:new FormControl({value:'', disabled:this.flag[2]},[Validators.required, Validators.minLength(3)]),categoria:new FormControl({value:'', disabled:this.flag[2]},[Validators.required, Validators.minLength(3)]),precio:new FormControl({value:'', disabled:this.flag[2]},[Validators.required,Validators.minLength(1)]),piezas:new FormControl({value:'', disabled:this.flag[2]},[Validators.required,Validators.minLength(1)]),propietario:new FormControl({value:'', disabled:this.flag[2]},[Validators.required,Validators.minLength(3)]),filepath:new FormControl({value:'', disabled:this.flag[2]}),webviewPath:new FormControl({value:'', disabled:this.flag[2]}),alto:new FormControl({value:'', disabled:this.flag[2]}),ancho:new FormControl({value:'', disabled:this.flag[2]}),ano:new FormControl({value:'', disabled:this.flag[2]}),condicion:new FormControl({value:'', disabled:this.flag[2]}),estado: new FormControl({value:'', disabled:this.flag[2]}),privado: new FormControl(),comentario:new FormControl({value:'', disabled:this.flag[2]}),userid:new FormControl(''),localizacion:new FormControl({value:'', disabled:this.flag[2]}),id:new FormControl('')})
  localition = {lat: 46, lng: 1.24}
  map!: google.maps.Map;
  dades: any

  ngOnInit(): void {
    if (screen.width > 980) this.columne = 3
    this.initUser()
  }

  initUser(): void {
    this.idField = String(this.authService.idx)
    this.npage = 0
    this.getSearchValue();

  }

  changePage(n: number): void {
    if (n == 1) this.router.navigateByUrl('/tab1/user/'+this.authService.auth, { replaceUrl: true });
    else if (n == 2) this.router.navigateByUrl('/tab1/home/'+this.authService.auth, { replaceUrl: true });
    else if (n == 3) this.router.navigateByUrl('/tab1/new/'+this.authService.auth, { replaceUrl: true });
    else this.location.back();
  }
  getSearchValue(): void {
    let p = document.getElementById('pricePice')! as HTMLOptionElement;
    let n = document.getElementById('numberPice')! as HTMLOptionElement;
    let t = document.getElementById('searchTitle')! as HTMLInputElement;
    this.initPuzzle(parseInt(p.value), parseInt(n.value), t.value.toString())
  }

  async initPuzzle(price:number, pices:number, title:string) {
    this.puzzleService.getPuzzles().subscribe(res => {this.puzzles = this.orderTitle(res);})
    this.stepSort(price, pices, title)
  }

  async stepSort(price:number, pices:number, title:string) {
    const promise = new Promise ((resolve, reject) => {resolve(123)})
    promise.then(() => {
      setTimeout (() => {
        this.sortPuzzle(price, pices, title);
        this.paginePuzle();
      }, 300);
    });
  }

  paginePuzle(): void {
    if (this.puzzles.length > 0) {
      let maxPage = Math.ceil(this.puzzles.length/10)
      for (let e=0; e<maxPage; e++) {
        if (this.npage == e) this.blPages[e] = true
        else this.blPages[e]=false
      }
    }
    else this.blPages[0]= true;
    let cont: number = 0
    for (let f=0; f < this.puzzles.length; f++) {
      if (this.npage > 0 && cont < 10 * this.npage) {
        this.puzzles.splice(f, 1);
        cont++;
        f--;
      }
      if (f >= 10 && this.npage == 0) {
        this.puzzles.splice(f, 1);
        f--;
      }
    }
  }

  searchFile(dlimg: string): void {
    //this.dlimatgeService.dowmloadImage(dlimg);
    //const photo = Camera.getPhoto(dlimg);
    Share.share({
      url: dlimg,
    });
  }

  sortPuzzle(price: number, pices: number, title: string) {
    for (let i=0; i<this.puzzles.length; i++) {
      if (this.puzzles[i].precio>price ||(this.puzzles[i].piezas>pices && pices<100000)||(pices<100000 && this.puzzles[i].piezas <= pices - 500)) {
        this.puzzles.splice(i, 1);
        i--;
      }
      else if (title != '') {
        for (let j=0; j<title.length; j++) {
          if (this.puzzles[i].titulo.charAt(j).toUpperCase() != title.charAt(j).toUpperCase()) {
            this.puzzles.splice(i, 1);
            i--;
            break;
          }
        }
      }
    }
  }

  otherPage(n: number): void {
    this.npage = n
    this.getSearchValue()
  }

  crudPuzzle(disabled: boolean, idx: number): void {
    this.flag[0] = true
    this.flag[2] = disabled
    this.puzzleForm.controls['marca'].setValue(this.puzzles[idx].marca)
    this.puzzleForm.controls['marca'].disable()
    this.puzzleForm.controls['titulo'].setValue(this.puzzles[idx].titulo)
    this.puzzleForm.controls['categoria'].setValue(this.puzzles[idx].categoria)
    this.puzzleForm.controls['precio'].setValue(this.puzzles[idx].precio)
    this.puzzleForm.controls['piezas'].setValue(this.puzzles[idx].piezas)
    this.puzzleForm.controls['propietario'].setValue(this.puzzles[idx].propietario)
    this.puzzleForm.controls['filepath'].setValue(this.puzzles[idx].filepath)
    this.puzzleForm.controls['webviewPath'].setValue(this.puzzles[idx].webviewPath)
    this.puzzleForm.controls['alto'].setValue(this.puzzles[idx].alto)
    this.puzzleForm.controls['ancho'].setValue(this.puzzles[idx].ancho)
    this.puzzleForm.controls['ano'].setValue(this.puzzles[idx].ano)
    this.puzzleForm.controls['condicion'].setValue(this.puzzles[idx].condicion)
    this.puzzleForm.controls['estado'].setValue(this.puzzles[idx].estado)
    if (this.puzzleForm.controls['privado'].value == null) this.puzzleForm.controls['privado'].setValue(false)
    else this.puzzleForm.controls['privado'].setValue(this.puzzles[idx].privado)
    this.puzzleForm.controls['comentario'].setValue(this.puzzles[idx].comentario)
    this.puzzleForm.controls['userid'].setValue(this.puzzles[idx].userid)
    this.puzzleForm.controls['localizacion'].setValue(this.puzzles[idx].localizacion)
    this.puzzleForm.controls['id'].setValue(this.puzzles[idx].id)
    if (!this.flag[2]) {
      this.title = 'MODIFICAR PUZLE'
      this.puzzleForm.controls['marca'].enable()
      this.puzzleForm.controls['titulo'].enable()
      this.puzzleForm.controls['categoria'].enable()
      this.puzzleForm.controls['precio'].enable()
      this.puzzleForm.controls['piezas'].enable()
      this.puzzleForm.controls['propietario'].enable()
      this.puzzleForm.controls['filepath'].enable()
      this.puzzleForm.controls['webviewPath'].enable()
      this.puzzleForm.controls['alto'].enable()
      this.puzzleForm.controls['ancho'].enable()
      this.puzzleForm.controls['condicion'].enable()
      this.puzzleForm.controls['estado'].enable()
      this.puzzleForm.controls['comentario'].enable()
      this.puzzleForm.controls['localizacion'].enable()
    }
    else {
      this.title = 'ELIMINAR PUZLE'
      this.puzzleForm.controls['marca'].disable()
      this.puzzleForm.controls['titulo'].disable()
      this.puzzleForm.controls['categoria'].disable()
      this.puzzleForm.controls['precio'].disable()
      this.puzzleForm.controls['piezas'].disable()
      this.puzzleForm.controls['propietario'].disable()
      this.puzzleForm.controls['filepath'].disable()
      this.puzzleForm.controls['webviewPath'].disable()
      this.puzzleForm.controls['alto'].disable()
      this.puzzleForm.controls['ancho'].disable()
      this.puzzleForm.controls['condicion'].disable()
      this.puzzleForm.controls['estado'].disable()
      this.puzzleForm.controls['comentario'].disable()
      this.puzzleForm.controls['localizacion'].disable()
    }
    this.sincronMap()
  }

  operationPuzzle(): void {
    if (!this.flag[2]) this.puzzleService.updatePuzzle(this.puzzleForm.value)
    else this.puzzleService.deletePuzzle(this.puzzleForm.value)
    this.flag[0] = false
    this.changePage(2)
  }

  orderTitle(puzzles2 : Puzzle[]): Puzzle[] {
    for (let e=0; e<puzzles2.length;e++) {
      if (puzzles2[e].userid != this.idField) {
        puzzles2.splice(e, 1)
        e--
      }
    }
    for (let i=0; i < puzzles2.length - 1; i++) {
      for (let j=i+1; j < puzzles2.length; j++) {
        if (puzzles2[i].titulo.charAt(0).toUpperCase() > puzzles2[j].titulo.charAt(0).toUpperCase()) {
          let puzzle2: Puzzle = this.subrrutine(puzzles2, j);
          puzzles2.splice(j, 1);
          puzzles2.splice(i, 0, puzzle2);
          i--;
          break;
        }
        else if (puzzles2[i].titulo.charAt(0).toUpperCase() === puzzles2[j].titulo.charAt(0).toUpperCase()) {
          for (let l=1; l < puzzles2[i].titulo.length; l++) {
            if (puzzles2[i].titulo.charAt(l) > puzzles2[j].titulo.charAt(l)) {
              let puzzle2: Puzzle = this.subrrutine(puzzles2, j);
              puzzles2.splice(j, 1);
              puzzles2.splice(i, 0, puzzle2);
              i--;
              j = puzzles2.length - 1;
              break;
            }
            else if (puzzles2[i].titulo.charAt(l).toUpperCase() < puzzles2[j].titulo.charAt(l).toUpperCase()) {
              break;
            }
          }
        }
      }
    }
    return puzzles2;
  }

  subrrutine(puzzles2: Puzzle[], j: number): Puzzle {
    let puzzle2: Puzzle = {
      marca: puzzles2[j].marca,
      titulo: puzzles2[j].titulo,
      categoria: puzzles2[j].categoria,
      precio: puzzles2[j].precio,
      piezas: puzzles2[j].piezas,
      propietario: puzzles2[j].propietario,
      filepath: puzzles2[j].filepath,
      webviewPath: puzzles2[j].webviewPath,
      alto: puzzles2[j].alto,
      ancho: puzzles2[j].ancho,
      ano: puzzles2[j].ano,
      condicion: puzzles2[j].condicion,
      estado: puzzles2[j].estado,
      privado: puzzles2[j].privado,
      comentario: puzzles2[j].comentario,
      userid: puzzles2[j].userid,
      localizacion: puzzles2[j].localizacion,
      id: puzzles2[j].id
    }
    return puzzle2;
  }
  async sincronMap() {
    const promise=new Promise((resolve, reject) => {resolve(123)})
    promise.then(() => {
      setTimeout(() => {
        if (this.puzzleForm.controls['localizacion'].value == '') this.initPageMap()
        else this.searchMaps(this.puzzleForm.controls['localizacion'].value)
      }, 500)
    })
  }
  searchMaps(adress: string): void {
    try {
      this.mapsService.getCoordinatesByAddress(adress).subscribe((res: any) => {
          if (res.results[0]) {
              this.localition = res.results[0].geometry.location
              this.initMap()
          }
          else {
            this.initPageMap()
          }
      });
    } catch(err) {
      console.log(err);
      this.initPageMap();
    }
  }
  async initPageMap() {
    this.dades = await this.getCurrentPosition();
    this.localition = { lat: this.dades.coords.latitude, lng: this.dades.coords.longitude}
    this.initMap();
  }
  async initMap() {
    this.map = new google.maps.Map(document.getElementById('divMap')!,{
      zoom: 10,
      center: this.localition
    })
    const marker = new google.maps.Marker({
      position: this.localition,
      map: this.map,
      animation: google.maps.Animation.BOUNCE})

    const service = new google.maps.places.PlacesService(this.map)
  }
  createMarker(place: any) {
    if (!place.geometry || !place.geometry.location) return
    const marker = new google.maps.Marker({map: this.map,position: place.geometry.location})
  }
  async getCurrentPosition() {
    const coordinates = await Geolocation.getCurrentPosition()
    return coordinates
  }
}



