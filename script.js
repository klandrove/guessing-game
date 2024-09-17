// Select all <button> elements on my page
let buttons = document.querySelectorAll('button');

// Select first HTML element with class of score
let scoreElement = document.querySelector('.score');

// Keep track of score
let score = 0;

// Define check function
function check(event) {

    // Find clicked button
    let button = event.target;

    //Get class name of button
    let name = button.className;

    if(name.includes("restart")){
        // Find all button elements inside current question
        let questionButtons = document.querySelectorAll("button");

        // Enable all buttons
        for (let button of questionButtons) {
            // Enable each button
            if(!button.className.includes("restart")){
                button.disabled = false;
                button.style.background = "white";
                button.style.borderColor = 'black';
                button.style.borderWidth = '2px';
                button.style.padding = "20px";
                button.style.color = "black";
            }
        }

        // Reset score
        score = 0;
        
        // Display score on page
        scoreElement.textContent = score;
        return;
    } else {
    
        // Find current question
        let question = button.parentElement;

        if (name.includes("correct")) {
            // If answer is correct
            button.style.background = "green";

            // Update score
            score++;
            
            // Display score on page
            scoreElement.textContent = score;
        } else {
            // If answer is wrong
            button.style.background = "red";
        }

        // Find all button elements inside current question
        let questionButtons = question.querySelectorAll("button");

        // Disable other buttons
        for (let button of questionButtons) {
            // Disable each button
            button.disabled = true;
            button.style.borderColor = "black";
            button.style.borderWidth = '2px';
            button.style.padding = "20px";
            button.style.color = "dimgray";
        }
    }
    
}

function hover(event) {
    // Find hovered button
    let button = event.target;

    // Check if button is enabled
    if (!button.disabled && !button.className.includes("restart")){
        //Checks if question is dark blue or red
        if (button.className.includes("dark_blue")){
            buttonColor = "darkblue";
        } else if (button.className.includes("red")){
            buttonColor = "red";
        } else{
            // Set buttonColor to the text in the button
            buttonColor = button.textContent;       
        }
        // Change the button's border color
        button.style.borderStyle = 'solid';
        button.style.borderColor = buttonColor;
        button.style.borderWidth = '4px';
        button.style.padding = "17px";
    } else if (button.className.includes("restart")){
        button.style.background = 'black';
    }
}

function unhover(event){
    let button = event.target;
    if (!button.disabled && !button.className.includes("restart")){
        // Change the button's border color
        button.style.borderColor = 'black';
        button.style.borderWidth = '2px';
        button.style.padding = "20px";
    } else if (button.className.includes("restart")){
        button.style.background = 'darkblue';
    }
}

// For each button on my list
for (let button of buttons) {
    // Run check function when it's clicked
    button.onclick = check;
    button.addEventListener('mouseover', hover);
    button.addEventListener('mouseout', unhover);
}