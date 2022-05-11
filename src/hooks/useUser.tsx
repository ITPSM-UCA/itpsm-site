import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { authSuccess, logout } from 'store/User/userActions'

type User = {
  id: number|null,
  name: string|null,
  token: string|null,
  expiresIn?: number,
}

const useUser = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const user = useSelector((state: any) => state.user)

  const onSuccessfulLogin = (userInfo:any) => {
    dispatch(authSuccess({
      ...userInfo,
    }))
  }

  const onLogout = () => {
    dispatch(logout())
    router.replace('/')
  }

  return {
    user,
    token: user.token ?? null,
    isAuthenticated: user.token !== null,
    onSuccessfulLogin,
    onLogout,
  }
}

export default useUser
