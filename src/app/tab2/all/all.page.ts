import { Component, OnInit } from '@angular/core';
import { Puzzle } from '../../interfaces/puzzle';
import { PuzzleService } from '../../services/puzzle.service';
import { DlimatgeService } from 'src/app/services/dlimatge.service';

@Component({
  selector: 'app-all',
  templateUrl: './all.page.html',
  styleUrls: ['./all.page.scss'],
})
export class AllPage implements OnInit {
  constructor(private puzzleService: PuzzleService, private dlimatgeService: DlimatgeService) { }
  index: number = 0
  npage: number = 0
  columne: number = 6
  blPages: boolean[] = []
  flag: boolean[] = [false, false, false]
  puzzle: Puzzle = {marca:'',titulo:'',categoria:'',precio:0,piezas:0,propietario:'',filepath:'',webviewPath:''}
  puzzles : Puzzle[] = []

  ngOnInit(): void {
    if (screen.width > 980) this.columne = 3
    this.npage = 0
    this.getSearchValue();
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
  detallPuzzle(idx: number) : void {
    this.flag[0] = true
    this.puzzle = {marca:this.puzzles[idx].marca,titulo:this.puzzles[idx].titulo,categoria:this.puzzles[idx].categoria, precio:this.puzzles[idx].precio,piezas:this.puzzles[idx].piezas,propietario:this.puzzles[idx].propietario,filepath:this.puzzles[idx].filepath,webviewPath:this.puzzles[idx].webviewPath}
    this.index = idx;
  }
  changeState(st: boolean, idx: number, incr: number): void {
    this.flag[0] = st
    this.flag[1] = false
    if (!st) this.flag[2] = false;
    else {
      this.flag[2] = true
      idx += incr
      if (idx < 0) idx = this.puzzles.length - 1
      else if (idx >= this.puzzles.length ) idx = 0
      this.index = idx
      this.detallPuzzle(idx)
    }
  }
  setIsMenu(st: boolean): void {
    this.flag[1] = st;
  }
  playPuzzle(idx:number): void {
      this.flag[1] = false
      this.flag[2] = false
      setTimeout (() =>{
        if (this.flag[0] && !this.flag[1] && !this.flag[2]) {
          idx++;
          if (idx < 0) idx = this.puzzles.length - 1;
          else if (idx >= this.puzzles.length ) idx = 0;
          this.index = idx;
          this.detallPuzzle(idx);
          this.playPuzzle(idx);
        }
      }, 3000);
  }
  urlFile(path: Puzzle, i: number): void {
    this.flag[1] = false;
    if (i == 0) this.dlimatgeService.dowmloadImage(this.puzzle.webviewPath)
    if (i == 1) window.location.href = 'https://web.whatsapp.com/';
    if (i == 2) window.location.href= 'https://www.google.com/intl/es/gmail/about/'
    if (i == 3) window.location.href= 'https://twitter.com/'
  }
  sortPuzzle(price: number, pices: number, title: string): void {
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
    //this.paginaSelect()
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
  orderTitle(puzzles2: Puzzle[]): Puzzle[] {
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
