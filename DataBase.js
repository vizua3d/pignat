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
                    //const character_controller = playerController.getComponent('character_controller');
                    // console.log(character_controller);
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