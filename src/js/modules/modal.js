import {
  Options,
} from './options.js';

const simpleModal = new HystModal( Options.Modal );

const initSimpleModal = ( name = simpleModal, handler = 'data-hystmodal' ) => {
  name.config.linkAttributeName = handler;
  name.init();
};

const initModals = () => {
  initSimpleModal();
};

const setSubjectText = ( modal ) => {
  if ( modal.starter && modal.starter.dataset.subject ) {
    const subjectNode = modal.openedWindow.querySelector( 'input[name="Subject"]' );
    if ( subjectNode ) {
      subjectNode.value = modal.starter.dataset.subject;
    }
  }
};

simpleModal.config.beforeOpen = setSubjectText;

export {
  simpleModal,
  initModals,
};
