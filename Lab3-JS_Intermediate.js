1.
function ucFirstLetters(phrase) {
  let words = phrase.split(" ")
  let titlePhrase = ""
  words.forEach(
    (word) => titlePhrase += `${word[0].toUpperCase()}${word.slice(1)} `
  )
  return titlePhrase.slice(0,-1); // remove last space in string and return
} 

console.log(ucFirstLetters("los angeles")); //Los Angeles

2. 
function truncate(str, max) {
  if (str.length > max) {
    return `${str.slice(0, max)}...`
  } else {
    return str
  } 
}

console.log(truncate('This text will be truncated if it is too long', 25));

// b) create function with conditional operator
function truncate(str, max) {
  return str.length > max ? `${str.slice(0, max)}...` : str;
}

console.log(truncate('This text will be truncated if it is too long', 25));

3.
const animals = ['Tiger', 'Giraffe'];
// a) Add 2 new values to the end
animals.push("Elephant", "Octopus");
// b) Add 2 new values to the beginning
animals.unshift("Bear", "Dolphin");
// c) Sort the values alphabetically
animals.sort();
// d) Write a function replaceMiddleAnimal(newValue)
function replaceMiddleAnimal(array1, newValue) {
  if (array1.length % 2 !== 0) {
  array1.splice((array1.length/2)-1, 1, newValue); // if array has odd length, replace middle element
  } else { array1.splice((array1.length/2)-1, 0, newValue); /* question does not specify even-sized array length scenario
                                                                add new element in middle index and remove nothing */
  }
} 
replaceMiddleAnimal(animals, "Lemur");

// e) Write a function findMatchingAnimals(beginsWith)
function findMatchingAnimals(oldArray, beginsWith) {
  let newArray = [];
  for (let animal of oldArray) {
    if (animal.toLowerCase().startsWith(beginsWith.toLowerCase())) {
      newArray.push(animal);
    }
  }
  return newArray;
}

console.log(findMatchingAnimals(animals, "b")); // ['Bear']

4.
// Write a function camelCase(cssProp)
function camelCase1(cssProp) {
  while (cssProp.indexOf("-") !== -1) { // while "-" found in string
    hyphen_index = cssProp.indexOf("-"); // find first index of "-"
    upperCaseChar = cssProp[hyphen_index + 1].toUpperCase(); // write title case string to variable
    cssProp = cssProp.substring(0, hyphen_index).concat(upperCaseChar, cssProp.substring(hyphen_index + 2)); // concatenate
  }
  return cssProp;
}

console.log(camelCase1('margin-left')); // 'marginLeft'

// b) 'for' loop, without conditional operator
function camelCase2(cssProp) {
  let hyphen_detected = false;
  let newString = "";
  for (let char of cssProp) {
    if (char === "-") {
      hyphen_detected = true; // if "-" detected, do nothing
    } else {
      if (hyphen_detected) {
        newProp = newString.concat(char.toUpperCase());
        hyphen_detected = false;  // if "-" previously detected, apply .toUpperCase() and concat
      } else {
        newProp = newString.concat(char); // else, simply concat
      }
    }
  }
  return newString;
}

console.log(camelCase2('margin-left')); // 'marginLeft'

// c) 'for' loop and tertiary operator
function camelCase3(cssProp) {
  charArray = cssProp.split(""); // split each character into an array
  let newProp = "";
  for (cIndex = 0; cIndex < charArray.length; cIndex++) {
    (charArray[cIndex] === "-") ? {} : newProp = newProp.concat(addChar(charArray, cIndex));
  }
  return newProp;

  function addChar(charArray, cIndex) {
    return (charArray[cIndex - 1] === "-") ? charArray[cIndex].toUpperCase() : charArray[cIndex]
  }
}

console.log(camelCase3("margin-left")); // 'marginLeft'

5.
let twentyCents = 0.20;
let tenCents = 0.10;

let fixedTwenty = twentyCents.toFixed(2);
let fixedTen = tenCents.toFixed(2);
console.log(fixedTwenty + fixedTen) // why is this not working? Answer below
/* a) The .toFixed() function converts to String. Thus, the two variables are
      string types which are then concatenated */
// b) 
function currencyAddition (float1, float2) {
  let sum = (Number(float1) + Number(float2)).toFixed(2);
  return JSON.parse(sum);
}

console.log(0.3 === currencyAddition(0.1, 0.2)); // true

// c) & d)
function currencyOperation(float1, float2, operation, numDecimals=2) { // d) add numDecimals
  switch (operation) {
    case '+':
      let sum = (Number(float1) + Number(float2)).toFixed(numDecimals);
      return JSON.parse(sum);
    case '-': 
      return JSON.parse((float1 - float2).toFixed(numDecimals));
    case '*':
      return JSON.parse((float1 * float2).toFixed(numDecimals));
    case '/':
      return JSON.parse((float1 / float2).toFixed(numDecimals));
  }
}

console.log(0.3 === currencyOperation(0.1, 0.2, '+')); // true

6. // My first answer, which I knew was too many lines (can ignore)
function unique(duplicatesArray) {
  let duplicateIndexes = []; // Array of duplicates by index
  for (index = 0; index < duplicatesArray.length; index++) { // index iteration
    for (compareIndex = index + 1; compareIndex < duplicatesArray.length; compareIndex++) { // second index iteration for comparison
      if (!duplicateIndexes.includes(compareIndex)) { // Ignore if dupliate index already collected
        if (duplicatesArray[index] === duplicatesArray[compareIndex]) { 
          duplicateIndexes.push(compareIndex); // if values are same, push duplicate index
        }
      }
    }
  }
  duplicateIndexes.sort(function(a, b){return a-b}).reverse(); // reverse array to perform element deletion from reverse
  for (let duplicateIndex = 0; duplicateIndex < duplicateIndexes.length; duplicateIndex++) {
    duplicatesArray.splice(duplicateIndexes[duplicateIndex], 1); // splice by duplicate indexes
  }
  return duplicatesArray;
}

