import { Injectable } from '@angular/core';
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { Filesystem, WriteFileResult } from '@capacitor/filesystem';
import { AlertController } from '@ionic/angular';
import { writeFileSync } from 'fs';


@Injectable({
  providedIn: 'root'
})
export class DlimatgeService {

  constructor(private alertController: AlertController) { }

  public async dowmloadImage(pathfile: any) {
    const storage = getStorage();
    let folderfile: string = String(pathfile).substring(30)
    getDownloadURL(ref(storage, folderfile)).then((url) => {
      const xhr = new XMLHttpRequest();
      xhr.responseType = 'blob';
      xhr.onload = async (event) => {
      const blob=xhr.response;
      const savedImageFile = await this.savePicture(blob, folderfile, pathfile); }
      xhr.open('GET', url)
      xhr.send()
      window.location.href = url
      this.showAlert('¡ FELICIDADES !', 'Descarga efectuada correctament')
    })
    .catch((error) => {
      switch(error.code) {
        case 'storage/object-not-found':
          this.showAlert('ERROR!!!', 'La image no existe en el servidor')
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

  private async savePicture(blob: Blob, flfl: string, pathfile: any) {
    const bs64data = await this.readAsBase64(blob);
    const nameFile = await Filesystem.writeFile({
      path: flfl.substring(10),
      data: bs64data,
    })
    const storage = getStorage()
    const pathRef = ref(storage, 'imgpuzlis/'+nameFile.uri)
    //window.location.href = ''+pathRef
  }

  private async readAsBase64(blob: Blob) {
    return await this.convertBlobToBase64(blob) as string;
  }

  private convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
        resolve(reader.result);
    };
    reader.readAsDataURL(blob);
  });

  async showAlert(head: string, msg: string) {
    const alert = await this.alertController.create({
      header: head,
      message: msg,
      buttons: ['OK']
    });
    await alert.present()
  }
}

function callback(): import("fs").NoParamCallback {
  throw new Error('Function not implemented.');
}

