const initProjectsGallery = () => {
  const galleryList = document.querySelectorAll( '.service-gallery' );
  galleryList.forEach( ( gallery ) => {
    const currentID = gallery.dataset.id;
    new Swiper( `[data-id=${currentID}] .service-gallery__slider`, {
      slidesPerView: 1,
      spaceBetween: 30,
      watchSlidesProgress: true,
      lazy: true,
      pagination: {
        el: `[data-id=${currentID}] .service-gallery__pagination`,
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
    } );
  } );
};

export {
  initProjectsGallery
};
