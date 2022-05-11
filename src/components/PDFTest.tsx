// import apiInstance from 'instances/apiInstance'

const PDFTest = () => {
  const onSubmit = () => {
    // apiInstance
    //   .post('/students/create-default-pdf', { id: 1 })
    //   .then((res: any) => {
    //     const file = new Blob([res.data], { type: 'application/pdf' })
    //     const fileURL = URL.createObjectURL(file)
    //     const pdfWindow = window.open(fileURL)
    //     pdfWindow.location.href = fileURL
    //   })

    const data = 'id=3';
    const xhr = new XMLHttpRequest()
    xhr.open('POST', 'https://itpsm-api.herokuapp.com/api/students/create-default-pdf') // url.It can pdf file path
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
    xhr.setRequestHeader('Authorization', 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiZDFjM2YyNTA4YTk3OGMzY2IxYzY5ZjVmYzdjNjZmMmNhZjZmMmVjODZjMDk5ZTJmNjljZDg0OTJjYmQxMjEwMjliNjIwY2ZkMTM0OWU0OTUiLCJpYXQiOjE2NTIyMTc1NTMuMjE3NTYsIm5iZiI6MTY1MjIxNzU1My4yMTc1NjIsImV4cCI6MTY1MjIyNDc1My4yMDY1MzMsInN1YiI6IjEiLCJzY29wZXMiOltdfQ.GLCy5oAqant3drO5yv6xc7DXLI2kPDwa60ueGMATX5FtSdZeuAAXoHEUfkMQ_OjBdUJTPJxU50KPDo0dbeSt_tzTTGeGiSsFqnXOIpbUn8rQCburjbZuUCf9wdksk9lkNlj-vI5wHmteTGKLt2krX8vf3Y7iEs4wEKVWSQNlpkW_aF-FxI8_Y60bOxgeqq-uMijVXtxM3qQwB2mBQ0OVVFKZ9TwVdDXe8U8QqYHLVI5Xc4HyaEUsWjPrHyxhAXJmNRbrvn7ldX2MZjFpvGyWMQMrBdQt8ZNgxBo1bGgYR7zqs9VbXkOhOS0ZCUs_dtt5USw7QWS2JRUlwZDMk0EX5UwjT7WeIG2gFaYY9ZExPBvbbpdfMpnwFgFgbydtG2KL8t4gyjdYR6uWgCMz1htig3dsar2oz1FEldyaNmiw641VRbQRbwv8F5Tl18nBoAVTWjJ4qqRS30jUMx3A8FBmnXM47vEhIrZkp5nFt_Wm24b52fZrTarYh3Asrxw5q7-rlTxdZ45MVS2PVQCEWGC18gaQMpb8P1cJOUyuGY5BrjdVcFgVINahFGUIUKn4QofNEYMMqiZpUmEaa-i1t8JD8beeEdhE8Ie-AF4tk9xMyB0IzF25KAnGtXjg7Jce1Rvm2JRQLgjvHzD2ia1lHkI-Mr9M6uAn229Ik8rnjzbxJWQ')

    xhr.responseType = 'blob'
    xhr.onload = function () {
      if (this.status === 200) {
        const blob = new Blob([xhr.response], { type: 'application/pdf' })
        const url = URL.createObjectURL(blob)

        const pdfWindow = window.open(url)
        console.log(pdfWindow)
        // const a = document.createElement('a')
        // a.href = url
        // a.target = '_blank'
        // // a.download = 'myFile.pdf'
        // a.click()
        // setTimeout(function () {
        //   // For Firefox it is necessary to delay revoking the ObjectURL
        //   window.URL.revokeObjectURL(data), 100
        // })
      }
    }
    xhr.send(data)
  }

  return (
    <div className="mt-4">
      <button
        className="bg-primary text-secondary p-2 rounded"
        type="button"
        onClick={onSubmit}
      >
        Imprimir PDF
      </button>
    </div>
  )
}

export default PDFTest
