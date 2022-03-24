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

    constructor(scenesMap){
        this.scenesMap = scenesMap;
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
                "audio" : new Audio(scenesMap.audio5.audioFiles.audio5.address),
                "duration": 15,
                "percentage": null,
                "addedPercentage": null
            },
        ]
        
        this.currentAudioIndex = 0;
        this.totalDuration = undefined;

        this.setAudioEndingListeners()

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
                this.currentAudioIndex = i + 1;

                // set the new audio element current time to 0 if its not already
                if(this.audioElems[this.currentAudioIndex].audio.currentTime !== 0) this.audioElems[this.currentAudioIndex].audio.currentTime = 0

                this.play()
            })
        }

        //Set an event listener for the last song
        this.audioElems[this.audioElems.length - 1].audio.addEventListener("ended", () => {
            this.audioElems[this.audioElems.length - 1].audio.pause()
            this.audioElems[this.audioElems.length - 1].audio.currentTime = 0
            this.currentAudioIndex = 0;
            this.audioElems[0].audio.currentTime = 0;
        })
    }

    play = () => {

        console.log("Play called")
        //Start the audio element
        this.audioElems[ this.currentAudioIndex ].audio.play()
/*
        //Function to call the next song
        const playNextSong = () => {
            console.log("index removed " + this.currentAudioIndex)
            //remove event listener
            this.audioElems[ this.currentAudioIndex ].audio.removeEventListener("ended", playNextSong)

            if(this.audioElems[ this.currentAudioIndex + 1 ].audio){

                //set the previous song at zero so it is ready for the next read
                if(this.audioElems[this.currentAudioIndex].audio.currentTime !== 0) this.audioElems[this.currentAudioIndex].audio.currentTime = 0

                //Increment the active audio element
                this.currentAudioIndex++

                // set the new audio element current time to 0 if its not already
                if(this.audioElems[this.currentAudioIndex].audio.currentTime !== 0) this.audioElems[this.currentAudioIndex].audio.currentTime = 0

                this.play()
            }
        }
        console.log("index added " + this.currentAudioIndex)

        //Set an event listener for automatically the next song 
        this.audioElems[ this.currentAudioIndex ].audio.addEventListener("ended", playNextSong )
    */
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
        console.log(previouslyPlaying)
        //First step : stop the current element from playing
        this.audioElems[ this.currentAudioIndex ].audio.pause()

        //Second step : update the index
        this.currentAudioIndex = newIndex

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

        console.log(this.audioElems)


        //Return it
        return parseInt( total )
    } 

  
    
}