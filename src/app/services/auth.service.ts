import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword,createUserWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { getAuth, sendPasswordResetEmail, updatePassword, reauthenticateWithCredential } from "firebase/auth";
import { Firestore, addDoc, collection, collectionData, doc, docData, updateDoc } from '@angular/fire/firestore';
import { AlertController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  idx: string = ''
  constructor(public auth: Auth, private firestore: Firestore, private router: Router, private alertController: AlertController) { }

  async register( usuari: User) {
		try {
			const user = await createUserWithEmailAndPassword(this.auth, usuari.email, usuari.password)
      this.addUser(usuari)
      this.getIdfield(usuari)
			return user
		} catch (e) {
			return null
		}
	}

	async login( usuari: User ) {
		try {
			const user = await signInWithEmailAndPassword(this.auth, usuari.email, usuari.password)
      this.getIdfield(usuari)
			return user
		} catch (e) {
			return null
		}
	}

  getUsers(usuari: User): Observable<User[]> {
    const user = collection(this.firestore, `users`);
		return collectionData(user, {idField: 'id'}) as Observable<User[]>
  }

  getUsuari(id: string): Observable<User> {
    const user =  doc(this.firestore, `users/${String(id)}`)
    return docData(user, {idField: 'id'}) as Observable<User>
  }

  addUser(usuari:User) {
    const user = collection(this.firestore, 'users')
    return addDoc(user, usuari)
  }

  getIdfield(user: User) {
    this.getUsers(user).subscribe(res =>{res.forEach(e=>{
      if (user.email==e.email)this.idx=String(e.id);});});
  }

  updateUser(usuari: User) {
    const use =  doc(this.firestore, `users/${usuari.id}`)
    return updateDoc(use, {email:usuari.email, password:usuari.password, name:usuari.name, adrece:usuari.adrece, phone:usuari.phone, id:usuari.id, filepath:usuari.filepath, webviewPath:usuari.webviewPath})
  }

  async newPassword(email: string, pw: string) {
    const auth = getAuth()
    if (pw.length<6) this.showAlert('ERROR !!!', 'Password almenos con 6 carácteres');
    else {
      sendPasswordResetEmail(auth, email)
      .then(() => {
        // Password reset email sent!
        const xhr = new XMLHttpRequest();
        xhr.responseType = 'text';
        xhr.onload = async (event) => { const text = xhr.response }
        xhr.open('GET', email)
        xhr.send()
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        this.showAlert('ERROR !!!', 'Email no válido');
      })
    }
  }

  async updatePassword(pw: string) {
    const auth = getAuth()
    const user = auth.currentUser
    updatePassword(user!, pw).then(() => {
      setTimeout (() => {
        this.router.navigateByUrl('/tab1/home/'+user!.uid, { replaceUrl: true })
      }, 300);
    }).catch((error)=> {
      this.showAlert('ERROR !!!', 'Usuario no registrado');
    })
  }

	logout() {
    return signOut(this.auth);
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

