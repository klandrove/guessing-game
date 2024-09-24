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

// Set slide index variable and show first slide
let slideIndex = 1;
showSlides(slideIndex);

// Define check function
function check(event) {

    // Find clicked button
    let button = event.target;

    // Get class name of button
    let name = button.className;

    // check if restart button
    if(name.includes("restart")){

        // call restart function
        restart(event);

    } else {
        // Find current question
        let question = button.parentElement;
        // Select first HTML element with class of score
       
        // Find feedback text
        let feedback_text = feedback[slideIndex-1].querySelector('.is_correct');

        // Check if button is correct
        if (name.includes("correct")) {
            
            // change color of dot to green
            dots[slideIndex-1].style.backgroundColor = "green";

            // update and display feedback text
            feedback_text.textContent = "Correct! ";
            feedback[slideIndex-1].style.display = "block";

            // Change button border color and button size
            button.style.borderColor = "green";
            button.style.scale = "1.1";
            button.style.borderWidth = '4px';
            
            // Update score
            score++;
            
            // Display score on page
            scoreElement.textContent = score;
        } else {
            // If answer is wrong

            //change color of dot to red
            dots[slideIndex-1].style.backgroundColor = "red";

            // update and display feedback text
            feedback_text.textContent = "Incorrect! ";
            feedback[slideIndex-1].style.display = "block";

            // Change button border color and button size
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

    // Check if button is enabled and not restart button
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
    } else if (button.className.includes("restart")){
        // style restart button
        button.style.background = 'black';
    }
}

function unhover(event){
    // find unhovered button
    let button = event.target;

    // check if button enabled and not restart button
    if (!button.disabled && !button.className.includes("restart")){
        // Change the button's border color
        button.style.borderColor = 'black';
        button.style.borderWidth = '2px';
        button.style.padding = "10px";
    } else if (button.className.includes("restart")){
        // style restart button
        button.style.background = 'darkblue';
    }
}

// restarts quiz
function restart(event){
    // reset slide index and show first slide
    slideIndex = 1;
    showSlides(slideIndex);

    // Find clicked button
    let button = event.target;

    //Get class name of button
    let name = button.className;

    // Check if button is restart button
    if(name.includes("restart")){

        // Find all button elements
        let questionButtons = document.querySelectorAll("button");

        // Loop through all buttons
        for (let button of questionButtons) {
            // Check if button is not restart button
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

        // Loop through all dots
        for (let dot of dots){
            // reset dot style
            dot.style.backgroundColor = "";
         }

         // loop through all feedback
        for (fb of feedback){
            // hide feedback
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
    // Run hover function when it's hovered
    button.addEventListener('mouseover', hover);
    // Run unhover function when it's not hovered
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
    // used in for loop
    let i;
    // get all questions
    let slides = document.getElementsByClassName("question");

    // get back arrow
    let prevButton = document.getElementById('previous');

    //get next arrow
    let nextButton = document.getElementById('next');

    // hide all slides
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    // checks if slide is last and hides next arrow
    if (n == slides.length){
        nextButton.disabled = true;
        nextButton.hidden = true;
        prevButton.disabled = false;
        prevButton.hidden = false;
    } else if (n == 1){
        // checks if slide is first and hides back arrow
        prevButton.disabled = true;
        prevButton.hidden = true;
        nextButton.disabled = false;
        nextButton.hidden = false;
    } else {
        // enables both arrows
        prevButton.disabled = false;
        nextButton.disabled = false;
        prevButton.hidden = false;
        nextButton.hidden = false;
    }
    // makes all dots inactive
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    // makes slide active
    slides[slideIndex-1].style.display = "block";

    // makes corresponding dot active
    dots[slideIndex-1].className += " active";
    
}