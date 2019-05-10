// const readline = require('readline');
// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
// });

class Clock {

    constructor() {
        const date = new Date();
        this.hours = date.getHours();
        this.minutes = date.getMinutes();
        this.seconds = date.getSeconds();
        this.printTime();
        setInterval(this._tick.bind(this), 1000);
    }

    printTime() {
        const time = `${this.hours}:${this.minutes}:${this.seconds}`;
        console.log(time);
    }

    _tick() {
        this.seconds += 1;
        if (this.seconds > 59) {
            this.minutes += 1;
            this.seconds = 0;
        }

        if (this.minutes > 59) {
            this.hours += 1;
            this.minutes = 0;
        }

        if (this.hours > 23) {
            this.hours = 0;
        }

        this.printTime();
    }

}

// const myClock = new Clock();

function addNumbers(sum, numsLeft, completionCallback) {
    if (numsLeft === 0) return completionCallback(sum);
    if (numsLeft > 0) {
        rl.question('Enter a number', (num) => {
            sum += parseInt(num);
            console.log(sum);
            addNumbers(sum, numsLeft - 1, completionCallback);
            // rl.close();
        } );
    }
}

function completionCallback(sum) {
    console.log(`Total Sum: ${sum}`);
    rl.close();
}

// addNumbers(0, 3, completionCallback);
// addNumbers(0, 3, sum => console.log(`Total Sum: ${sum}`));

function askIfGreaterThan(el1, el2, callback) {
    rl.question(`Is ${el1} greater than ${el2}? `, (answer) => {
        if (answer === 'yes') {
            callback(true);
        } else {
            callback(false);
        }
    } );
}

function innerBubbleSortLoop(arr, i, madeAnySwaps, outerBubbleSortLoop) {
    if ( i < arr.length - 1) {
        askIfGreaterThan(arr[i], arr[i + 1], (isGreaterThan) => {
            if (isGreaterThan) {
                [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
                innerBubbleSortLoop(arr, i+1, true, outerBubbleSortLoop); 
            } else {
                innerBubbleSortLoop(arr, i+1, madeAnySwaps, outerBubbleSortLoop); 
            }
        } );
    }
    if ( i === arr.length - 1) {
        outerBubbleSortLoop(madeAnySwaps);
    }
}

// innerBubbleSortLoop([1,2,5,7], 0, false, () => console.log('Looping'));

function absurdBubbleSort(arr, sortCompletionCallback) {

    function outerBubbleSortLoop(madeAnySwaps) {
        if (madeAnySwaps) {
            innerBubbleSortLoop(arr, 0, false, outerBubbleSortLoop);
        } else {
           sortCompletionCallback(arr);
        }

    }
    outerBubbleSortLoop(true);
}

// absurdBubbleSort([3, 2, 1], function (arr) {
//     console.log("Sorted array: " + JSON.stringify(arr));
//     rl.close();
// });



// askIfGreaterThan(1, 2, (value) => console.log(value));

Function.prototype.myBind = function(context){

    return () => {
        this.call(context);
    }; 
};


class Lamp {
    constructor() {
        this.name = "a lamp";
    }
}

const turnOn = function () {
    console.log("Turning on " + this.name);
};

const lamp = new Lamp();

// turnOn(); // should not work the way we want it to

const boundTurnOn = turnOn.bind(lamp);
const myBoundTurnOn = turnOn.myBind(lamp);

// boundTurnOn(); // should say "Turning on a lamp"
// myBoundTurnOn(); // should say "Turning on a lamp"

Function.prototype.myThrottle = function(delay) {
    let tooSoon = false;

    return () => {
        if (!tooSoon) {
            tooSoon = true;
            setTimeout( () => {
                tooSoon = false;
            }, delay);
            this();
        }
    };  
};

class Neuron {
    fire() {
        console.log("Firing!");
    }
};

const neuron = new Neuron;
// When we create a new Neuron, 
// we can call #fire as frequently as we want

// The following code will try to #fire the neuron every 10ms. Try it in the console:


// You can use clearInterval to stop the firing:
// clearInterval(interval);

// Using Function#myThrottle, we should be able to throttle 
// the #fire function of our neuron so that it can only fire 
// once every 500ms:

// neuron.fire = neuron.fire.myThrottle(500);

// const interval = setInterval(() => {
//     neuron.fire();
// }, 10);

Function.prototype.myDebounce = function(interval) {
    let tooSoon = true;
    let result = '';

    return () => {
        if (tooSoon) {
            clearTimeout();
            result += this();
            setTimeout(() => {
                tooSoon = false;
            }, interval);   
        } else {
            return result;
        }
    };
};

class SearchBar {
    constructor() {
        this.query = "";

        this.type = this.type.bind(this);
        this.search = this.search.bind(this);
    }

    type(letter) {
        this.query += letter;
        this.search();
    }

    search() {
        console.log(`searching for ${this.query}`);
    }
}

const searchBar = new SearchBar;

const queryForHelloWorld = () => {
    searchBar.type("h");
    searchBar.type("e");
    searchBar.type("l");
    searchBar.type("l");
    searchBar.type("o");
    searchBar.type(" ");
    searchBar.type("w");
    searchBar.type("o");
    searchBar.type("r");
    searchBar.type("l");
    searchBar.type("d");
};

// queryForHelloWorld();

searchBar.search = searchBar.search.myDebounce(500);
queryForHelloWorld();