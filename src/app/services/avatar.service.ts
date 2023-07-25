import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { Filesystem, WriteFileResult } from '@capacitor/filesystem';
import { getDownloadURL } from '@angular/fire/storage';


@Injectable({
  providedIn: 'root'
})
export class AvatarService {

  constructor() { }
  webviewPath: string = ''
  filepath: string = ''

  public async newAvatarStore() {
    const capturePhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 90,
      height: 80,
      width: 80,
      correctOrientation: true,
      allowEditing: true
    })
    const savedImageFile = await this.savePicture(capturePhoto);
  }

  private async savePicture(avatar: Photo) {
    const base64Data = await this.readAsBase64(avatar);
    const fileName = new Date().getTime()+'.png';
    const savedFile = await Filesystem.writeFile({
      path: fileName,
      data: base64Data,
    })
    const upImageFile =  await this.upFileStage(savedFile, avatar)
  }

  private async readAsBase64(avatar: Photo) {
    const response = await fetch(avatar.webPath!);
    const blob = await response.blob();
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

  private async upFileStage(avatar: WriteFileResult, capture: Photo) {
    const storage = getStorage()
    const storageRef = ref(storage, 'imgusers/'+avatar.uri)
    const response = await fetch(capture.webPath!)
    const blob = await response.blob()
    uploadBytes(storageRef,blob).then((snapshot) => {
      this.webviewPath = String(storageRef)
      getDownloadURL(ref(storage, this.webviewPath)).then((url) => {
        this.filepath = url
      })
    })
  }

}
