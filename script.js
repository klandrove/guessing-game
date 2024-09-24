// Select all <button> elements on my page
let buttons = document.querySelectorAll('button');

// Select first HTML element with class of score
let scoreElement = document.querySelector('.score');

// Get dots
let dots = document.getElementsByClassName("dot");

// Get all feedbacks
let feedback = document.getElementsByClassName('feedback');

// Keep track of score
let score = 0;

let slideIndex = 1;
showSlides(slideIndex);

// Define check function
function check(event) {

    // Find clicked button
    let button = event.target;

    // Get class name of button
    let name = button.className;


    if(name.includes("restart")){

        restart(event);

    } else {
        // Find current question
        let question = button.parentElement;
        // Select first HTML element with class of score
       
        let feedback_text = feedback[slideIndex-1].querySelector('.is_correct');

        if (name.includes("correct")) {
            
            dots[slideIndex-1].style.backgroundColor = "green";

            feedback_text.textContent = "Correct! ";
            feedback[slideIndex-1].style.display = "block";

            button.style.borderColor = "green";
            button.style.scale = "1.1";
            button.style.borderWidth = '4px';
            
            // Update score
            score++;
            
            // Display score on page
            scoreElement.textContent = score;
        } else {
            // If answer is wrong
            dots[slideIndex-1].style.backgroundColor = "red";
            feedback_text.textContent = "Incorrect! ";
            feedback[slideIndex-1].style.display = "block";

            button.style.borderColor = "red";
            button.style.scale = "1.1";
            button.style.borderWidth = '4px';
        }

        // Find all button elements inside current question
        let questionButtons = question.querySelectorAll("button");

        // Disable other buttons
        for (let button of questionButtons) {
            // Disable each button
            button.disabled = true;
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
        //button.style.padding = "10px";
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
        button.style.padding = "10px";
    } else if (button.className.includes("restart")){
        button.style.background = 'darkblue';
    }
}

function restart(event){
    slideIndex = 1;
    showSlides(slideIndex);

    // Find clicked button
    let button = event.target;

    //Get class name of button
    let name = button.className;

    if(name.includes("restart")){
        // Find all button elements inside current question
        let questionButtons = document.querySelectorAll("button");
        let responses = document.querySelectorAll(".response");

        // Loop through all buttons
        for (let button of questionButtons) {
            if(!button.className.includes("restart")){
                // Enable each button
                button.disabled = false;
                // Reset button styles
                button.style.background = "white";
                button.style.borderColor = 'black';
                button.style.borderWidth = '2px';
                button.style.padding = "10px";
                button.style.color = "black";
                button.style.scale = "1";
            }
        }

        for (let response of responses){
            response.remove();
        }

        // Loop through all dots
        for (let dot of dots){
            dot.style.backgroundColor = "";
            console.log(dot.style.backgroundColor);
         }

        for (fb of feedback){
            fb.style.display = "none";
        }
        // Reset score
        score = 0;
        
        // Display score on page
        scoreElement.textContent = score;
        return;
    }
    
}

// For each button on my list
for (let button of buttons) {
    // Run check function when it's clicked
    button.onclick = check;
    button.addEventListener('mouseover', hover);
    button.addEventListener('mouseout', unhover);
}



// Next/previous controls
function plusSlides(n) {
    showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("question");
    let prevButton = document.getElementById('previous');
    let nextButton = document.getElementById('next');
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    if (n == slides.length){
        nextButton.disabled = true;
        nextButton.hidden = true;
        prevButton.disabled = false;
        prevButton.hidden = false;
    } else if (n == 1){
        prevButton.disabled = true;
        prevButton.hidden = true;
        nextButton.disabled = false;
        nextButton.hidden = false;
    } else {
        prevButton.disabled = false;
        nextButton.disabled = false;
        prevButton.hidden = false;
        nextButton.hidden = false;
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    dots[slideIndex-1].className += " active";
    slides[slideIndex-1].style.display = "block";
}