const LINE_COUNT = 6;
const CHAR_COUNT = 5;
const unclewords = document.getElementById("words");

for (let i = 0; i < LINE_COUNT; i++) {
  const wordDiv = document.createElement("div");
  wordDiv.className = "word";

  for (let j = 0; j < CHAR_COUNT; j++) {
    const charDiv = document.createElement("div");
    charDiv.className = "char";
    wordDiv.appendChild(charDiv);
  }
  unclewords.appendChild(wordDiv);
}

let currentchar =0
let currentword= 0
document.addEventListener("keydown",async (event) => { 
  const firstword = unclewords.children[currentword];

  if (event.code == "Enter") {
    if (currentchar ==CHAR_COUNT) {   
      const answer = getCurrentWord();
      const result= await guess(answer);
    colorize (result);
    currentword++;
     currentchar =0;
    }
    
  }
   else if(event.code == "Backspace") {
    if(currentchar >0) {
       currentchar--;
    firstword.children[currentchar].innerHTML = ""
    }
   }
   else if (currentchar < CHAR_COUNT) {
   
    firstword.children[currentchar].innerHTML = event.key;
    currentchar++
 }
 else {
  alert("stop")
 }
});

async function guess(word) {
  const request = await fetch ("/guess/" + word);
  const result = await request.json();
  return result
}
function getCurrentWord() {
  var word = "";
  var wordDiv = document.getElementById("words").children[currentword];
  for (var i = 0; i < wordDiv.children.length; i++) {
    word = word + wordDiv.children[i].innerHTML;
  }
  return word;
}

function colorize(results) {
  const wordDiv =
    document.getElementById("words").children[currentword].children;
  for (let i = 0; i < results.length; i++) {
    if (results[i] == 1) {
      wordDiv[i].style.backgroundColor = "rgb(86, 171, 82)";
    } else if (results[i] == 0) {
      wordDiv[i].style.backgroundColor = "rgb(255, 240, 102)";
    } else {
      wordDiv[i].style.backgroundColor = "rgb(89, 94, 94)";
    }
  }
}