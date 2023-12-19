export const buttonsDataBase = {
    machine1 : 
    {
        buttons :
        {
            testButton : {
                clickCallBack : async () => 
                {
                    await SDK3DVerse.engineAPI.playAnimationSequence("7526a81f-145f-436c-af18-0108b383a9aa", {seekOffset : 0});
                }
            }
        }
    },

};

export const colidDataBase = {
    pad1 : {
        colidCallBack : () =>
        {

        }
    }
}