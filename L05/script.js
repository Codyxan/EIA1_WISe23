let storyArray = [ "Last night your car got snowed in and you're late to class. Do you listen to the devil on your left sholder and go home or to the little angel on your right shoulder and shovel out your car? LEFT OR RIGHT? DEVIL OR ANGEL? DECIDE NOW!",
  "Great! you decided to go home ;) but now will your conscience let you go back and just do nothing so you sit at your desk and do school work || click ok to continue ||",
  "Nerd! So you decided to try to free your car good for you but now you wasted your time ... so now you will walk to school || click ok to continue||",
  "Sike you thought we were going to be productive we are going back to bed"
]
let start = prompt (storyArray [0])

if (start == "left" || start == "l" || start == "devil"){
  console.log (storyArray[1]) ;
  let nextDecision = prompt (storyArray [1]);
    let ending = prompt (storyArray [3]);
}
else if (start == "right"|| start == "r" || start == "angel") {
    console.log (storyArray[2]) ;
    let rDecision = prompt (storyArray [2]);
     let ending = prompt (storyArray[3]);
}
// des muss man nicht bewerten des war zum großteil chatgpt ich wollte des nur drin haben 
document.addEventListener('DOMContentLoaded', function () {
    const numberOfSnowflakes = 50;

    for (let i = 0; i < numberOfSnowflakes; i++) {
        createSnowflake();
    }

    function createSnowflake() {
        const snowflake = document.createElement('div');
        snowflake.className = 'snowflake';
        snowflake.style.left = `${Math.random() * 100}vw`;
        snowflake.style.animationDuration = `${Math.random() * 5 + 4}s`;
        document.body.appendChild(snowflake);
    }
});
