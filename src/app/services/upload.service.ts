import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';
import { Product } from '../models/product';


@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private angularFireDatabase: AngularFireDatabase, private angularFireStorage: AngularFireStorage) { }

  upload(file: File) {
    const ref = this.angularFireStorage.ref(`uploads/${file.name}`);
    console.log(ref.getDownloadURL());
    const ref2 = this.angularFireStorage.ref(`uploads/`);
    const task = ref.put(file);
  }
  insertProduct(product: Product) {
    this.angularFireDatabase.list('products').push(product)
      .then((result: any) => {
        console.log(result.key);
      });

  }



}
