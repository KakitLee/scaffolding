import { config } from 'dotenv';
import path from 'path';

config({
  path: path.resolve(process.cwd(), '.env'),
});

const CONFIG = {
  HOST: process.env.HOST,
  PORT: parseInt(process.env.PORT, 10),
};

export default CONFIG;
