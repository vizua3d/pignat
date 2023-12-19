export const buttonsDataBase = {
    machine1 : 
    {
        buttons :
        {
            testButton : {
                clickCallBack : () => 
                {
                    SDK3DVerse.engineAPI.playAnimationSequence("c2743d71-8ac2-4259-bd77-96cb5f3bc02c");
                }
            }
        }
    },
    machine2 : {buttons : {startButton :"", stopButton:""}},
    machine3 : {buttons : {startButton:"", stopButton:""}},
};

export const colidDataBase = {
    pad1 : {
        colidCallBack : () =>
        {
            
        }
    }
}