console.log(unique([3, 3, 3, 3, 3, "b", 1, 2, 3, 3, 2, 3, 1, "b",])); // [3, "b", 1, 2]

// Later, I revised this answer
function unique2(duplicatesArray) {
  let uniqueArray = []; // create new array for unique elements
  for (item of duplicatesArray) { // iterate over target array
    if (!uniqueArray.includes(item)) { // if new array does not already contains element
      uniqueArray.push(item) // push element
    }
  }
  return uniqueArray;
}

console.log(unique2([3, 3, 3, 3, 3, "b", 1, 2, 3, 3, 2, 3, 1, "b",])); // [3, "b", 1, 2]

// Lastly, I googled and found this one
function unique2(duplicatesArray) {
  return new Set([...duplicatesArray])
}

7.
const books = [
  { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', year: 1925 },
  { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee', year: 1960 },
  { id: 3, title: '1984', author: 'George Orwell', year: 1949 },
  { id: 4, title: 'Brave New World', author: 'Aldous Huxley', year: 1932 },
  { id: 5, title: 'The Catcher in the Rye', author: 'J.D. Salinger', year: 1951 },
  ];

// a) return the title of the book object with the matching id
function getBookTitle(bookId) {
  book_object = books.find((book) => book.id === bookId)
  return (book_object.title);
}

console.log(getBookTitle(3)); // '1984

// b)return all book objects written before 1950.
function getOldBooks(beforeYear) {
  return books.filter((book_object) => book_object.year < beforeYear)
}

console.log(getOldBooks(1950)); // returns two book objects (id: 1, 3, 4)

// c) add a new genre property to all of the above books, with the value ‘classic’.
function addGenre(books) {
  return books.map((book_object) => ({...book_object, genre: 'classic'}));
}

console.log(addGenre(books));

// d) (Extension)
function getTitles(books, authorInitial) {
  return books.filter((book_object) => book_object.author.startsWith(authorInitial)).map((book) => book.title)
};

console.log(getTitles(books, 'H')); // [ 'To Kill a Mockingbird' ]

// e) (Extension)
function latestBook(books) {
  let latestYear = 0;
  books.forEach((book) => {
    (book.year > latestYear) ? latestYear = book.year : {};
  })
  return books.find(book => book.year === latestYear);
};

console.log(latestBook(books)) ;

8.
const phoneBookABC = new Map() //an empty map to begin with
phoneBookABC.set('Annabelle', '0412312343');
phoneBookABC.set('Barry', '0433221117');
phoneBookABC.set('Caroline', '0455221182');

// a) Create a new phoneBookDEF Map to store names beginning with D, E or F
const phoneBookDEF = new Map()

// b) Initialise the contents of phoneBookDEF by passing in an array of keys/values
phoneBookDEF.set('Daryl', '0400000000');
phoneBookDEF.set('Eunice', '0432151742');
phoneBookDEF.set('Frank', '0455555555');

// c) Update the phone number for Caroline
phoneBookABC.set('Caroline', '0411111111');

// d) Write a function printPhoneBook(contacts) that prints the names and phone numbers in the given Map
function printPhoneBook(contacts) {
  contacts.forEach((contact, name) => console.log(`${name}: ${contact}`))
};

printPhoneBook(phoneBookABC);

// e) Combine the contents of the two individual Maps into a single phoneBook Map
let phoneBook = new Map([...phoneBookABC, ...phoneBookDEF]);

// f) Print out the full list of names in the combined phone book
console.log(phoneBook.keys());

9.
let salaries = {
  "Timothy" : 35000,
  "David" : 25000,
  "Mary" : 55000,
  "Christina" : 75000,
  "James" : 43000
  };

// a) calculates and returns the total of all salaries
function sumSalaries(salaries) {
  return Object.values(salaries).reduce((total, currentSalary) => total + currentSalary, 0)
};

console.log(sumSalaries(salaries)); // 233000

// b) calculates and returns the name of the person earning the highest salary
function topEarner(salaries) {
  let topEarners = []; // array to allow for multiple persons with highest salary
  const largestSalary = Math.max(...Object.values(salaries)); // get largest salary
  for (let person of Object.keys(salaries)) { // iterate through persons
    (salaries[person] === largestSalary) ? topEarners.push(person) : {} // if their salary matches highest salary, push
  };
  return topEarners;
};

console.log(topEarner(salaries)); // ['Christina']

10.
const today = new Date();
console.log('Current time is ' + today.toLocaleTimeString());
console.log(today.getHours() + ' hours have passed so far today');

// a)
console.log((today.getHours() * 60) + today.getMinutes() + ' minutes have passed so far today');

// b)
console.log((today.getHours() * 3600) + (today.getMinutes() * 60) + today.getSeconds()
            + ' seconds have passed so far today');

// c)
const myBirthday = new Date('January 12, 1990 00:00:00')

let years = Math.floor(today.getFullYear() - myBirthday.getFullYear());
let months = (today.getMonth() - myBirthday.getMonth());
let days = (today.getDate() - myBirthday.getDate());

if (today.getDate() < myBirthday.getDate()) {
  years -= 1;
  months -= 1;
  days = 365 - days;
};

console.log(`I am ${years} years, ${months} months and ${days} days old`);

// d)
function daysInBetween(date1, date2) {
  return (Math.floor((date2 - date1) / 86400000)) // 1000ms * 60s * 60min * 24h
}
