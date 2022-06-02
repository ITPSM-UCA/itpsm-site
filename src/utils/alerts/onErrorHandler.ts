/* eslint-disable no-case-declarations */
import showMessage from './showMessage'

const onErrorHandler = (error:any) => {
  switch (error.status) {
    case 422:
      let details = '<ul>'
      error.data.errors.forEach((item:any) => {
        details += `<li>${item.title}</li>`
      });

      details += '</ul>';
      showMessage('Información', details, 'info');
      break
    case 401:
      showMessage(error.data.errors.title, error.data.errors.detail, 'error')
      break
    default:
      showMessage('Oops...', 'Su petición no ha podido ser procesada, por favor intente de nuevo más tarde.', 'error')
      break
  }
}

export default onErrorHandler
