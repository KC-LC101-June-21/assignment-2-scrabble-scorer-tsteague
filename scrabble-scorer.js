// inspired by https://exercism.io/tracks/javascript/exercises/etl/solutions/91f99a3cca9548cebe5975d7ebca6a85

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

const vowels = [ "A","E","I", "O", "U"];

const SIMPLE_SCORING = 0;
const VOWEL_SCORING = 1;
const OLD_SCORING = 2;

let word = "default";

function oldScrabbleScorer(word) 
{
  word = word.toUpperCase();
  let letterPoints = "";
 
  for ( let i = 0; i < word.length; i++ ) 
  {
    for ( const pointValue in oldPointStructure ) 
    {
      if ( oldPointStructure[pointValue].includes(word[i])) 
      {
        letterPoints += `Points for '${word[i]}': ${pointValue}\n`
      }
    }
  }
  return letterPoints;
}

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() 
{
  console.log( "Let's play some scrabble!" );

  var wordRegex = /[a-zA-Z\s]+/;
  let newWord = "";

  let isValid = false;
  while ( !isValid )
  {
    newWord = input.question( "Enter a word: " );

    if ( wordRegex.exec(newWord) )
    {
      isValid = true;
    }
  }

  return newWord;
}

let simpleScore = function( word ) {
  let score = 0;

  score = word.length;
  return score;
}


let vowelBonusScore = function ( word ) {
  let score = 0;
  word = word.toUpperCase();

  for ( let character of word )
  {
    if ( vowels.includes(character) )
    {
      score += 3;
    }
    else
    {
      score += 1;
    }
  }
  return score;
}

let scrabbleScore = function( word ) {
  word = word.toUpperCase();
  let letterPoints = "";
  let pointValue = 0;

  let score = 0;
  for ( let letter of word )
  {
    pointValue = newPointStructure[letter];
    score += Number(pointValue);
  }

  return score;
};

const scoringAlgorithms = ( function() {
  let algorithms = [];

  for ( let index = 0; index < 3; index++ )
  {
    if ( index === OLD_SCORING )
    {
      let scoringObject = {
	name: "Scrabble",
        description: "The traditional scoring algorithm.",
        scoringFunction:  scrabbleScore
      };
      algorithms.push( scoringObject );
    }
    else if ( index === SIMPLE_SCORING )
    {
      let scoringObject = {
	name: "Simple Score",
        description: "Each letter is worth 1 point.",
        scoringFunction:  simpleScore
      };
      algorithms.push( scoringObject );
    }
    else if ( index === VOWEL_SCORING )
    {
      let scoringObject = {
	name: "Bonus Vowels",
        description: "Vowels are 3 pts. consonants are 1 pt.",
        scoringFunction:  vowelBonusScore
      };
      algorithms.push( scoringObject );
    }
  }
  return algorithms;
})();

function scorerPrompt() 
{
  let algorithmPrompt = "Which scoring algorithm would you like to use?\n";
  for ( let idx = 0; idx < 3; idx++ )
  {
    algorithmPrompt += `\n${idx} - ${scoringAlgorithms[idx].name} - ${scoringAlgorithms[idx].description}`;
  }
  algorithmPrompt += "\nEnter 0, 1, or 2:  ";

  let userSelection;
  var selectionRegex = /[012]{1}/;

  let isValid = false;
  while ( !isValid )
  {
    userSelection = Number( input.question(algorithmPrompt) );
    if ( selectionRegex.exec(userSelection) )
    {
      isValid = true;
    }
  }

  return userSelection;
}

function transform() {
  let newPointStructureObj = {};
  for ( let pointKey in oldPointStructure )
  {
    for ( let letter of oldPointStructure[pointKey] )
    {
      newPointStructureObj[letter] = pointKey;
    }
  }
  newPointStructureObj[' '] = 0;

  return newPointStructureObj;
};

let newPointStructure = transform( oldPointStructure );

function runProgram() 
{
  let word = initialPrompt();

  let scoreType = scorerPrompt();
   
  let score = scoringAlgorithms[scoreType].scoringFunction( word )
  console.log( `Score for '${word}': ${score}` );
}

runProgram();

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScore: simpleScore,
   vowelBonusScore: vowelBonusScore,
   scrabbleScore: scrabbleScore,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};

