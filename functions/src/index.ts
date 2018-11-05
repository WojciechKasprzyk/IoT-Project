import * as functions from 'firebase-functions';
import * as express from "express";
import * as firebase from "firebase";
import { samples } from "./mock/mock-data";

const server = express();

const config = {
    apiKey: "",
    authDomain: "iotproject-eit.firebaseapp.com",
    databaseURL: "https://iotproject-eit.firebaseio.com",
    projectId: "iotproject-eit",
    storageBucket: "iotproject-eit.appspot.com",
    messagingSenderId: "192509429154"
}
firebase.initializeApp(config);

const db = firebase.database();



server.route('/api/data')
    .post((req: express.Request, res: express.Response) => {
        const data = req.body
        // add data to database

        res.json(data);
    })
    .get((req: express.Request, res: express.Response) => {
        const {date, coord, type} = req.query;

        res.json({ date, coord, type })
    });



export const app = functions.https.onRequest(server);



interface Data extends MeasuredValue {
    id: string;
    date: Date;
    result: {
        pm1: MeasuredValue;
        pm25: MeasuredValue;
        pm10: MeasuredValue;
        formaldehyde: MeasuredValue;
        temperature: MeasuredValue;
        humidity: MeasuredValue;
    }
}

interface MeasuredValue {
    value: number;
    unit: number;
};