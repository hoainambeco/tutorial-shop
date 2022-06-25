import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as admin from 'firebase/app';
import * as dotenv from 'dotenv';
dotenv.config();

async function bootstrap() {
  let app = await NestFactory.create(AppModule);
  const firebaseConfig = {
    apiKey: 'AIzaSyClVY0tjkN1_CF9NeOftILg_WJ1j1cfo1w',
    authDomain: 'tutorial-store-facdd.firebaseapp.com',
    databaseURL:
      'https://tutorial-store-facdd-default-rtdb.asia-southeast1.firebasedatabase.app',
    projectId: 'tutorial-store-facdd',
    storageBucket: 'tutorial-store-facdd.appspot.com',
    messagingSenderId: '933972862496',
    appId: '1:933972862496:web:3e44adfd9bffd12f847e45',
    measurementId: 'G-EN7PMF52Q5',
  };
  admin.initializeApp(firebaseConfig);

  await app.listen(3000);
}
export default admin;
bootstrap();