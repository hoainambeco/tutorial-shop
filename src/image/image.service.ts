import { Injectable } from '@nestjs/common';
import { rejects } from 'assert';
import {
  DataSnapshot,
  equalTo,
  getDatabase,
  onValue,
  orderByChild,
  push,
  query,
  ref,
  remove,
  set,
  update,
} from 'firebase/database';
import { Image } from './image.entity';

@Injectable()
export class ImageService {
  async findAll() {
    const db = getDatabase();
    const reference = ref(db, 'images/');
    let images = [];
    var promise = new Promise(function (resolve, reject) {
      onValue(reference, (snapshot: any) => {
        snapshot.forEach((element: any) => {
          images.push({
            id: element.key,
            url: element.val().url,
            idPost: element.val().idPost,
          });
        });
        resolve(images);
      });
    });
    return promise;
  }

  async findById(id: string, idPost: number) {
    const db = getDatabase();
    const reference = ref(db, 'images/' + idPost + '/' + id);
    var promise = new Promise(function (resolve, reject) {
      onValue(reference, (snapshot: any) => {
        console.log(snapshot.val());
        resolve({
          id: id,
          url: snapshot.val().url,
          idPost: snapshot.val().idPost,
        });
      });
    });
    return promise;
  }

  async findByPost(idPost: number) {
    console.log(idPost);
    const db = getDatabase();
    const reference = ref(db, 'images/' + idPost);
    let images = [];
    onValue(reference, (snapshot: any) => {
      console.log(snapshot.val() + ' abc');
      if (snapshot.val() != null) {
        snapshot.forEach((element: any) => {
          images.push({
            id: element.key,
            url: element.val().url,
            idPost: element.val().idPost,
          });
        });
      }
    });
    return images;
  }
  async createImage(imageInput: Image): Promise<Image> {
    try {
      const { id, url, idPost } = imageInput;
      const db = getDatabase();
      const reference = ref(db, 'images/' + imageInput.idPost);
      push(reference, { id, url, idPost });
      return imageInput;
    } catch (error) {
      console.log(error);
    }
  }
  async updateImage(
    id: string,
    imageInput: Image,
    idPost: number,
  ): Promise<Image> {
    try {
      console.log(id);
      const db = getDatabase();
      const reference = ref(db, 'images/' + idPost + '/' + id);
      update(reference, imageInput);
      return imageInput;
    } catch (error) {
      console.log(error);
    }
  }
  async deleteImage(id: string, idPost: number): Promise<boolean> {
    try {
      const db = getDatabase();
      const reference = ref(db, 'images/' + idPost + '/' + id);
      remove(reference);
      return true;
    } catch (error) {
      console.log(error);
    }
  }
}
