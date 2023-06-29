import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { Filesystem, Directory, WriteFileResult } from '@capacitor/filesystem';
import { Preferences } from '@capacitor/preferences';
import { getDownloadURL } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  filepath: string = ''
  webViewPath: string = ''
  constructor() { }

  public async addNewPhotoStore() {
    const capturePhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100
    })
    const savedImageFile = await this.savePicture(capturePhoto);

  }

  private async savePicture(photo: Photo) {
    const base64Data = await this.readAsBase64(photo);
    const fileName = new Date().getTime() + '.jpeg';
    const savedFile = await Filesystem.writeFile({
      path: fileName,
      data: base64Data,
      directory: Directory.Data
    });
    const upImageFile =  await this.upFileStage(savedFile)

  }

  private async readAsBase64(photo: Photo) {
    const response = await fetch(photo.webPath!);
    const blob = await response.blob();
    return await this.convertBlobToBase64(blob) as string;
  }

  private convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
        resolve(reader.result);
    };

  });

  private async upFileStage(photo: WriteFileResult) {
    const storage = getStorage();
    const storageRef = ref(storage, 'some-child')
    const response = await fetch(photo.uri);
    const blob = await response.blob();
    console.log(photo.uri)
    uploadBytes(storageRef, blob).then((snapshot) => {
      this.webViewPath = 'gs://puzzle-21pop.appspot.com/imgpuzlis/'+photo.uri
      console.log(this.webViewPath)
      getDownloadURL(ref(storage, this.webViewPath)).then((url) => {
        this.filepath = url
        console.log(this.filepath)
      });
    });
  }
}
