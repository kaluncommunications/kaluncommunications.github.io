"use strict"; 
var slider_delay = 5.5; //seconds to pause before beginning to animate to next image
var slider_fade = 1.5; //seconds to animate

/**********************/
/* Home page - slider */
/**********************/
//resize imagess to fit inside of the slider -> min dimension
function updateSliderSizes(){ 
    var slider = document.getElementById("homecontent-slider");
    if (!slider){ return; }
    var imgs = document.getElementsByClassName("slider-picture");
    var slider_dims = slider.getBoundingClientRect();
    for (var i=0; i<imgs.length; i++){
        while (!imgs[i].complete){ //wait for image to complete loading
            setTimeout(updateSliderSizes, 200);
            return;
        }
        var img_dims = imgs[i].getBoundingClientRect();
        if ((slider_dims.width/slider_dims.height) > (img_dims.width/img_dims.height)){ //width of slider is bigger than picture, set picture slider width to slider width
            imgs[i].style.height = (img_dims.height*(slider_dims.width/img_dims.width))+"px";
            imgs[i].style.width = slider_dims.width+"px";
        } else {
            imgs[i].style.width = (img_dims.width*(slider_dims.height/img_dims.height))+"px";
            imgs[i].style.height = slider_dims.height+"px";
        }
        imgs[i].style.maxHeight = "500%"; //set to very large
        imgs[i].style.maxWidth = "500%";
    }
}
//set up to animate the slider, start animation loop
function sliderSetup(){
    var imgs = document.getElementsByClassName("slider-picture");
    if (imgs.length <= 1){ return; }
    for (var i=1; i<imgs.length; i++){
        imgs[i].style.opacity = 0;
    }
    var first_img = imgs[0];
    setTimeout(animateSlider.bind(null,first_img),(slider_delay-slider_fade)*1000);
}
//animate the slider, loop between images... find next image then animate the two
function animateSlider(img){
    var slider = document.getElementById("homecontent-slider");
    if (!slider){ return; }
    if (slider.dataset.play != 0){
        var next_img = img.nextSibling;
        while (next_img !== null && next_img.tagName !== "IMG"){
            next_img = next_img.nextSibling;
        }
        if (next_img===null || next_img.tagName !== "IMG"){ 
            next_img = img.parentNode.firstChild;
            while (next_img !== null && next_img.tagName !== "IMG"){
                next_img = next_img.nextSibling;
            }
        }
        img.style.animation = "fadeout "+slider_fade+"s linear 0s 1 normal forwards";
        next_img.style.animation = "fadein "+slider_fade+"s linear 0s 1 normal forwards";
    } else { 
        var next_img = img; 
    }
    setTimeout(animateSlider.bind(null,next_img),slider_delay*1000);
}
//toggle pause button on press
function playButtonPress(){
    var slider = document.getElementById("homecontent-slider");
    var slider_button = document.getElementById("slider-playbutton");
    if (!slider || !slider_button){ return; }
    if (slider.dataset.play != 0){
        slider.dataset.play = 0;
        slider_button.className = "play-button";
    } else {
        slider.dataset.play = 1;
        slider_button.className = "pause-button";
    }
}
//show play button
function showPlayButton(){
    var slider_button = document.getElementById("slider-playbutton");
    if (!slider_button){ return; }
    slider_button.style.display = "block";
}
//show play button
function hidePlayButton(){
    var slider_button = document.getElementById("slider-playbutton");
    if (!slider_button){ return; }
    slider_button.style.display = "none";
}

/*******************/
/* Attach Handlers */
/*******************/
//attach all
function attachHandlers() {
    var slider = document.getElementById("homecontent-slider");
    if (slider){ 
        slider.onmouseover = showPlayButton;
        slider.onmouseout = hidePlayButton;
    }
    var slider_button = document.getElementById("slider-playbutton");
    if (slider_button){ 
        slider_button.onclick = playButtonPress;
    }
    window.onresize = updateSliderSizes;
}

/*******************************/
/* window listeners & start... */
/*******************************/
//attach handlers when page loaded gogogo
window.addEventListener('DOMContentLoaded',function (){
    attachHandlers();
    //set up page
    updateSliderSizes();
    sliderSetup();
});
