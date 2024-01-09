import {
  isEscKey,
} from './utils.js';

const siteHeaderNode = document.querySelector( '.site__header' );
const headerMainNode = document.querySelector( '.header-main' );
const headerModalNode = document.querySelector( '.header-modal' );

const MENU_ID = 'mobile-menu';
const BURGER_OPTIONS = {
  animationSpeed: 300,
  menuId: MENU_ID,
  isOpen: openMobileMenu,
  isClose: closeMobileMenu,
};
const siteBurger = new JustBurger( BURGER_OPTIONS );

function openMobileMenu() {
  document.documentElement.classList.add( 'is-open-modal' );
  headerMainNode.classList.add( 'header-main--is-open-menu' );
  headerModalNode.setAttribute( 'aria-hidden', 'false' );
}

function closeMobileMenu() {
  document.documentElement.classList.remove( 'is-open-modal' );
  headerMainNode.classList.remove( 'header-main--is-open-menu' );
  headerModalNode.setAttribute( 'aria-hidden', 'true' );
}

const closeMenuAfterClick = ( selectorNodes ) => {
  document.querySelectorAll( selectorNodes ).forEach( item => {
    item.addEventListener( 'click', () => {
      if ( window.matchMedia( '(max-width: 768px)' ).matches ) {
        siteBurger.close();
      }
    } );
  } );
};

const initHeaderMenu = () => {
  if ( !headerModalNode || !headerMainNode ) return;
  headerModalNode.id = MENU_ID;
  closeMenuAfterClick( '.header-modal__nav a' );
  document.addEventListener( 'keydown', ( evt ) => {
    if ( isEscKey( evt ) && headerModalNode.getAttribute( 'aria-hidden' ) === 'false' ) {
      siteBurger.close();
    }
  } );
};

const observeSiteHeader = ( options ) => {
  const targetTopNode = document.querySelector( '#site-top' );

  if ( !targetTopNode || !headerMainNode || !siteHeaderNode ) return;

  const cb = ( entries ) => {
    entries.forEach( entry => {
      if ( !entry.isIntersecting ) {
        headerMainNode.classList.add( 'header-main--fixed' );
        siteHeaderNode.style.paddingTop = `${headerMainNode.offsetHeight}px`;
      } else {
        headerMainNode.classList.remove( 'header-main--fixed' );
        siteHeaderNode.style.paddingTop = '';
      }
    } );
  };
  new IntersectionObserver( cb, options.Observer.Header ).observe( targetTopNode );
};

const initHeaderSettings = ( options ) => {
  initHeaderMenu();
  observeSiteHeader( options );
};

export {
  initHeaderSettings
};
