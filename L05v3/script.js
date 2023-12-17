const input = document.querySelector(".userInput");
const output = document.getElementById("output");

let storyOptions = [
  "You're lost in the catacombs in Paris. You've been wandering for hours and now you stop at an intersection. Do you go left or right?",
  "You've chosen left. You walk down the tunnel, and the roof starts collapsing above you. (1. Do you go back or (2. Do you try to run past)? 1 or 2",
  "You've chosen right and enter an open room with creepy dolls hanging from the ceiling (1. Do you go back) or (2. Do you run past)? 1 or 2?"
];

let outcomeMessages = [
  "You chose to go back. Now you are back at the intersection, and you have to choose the other option. left or right",
  "You chose to run past. You finally made it to an exit and are back to safety.",
  "There are NO more options left - GAME OVER -   THANKS FOR PLAYING"
];

let state = 0;

input.addEventListener("keydown", function (event) {
    if (event.key == "Enter") {
        handleInput(input.value.toLowerCase()); // ich weiß nicht ganz wieso lowecase ich hab davor chat gpt gefragt wieso mein code nicht ging und des war anschiend der fehler glaub ich nicht 100% aber es funktioniert jetzt
    }
});

function handleInput(userInput) {
    if (state == 0) {
        if (userInput === "left") {
            output.innerHTML = storyOptions[1];
            state++;
            output.classList.add("shake")
        } else if (userInput === "right") {
            output.innerHTML = storyOptions[2];
            state++;
        } else {
            output.innerHTML = "Invalid answer... Please enter ''left'' or ''right''";
        }
    } else if (state == 1) {
        if (userInput === "1") {
            output.innerHTML = outcomeMessages[0];
            state = 0; 
        } else if (userInput === "2") {
            output.innerHTML = outcomeMessages[1];
            state++;
        } else {
            output.innerHTML = "Invalid answer... Please enter '1' or '2' or learn how to type";
        }
    } else if (state == 2) {
        output.innerHTML = outcomeMessages[2];
    }

}
