// import { verifyToken } from "./middleware/verifyToken";

import 'reflect-metadata';
import { App } from './server/app';
import { Container } from 'typedi';
const app = Container.get(App);

app.createApplication().then(() => {
  console.info('The application was started! Kill it using Ctrl + C ');
})
