/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import { API_URL } from 'config'
import { initializeStore } from 'store'

const createPdf = (url:string, data: any) => {
  const state = initializeStore(undefined)
  const { token } = state.getState().user

  const xhr = new XMLHttpRequest()
  xhr.open('POST', `${API_URL}${url}`)
  xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
  xhr.setRequestHeader('Authorization', `Bearer ${token}`)

  xhr.responseType = 'blob'
  xhr.onload = function () {
    if (this.status === 200) {
      const blob = new Blob([xhr.response], { type: 'application/pdf' })
      const pdfUrl = URL.createObjectURL(blob)

      window.open(pdfUrl)
    }
  }

  xhr.send(parseData(data))
}

const parseData = (data: any) => {
  let formData = ''

  for (const key in data) {
    formData += `${key}=${data[key]}&`
  }

  return formData
}

export default createPdf
