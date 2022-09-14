import apiInstance from 'instances/apiInstance'

const getConfigurations = async () => {
  let response
  try {
    const url = `${apiInstance.defaults.baseURL}/initial-config`

    response = await apiInstance.get(url)

    response = response.data

    return response.data
  } catch (error:any) {
    response = error.response?.data
    return response
  }
}

export default getConfigurations
