1. // What are the results of these expressions? (result, type, reason)
"" + 1 + 0 // "10", string, numbers are concat as string
"" - 1 + 0 // -1, number, string coerced to number due to "-"
true + false // 1, number, boolean converted to number
!true // false, boolean, 'not' operator
6 / "3" // 2, number, string coerced to number due to "/"
"2" * "3" // 6, number, strings coerced to number due to "*"
4 + 5 + "px" // "45px", string, sum between numbers then concat string
"$" + 4 + 5 // "$45", string, numbers are concat as string
"4" - 2 // 2, number, string coerced to number due to "-"
"4px" - 2 // NaN, number, string could not be coerced due to "-"
"  -9  " + 5 // "  -9  5", string, number is concat as string
"  -9  " - 5 // -14, number, string trimmed and coerced due to "-"
null + 1 // 1, number, null converted to 0
undefined + 1 // NaN, number, undefined cannot be coerced to number
undefined == null // true, boolean, undefined is 'loosely equal' to null
undefined === null // false, boolean, undefined is not 'strictly equal' to null
" \t \n" - 2 /* -2, number, spaces, "\t" (tab) and "\n" (newline) are trimmed
              and coerced to number due to "-" */
                      
2. // Which of the below are not giving the right answer?
let three = "3"
let four = "4"
let thirty = "30"

let addition = three + four // "34", string, strings are concatenated
let multiplication = three * four // 12, number, strings coerced to number due to "*"
let division = three / four // 0.75, number, strings coerced to number due to "/"
let subtraction = three - four // -1, number, strings coerced to number due to "-"

let lessThan1 = three < four // true, boolean, string is compared lexicographically 
let lessThan2 = thirty < four /* true, boolean, first character "3" is of smaller lexicographical 
                                  order than first character "4", UNEXPECTED RESULT*/ 
// Fix:
let lessThan3 = JSON.parse(thirty) < JSON.parse(four) // false, boolean, number comparison

3. // Which of the following console.log messages will print? Why?
if (0) console.log('#1 zero is true') // 0 is "loosely equal" to false and does not print
if ("0") console.log('#2 zero is true') /* "0" is coerced to 0 which is "loosely equal" to false
                                          and does not print */
if (null) console.log('null is true') // null is "loosely equal" to false and does not print
if (-1) console.log('negative is true') // -1 is "loosely equal" to true (i.e. =/= 0) and prints
if (1) console.log('positive is true') // 1 is "loosely equal" to true (i.e. =/= 0) and prints

4. // Rewrite this 'if' using the ternary/conditional operator '?'.
let a = 2, b = 3;
let result = `${a} + ${b} is `;

(a + b < 10) ? result += 'less than 10' : result += 'greater than 10';
 /* What does the ‘+=’ do?
  += is concatenating string */

5. // Rewrite the following function using:
function getGreeting(name) {
  return 'Hello ' + name + '!';
}

// Function expression
const getGreetingFunction = function (name) {
  return 'Hello ' + name + '!';
}

//Arrow function syntax
const getGreetingArrow = (name) => {return 'Hello ' + name + '!'};

6. // add a lastName property and include it in the greeting.
const westley = {
  name: 'Westley',
  numFingers: 5
}
const rugen = {
  name: 'Count Rugen',
  numFingers: 6
}
const inigo = {
  firstName: 'Inigo',
  lastName: 'Montoya',
  greeting(person) {
    let greeting = `Hello ${person.name}, my name is ${this.firstName} ${this.lastName}. `;
    console.log(greeting + this.getCatchPhrase(person));
  },

  // 6b) Object method if 'person' has 6 fingers
  getCatchPhrase(person) {
    if (person.numFingers == 6) {
      return "I do not mean to pry, but you don't by any chance happen to have six fingers on your right hand?"
    } else if (person.numFingers == 5) {
    return 'Nice to meet you.'
    }
  },

  // 6c) Arrow syntax and conditional operator method
  getCatchPhrase: (subject) => {
    return subject.numFingers == 5 ? 'Nice to meet you.' : `I do not mean to pry, but you don't by any chance happen to have ${String(subject.numFingers)} fingers on your right hand?`;
  }

}

inigo.greeting(westley);
inigo.greeting(rugen);

