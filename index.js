import KRPC from './node_modules/krpc.js/lib/KRPC.js';
const express = require('express');

const options = {
    name: 'Ground',    // (default)
    host: '144.138.103.239',  // (default)
    rpcPort: 49990,     // (default)
    streamPort: 49991,  // (default)
};

const krpc = new KRPC(options);

const gameData = {

}

const vehicle = {

}
const states = {
    fuel: false,
    handedOff: false,
    started: false,
    CAA: false
}

const functions = {

}

async function init(){
    await krpc.load()
    gameData.sc = krpc.services.spaceCenter;
    gameData.vessel = await gameData.sc.activeVessel;
}

/*krpc.load().then(async () => {
    let sc = krpc.services.spaceCenter;
    let vessel = await sc.activeVessel;
    for (let i = 0; i < 10; i++) {
        console.log(await vessel.situtation); // slow, one rpc is executed every time
    }

    vessel.stream('situation');
    for (let i = 0; i < 10; i++) {
        console.log(await vessel.situtation); // fast, streamed properties can be resolved immediately
    }

    //yet another way:
    let stream = vessel.stream('situation', (situation) => console.log(situation));
    setTimeout(() => stream.remove(), 60 * 1000);
}).catch (console.error)*/