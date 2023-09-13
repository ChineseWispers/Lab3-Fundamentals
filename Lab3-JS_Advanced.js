1.
function makeCounter() {
  let currentCount = 0;
  return function() {
    currentCount++;
    console.log(currentCount)
    return currentCount;
  };
}
let counter1 = makeCounter();
counter1(); // 1
counter1(); // 2

// a) Create a second counter and test to see if it remains independent to counter1
let counter2 = makeCounter();
counter2() // 1
counter2() // 2
// Second counter is independent to first counter 

// b) Modify makeCounter so that it takes an argument startFrom
function makeCounter1(startFrom) { 
  let currentCount = startFrom;
  return function() {
    currentCount++;
    console.log(currentCount)
    return currentCount;
  };
}

// c) Modify makeCounter to take another argument incrementBy

function makeCounter2(startFrom, incrementBy=1) { 
  let currentCount = startFrom;
  return function() {
    currentCount += incrementBy;
    console.log(currentCount);
    return currentCount;
  };
}

// ===============================================================================

2.
function delayMsg(msg) {
  console.log(`This message will be printed after a delay: ${msg}`);
}
setTimeout(delayMsg, 100, '#1: Delayed by 100ms');
setTimeout(delayMsg, 20, '#2: Delayed by 20ms');
setTimeout(delayMsg, 0, '#3: Delayed by 0ms');
delayMsg('#4: Not delayed at all');

/* a) 
#1, #2, and #3 are queued after the original executing code.
Therefore, #4 is executed first, and after code is executed, queue of #3, #2, and #1 */

// b) Rewrite delayMsg as an arrow function
delayMsg = (msg) => console.log(`This message will be printed after a delay: ${msg}`);

// c) Add a fifth test which uses a large delay time
fifth_timeout = setTimeout(delayMsg, 10000, '#5: Delayed by 10s');

// d) Use clearTimeout to prevent the fifth test from printing at all.
clearTimeout(fifth_timeout);

// ===============================================================================

3. // a) & b) & c)
function debounce(func, ms=1000) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => { func.apply(this, args); }, ms);
  };
}

function printMe(msg) {
  console.log(msg)
  }
printMe = debounce(printMe);

setTimeout( printMe, 100, '#1 debounced message');
setTimeout( printMe, 200, '#2 debounced message');
setTimeout( printMe, 300, '#3 debounced message');

// ===============================================================================

4.
// a) Write a function printFibonacci() using setInterval

fibPair = { num1: 0, num2: 1}; 

function printFibonacci(limit) { // c) accept a limit argument

  function advanceFibSequence() {
    console.log(fibPair.num2);
    cacheNum2 = JSON.parse(JSON.stringify(fibPair.num2));
    fibPair.num2 += fibPair.num1;
    fibPair.num1 = cacheNum2;
  }

  id = setInterval(advanceFibSequence, 1000, fibPair)
  setTimeout( () => clearInterval(id), limit * 1010)
}

printFibonacci(7); // 1, 1, 2, 3, 5, 8, 13

// b) Write a new version printFibonacciTimeouts() that uses nested setTimeout

fibPair2 = { num1: 0, num2: 1, counter: 0}; 

function printFibonacciTimeouts(limit) { // c) accept a limit argument

  if (typeof(limit) != "number") {return console.log("User error: Please input a number")};

  let nestedTimeout = setTimeout(function advanceFibSequence() {
    if (fibPair2.counter == limit) {return} // stop once ${counter} has reached ${limit}
    console.log(fibPair2.num2);
    cacheNum2 = JSON.parse(JSON.stringify(fibPair2.num2));
    fibPair2.num2 += fibPair2.num1;
    fibPair2.num1 = cacheNum2;
    fibPair2.counter += 1;
    nestedTimeout = setTimeout(advanceFibSequence, 1000, limit);
  }, 1000, limit);
}

printFibonacciTimeouts(7); // 1, 1, 2, 3, 5, 8, 13

// ===============================================================================

