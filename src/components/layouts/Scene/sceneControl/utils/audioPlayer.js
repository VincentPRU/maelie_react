/*

    Audio player class  to manage all the tracks simultaniously

*/
const getPromiseFromEvent = (item, event) => {
    return new Promise((resolve) => {
        const listener = () => {
            item.removeEventListener(event, listener)
            resolve()
        }
        item.addEventListener(event, listener)

        //Because the event wont be trigged if the element is already ready
        if(item.readyState >= 1 ) listener() 
    })
}


export class AudioManager {

    constructor(scenesMap, choralElem, listDisplay, updateListDisplay){

        this.scenesMap = scenesMap;
        this.choralElem = choralElem;


        this.listDisplay = listDisplay
        this.updateListDisplay = updateListDisplay

        this.audioElems = [
            {
                "audio" : new Audio(scenesMap.audio1.audioFiles.audio1.address),
                "duration": 15,
                "percentage": null,
                "addedPercentage": null
            },
            {
                "audio" : new Audio(scenesMap.audio2.audioFiles.audio2.address),
                "duration": 15,
                "percentage": null,
                "addedPercentage": null
            },
            {
                "audio" : new Audio(scenesMap.audio3.audioFiles.audio3.address),
                "duration": 15,
                "percentage": null,
                "addedPercentage": null
            },
            {
                "audio" : new Audio(scenesMap.audio4.audioFiles.audio4.address),
                "duration": 15,
                "percentage": null,
                "addedPercentage": null
            },
            {
                "audio" : new Audio(scenesMap.audio5.audioFiles.audio5.address),
                "duration": 15,
                "percentage": null,
                "addedPercentage": null
            },
            {
                "audio" : new Audio(choralElem.audioFiles.choraleIndependante.address),
                "duration": 15,
                "percentage": null,
                "addedPercentage": null
            },
        ]
        
        this.currentAudioIndex = 0;
        this.totalDuration = undefined;

        this.setAudioEndingListeners()

        this.animationPercentages = []

        this.textPercentages = {
            "scene1": null,
            "scene2": null,
            "scene3": null,
            "scene3b": null,
            "scene4": null,
            "scene5": null,
            "scene5b": null,
            "scene6": null
        }


    }

    updateAudioIndex = ( i ) => {

        this.currentAudioIndex = i;

        this.updateListDisplay({
            ...this.listDisplay,
            currentAudioIndex: i
        }) 

    }

    calculateTextPercentages = () => {

        const oneSecPercentage = Math.round(100 / this.totalDuration);
        const twoSecPercentage = Math.round((100 / this.totalDuration) * 2);

        const percentageToSec = ( percentage ) => {
            return Math.round((this.totalDuration * percentage) / 100)
        }

        //scene one
        this.textPercentages.scene1 = [ 
            oneSecPercentage < 1 ? 1 : oneSecPercentage, 
            percentageToSec(this.audioElems[0].percentage) > 5 ? this.audioElems[0].percentage - twoSecPercentage : this.audioElems[0].percentage
        ]

        //scene two
        this.textPercentages.scene2 = [ 
            percentageToSec(this.audioElems[1].percentage) > 5 ?  this.audioElems[1].addedPercentage + twoSecPercentage : this.audioElems[1].addedPercentage,
            percentageToSec(this.audioElems[1].percentage) > 8 ?  this.audioElems[1].addedPercentage + this.audioElems[1].percentage - twoSecPercentage : this.audioElems[1].addedPercentage + this.audioElems[1].percentage
        ]

        //scene three
        this.textPercentages.scene3 = [ 
            percentageToSec(this.audioElems[2].percentage) > 7 ?  this.audioElems[2].addedPercentage + twoSecPercentage : this.audioElems[2].addedPercentage,
            Math.floor(this.audioElems[2].percentage / 2) + this.audioElems[2].addedPercentage 
        ]

        //scene three b
        this.textPercentages.scene3b = [ 
            Math.floor(this.audioElems[2].percentage / 2) + this.audioElems[2].addedPercentage, 
            this.audioElems[2].addedPercentage + this.audioElems[2].percentage
        ]

        //scene four
        this.textPercentages.scene4 = [ 
            this.audioElems[3].addedPercentage,
            this.audioElems[3].addedPercentage + this.audioElems[3].percentage
        ]

        //scene five a
        this.textPercentages.scene5 = [ 
            this.audioElems[4].addedPercentage,
            Math.floor((this.audioElems[4].percentage) / 2) + this.audioElems[4].addedPercentage 
        ]

        //scene five b
        this.textPercentages.scene5b = [ 
            Math.floor((this.audioElems[4].percentage) / 2) + this.audioElems[4].addedPercentage,
            this.audioElems[4].addedPercentage + this.audioElems[4].percentage
        ]

        //scene six
        this.textPercentages.scene6 = [ 
            percentageToSec(this.audioElems[5].percentage) > 7 ? this.audioElems[5].addedPercentage + twoSecPercentage : this.audioElems[5].addedPercentage,
            99
        ]

    }

