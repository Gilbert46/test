import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Puzzle } from '../../interfaces/puzzle';
import { PuzzleService } from '../../services/puzzle.service';
import { getStorage, ref, getDownloadURL } from "firebase/storage";


@Component({
  selector: 'app-puzzles',
  templateUrl: './puzzles.page.html',
  styleUrls: ['./puzzles.page.scss'],
})
export class PuzzlesPage implements OnInit {
  idField: string = ''
  index: number = 0
  columne: number = 6
  npage: number = 0
  blPages: boolean[] = []
  flag: boolean[] = [false, false, false]
  puzzle: Puzzle = {marca:'',titulo:'',categoria:'',precio:0,piezas:0,propietario:'',filepath:'',webviewPath:'',alto:0,ancho:0,año:0,condicion:'',estado:'',privado:false,comentario:'',userid:'',localizacion:''}
  puzzles : Puzzle[] = []
  constructor(private authService: AuthService, private location: Location, private router: Router, private puzzleService: PuzzleService) {}

  ngOnInit() {
    if (screen.width > 980) this.columne = 3
    this.initUser()
  }
  initUser(): void {
    this.idField = String(this.authService.idx)
    this.getSearchValue();
  }
  webViewImage(str: string): String {
    const storage = getStorage()
    getDownloadURL(ref(storage,this.puzzle.webviewPath)).then((url) => {
      str = url
    })
    return str
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
      }, 300);
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
    this.paginaSelect()
  }
  async paginaSelect() {
    const promise = new Promise ((resolve, reject) => {resolve(123)})
    promise.then(() => {
      setTimeout (() => {
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
      }, 300);
    });
  }
  otherPage(n: number):void {
    this.npage = n
    this.getSearchValue()
  }
  orderTitle(puzzles2 : Puzzle[]): Puzzle[] {
    for (let e=0; e<puzzles2.length;e++) {
      if (puzzles2[e].userid != this.idField) {
        puzzles2.splice(e, 1);
        e--;
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
      webviewPath: puzzles2[j].webviewPath
    }
    return puzzle2;
  }
}
