/**
 * =========================================================
 * Unoptimized Script
 * This file contains bulky comments, redundant spaces,
 * and completely unminified JavaScript logic.
 * =========================================================
 */

document.addEventListener("DOMContentLoaded", function () {

    // A simple console log to indicate the script loaded
    console.log("Unoptimized JavaScript file loaded successfully.");

    /**
     * Let's add an unnecessary loop just to consume some CPU time 
     * and show how bad code affects performance.
     */
    let dummyCounter = 0;
    for (let i = 0; i < 100000; i++) {
        dummyCounter += i;
    }
    console.log("Dummy computation finished. Result: " + dummyCounter);

    // Let's attach some basic interactions to the cards
    const cards = document.querySelectorAll('.card');

    // Adding event listeners to all cards in an unoptimized way
    for (let i = 0; i < cards.length; i++) {
        cards[i].addEventListener('click', function (event) {

            // Toggle a class on click
            if (this.classList.contains('active')) {
                this.classList.remove('active');
            } else {
                this.classList.add('active');
            }

            console.log('Card clicked: ', this.querySelector('h2').innerText);
        });
    }

    // Unnecessary variables and functions for bloat
    const unnecessaryVariable1 = "This is a long string that is never used";
    const unnecessaryVariable2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    function unnecessaryFunction() {
        return unnecessaryVariable1 + unnecessaryVariable2.join(", ");
    }

});
