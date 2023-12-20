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
const colidTrigger = (emitterEntity,triggerEntity) =>
{
    for (const [collideTriggers, collideTriggersInfo] of Object.entries(Data.collideDataBase)) 
    {
        if (triggerEntity.getName() == collideTriggers) 
        {
            Data.collideDataBase[collideTriggers].triggerCallBack();
        }
    }
}
SDK3DVerse.engineAPI.onEnterTrigger(colidTrigger);



canvas.removeEventListener('mousemove', HightLight, false);
canvas.removeEventListener('mouseup', onClickButton, false);

canvas.addEventListener('mousemove', HightLight, false);
canvas.addEventListener('mouseup', onClickButton, false);