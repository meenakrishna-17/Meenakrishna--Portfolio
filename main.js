'use strict';

//Opening or closing side bar

const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }

const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

sidebarBtn.addEventListener("click", function() {elementToggleFunc(sidebar); })

//Activating Modal-testimonial

const testimonialsItem = document.querySelectorAll('[data-testimonials-item]');
const modalContainer = document.querySelector('[data-modal-container]');
const modalCloseBtn = document.querySelector('[data-modal-close-btn]');
const overlay = document.querySelector('[data-overlay]');

const modalImg = document.querySelector('[data-modal-img]');
const modalTitle = document.querySelector('[data-modal-title]');
const modalText = document.querySelector('[data-modal-text]');

const testimonialsModalFunc = function () {
    modalContainer.classList.toggle('active');
    overlay.classList.toggle('active');
}

for (let i = 0; i < testimonialsItem.length; i++) {
    testimonialsItem[i].addEventListener('click', function () {
        modalImg.src = this.querySelector('[data-testimonials-avatar]').src;
        modalImg.alt = this.querySelector('[data-testimonials-avatar]').alt;
        modalTitle.innerHTML = this.querySelector('[data-testimonials-title]').innerHTML;
        modalText.innerHTML = this.querySelector('[data-testimonials-text]').innerHTML;

        testimonialsModalFunc();
    })
}

//Activating close button in modal-testimonial

modalCloseBtn.addEventListener('click', testimonialsModalFunc);
overlay.addEventListener('click', testimonialsModalFunc);

//Activating Filter Select and filtering options

const select = document.querySelector('[data-select]');
const selectItems = document.querySelectorAll('[data-select-item]');
const selectValue = document.querySelector('[data-select-value]');
const filterBtn = document.querySelectorAll('[data-filter-btn]');

select.addEventListener('click', function () {elementToggleFunc(this); });

for(let i = 0; i < selectItems.length; i++) {
    selectItems[i].addEventListener('click', function() {

        let selectedValue = this.innerText.toLowerCase();
        selectValue.innerText = this.innerText;
        elementToggleFunc(select);
        filterFunc(selectedValue);

    });
}

const filterItems = document.querySelectorAll('[data-filter-item]');

const filterFunc = function (selectedValue) {
    for(let i = 0; i < filterItems.length; i++) {
        if(selectedValue == "all") {
            filterItems[i].classList.add('active');
        } else if (selectedValue == filterItems[i].dataset.category) {
            filterItems[i].classList.add('active');
        } else {
            filterItems[i].classList.remove('active');
        }
    }
}

//Enabling filter button for larger screens 

let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {
    
    filterBtn[i].addEventListener('click', function() {

        let selectedValue = this.innerText.toLowerCase();
        selectValue.innerText = this.innerText;
        filterFunc(selectedValue);

        lastClickedBtn.classList.remove('active');
        this.classList.add('active');
        lastClickedBtn = this;

    })
}

// Enabling Contact Form

const form = document.querySelector('[data-form]');
const formInputs = document.querySelectorAll('[data-form-input]');
const formBtn = document.querySelector('[data-form-btn]');

for(let i = 0; i < formInputs.length; i++) {
    formInputs[i].addEventListener('input', function () {
        if(form.checkValidity()) {
            formBtn.removeAttribute('disabled');
        } else { 
            formBtn.setAttribute('disabled', '');
        }
    })
}

// Enabling Page Navigation 


  const contactForm = document.getElementById("contact-form");
  const popup = document.getElementById("popup-message");

  contactForm.addEventListener("submit", async function (e) {
    e.preventDefault(); 

    const formData = new FormData(contactForm);

    try {
      const response = await fetch(contactForm.action, {
        method: contactForm.method,
        body: formData
      });

      if (response.ok) {
        popup.style.display = "block";              
        contactForm.reset();                      
        setTimeout(() => {
          popup.style.display = "none";             
        }, 3000);
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      alert("Failed to send message. Please check your connection.");
    }
  });

const navigationLinks = document.querySelectorAll('[data-nav-link]');
const pages = document.querySelectorAll('[data-page]');

for(let i = 0; i < navigationLinks.length; i++) {
    navigationLinks[i].addEventListener('click', function() {
        
        for(let i = 0; i < pages.length; i++) {
            if(this.innerHTML.toLowerCase() == pages[i].dataset.page) {
                pages[i].classList.add('active');
                navigationLinks[i].classList.add('active');
                window.scrollTo(0, 0);
            } else {
                pages[i].classList.remove('active');
                navigationLinks[i]. classList.remove('active');
            }
        }
    });
}

const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');

  document.querySelectorAll('.lightbox').forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const imgSrc = this.href;
      lightboxImg.src = imgSrc;
      lightbox.style.display = 'flex';
    });
  });

  lightbox.addEventListener('click', () => {
    lightbox.style.display = 'none';
  });

document.querySelectorAll('.carousel').forEach(setupCarousel);

function setupCarousel(container) {
  const frames = container.querySelectorAll('.carousel-frame');
  if (frames.length < 2) return;

  let index = 0;
  const delay = parseInt(container.dataset.interval, 10) || 2000;

  setInterval(() => {
    frames[index].classList.remove('active');
    index = (index + 1) % frames.length;
    frames[index].classList.add('active');
  }, delay);
}

document.querySelectorAll('.cert-link').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const item = link.closest('.testimonials-item');
    const images = JSON.parse(item.dataset.images);
    const popupContent = document.getElementById('popup-content');
    popupContent.innerHTML = '';
    images.forEach(src => {
      const img = document.createElement('img');
      img.src = src;
      popupContent.appendChild(img);
    });
    document.getElementById('popup-overlay').style.display = 'flex';
  });
});

document.getElementById('popup-close').addEventListener('click', () => {
  document.getElementById('popup-overlay').style.display = 'none';
});

document.querySelectorAll('.project-item').forEach(item => {
  item.addEventListener('click', () => {
    const images = JSON.parse(item.dataset.gallery);
    const thumbs = document.getElementById('portfolio-thumbnails');
    const preview = document.getElementById('portfolio-preview');
    thumbs.innerHTML = '';
    preview.innerHTML = '';

    images.forEach((src, i) => {
      const thumb = document.createElement('img');
      thumb.src = src;
      if (i === 0) {
        preview.innerHTML = '<img src="' + src + '">';
      }
      thumb.onclick = () => {
        preview.innerHTML = '<img src="' + src + '">';
      };
      thumbs.appendChild(thumb);
    });

    document.getElementById('portfolio-popup').style.display = 'flex';
  });
});

document.getElementById('portfolio-popup-close').addEventListener('click', () => {
  document.getElementById('portfolio-popup').style.display = 'none';
});

