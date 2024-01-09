const initVideo = () => {
  const VIDEOS = document.querySelectorAll( '.video video' );
  if ( VIDEOS.length < 1 ) return;

  for ( let i = 0; i < VIDEOS.length; i++ ) {
    setupVideo( VIDEOS[ i ] );
  }
};

function onPlay( evt ) {
  evt.preventDefault();
  const block = this.closest( '.video' );

  if ( this.paused ) {
    this.play();
    block.classList.remove( 'video--is-paused' );
  } else {
    this.pause();
    block.classList.add( 'video--is-paused' );
  }
}

const setupVideo = ( video ) => {
  const block = video.closest( '.video' );

  block.classList.add( 'video--is-paused' );
  video.removeAttribute( 'controls' );
  video.addEventListener( 'click', onPlay, false );
};


export {
  initVideo
};
