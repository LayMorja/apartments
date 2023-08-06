import SimpleParallax from 'simple-parallax-js';

const parallaxImages = document.querySelectorAll('.parallax-image');
new SimpleParallax(parallaxImages, {
  scale: 1.5,
  delay: 0.6,
});
