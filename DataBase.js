

export const buttonsDataBase = {
    machine1 : 
    {
        interactionObj :
        {
            testButton : {
                clickCallBack : async () => 
                {
                    await SDK3DVerse.engineAPI.playAnimationSequence("7526a81f-145f-436c-af18-0108b383a9aa", {seekOffset : 0});
                }
            },
            testScreen : {
                clickCallBack : async () => 
                {
                    var playerScene = (await SDK3DVerse.engineAPI.findEntitiesByNames("Player".concat("_",SDK3DVerse.getClientUUID())))[0];
                    var playerController = (await playerScene.getChildren())[0];
                    var screenCam = await SDK3DVerse.engineAPI.findEntitiesByNames("screenCam");
                    SDK3DVerse.setMainCamera(screenCam[0]);
                    playerController.detachComponent('character_controller');
                    SDK3DVerse.actionMap.values["MOVE_FORWARD"] = [""];
                    SDK3DVerse.actionMap.values["LOOK_LEFT"] = [""];
                    SDK3DVerse.actionMap.values["LOOK_RIGHT"] = [""];
                    SDK3DVerse.actionMap.values["LOOK_DOWN"] = [""];
                    SDK3DVerse.actionMap.values["LOOK_UP"] = [""];
                    //SDK3DVerse.engineAPI.actionMap.reset();
                }
            }
        }
    },

};

export const collideDataBase = {
    TP_salle_chimie : {
        pad1 : {
            triggerCallBack : (emitterEntity) =>
            {
                const transform =
                {
                    position : [5,0.1,-20],
                    orientation : [0,0,0,1],
                    scale : [1,1,1]
                };
                emitterEntity.setGlobalTransform(transform);
            }
        },
        pad2 : {
            triggerCallBack : (emitterEntity) =>
            {
                const transform =
                {
                    position : [0,0.1,0],
                    orientation : [0,0,0,1],
                    scale : [1,1,1]
                };
                emitterEntity.setGlobalTransform(transform);
            }
        },
    },
    Machine_Description : {
        machine_name : {
            triggerCallBack : (emitterEntity) =>
            {
                
            }
        }
    }
}