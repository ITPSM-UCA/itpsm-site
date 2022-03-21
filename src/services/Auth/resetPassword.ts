interface ResetPasswordRequest {
  email: string,
  password: string,
  password_confirmation: string,
}

const resetPassword = async (data: ResetPasswordRequest) => {
  const LoginPromise = new Promise((resolve) => {
    setTimeout(async () => {
      resolve({ success: 'Your password has been updated.' })
      // resolve({ error: 'The operation could not be completed, please try again later or contact our customer support team.' })
    }, 8000)
  })
  return LoginPromise
}

export default resetPassword
