const showMessage = (title:string, message:string, type:string = 'success') => {
  alert(`${title}\n${message}${type}`)
}

export default showMessage
