export const Options = {
  SmoothScroll: {
    speed: 900,
    speedAsDuration: true,
    updateURL: false,
  },
  Modal: {
    linkAttributeName: false,
    catchFocus: true,
    closeOnEsc: true,
    backscroll: true,
  },
  Mask: {
    countryCode: '+971',
    bodyMask: ' ___ ___ ____',
  },
  ValidationErrors: {
    errorFieldCssClass: 'is-invalid',
    errorLabelCssClass: 'is-error-label',
    errorLabelStyle: {
      color: 'var(--error)',
      fontSize: '10px',
    },
  },
  Observer: {
    Header: {
      rootMargin: '300px',
      threshold: 1
    },
    ScrollTop: {
      rootMargin: '600px',
      threshold: 1,
    },
  },
  Requests: {
    HandlerURL: 'https://jsonplaceholder.typicode.com/posts',
  },
  Swiper: {
    Services: {
      slidesPerView: 1,
      spaceBetween: 30,
      watchSlidesProgress: true,
      loop: true,
      lazy: true,
      navigation: {
        prevEl: '.services__slider-controls [data-to-slide="prev"]',
        nextEl: '.services__slider-controls [data-to-slide="next"]',
      },
      pagination: {
        el: '.services__slider-pagination',
        clickable: true,
      },
      breakpoints: {
        768: {
          slidesPerView: 2,
        },
      },
    },
    Service: {
      slidesPerView: 1,
      spaceBetween: 30,
      watchSlidesProgress: true,
      lazy: true,
      pagination: {
        el: '.service-result__pagination',
        clickable: false,
      },
      breakpoints: {
        768: {
          slidesPerView: 2,
        },
      },
    },
    Projects: {
      slidesPerView: 1,
      spaceBetween: 30,
      watchSlidesProgress: true,
      lazy: true,
      pagination: {
        el: '.projects__pagination',
        clickable: false,
      },
      breakpoints: {
        768: {
          slidesPerView: 2,
        },
        1200: {
          slidesPerView: 3,
        },
        1600: {
          slidesPerView: 4,
        },
      },
    },
    Blog: {
      slidesPerView: 1,
      spaceBetween: 30,
      watchSlidesProgress: true,
      lazy: true,
      pagination: {
        el: '.blog__pagination',
        clickable: false,
      },
      breakpoints: {
        768: {
          slidesPerView: 2,
        },
        1200: {
          slidesPerView: 3,
        },
        1600: {
          slidesPerView: 4,
        },
      },
    },
  }
};
