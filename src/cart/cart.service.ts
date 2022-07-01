import { Injectable } from '@nestjs/common';
import {
  getDatabase,
  onValue,
  push,
  ref,
  remove,
  update,
} from 'firebase/database';
import { Cart } from './cart.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class CartService {
  async findAll() {
    const db = getDatabase();
    const reference = ref(db, 'carts/');
    let carts = [];
    var promise = new Promise(function (resolve, reject) {
      onValue(reference, (snapshot: any) => {
        console.log(snapshot.val());
        snapshot.forEach((element: any) => {
          carts.push({
            id: element.key,
          });
        });
        resolve(carts);
      });
    });
    return promise;
  }

  async findById(id: string, user: string) {
    const db = getDatabase();
    const reference = ref(db, 'carts/' + user + '/' + id);
    var promise = new Promise(function (resolve, reject) {
      onValue(reference, (snapshot: any) => {
        resolve({
          id: id,
          nameProduct: snapshot.val().nameProduct,
          price: snapshot.val().price,
          count: snapshot.val().count,
        });
      });
    });
    return promise;
  }
  async findByUser(user: string) {
    try {
      const db = getDatabase();
      const reference = ref(db, 'carts/' + user);
      let carts = [];
      var promise = new Promise(function (resolve, reject) {
        onValue(reference, (snapshot: any) => {
          snapshot.forEach((element: any) => {
            carts.push({
              id: element.key,
              nameProduct: element.val().nameProduct,
              price: element.val().price,
              count: element.val().count,
            });
          });
          resolve(carts);
        });
      });
      return promise;
    } catch (error) {
      return error;
    }
  }

  async createCart(cart: Cart, user: string) {
    const { nameProduct, price, count } = cart;
    const db = getDatabase();
    const reference = ref(db, 'carts/' + user);
    const idCart = uuidv4();
    push(reference, { idCart, nameProduct, price, count });
    return cart;
  }
  async updateCart(id: string, user: string, cart: Cart) {
    try {
      const db = getDatabase();
      const reference = ref(db, 'carts/' + user + '/' + id);
      var promise = new Promise(function (resolve, reject) {
        update(reference, cart);
        resolve(cart);
      });
      return promise;
    } catch (e) {
      return e;
    }
  }
  async deleteCart(id: string, user: string) {
    try {
      const db = getDatabase();
      const reference = ref(db, 'carts/' + user + '/' + id);
      remove(reference);
      return true;
    } catch (e) {
      return e;
    }
  }
}
