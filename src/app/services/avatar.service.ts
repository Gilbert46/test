import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { doc, docData, Firestore, setDoc } from '@angular/fire/firestore';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { Filesystem, WriteFileResult } from '@capacitor/filesystem';
import { getDownloadURL } from '@angular/fire/storage';


@Injectable({
  providedIn: 'root'
})
export class AvatarService {

  constructor(private auth: Auth, private firestore: Firestore, private storage: Storage) { }
  webviewPath: string = ''
  filepath: string = ''
  /*
  getUserProfile() {
		const user = this.auth.currentUser;
		const userDocRef = doc(this.firestore, 'users');
		return docData(userDocRef, { idField: 'id' });
	}


  async uploadImage(cameraFile: Photo) {
		const user = this.auth.currentUser;
		const path = `uploads/${user.uid}/profile.webp`;
		const storageRef = ref(this.storage, path);

		try {
			await uploadString(storageRef, cameraFile.base64String, 'base64');

			const imageUrl = await getDownloadURL(storageRef);

			const userDocRef = doc(this.firestore, `users/${user.uid}`);
			await setDoc(userDocRef, {
				imageUrl
			});
			return true;
		} catch (e) {
			return null;
		}
	}
  */
  public async newAvatarStore() {
    const capturePhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 90,
      height: 250,
      width: 250,
      correctOrientation: true,
      allowEditing: true
    })
    const savedImageFile = await this.savePicture(capturePhoto);
  }

  private async savePicture(avatar: Photo) {
    const base64Data = await this.readAsBase64(avatar);
    const fileName = this.auth + '.jpeg';
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
      this.webviewPath = 'gs://puzzle-21pop.appspot.com/imgusers'+avatar.uri
      getDownloadURL(ref(storage, this.webviewPath)).then((url) => {
        this.filepath = url
      })
    })
  }
}
