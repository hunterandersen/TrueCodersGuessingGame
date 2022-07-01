class DisplayStopwatch{

    #currentTimeCount = 0;

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
        this.clockInterval = setInterval(()=>this.timer(), 1000);
    }

    timer(){
        this.#currentTimeCount++;
        this.paint();
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

    togglePause(){
        if (this.clockInterval){
            clearInterval(this.clockInterval);
            this.clockInterval = null;
        }else{
            this.#currentTimeCount = 0;
            this.paint();
            this.clockInterval = setInterval(()=>this.timer(), 1000);
        }
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