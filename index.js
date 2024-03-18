const statusElement = document.getElementById("status");
  

//text label for TheBrain app question and response
const question = document.createElement('label');
question.style.fontWeight = 'bold';
question.innerHTML = "Ask TheBrain anything, then press the top right button to send the question ><br>";
const response = document.createElement('label');
response.style.fontWeight = 'bold';
response.innerHTML = "Press the top right button to ask a new question<br><br>";

//Input box for question entry
const screenWidth = window.innerWidth;
const inputQuestion = document.createElement('textarea');
inputQuestion.type = 'text';
inputQuestion.name = 'ask';
inputQuestion.rows = 5; 
inputQuestion.innerWidth = Math.min(screenWidth, 500)
inputQuestion.style.maxWidth = Math.min(screenWidth, 500)
inputQuestion.style.overflowWrap = 'break-word!important';
inputQuestion.style.flexWrap = 'wrap';
inputQuestion.style.fontSize = '17px'
inputQuestion.maxLength = 500;
inputQuestion.style.borderColor = 'white';
inputQuestion.required = true;

function addQuestion() {

  // Use statusElement as the parent element
  statusElement.innerHTML = '';

  // Append inputs and labels 
  statusElement.appendChild(question);
  statusElement.appendChild(inputQuestion);
  inputQuestion.focus();
}

function addResponse(openAIoutput) {
  statusElement.innerHTML = '';
  statusElement.appendChild(response);
  const brainResponse = document.createElement('label');
  brainResponse.innerHTML = openAIoutput.substring(19).slice(0, -2).replace(/\\n/g, '<br>');

  statusElement.appendChild(brainResponse);
}

// the brain AI function
function AIengine(PROMPT_, callback) {
  const url = "https://..."; //Insert the URL of the AI backend engine as per instructions
  const data = JSON.stringify({ "prompt": PROMPT_ });

  const xhr = new XMLHttpRequest({ mozSystem: true });
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-Type", "application/json");

  xhr.onload = function() {
    if (xhr.status === 200) {
      callback(null, xhr.response);
      document.getElementById("top").textContent = "TheBrain says...";
    } else {
      callback(new Error(`Error: ${xhr.status}`), null);
      document.getElementById("top").textContent = "TheBrain crashed...";
    }
  };

  xhr.onerror = function(error) {
    callback(error, null);
    document.getElementById("top").textContent = "TheBrain crashed...";
    statusElement.innerHTML = 'I am struggling right now, please press to top right button to try again ' + xhr.status ;
  };

  xhr.timeout = 100000; // 70 second timeout
  xhr.ontimeout = function() {
    callback(new Error("Timeout"), null);
    document.getElementById("top").textContent = "TheBrain timed out";
  };

  xhr.send(data);
}

    
var isResponse = false; //app in question state
addQuestion();

document.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "SoftRight":
      if (!isResponse) {
        document.getElementById("top").textContent = "TheBrain is thinking...";
        statusElement.innerHTML = '';
        AIengine(inputQuestion.value, function(error, response) {
          if (error) {
            statusElement.innerHTML += "error" + error;
          } else {
            addResponse(response);
          }
        });

        isResponse = true;
      } else if (isResponse) {
        document.getElementById("top").textContent = "TheBrain by Waj";
        statusElement.innerHTML = '';
        inputQuestion.value = '';
        addQuestion();
        isResponse = false;
      }
      break;
    //ignore other keys
    default:
      return;
    //close event listener function
  }
});