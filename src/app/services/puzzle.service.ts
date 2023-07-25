import { Injectable } from '@angular/core';
import { Puzzle } from '../interfaces/puzzle';
import { Firestore, collectionData, doc, docData, addDoc, deleteDoc, updateDoc } from '@angular/fire/firestore'
import { collection } from '@angular/fire/firestore';
import { AlertController, LoadingController } from '@ionic/angular';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PuzzleService {

  constructor(private  firestore: Firestore, private alertController: AlertController) { }

  getPuzzles(): Observable<Puzzle[]> {
    const stPuzzles = collection(this.firestore, 'puzzle');
    return collectionData(stPuzzles, {idField: 'id'}) as Observable<Puzzle[]>;
  }

  getPuzzleById(id: number): Observable<Puzzle> {
    const stPuzzle = doc(this.firestore, `puzzle/${id}`);
    return docData(stPuzzle, {idField: 'id'}) as Observable<Puzzle>;
  }

  addPuzzle(puzzle: Puzzle) {
    const stPuzzle = collection(this.firestore, 'puzzle');
    return addDoc(stPuzzle, puzzle);
  }

  deletePuzzle(puzzle: Puzzle) {
    this.showAlert('FELICIDADES !!', 'Puzzle eliminado correctamente')
    const stPuzzle = doc(this.firestore, `puzzle/${puzzle.id}`)
    return deleteDoc(stPuzzle)
  }

  updatePuzzle(puzzle: Puzzle) {
    this.showAlert('FELICIDADES !!', 'Puzzle modificado correctamente')
    const stPuzzle = doc(this.firestore, `puzzle/${puzzle.id}`)
    return updateDoc(stPuzzle, {marca:puzzle.marca, titulo:puzzle.titulo, categoria:puzzle.categoria, filepath:puzzle.filepath, webViewPath:puzzle.webviewPath, alto:puzzle.alto, ancho:puzzle.ancho, ano:puzzle.ano, condicion:puzzle.condicion, estado:puzzle.estado, privado:puzzle.privado, comentario:puzzle.comentario, userid:puzzle.userid, localizacion:puzzle.localizacion, id:puzzle.id})
  }

  async showAlert(head: string, msg: string) {
    const alert = await this.alertController.create({
      header: head,
      message: msg,
      buttons: ['OK']
    });
    await alert.present()
  }

}

