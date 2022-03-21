interface RegisterRequest {
  email: string,
  username: string,
  name: string,
  password: string,
}

const register = async (data: RegisterRequest) => {
  const RegisterPromise = new Promise((resolve) => {
    setTimeout(async () => {
      resolve({
        success: true,
        userInfo: {
          name: 'User',
          userId: 1,
          idToken: 'ijKZwl0skAS',
          expiresIn: 200,
        },
      })
      // resolve({ error: 'The operation could not be completed, please try again later or contact our customer support team.' })
    }, 8000)
  })

  return RegisterPromise
}

export default register
