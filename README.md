# excelsus-parallax
A highly performant parallax effect that uses a canvas, instead of the HTML DOM/CSS to render the effect. Implements mobile static fallback and a secondary curtain effect, uses **requestAnimationFrame**.

It was written for a small project so it's a bit incomplete for every use case, but I'm hoping to see it extended in the future, for example, right now it's full width, so it takes window size into consideration when mounting and resizing, that be changed to be dynamic later.

Has a fallback for mobile devices or smaller screens (check the scss file!).

## Requirements

jQuery (will possibly be implemented as a plugin in the future)

## Usage

Right now it's not a jQuery plugin, so it initializes on page load, installs itself on DOM elements and stays loaded, might be extended later.

```
    <div class="parallax" 
         data-speed="0.2" 
         data-aspect-ratio="16/9"
         data-base="/images/hero_base.jpg" 
         data-overlay="/images/hero_overlay.jpg" 
         data-mobile="/images/hero_mobile.jpg"
    ></div>
```
or
     
```
    <div class="parallax" 
         data-speed="0.2" 
         data-height="30%"
         data-base="/images/hero_base.jpg" 
         data-overlay="/images/hero_overlay.jpg" 
    ></div>
```
or
  
```
    <div class="parallax" 
         data-speed="0.2" 
         data-height="500px"
         data-base="/images/hero_base.jpg" 
    ></div>
```

+ **data-speed** - parallax scroll speed
+ **data-aspect-ratio** - you can specify the parallax weight as an aspect ratio where the window width is the parallax width
+ alternatively you can use **data-height** to specify the height of your parallax in pixels or percentage (based on window height) by using adding **px** or **%** to the end of your height (data-height="300px" or data-height="50%")
+ **data-base** - the image to parallax
+ **data-overlay** - the "curtain" image, works best if a variation of the base image. This is an optional attribute, if missing, you will have a simple parallax.
+ **data-mobile** - the fallback or mobile image that will replace the parallax on smaller devices

## Adding Content to Parallax

Since the parallax is a simple div with the fallback image and the canvas inside, set to relative by the (s)css file, you can simply wrap it around your content and position it absolutely inside the parallax.

## Future
This parallax implementation is free to use and will stay free forever, however I'm hoping to see new contributors who would take it to the next level.

If you use it in a project, I'd love to see your work.

-- Enjoy