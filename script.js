// Array of special characters to be included in password
var specialCharacters = [
  '@',
  '%',
  '+',
  '\\',
  '/',
  "'",
  '!',
  '#',
  '$',
  '^',
  '?',
  ':',
  ',',
  ')',
  '(',
  '}',
  '{',
  ']',
  '[',
  '~',
  '-',
  '_',
  '.'
];

// Array of numeric characters to be included in password
var numericCharacters = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

// Array of lowercase characters to be included in password
var lowerCasedCharacters = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z'
];

// Array of uppercase characters to be included in password
var upperCasedCharacters = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z'
];


// Function to prompt user for password options
function getPasswordOptions() {
  //get input for number of character
  var passwordLength = prompt("How many characters would you like in your password? (8-128)");    
  //check if input is a number
  var isNumber = false;
  while (!isNumber){
    if(!isNaN(passwordLength)){
      console.log(isNaN(passwordLength))
      isNumber = true;
    }else{
    passwordLength = prompt("That's not a number, Please input a number between 8 and 128.");
    }
  }    

  //check if the number is outside of range 8-128
  var error = true;
  while (error) {
    if (passwordLength < 8 || passwordLength > 128) {       
      alert("Please input a number between 8 and 128.");
      passwordLength = prompt("How many characters would you like in your password? (8-128)");
    } else {
      error = false;
      var charType = [{                     //create object to include name, char array and include tag
        type: "special",
        character: specialCharacters,
        incl_char_type: false
      },
      {
        type: "numeric",
        character: numericCharacters,
        incl_char_type: false
      },
      {
        type: "lowercase",
        character: lowerCasedCharacters,
        incl_char_type: false
      },
      {
        type: "uppercase",
        character: upperCasedCharacters,
        incl_char_type: false
      }];
      var charCheck = false;                //check that the pw option include at least one type of character
      while (!charCheck) {
        for (let i = 0; i < charType.length; i++) { // asks the questions
          charType[i].incl_char_type = confirm("Would you like your password to include " + charType[i].type + " character?");
        };
        for (let i = 0; i < charType.length; i++) { // checks if any say yes
          if (charType[i].incl_char_type === true) {
            charCheck = true;
          }
        };
        if (!charCheck) {
          alert("Please select at least one type of character.");
        }
      }
    }
  }
  return {
    passwordLength,
    charType,
  };
}

// Function for getting a random element from an array
function getRandom(arr) {
  var randomIndex = Math.floor(Math.random()*arr.length);   //generate the randox index based on length
  var randoms = arr[randomIndex];   //get the character from array index
  return randoms;
}

// Function to generate password with user input
function generatePassword() {
  var pwOption = getPasswordOptions()       //run func to get pw option type and length
  var guaranteeChar = [];
  var includedChar = [];
  var finalpw = [];
  

  for (var i = 0;i<pwOption.charType.length;i++){
    if (pwOption.charType[i].incl_char_type){
      includedChar=includedChar.concat(pwOption.charType[i].character)
      guaranteeChar.push(getRandom(pwOption.charType[i].character))
    } 
  }
 
  finalpw = guaranteeChar;      //set the guarantee characters at the beginning of the pw

  //fill the rest of pw length with random char selected from included types 
  for (var i=guaranteeChar.length;i<pwOption.passwordLength; i++){
    finalpw.push(getRandom(includedChar))
  }
  return finalpw.join('');      //convert array to string and return value
}

// Get references to the #generate element
var generateBtn = document.querySelector('#generate');

// Write password to the #password input
function writePassword() {
  
  var password = generatePassword();
  var passwordText = document.querySelector('#password');

  passwordText.value = password;
}

// Add event listener to generate button
generateBtn.addEventListener('click', writePassword);


