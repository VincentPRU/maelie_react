/*

    Function that get the current and total time and modify the text in function of it

*/

//Animation text
import animationText from '../sceneText.json'

import sceneInitialValues from './sceneInitialValues.json'

export const setTextPerTime = (time, totalTime, currentText, setCurrentText) => {
    const percentage = parseInt((time * 100) / totalTime);
    let condition = true;

    const perc = sceneInitialValues;

    //Scene 1
    if(percentage > perc.scene1[0] && percentage < perc.scene1[1] && condition) {

        condition = false;

        if(currentText !== animationText[0]){
            setCurrentText(animationText[0]);
        } 

        return
    } 

    //Scene 2
    if(percentage > perc.scene2[0] && percentage < perc.scene2[1] && condition) {
        condition = false;
        if(currentText !== animationText[1]){
            setCurrentText(animationText[1]);
        } 
        return
    } 

    //Scene 3
    if(percentage > perc.scene3[0] && percentage < perc.scene3[1] && condition) {
        condition = false;
        if(currentText !== animationText[2]){
            setCurrentText(animationText[2]);
        }
        return 
    } 

    if(percentage >= perc.scene3b[0] && percentage < perc.scene3b[1] && condition) {
        condition = false;
        if(currentText !== animationText[3]){
            setCurrentText(animationText[3]);
        } 
        return
    } 

    //Scene 4
    if(percentage >= perc.scene4[0] && percentage < perc.scene4[1] && condition) {
        condition = false;
        if(currentText !== animationText[4]){
            setCurrentText(animationText[4]);
        } 
    } 

    //scene 5
    if(percentage >= perc.scene5[0] && percentage < perc.scene5[1] && condition) {
        condition = false;
        if(currentText !== animationText[5]){
            setCurrentText(animationText[5]);
        } 
        return
    }
    if(percentage >= perc.scene5b[0] && percentage < perc.scene5b[1] && condition) {
        condition = false;
        if(currentText !== animationText[6]){
            setCurrentText(animationText[6]);
        }
        return
    } 

    //scene 6
    if(percentage >= perc.scene6[0] && percentage <= perc.scene6[1] && condition) {
        condition = false;
        if(currentText !== animationText[7]){
            setCurrentText(animationText[7]);
        } 
        return
    }
        
    if(currentText !== " " && condition){
        setCurrentText(" ");
    };
}