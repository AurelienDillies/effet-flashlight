"use strict";

const flashlight = document.querySelector('.flashlight');
const paragraphs = document.querySelectorAll('p');
const size = 200;
let isLightOn = false;

document.addEventListener('click', (e) => {
    isLightOn = !isLightOn;
    flashlight.style.display = isLightOn ? 'block' : 'none';

    if (isLightOn) {
        paragraphs.forEach(p => moveLight.bind(p)(e));
        document.dispatchEvent(new MouseEvent("mousemove", e));
    } else {
        paragraphs.forEach(p => turnOffLight.bind(p)());
    }
});

document.addEventListener('mousemove', (e) => {
    if (isLightOn) {
        flashlight.style.left = `${e.clientX}px`;
        flashlight.style.top = `${e.clientY}px`;
    }
});

paragraphs.forEach(p => {
    p.addEventListener("mouseenter", turnOnLight);
    p.addEventListener("mousemove", moveLight);
    p.addEventListener("mouseleave", turnOffLight);
});

function moveLight(e) {
    if (isLightOn) {
        const { left, top } = this.getBoundingClientRect();
        const x = e.clientX - left - size / 2;
        const y = e.clientY - top - size / 2;
        this.style.backgroundPosition = `${x}px ${y}px`;
    }
}

function turnOnLight() {
    if (isLightOn) {
        this.style.backgroundSize = `${size}px ${size}px`;
    }
}

function turnOffLight() {
    this.style.backgroundPosition = '';
}
