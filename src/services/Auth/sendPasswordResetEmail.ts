const sendPasswordResetEmail = async (email: string) => {
  const LoginPromise = new Promise((resolve) => {
    setTimeout(async () => {
      resolve({ success: "Verification code sent! You will receive an email (check your spam folder in case it doesn't appear in your inbox), follow the instructions to complete your password reset." })
      // resolve({ error: 'The operation could not be completed, please try again later or contact our customer support team.' })
    }, 8000)
  })
  return LoginPromise
}

export default sendPasswordResetEmail
