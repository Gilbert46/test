import { Injectable } from '@angular/core';
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DlimatgeService {

  constructor(private alertController: AlertController) { }

  async dowmloadImage(pathfile: any) {
    const storage = getStorage();
    let folderfile: string = String(pathfile).substring(30)
    getDownloadURL(ref(storage, folderfile)).then((url) => {
      let blob: Blob
      const xhr = new XMLHttpRequest();
      xhr.responseType = 'blob';
      xhr.onload = (event) => {
      const blob=xhr.response;
      };
      xhr.open('GET', url);
      xhr.send = (event) => {
        const pathfileRef = (ref(storage, folderfile))
        window.location.href = ''+pathfileRef;
      };
      this.showAlert('¡ FELICIDADES !', 'Descarga efectuada correctamente')
    })
    .catch((error) => {
      switch(error.code) {
        case 'storage/object-not-found':
          this.showAlert('ERROR!!!', 'La imagen no existe en el servidor')
          break;
        case 'storage/unauthorized':
          this.showAlert('NO PERMITIDO', 'Tienes que estar logado')
          break;
        case 'Access-Control-Allow-Origin':
          this.showAlert('NO PERMITIDO', 'Bloqueado por CORS')
          break;
        case 'storage/unknown':
          this.showAlert('ERROR!!!!', 'Error en la petición al servidor')
          break;
      }
    });
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