7. 
// a) modify each of the object methods to enable function chaining:
const basketballGame = {
  score: 0,
  // c) object property to keep track of fouls
  fouls: 0,
  freeThrow() {
    this.score++;
    return this;
  },
  basket() {
    this.score += 2;
    return this;
  },
  threePointer() {
    this.score += 3;
    return this;
  },
  // c) object method to increment fouls
  foul() {
    this.fouls++;
    return this;
  },
  halfTime() {
    console.log(`Halftime score is ${this.score}, foul count is ${this.fouls}`);
    return this;
  },
  // b) Add a new method to print the full time final score
  fullTime() {
console.log(`Fulltime score is ${this.score}, foul count is ${this.fouls}`);
  }
}

// d) test object by chaining all the method calls together
basketballGame.basket().foul().freeThrow().freeThrow().basket().threePointer().halfTime().basket().foul().freeThrow().foul().freeThrow().basket().threePointer().fullTime();

8.
const sydney = {
  name: 'Sydney',
  population: 5_121_000,
  state: 'NSW',
  founded: '26 January 1788',
  timezone: 'Australia/Sydney'
}

// 8a) use a 'for ... in' loop 
function printProperties(object) {
  for (property in object) {
    console.log(`${property}: ${object[property]}`);
  }
}
printProperties(sydney);

// 8b) create a new object for a different city
const wellington = {
  name: 'Wellington',
  population: 212_700,
  region: 'Wellington',
  timezone: 'New Zealand'
}
printProperties(wellington);

// 9. 
let teamSports = ['Hockey', 'Cricket', 'Volleyball'];
let dog1 = 'Bingo';
let cat1 = {name: 'Fluffy', breed: 'Siberian'};

// 9a) Create a new moreSports variable and add some new sports
let moreSports = teamSports;
moreSports.push('Table Tennis', 'Frisbee')
moreSports.unshift('Oztag');
// 9b) Create a new dog2 variable equal to dog1 and give it a new value
let dog2 = dog1;
dog2 = 'Barry';
// 9c) Create a new cat2 variable equal to cat1 and change its name property
let cat2 = cat1;
cat2.name = 'Felix';
// 9d) Print the original teamSports, dog1 and cat1 variables to the console.
console.log(`${teamSports}, ${dog1}, ${JSON.stringify(cat1)}`);
// Output: Oztag,Hockey,Cricket,Volleyball,Table Tennis,Frisbee, Bingo, {"name":"Felix","breed":"Siberian"}
// Variables (e.g. dog1) store primitive values which are copied but are not connected i.e. independent.
// Reference values (e.g. teamSports, cat1) are held actively in memory and are thus connected and dependent.

// 9e) Change the way the moreSports and cat2 variables are created to ensure the originals remain independent
let evenMoreSports = JSON.parse(JSON.stringify(teamSports));
let cat3 = JSON.parse(JSON.stringify(cat1));
evenMoreSports.splice(1,4);
cat3.name = 'Phoenix';

console.log(`${teamSports}, ${JSON.stringify(cat1)}`);
// Output: Oztag,Hockey,Cricket,Volleyball,Table Tennis,Frisbee, {"name":"Felix","breed":"Siberian"}
// Deep copy ensures original references are not affected

10.
function Person(name, age) {
  this.name = name;
  this.age = age;
  this.human = true;
  // 10 e) Add a canDrive method to the constructor function
  const canDrive = this.age >= 16 ? true : false;
}

// 10a) Create a new person using the constructor function and store it in a variable
let charles = new Person('Charles', 33);

// 10b) Create a second person using different name and age values
let kelly = new Person('Kelly', 32);

// 10c) Print out the properties of each person object to the console
console.log(`${JSON.stringify(charles)}\n${JSON.stringify(kelly)}`);
// Output: {"name":"Charles","age":33,"human":true}
//         {"name":"Kelly","age":32,"human":true}

// 10d) Rewrite the constructor function as a class called PersonClass and use it to create
class PersonClass {
  constructor(name, age) {
    this.name = name;
    this.age = age;
    this.human = true
  }
  // 10e) Add a canDrive method to the class 
  canDrive() {
    return (this.age) >= 16 ? true : false;
  }
}

let shane = new PersonClass('Shane', 42);
console.log(`${JSON.stringify(shane)}`);
// 10d) Output: {"name":"Shane","age":42,"human":true}
