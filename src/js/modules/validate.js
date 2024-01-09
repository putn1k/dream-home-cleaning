import {
  Options,
} from './options.js';

import {
  sendData,
} from './utils.js';

import {
  simpleModal,
} from './modal.js';

const isSendOk = () => {
  simpleModal.open( '#send-ok-modal' );
};
const isSendError = () => {
  simpleModal.open( '#send-error-modal' );
};

export const validateForms = () => {
  const forms = document.querySelectorAll( 'form[data-validate]' );

  if ( forms.length < 1 ) return;

  forms.forEach( ( form ) => {
    const formID = `#${form.id}`;
    const validationRules = new JustValidate( formID, Options.ValidationErrors );
    const requiredFields = document.querySelectorAll( `${formID} [required]` );
    new JustPhoneMask( Options.Mask );

    if ( requiredFields.length < 1 ) return;

    requiredFields.forEach( ( input ) => {
      switch ( input.dataset.validate ) {
        case 'name':
          validationRules.addField( `${formID} [data-validate="name"]`, [ {
            rule: 'required',
            value: true,
          }, ] );
          break;
        case 'email':
          validationRules.addField( `${formID} [data-validate="email"]`, [ {
              rule: 'required',
              value: true,
            },
            {
              rule: 'email',
            },
          ] );
          break;
        case 'phone':
          validationRules.addField( `${formID} [data-validate="phone"]`, [ {
              rule: 'required',
              value: true,
            },
            {
              rule: 'minLength',
              value: document.querySelector( `${formID} [data-validate="phone"]` ).dataset.mask.length,
            },
          ] );
          break;
        case 'subject':
          validationRules.addField( `${formID} [data-validate="subject"]`, [ {
            rule: 'required',
            value: true,
          }, ] );
          break;
        case 'message':
          validationRules.addField( `${formID} [data-validate="message"]`, [ {
              rule: 'required',
              value: true,
            },
            {
              rule: 'minLength',
              value: 10,
            },
            {
              rule: 'maxLength',
              value: 200,
            },
          ] );
          break;
      }
    } );
    validationRules.onSuccess( ( evt ) => {
      sendData( evt, Options.Requests.HandlerURL, isSendOk, isSendError );
    } );
  } );
};
