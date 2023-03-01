/* eslint-disable no-case-declarations */
import showMessage from './showMessage'

const onErrorHandler = (error:any) => {

  switch (parseInt(error.data.errors[0].status)) {
    case 422:
      let details = ''
      error.data.errors.forEach((item:any) => {
        details += `- ${item.title}`
      });

      details += '';
      showMessage('Información', details, 'warning');
      break
    case 401:
     
      showMessage(error.data.errors.title, error.data.errors.detail, 'error')
      break
    default:
      showMessage('Oops...', 'Su petición no ha podido ser procesada, por favor intente de nuevo más tarde.', 'error')
      break
  }

  return { ...error.data, wasHandled: true }
}

export default onErrorHandler