5.
let car = {
  make: "Porsche",
  model: '911',
  year: 1964,
  description() {
  
  console.log(`This car is a ${this.make} ${this.model} from ${this.year}`);
  }
};
car.description(); //works
setTimeout(car.description, 200); //fails
// This fails as the reference of 'this' changes based on how the function is called

// a) Fix the setTimeout call by wrapping the call to car.description() inside a function
setTimeout( () => car.description(), 200);

// b) Change the year for the car by creating a clone of the original and overriding it
car = {...car, year: 1977}

/* c) Does the delayed description() call use the original values or the new values from b)? Why?
    Answer: Because the delayed Description() is always called later in the stack than the object clone,
    therefore when delayed Description() is called the object value has changed. */

// d) Use bind to fix the description method so that it can be called from within setTimeout without a wrapper function
const boundDescription = car.description.bind(car);
setTimeout(boundDescription, 1000);

// e) Change another property of the car by cloning it and test that setTimeout still returns bound value from d)
car = {...car, make: "Ferrari"}; // the delayed Description from d) produces the old bound value "Porsche" as the context has been bound to the variable

// ===============================================================================

6.
// a) Add delay(ms) to Function prototype, assume two parameters

function multiply(a, b) {
  console.log( a * b );
  }

Function.prototype.delay = function(ms) {
  let originalFunction = this;
  return function(arg1, arg2) {
  setTimeout(originalFunction, ms, arg1, arg2);
  }
};

multiply.delay(500)(5, 5);

// b) Use apply to improve your solution so that delayed functions can take any number of parameters
function multiply(a, b) {
  console.log( a * b );
  }

Function.prototype.delay = function(ms) {
  let originalFunction = this;
  return function() {
    setTimeout(() => originalFunction.apply(this, arguments), ms);
    }
};

multiply.delay(500)(5, 5); 

// c) Modify multiply to take 4 parameters and multiply all of them
function multiply(a, b, c, d) {
  console.log( a * b * c * d);
  }

Function.prototype.delay = function(ms) {
  let originalFunction = this;
  return function() {
    setTimeout(() => originalFunction.apply(this, arguments), ms);
    }
};

multiply.delay(500)(5, 5, 2, 2); 

// ===============================================================================

7.
function Person(name, age, gender) {
  this.name = name;
  this.age = age;
  this.gender = gender;
  }

// a) Define a custom toString method for the Person object
Person.prototype.toString = function () { 
    return `${this.name} is a ${this.age} year old ${this.gender}`
}

const person1 = new Person('James Brown', 73, 'male')
console.log(person1.toString()) // James Brown is a 73 year old male

// b) Test your method by creating 2 different people and printing them
const person2 = new Person('Charles Chen', 33, 'male')
const person3 = new Person('Benjamin Little', 5, 'male')

console.log(person2.toString()) // Charles Chen is a 33 year old male
console.log(person3.toString()) // Benjamin Little is a 5 year old male

// c) Create a new constructor function Student inheriting Person and adding an extra property cohort
function Student(name, age, gender, cohort) {
  Person.call(this, name, age, gender);
  this.cohort = cohort;
}

// d) Add a custom toString for Student objects that formats and prints their details
Student.prototype.toString = function() {
  return `${this.name} is a ${this.age} year old ${this.gender} student and a part of ${this.cohort} cohort`
}

let student1 = new Student('John Smith', 22, 'male', 2022)
let student2 = new Student('Virginia Armstrong', 23, 'female', 2021)

console.log(student1.toString()) // John Smith is a 22 year old male student and a part of 2022 cohort
console.log(student2.toString()) // Virginia Armstrong is a 23 year old female student and a part of 2021 cohort

// ===============================================================================

8.
class DigitalClock {
  constructor(prefix) {
    this.prefix = prefix;
  }
  display() {
    let date = new Date();
    //create 3 variables in one go using array destructuring
    let [hours, mins, secs] = [date.getHours(), date.getMinutes(),
    date.getSeconds()];
    if (hours < 10) hours = '0' + hours;
    if (mins < 10) mins = '0' + mins;
    if (secs < 10) secs = '0' + secs;
    console.log(`${this.prefix} ${hours}:${mins}:${secs}`);
  }
  stop() {
    clearInterval(this.timer);
  }
  start() {
    this.display();
    this.timer = setInterval(() => this.display(), 1000);
  }
}
const myClock = new DigitalClock('my clock:')
// myClock.start()

