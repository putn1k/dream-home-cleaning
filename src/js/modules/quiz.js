import {
  Options,
} from './options.js';
import {
  initSlider,
} from './utils.js';

const MAX_UPLOAD_SIZE = 3145728;
let changeListenersFlagEnable = false;
let dragListenersFlagEnable = false;

const initRemover = ( selector ) => {
  const trigger = document.querySelector( selector );
  if ( !trigger ) return;

  trigger.addEventListener( 'click', ( evt ) => {
    const resultElement = document.querySelector( evt.currentTarget.dataset.label );

    if ( resultElement ) {
      resultElement.remove();
    }
  } );
};

const quizFormSubmitHandler = ( evt ) => {
  evt.preventDefault();
  if ( ( evt.target.querySelectorAll( '.is-invalid' ).length < 1 ) ) {
    document.querySelector( '.quiz-trigger' ).remove();
  }
};

const getActiveSlideDatase = ( slider ) => slider.slides[ slider.activeIndex ].dataset.slideTypeItem;

const getQuizFn = ( slider ) => {
  if ( slider.isEnd ) {
    slider.navigation.disable();
    slider.navigation.nextEl.remove();
    slider.navigation.prevEl.remove();
    slider.el.querySelector( '.swiper-wrapper' ).classList.add( 'quiz-modal__slider-wrapper' );
    document.querySelector( '.quiz-modal__controls' ).classList.add( 'quiz-modal__controls--hidden' );
    return;
  }
  switch ( getActiveSlideDatase( slider ) ) {
    case 'checkbox':
      // eslint-disable-next-line no-case-declarations
      const checkboxArr = Array.from( slider.slides[ slider.activeIndex ].querySelectorAll( '[type="checkbox"]' ) );
      // eslint-disable-next-line no-case-declarations
      const checkState = () => {
        if ( checkboxArr.some( input => input.checked ) ) {
          slider.enable();
        } else {
          slider.disable();
        }
      };

      if ( !changeListenersFlagEnable ) {
        changeListenersFlagEnable = true;

        for ( const input of checkboxArr ) {
          input.addEventListener( 'change', checkState );
        }
      }

      checkState();
      break;
    case 'files':
      if ( !dragListenersFlagEnable ) {
        dragListenersFlagEnable = true;

        const dropFileZone = slider.slides[ slider.activeIndex ].querySelector( '.quiz-modal__drop-zone' );
        const uploadInput = slider.slides[ slider.activeIndex ].querySelector( '.quiz-modal__drop-zone input' );
        const statusNode = slider.slides[ slider.activeIndex ].querySelector( '.quiz-modal__file-status' );
        const setStatus = ( text ) => {
          statusNode.textContent = text;
        };
        [ 'dragover', 'drop' ].forEach( function( event ) {
          document.addEventListener( event, function( evt ) {
            evt.preventDefault();
            return false;
          } );
        } );

        dropFileZone.addEventListener( 'dragenter', () => {
          dropFileZone.classList.add( 'is-on-drag' );
        } );

        dropFileZone.addEventListener( 'dragleave', () => {
          dropFileZone.classList.remove( 'is-on-drag' );
        } );

        dropFileZone.addEventListener( 'drop', ( evt ) => {
          dropFileZone.classList.remove( 'is-on-drag' );
          const files = evt.dataTransfer.files;

          if ( files.length < 1 ) return;

          const uploadTypes = Array.from( files ).map( file => file.type );
          const uploadSize = Math.ceil( Array.from( files ).reduce( ( total, file ) => total + file.size, 0 ) );

          if ( uploadSize > MAX_UPLOAD_SIZE ) {
            uploadInput.value = '';
            setStatus( `Attachment size must be less than ${MAX_UPLOAD_SIZE / 1048576 } Mb` );
            return false;
          }
          if ( uploadTypes.every( type => type === 'image/png' || type === 'image/jpeg' ) ) {
            uploadInput.files = files;
            setStatus( `Added ${files.length} file(s)` );
          } else {
            setStatus( 'Unsupported attachments. Drop files here to upload.' );
            return false;
          }
        } );

        uploadInput.addEventListener( 'change', () => {
          const files = uploadInput.files;
          const uploadTypes = Array.from( files ).map( file => file.type );
          const uploadSize = Math.ceil( Array.from( files ).reduce( ( total, file ) => total + file.size, 0 ) );

          if ( uploadSize > MAX_UPLOAD_SIZE ) {
            uploadInput.value = '';
            setStatus( `Attachment size must be less than ${MAX_UPLOAD_SIZE / 1048576 } Mb` );
            return false;
          }

          if ( uploadTypes.every( type => type === 'image/png' || type === 'image/jpeg' ) ) {
            setStatus( `Added ${files.length} file(s)` );
          } else {
            setStatus( 'Unsupported attachments. Drop files here to upload.' );
            return false;
          }
        } );
      }
      break;
    default:
      return;
  }
};

const initQuiz = () => {
  const config = Object.assign( Options.Swiper.Quiz, {
    on: {
      init: function( slider ) {
        getQuizFn( slider );
        slider.el.addEventListener( 'submit', quizFormSubmitHandler );
      },
      activeIndexChange: function( slider ) {
        getQuizFn( slider );
      },
    },
  } );
  initSlider( '.quiz-modal__slider', config );
  initRemover( '.quiz-trigger__close' );
};

export {
  initQuiz
};
