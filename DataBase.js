const buttonsDataBase = {
    machine1 : 
    {
        buttons :
        {
            testButton : {
                clickAnimation : "c2743d71-8ac2-4259-bd77-96cb5f3bc02c",
                clickCallBack : () => 
                {

                }
            }
        }
    },
    machine2 : {buttons : {startButton :"", stopButton:""}},
    machine3 : {buttons : {startButton:"", stopButton:""}},
};

const collidDataBase = {
    pad1 : {
        onColidEvent : (emitterEntity) =>
        {
            setGlobalTransform({position : [0,0,0]});
        }
    }
}