    calculateAnimationPercentages = () => {

        const oneSecPercentage = Math.round(100 / this.totalDuration);

        for(let i = 1; i < this.audioElems.length; i++){
            
            const audioElem = this.audioElems[i]

            if( i === 3 || i === 4) {

                const arrayToPush = []

                //there are two scenes
                arrayToPush[0] = audioElem.addedPercentage
                arrayToPush[1] = audioElem.addedPercentage + Math.floor(audioElem.percentage / 2) + oneSecPercentage 

                this.animationPercentages.push(arrayToPush);

                const secondArrayToPush = []

                secondArrayToPush[0] = arrayToPush[1]
                secondArrayToPush[1] = audioElem.addedPercentage + audioElem.percentage

                this.animationPercentages.push(secondArrayToPush)

            } else {

                if( i === 2) {
                    //There is three scenes!
                    const firstArrayToPush = []
                    const secondArrayToPush = []
                    const thirdArrayToPush = []

                    firstArrayToPush[0] = audioElem.addedPercentage + oneSecPercentage ;
                    firstArrayToPush[1] = audioElem.addedPercentage + Math.floor(audioElem.percentage / 3)

                    this.animationPercentages.push( firstArrayToPush );

                    secondArrayToPush[0] = firstArrayToPush[1]
                    secondArrayToPush[1] = firstArrayToPush[1] + Math.floor(audioElem.percentage / 3)

                    this.animationPercentages.push( secondArrayToPush );

                    thirdArrayToPush[0] = secondArrayToPush[1]
                    thirdArrayToPush[1] = audioElem.addedPercentage + audioElem.percentage

                    this.animationPercentages.push( thirdArrayToPush );


                } else {

                    //there is only one scene

                    const arrayToPush = []

                    arrayToPush[0] = audioElem.addedPercentage + oneSecPercentage 
                    arrayToPush[1] = audioElem.addedPercentage + audioElem.percentage

                    this.animationPercentages.push(arrayToPush);

                }

                

            }
        }
    }

    setAudioEndingListeners = () => {

        //Loop through all the audio elements excepted the last one
        for(let i = 0; i < this.audioElems.length - 1; i++){

            //add event listener
            this.audioElems[i].audio.addEventListener("ended", () => {

                //Reset the properties of the current audio element
                this.audioElems[i].audio.pause()
                this.audioElems[i].audio.currentTime = 0

                //Increment the active audio element
                this.updateAudioIndex( i + 1 );

                // set the new audio element current time to 0 if its not already
                if(this.audioElems[this.currentAudioIndex].audio.currentTime !== 0) this.audioElems[this.currentAudioIndex].audio.currentTime = 0

                this.play()
            })
        }

        //Set an event listener for the last song
        this.audioElems[this.audioElems.length - 1].audio.addEventListener("ended", () => {
            this.audioElems[this.audioElems.length - 1].audio.pause()
            this.audioElems[this.audioElems.length - 1].audio.currentTime = 0
            this.updateAudioIndex( 0 )
            this.audioElems[0].audio.currentTime = 0;
        })
    }

    play = () => {
        //Start the audio element
        this.audioElems[ this.currentAudioIndex ].audio.play()
    }

    pause = () => {
        //Pause the audio element
        this.audioElems[ this.currentAudioIndex ].audio.pause()
    }

    getCurrentTime = () => {

        //start the count to 0
        let time = 0;

        //loop through all the audio elements that have played or are playing
        for(let i = 0; i <= this.currentAudioIndex; i++){
            if(i === this.currentAudioIndex){
                time += this.audioElems[i].audio.currentTime;
            } else {
                time += this.audioElems[i].duration;
            }
        }
        // return the value
        return parseInt( time );
    }

    changeAudioElem = ( newIndex ) => {

        //Verify if audio is playing
        let previouslyPlaying = !this.audioElems[ this.currentAudioIndex ].audio.paused || (!this.audioElems[ this.currentAudioIndex ].audio.paused && this.audioElems[ this.currentAudioIndex ].audio.currentTime);

        //First step : stop the current element from playing
        this.audioElems[ this.currentAudioIndex ].audio.pause()

        //Second step : update the index
        this.updateAudioIndex( newIndex )

        if( this.audioElems[ this.currentAudioIndex ].audio.currentTime !== 0) this.audioElems[ this.currentAudioIndex ].audio.currentTime = 0

        if(previouslyPlaying) this.play()
    } 


    getTotalTime = async  () => {

        //wait for the metadata of each audio element and then, store it and return the values
        await getPromiseFromEvent(this.audioElems[0].audio, 'loadedmetadata')
        this.audioElems[0].duration = this.audioElems[0].audio.duration

        await getPromiseFromEvent(this.audioElems[1].audio, 'loadedmetadata')
        this.audioElems[1].duration  = this.audioElems[1].audio.duration

        await getPromiseFromEvent(this.audioElems[2].audio, 'loadedmetadata')
        this.audioElems[2].duration  = this.audioElems[2].audio.duration

        await getPromiseFromEvent(this.audioElems[3].audio, 'loadedmetadata')
        this.audioElems[3].duration  = this.audioElems[3].audio.duration

        await getPromiseFromEvent(this.audioElems[4].audio, 'loadedmetadata')
        this.audioElems[4].duration  = this.audioElems[4].audio.duration

        await getPromiseFromEvent(this.audioElems[5].audio, 'loadedmetadata')
        this.audioElems[5].duration  = this.audioElems[5].audio.duration

        //Calculate the total 
        let total = 0;
        this.audioElems.forEach(elem => total += elem.duration)

        //Store the value in the object 
        this.totalDuration = parseInt( total )

        //Profite of the occasion to update the percentages that represente those audio elements
        let previousAudioPercentage = 0

        this.audioElems.forEach(audio => {
            audio.percentage = Math.round((audio.duration * 100) / total )
            audio.addedPercentage = previousAudioPercentage;
            previousAudioPercentage += audio.percentage;
        })

         //Profite of the occasion to calculate the animation percentages
        this.calculateAnimationPercentages()
        this.calculateTextPercentages()

        //Return it
        return parseInt( total )
    } 

  
    
}