interface LoginRequest {
  email: string,
  password: string,
}

const login = async (data: LoginRequest) => {
  const LoginPromise = new Promise((resolve) => {
    setTimeout(async () => {
      resolve({
        success: true,
        userInfo: {
          name: 'Alvaro Garcia',
          userId: 1,
          idToken: 'ijKZwl0skAS',
          expiresIn: 200,
        },
      })
      // resolve({ error: 'The operation could not be completed, please try again later or contact our customer support team.' })
    }, 8000)
  })
  return LoginPromise
}

export default login
