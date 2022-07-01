import { Injectable } from '@nestjs/common';
import {
  getDatabase,
  onValue,
  push,
  ref,
  remove,
  update,
} from 'firebase/database';
import { Cart } from 'src/cart/cart.entity';
@Injectable()
export class OdersService {
  async findByUser(user: string) {
    const db = getDatabase();
    const reference = ref(db, 'oders/' + user);
    let odersID = [];
    var promise = new Promise(function (resolve, reject) {
      onValue(reference, (snapshot: any) => {
        snapshot.forEach((element: any) => {
          console.log(element.val());
          const id = Object.keys(element.val());
          const data = element.val();
          for (let index = 0; index < id.length; index++) {
            odersID.push({
              id: element.key,
              product: {
                id: id[index],
                nameProduct: data[id[index]].nameProduct,
                price: data[id[index]].price,
                count: data[id[index]].count,
              },
            });
          }
        });
        resolve(odersID);
      });
    });
    return promise;
  }
  async findById(id: string, user: string) {
    const db = getDatabase();
    const reference = ref(db, 'oders/' + user + '/' + id);
    let odersID = [];
    var promise = new Promise(function (resolve, reject) {
      onValue(reference, (snapshot: any) => {
        console.log(snapshot.val());
        const data = snapshot.val();
        const ids = Object.keys(snapshot.val());
        console.log(ids);
        for (let index = 0; index < ids.length; index++) {
          odersID.push({
            id: id,
            product: {
              id: ids[index],
              nameProduct: data[ids[index]].nameProduct,
              price: data[ids[index]].price,
              count: data[ids[index]].count,
            },
          });
        }
        resolve(odersID);
      });
    });
    return promise;
  }
  async createOders(product: Cart, user: string, idOder: string) {
    const { nameProduct, price, count } = product;
    const db = getDatabase();
    const reference = ref(db, 'oders/' + user + '/' + idOder);
    var promise = new Promise(function (resolve, reject) {
      push(reference, { nameProduct, price, count });
      resolve(product);
    });
    return promise;
  }
  async deleteOders(id: string, user: string, idOder: string) {
    const db = getDatabase();
    const reference = ref(db, 'oders/' + user + '/' + idOder + '/' + id);
    remove(reference);
    return true;
  }
  async updateOders(id: string, product: Cart, user: string, idOder: string) {
    const { nameProduct, price, count } = product;
    const db = getDatabase();
    const reference = ref(db, 'oders/' + user + '/' + idOder + '/' + id);
    var promise = new Promise(function (resolve, reject) {
      update(reference, { nameProduct, price, count });
      resolve(product);
    });
    return promise;
  }
}
