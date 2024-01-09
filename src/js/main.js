import {
  Options,
} from './modules/options.js';

import {
  iosVhFix,
  initSlider,
} from './modules/utils.js';

import {
  initHeaderSettings
} from './modules/header.js';

import {
  initModals,
} from './modules/modal.js';

import {
  initScrollTop
} from './modules/scroll-top.js';

import {
  validateForms
} from './modules/validate.js';

import {
  initVideo
} from './modules/video.js';

import {
  initServicesFilter
} from './modules/services-filter.js';

import {
  initProjectsGallery
} from './modules/projects.js';

document.addEventListener( 'DOMContentLoaded', () => {
  iosVhFix();
  window.addEventListener( 'load', () => {
    initHeaderSettings( Options );
    initModals();
    initScrollTop();
    validateForms();
    initVideo();
    initSlider( '.services__slider', Options.Swiper.Services );
    initSlider( '.service-result__slider', Options.Swiper.Service );
    initSlider( '.projects__slider', Options.Swiper.Projects );
    initSlider( '.blog__slider', Options.Swiper.Blog );
    initServicesFilter();
    initProjectsGallery();
  } );
} );
