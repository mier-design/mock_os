"use strict";var headers=document.querySelectorAll(".testimonials__page__group--testimonial h3"),divImages=document.querySelectorAll(".testimonials__page__group--testimonial--image"),images=document.querySelectorAll(".testimonials__page__group--testimonial--image img"),testimonial=document.querySelectorAll(".testimonials__page__group--testimonial"),text=document.querySelectorAll(".testimonials__page__group--testimonial p");document.addEventListener("mouseover",function(e){if("h3"==e.target.tagName.toLowerCase())for(var t=0;t<headers.length;t++)headers[t].style.animationPlayState="paused",divImages[t].style.animationPlayState="paused",images[t].style.animationPlayState="paused",testimonial[t].style.animationPlayState="paused",text[t].style.animationPlayState="paused";else for(var a=0;a<headers.length;a++)headers[a].style.animationPlayState="running",divImages[a].style.animationPlayState="running",images[a].style.animationPlayState="running",testimonial[a].style.animationPlayState="running",text[a].style.animationPlayState="running"});