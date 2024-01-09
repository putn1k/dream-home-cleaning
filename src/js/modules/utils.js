const disableSubmitBtn = ( form ) => {
  if ( !form.querySelector( '[type="submit"]' ) ) return;
  form.querySelector( '[type="submit"]' ).setAttribute( 'disabled', 'disabled' );
};

const enableSubmitBtn = ( form ) => {
  if ( !form.querySelector( '[type="submit"]' ) ) return;
  form.querySelector( '[type="submit"]' ).removeAttribute( 'disabled' );
};

const isEscKey = ( evt ) => evt.key === 'Escape';

const addLeadZero = ( number ) => ( number < 10 ) ? `0${number}` : number;

const iosChecker = () => {
  return [
      'iPad Simulator',
      'iPhone Simulator',
      'iPod Simulator',
      'iPad',
      'iPhone',
      'iPod'
    ].includes( navigator.platform )
    // iPad on iOS 13 detection
    ||
    ( navigator.userAgent.includes( 'Mac' ) && 'ontouchend' in document );
};

const iosVhFix = () => {
  if ( !( !!window.MSInputMethodContext && !!document.documentMode ) ) {
    if ( iosChecker() ) {
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty( '--vh', `${vh}px` );

      window.addEventListener( 'resize', function() {
        vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty( '--vh', `${vh}px` );
      } );
    }
  }
};

const initSlider = ( selector, options ) => {
  if ( !document.querySelector( selector ) ) return;
  return new Swiper( document.querySelector( selector ), options );
};

const sendData = ( evt, url, isOk, isError ) => {
  disableSubmitBtn( evt.target );
  fetch( url, {
      method: 'POST',
      body: new FormData( evt.target )
    } )
    .then( ( data ) => {
      if ( data.ok ) {
        isOk();
        evt.target.reset();
      } else {
        isError();
      }
    } )
    .catch( () => {
      isError();
    } )
    .finally( () => {
      enableSubmitBtn( evt.target );
    } );
};

export {
  isEscKey,
  addLeadZero,
  iosVhFix,
  initSlider,
  sendData,
};
