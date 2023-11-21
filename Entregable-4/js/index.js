'use strict'
const images = document.querySelectorAll('.image');
    const textContainer = document.getElementById('text-container');

    window.addEventListener('scroll', () => {
      const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;

      images.forEach((image, index) => {
        if (scrollPercentage > index * (100 / images.length)) {
          image.classList.add('visible');
        }
      });

      // Ajusta la posición de las imágenes y el texto
      textContainer.style.transform = `translateY(-${scrollPercentage}%)`;
    });