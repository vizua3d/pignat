import * as Data from "./DataBase.js";


const canvas = document.getElementById('display-canvas');
var machineParent;
var lookedObj;

//-----------------------------------HightLight---------------------------------------------
async function HightLight(e)
{
    const {entity} = await SDK3DVerse.engineAPI.castScreenSpaceRay(e.clientX, e.clientY);
    if (!entity)
        return;
    
    for (const [machine, machineInfo] of Object.entries(Data.buttonsDataBase)) {
        for (const [objList, interractionObj] of Object.entries(machineInfo)) {
            for (const [obj, objInfo] of Object.entries(interractionObj)) {
                if (obj == entity.getName())
                {
                    machineParent = machine;
                    lookedObj = entity;
                }
            }
        }
    }

    if (!lookedObj) {return}
    else if (entity == lookedObj) 
    {
        if (!lookedObj.isSelected())
        lookedObj.select();
    }
    else
    { 
        SDK3DVerse.engineAPI.unselectAllEntities();
        lookedObj = null;
    }
}

//-----------------------------------onClickAction---------------------------------------------
async function onClickButton(e)
{
    const {entity} = await SDK3DVerse.engineAPI.castScreenSpaceRay(e.clientX, e.clientY);
    if (entity == lookedObj)
        Data.buttonsDataBase[machineParent].interactionObj[lookedObj.getName()].clickCallBack();

}

//-----------------------------------onColidTrigger---------------------------------------------
const collideTrigger = (emitterEntity,triggerEntity) =>
{
    for (const [collideGroup, inGroupList] of Object.entries(Data.collideDataBase)) 
    {
        for (const [collideTriggers, collideTriggersInfo] of Object.entries(inGroupList)) 
        {
            if (triggerEntity.getName() == collideTriggers ) 
            {
                Data.collideDataBase[collideGroup][collideTriggers].triggerCallBack(emitterEntity);
            }
        }
    }
}
SDK3DVerse.engineAPI.onEnterTrigger(collideTrigger);
//-----------------------------------onExitColidTrigger---------------------------------------------
const exitCollideTrigger = (emitterEntity,triggerEntity) =>
{
    for (const [collideGroup, inGroupList] of Object.entries(Data.exitCollideDataBase)) 
    {
        for (const [collideTriggers, collideTriggersInfo] of Object.entries(inGroupList)) 
        {
            if (triggerEntity.getName() == collideTriggers ) 
            {
                Data.exitCollideDataBase[collideGroup][collideTriggers].triggerCallBack(emitterEntity);
            }
        }
    }
}
SDK3DVerse.engineAPI.onExitTrigger(exitCollideTrigger);
//-----------------------------------closeScreen---------------------------------------------
import { playerController } from "./DataBase.js";
async function closeScreen()
{
    var playerScene = (await SDK3DVerse.engineAPI.findEntitiesByNames("Player".concat("_",SDK3DVerse.getClientUUID())))[0];
    var playerCam = (await (await playerScene.getChildren())[0].getChildren())[1];

    document.getElementById("tvContainer").style.display = "none";
    SDK3DVerse.actionMap.reset();
    SDK3DVerse.actionMap.propagate();
    playerController.attachComponent('character_controller', playerController);
    SDK3DVerse.setMainCamera(playerCam);
}

const closeScreenBtn = document.getElementById('closeScreen');

closeScreenBtn.removeEventListener('click',closeScreen)
canvas.removeEventListener('mousemove', HightLight, false);
canvas.removeEventListener('mouseup', onClickButton, false);

canvas.addEventListener('mousemove', HightLight, false);
canvas.addEventListener('mouseup', onClickButton, false);
document.getElementById('closeScreen').addEventListener('click',closeScreen)