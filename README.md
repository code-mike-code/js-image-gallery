# JavaScript: Gallery Slider

See the live version of [Gallery Slider]().

About the Project:

This project was completed as part of my learning path with the mentor program at devmentor.pl. The goal was to understand and work within an existing JavaScript codebase, extend functionality using custom events, and follow a predefined coding convention.


## 📸 Project Description
The task was to implement a dynamic image slider that activates when clicking on a gallery image. All HTML and CSS were provided and could not be modified—JavaScript was the only layer open to change.

This project emphasized reading and extending someone else's code—a real-world skill that prepares you for collaborative software development in teams of varying seniority.

## 🔑 Key Functionalities
# Custom Events System
The gallery slider operates based on CustomEvent architecture:

js-slider-img-click: Launches the slider with the clicked image.

js-slider-img-next: Moves to the next thumbnail image.

js-slider-img-prev: Moves to the previous thumbnail.

js-slider-close: Closes the slider when clicking outside the image area.
```
const fireCustomEvent = function(element, name) {
    const event = new CustomEvent(name, { bubbles: true });
    element.dispatchEvent(event);
}
```


![](./assets/img/img1.png)

# Dynamic Gallery Interaction
Clicking an image opens the corresponding group of thumbnails and displays a zoomed-in view.

Navigation is handled via arrow buttons, utilizing the data-slider-group-name attribute to organize images into logical sets.

&nbsp;

## 🧩 Additional Features
# Infinite Looping
If the user reaches the last image, the gallery seamlessly loops back to the first (and vice versa).

&nbsp;

# Auto-Slideshow
The gallery can be enhanced to automatically cycle through images after a specified interval, creating a hands-free slideshow experience.

&nbsp;

## 💡 Technologies
<img src="https://skillicons.dev/icons?i=html,css,javascript" /><br/>

&nbsp;

## 🔗 See also
If you're interested in JavaScript-based UI projects, check out my other project: Excursions Order Panel

&nbsp;

## 💿 Installation
No installation required – open index.html in your browser.

&nbsp;

## 💭 Conclusions for future projects
Custom Events – Great for decoupling and modularizing logic.

Code Comprehension – Working within another developer’s codebase helps build adaptability.

DOM Manipulation – Hands-on experience with addEventListener, event delegation, and dataset attributes.

Event Propagation – Understanding bubbling and controlling event flow is crucial in interactive UIs.

This project offered practical exposure to building scalable JavaScript features in collaboration-driven environments.

&nbsp;

## 🙋‍♂️ Feel free to Reach Out!
Have feedback or questions? Curious about how this project works under the hood? Feel free to open an issue or reach out—I'd love to connect!

&nbsp;

## 👏 Thanks / Special thanks / Credits
Special thanks to devmentor.pl for providing this real-world exercise and mentorship support.

&nbsp;




















