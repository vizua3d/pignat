const canvas = document.getElementById('display-canvas');
var selectedEntities; 
var machineParent;
var lookedButton;
var animonoff = false;

//-----------------------------------HightLight---------------------------------------------
canvas.addEventListener('mousemove', async (e) =>
{
    const {entity, pickedPosition, pickedNormal} = await SDK3DVerse.engineAPI.castScreenSpaceRay(e.clientX, e.clientY);
    if (!entity)
        return;

    for (const [machine, machineInfo] of Object.entries(DataBase)) {
        for (const [buttons, buttonsList] of Object.entries(machineInfo)) {
            for (const [button, buttonInfo] of Object.entries(buttonsList)) {
                if (button == entity.getName())
                {
                    machineParent = machine;
                    lookedButton = entity;
                }
            }
        }
    }

    if (!lookedButton) {return}
    else if (entity == lookedButton) 
    {
        if (!lookedButton.isSelected())
            lookedButton.select();
    }
    else
    { 
        SDK3DVerse.engineAPI.unselectAllEntities();
        lookedButton = null;
    }

    //-----------------------------------onClickAction---------------------------------------------
    canvas.addEventListener('mouseup', async () =>
    {
        
    if (entity == lookedButton)
    {
        var animationUUID = buttonsDataBase[machineParent].buttons[lookedButton.getName()].clickAnimation;
        if (animonoff == false)
        {
            SDK3DVerse.engineAPI.playAnimationSequence(animationUUID);
            animonoff = true;
        }
            
        else if (animonoff == true)
        {
            SDK3DVerse.engineAPI.stopAnimationSequence(animationUUID);
            animonoff = false;
        }
            
        
    }
    }, false);


}, false);

const Teleport_player = (emitterEntity,triggerEntity) =>
{
  triggerEntity = triggerEntity.getParent().getName();
  collidDataBase[triggerEntity].onColidEvent()

}
SDK3DVerse.engineAPI.onEnterTrigger(Teleport_player);