import mongoose from "mongoose";

import { Inject, Service } from 'typedi';
import { Config } from '../config';

const mongoDB = process.env.MONO_DB_URL || '';

@Service()
export class Db {
    /**
     * @param config
     */
    public constructor(@Inject() private readonly config: Config) { }

    public async init() {
        try {
            mongoose.set("strictQuery", false);
            mongoose.connect(mongoDB);
            const db = mongoose.connection;

            db.on("error", console.error.bind(console, "MongoDB connection error:"));
        } catch (err) {
            console.log(err);
        }
    }
}