// a) Create a new class PrecisionClock that inherits from DigitalClock and adds the parameter precision
class PrecisionClock extends DigitalClock{
  constructor(name, precision=1000) {
    super(name)
    this.precision = precision;
  }

  start() {
    this.display();
    this.timer = setInterval(() => this.display(), precision)
  }
}

const myClock2 = new PrecisionClock('My precision clock:', precision=100)
myClock2.start()

// b) Create a new class AlarmClock that inherits from DigitalClock and adds the parameter wakeupTime in the format hh:mm.

class AlarmClock extends DigitalClock{
  constructor(name, wakeupTime) {
    super(name)
    this.alarmTime = wakeupTime
    console.log(`Alarm set for ${this.alarmTime}`)
  }

  display() {
    let date = new Date();
    //create 3 variables in one go using array destructuring
    let [hours, mins, secs] = [date.getHours(), date.getMinutes(),
    date.getSeconds()];
    if (hours < 10) hours = '0' + hours;
    if (mins < 10) mins = '0' + mins;
    if (secs < 10) secs = '0' + secs;
    if (this.alarmTime === `${hours}:${mins}`) {
      console.log(`Wake up! Time is: ${hours}:${mins}:${secs}`);
      this.stop();
    } else {
    console.log(`${this.prefix} ${hours}:${mins}:${secs}`);
    }
  }
}

myAlarmClock = new AlarmClock('My alarm clock: ', '20:31')
myAlarmClock.start();

// ===============================================================================

9.
/* a) Create a promise-based alternative randomDelay() that delays execution for a 
random amount of time (between 1 and 20 seconds) */

function randomDelay() {
  // your code
  return new Promise(function (resolve, reject) {
    let randomDuration = Math.floor((Math.random() * 20000)/1000);
    setTimeout(() => {}, randomDuration * 1000); 
    if (randomDuration % 2 === 0) { // b) If the random delay is even, success
      resolve(randomDuration);
    }
    else {
      reject(randomDuration);
    }
  });
  }
// c) + d) Include a catch, and try to update then and catch messages to include random delay value
randomDelay().then(function (duration) {console.log(`There appears to have been a ${duration}s delay. We like this!`)})
.catch(function (duration) {console.log(`There appears to have been a ${duration}s delay. Unfortunately, this was odd.`)});

// ===============================================================================

10.

import fetch from 'node-fetch'
globalThis.fetch = fetch
function fetchURLData(url) {
let fetchPromise = fetch(url).then(response => {
if (response.status === 200) {
return response.json();
} else {
throw new Error(`Request failed with status ${response.status}`);
}

});
return fetchPromise;
}
fetchURLData('https://jsonplaceholder.typicode.com/todos/1')
.then(data => console.log(data))
.catch(error => console.error(error.message));

// a) Write a new version of this function using async/await

import fetch from 'node-fetch'
globalThis.fetch = fetch

async function fetchURLData(url) {
  const fetchPromise = await fetch(url)
  let fetchResponse = await fetchPromise.json()
  if (fetchPromise.status === 200) {
    console.log(fetchResponse)
    return fetchResponse.message;
  } else {
    throw new Error(`Request failed with status ${fetchPromise.status}`); 
  }
}

// b) Test both functions with valid and invalid URLs

fetchURLData('https://jsonplaceholder.typicode.com/todos/1') // { userId: 1, id: 1, title: 'delectus aut autem', completed: false }
fetchURLData('https://jsonplaceholder.typicode.com/todos/2') // { userId: 1, id: 2, title: 'quis ut nam facilis et officia qui', completed: false}
fetchURLData('https://jsonplaceholder.typicode.com/abcdefgh') // Error: Request failed with status 404

// c) (Extension) Extend your new function to accept an array of URLs and fetch all of them, using Promise.all to combine the results.
// N/A
