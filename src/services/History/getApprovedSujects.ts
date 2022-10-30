import apiInstance from 'instances/apiInstance'

const getApprovedSujects = async () => {
  let response
  try {
    const url = `${apiInstance.defaults.baseURL}/enrollment/approved-subjects`

    response = await apiInstance.get(url)

    response = response.data

     return response.data
  
  } catch (error: any) {
    response = error.response.data
    return response
  }
}

export default getApprovedSujects

