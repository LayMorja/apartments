import SimpleParallax from 'simple-parallax-js';

const parallaxImages = document.querySelectorAll('.parallax-image');
new SimpleParallax(parallaxImages, {
  delay: 0.6,
  scale: 1.3,
});
