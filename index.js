
/* Main Ground Facilities script*/
// @ts-check


import KRPC from './node_modules/krpc.js/lib/KRPC.js';
import express from 'express';
const authKey = "IKSA_AUTH_rgehouiougr"


const options = {
    name: 'Ground',    // (default)
    host: '',  // (default)
    rpcPort: 49990,     // (default)
    streamPort: 49991,  // (default)
};

const krpc = new KRPC(options);

const gameData = {

}

const vehicle = {
    object: null,
}
const states = {
    fuel: false,
    handedOff: false,
    started: false,
    CAA: false
}

const functions = {
    /**
     * Toggles an action group
     * @param {1|2|3|4|5|6|7|8|9|10} num 
     */
    actGroup: function(num){
        gameData.control.toggle_action_group(num);
    }
}


async function init(){
    await krpc.load()
    gameData.sc = krpc.services.spaceCenter;
    gameData.vessel = await gameData.sc.activeVessel;
    vehicle.object = gameData.vessel;
    gameData.control = await gameData.vessel.control;
}
init()

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



let webApp = express();
webApp.get('/status', function(req,res){
    res.send(JSON.stringify(status, null, 2));
})
webApp.post("/action/toggleVent", function(req,res){
    if(req.query){
        if(req.query.auth == authKey){

        }
    }else{
        res.sendStatus(400);
    }
})
webApp.listen(3000);
