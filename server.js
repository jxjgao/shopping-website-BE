require('dotenv').config();
const port = Number.parseInt(process.env.PORT, 10);
const mongoUri = process.env.MONGO_URI;

const {MongoClient} = require('mongodb');
const express = require('express');

const Application = require('./application');

const application = Application();

const Health = require('./health');
const Cart = require('./cart');

async function main() {
    const db = await MongoClient.connect(mongoUri);

    application.use('/health', Health());
    application.use('/cart', Cart(db));

    const server = application.listen(port, () => {
        const host = server.address().address;
        const port = server.address().port;
        console.log(`Shopping website server up and running, listening at http://${host}:${port}`); // eslint-disable-line no-console
      });
 }

 main();


