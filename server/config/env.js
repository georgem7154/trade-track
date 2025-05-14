import {config} from 'dotenv';
config({path: '.env'});
export const {PORT,MONGO_URL} = process.env;