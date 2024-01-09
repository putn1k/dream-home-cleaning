const filterListNode = document.querySelector( '.services-main__filters-list' );

const initServicesFilter = () => {
  if ( !filterListNode ) return;
  const servicesListNode = document.querySelector( '.services-main__list' );

  const onFilterBtnClick = ( evt ) => {
    evt.preventDefault();

    if ( evt.target.closest( 'button' ) ) {
      const currentTarget = evt.target.closest( 'button' );
      const currentFilter = currentTarget.dataset.filter;

      const filtersBtns = filterListNode.querySelectorAll( 'button' );
      for ( const btn of filtersBtns ) {
        btn.classList.add( 'btn--light' );
      }

      currentTarget.classList.remove( 'btn--light' );

      for ( const serviceCard of servicesListNode.children ) {
        if ( currentFilter === 'all' ) {
          serviceCard.style.display = '';
        } else {
          serviceCard.id !== currentFilter ? serviceCard.style.display = 'none' : serviceCard.style.display = '';
        }
      }
    }
  };

  filterListNode.addEventListener( 'click', onFilterBtnClick );
};

export {
  initServicesFilter
};
