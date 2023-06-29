import { Injectable } from '@angular/core';
import { Puzzle } from '../interfaces/puzzle';
import { Firestore, collectionData, doc, docData, addDoc, deleteDoc, updateDoc } from '@angular/fire/firestore'
import { collection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PuzzleService {

  constructor(private  firestore: Firestore) { }

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
    const stPuzzle = doc(this.firestore,  `puzzle/${puzzle.id}`);
    return deleteDoc(stPuzzle);
  }
  updatePuzzle(puzzle: Puzzle) {
    const stPuzzle = doc(this.firestore,  `puzzle/${puzzle.id}`);
    return updateDoc(stPuzzle, {marca: puzzle.marca, titulo: puzzle.titulo, categoria: puzzle.categoria, filepath:puzzle.filepath, webViewPath: puzzle.webviewPath, alto: puzzle.alto, ancho: puzzle.ancho, condicion: puzzle.condicion, estado: puzzle.estado, privado: puzzle.privado, comentario: puzzle.comentario, userid: puzzle.userid, localizacion: puzzle.localizacion, id: puzzle.id});
  }
}
