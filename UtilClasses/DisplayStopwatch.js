class DisplayStopwatch{

    #currentTimeCount

    /**
     * 
     * @param {HTMLElement} parentElement 
     * @param {Number} startTime 
     */
    constructor(parentElement, startTime = 0){
        if (!parentElement){
            parentElement = document.querySelector("html");
        }

        this.clockDisplay = document.createElement("div");
        this.clockDisplay.classList.add("stopwatch");
        parentElement.appendChild(this.clockDisplay);
        this.#currentTimeCount = startTime;
        this.clockInterval = setInterval(()=>{
            this.#currentTimeCount++;
            this.paint();
        }, 1000);
    }

    getSeconds(){
        return this.#currentTimeCount%60;
    }

    getMinutes(){
        return Math.floor(this.#currentTimeCount/60)%60;
    }

    getHours(){
        return Math.floor(Math.floor(this.#currentTimeCount/60)/60);
    }

    paint(){
        let displayText = "";
        let temp = this.getHours();
        if (temp>0){
            displayText = `${temp}h:${this.getMinutes()}m:${this.getSeconds()}s`;
        }else if ((temp = this.getMinutes()) > 0){
            displayText = `${temp}m:${this.getSeconds()}s`;
        }else{
            displayText = `${this.getSeconds()}s`;
        }
        this.clockDisplay.textContent = displayText;
    }

}

export default DisplayStopwatch;