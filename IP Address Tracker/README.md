# Frontend Mentor - IP address tracker solution

This is a solution to the [IP address tracker challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/ip-address-tracker-I8-0yYAH0). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- View the optimal layout for each page depending on their device's screen size
- See hover states for all interactive elements on the page
- See their own IP address on the map on the initial page load
- Search for any IP addresses or domains and see the key information and location

### Screenshot

![Solution Screenshot](content/images/screenshot.png)

### Links

- Solution URL: [Add solution URL here](https://your-solution-url.com)
- Live Site URL: [Add live site URL here](https://your-live-site-url.com)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- Mobile-first workflow
- [Leaftlet JS](https://leafletjs.com/) - JS library for maps
- [Ipify](https://www.ipify.org/) - API for IP Addresses

### What I learned

- Leant how to use Leaflet - an open-source JavaScript library for mobile-friendly interactive maps.
- Got an opportunity to work with IP Addresses using Ipify - A Simple Public IP Address API.

To see how you can add code snippets, see below:

```js
- Important part of Leaflet maps to check if map is already initiated or not. (Helps to refresh map everytime you send requests.) 

if (container != null) {
        container._leaflet_id = null;
}

- Code for custom icon for pinning location in maps.

const icon = L.icon({
        iconUrl: 'content/images/icon-location.svg',
});
```

### Continued development

- Planning before writing a code.
- Focusing one thing at a time following the flow of a structure.
- Skipping the part that you are not aware of and moving onto next part of code.
- Asking for mentors help.

### Useful resources

- [Stackoverflow](https://stackoverflow.com/questions/19186428/refresh-leaflet-map-map-container-is-already-initialized) - This helped me to understand how we can refresh the map everytime you send a request. I really liked this pattern and will use it going forward.

## Author

- Website - [Add your name here](https://www.your-site.com)
- Frontend Mentor - [@rajatsardesai](https://www.frontendmentor.io/profile/rajatsardesai)