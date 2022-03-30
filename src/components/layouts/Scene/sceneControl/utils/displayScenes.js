
//Used for the function without music
const initValues = [
    [11, 21],  //Maelie                         //Scene 2
    [26, 31],  //Dragon alone                   //Scene 3
    [31, 39],  //Knight arriving                //Scene 3
    [39, 47],  //Dragon eat knight              //Scene 3
    [47, 53],  //Villagers enter                //Scene 4
    [53, 64],   //dragon eats villagers         //Scene 4
    [64, 73],   //Maelie comes                  //Scene 5
    [73, 85],   //maelie hypnotise dragon       //Scene 5
    [85]        //Villagers and maelie happy    //Scene 6
]

export const setAnimationsPerTime = (time, totalTime, currentScene, setCurrentScene, animWithMusic, musicPercentages) => {
    
    const percentage = parseInt((time * 100) / totalTime);
    const scene = currentScene.toString();

    const animValues = [];

    if(animWithMusic){
        animValues.push(...musicPercentages)
    } else {
        animValues.push(...initValues)
    }
   
    if(percentage > animValues[0][0] && percentage < animValues[0][1]) {
        if(scene !== "1") setCurrentScene("1")
        return
    }
    if(percentage >= animValues[1][0] && percentage < animValues[1][1]) {
        if(scene !== "2") setCurrentScene("2")
        return
    }
    if(percentage >= animValues[2][0] && percentage < animValues[2][1]) {
        if(scene !== "3") setCurrentScene("3")
        return
    }
    if(percentage >= animValues[3][0] && percentage < animValues[3][1]) {
        if(scene !== "4") setCurrentScene("4")
        return
    }
    if(percentage >= animValues[4][0] && percentage < animValues[4][1]) {
        if(scene !== "5") setCurrentScene("5")
        return
    }
    if(percentage >= animValues[5][0] && percentage < animValues[5][1]) {
        if(scene !== "6") setCurrentScene("6")
        return
    }
    if(percentage >= animValues[6][0] && percentage < animValues[6][1]) {
        if(scene !== "7") setCurrentScene("7")
        return
    }
    if(percentage >= animValues[7][0] && percentage < animValues[7][1]) {
        if(scene !== "8") setCurrentScene("8")
        return
    }
    if(percentage >= animValues[8][0]) {
        if(scene !== "9") setCurrentScene("9")
        return
    }

    if(scene !== "0") setCurrentScene("0")
}