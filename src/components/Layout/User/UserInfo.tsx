import useUser from 'hooks/useUser'

const UserInfo = () => {
  const { user, onLogout } = useUser()

  return (
    <div className="flex-shrink-0 w-full group block">
      <div className="flex items-center">
        <div>
          <img className="inline-block h-9 w-9 rounded-full" src="https://itpsm.edu.sv/wp-content/uploads/2019/01/logo-ITPSM-p.jpg" alt="ITPSM" />
        </div>
        <div className="ml-3">
          <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
            {user.name}
          </p>
          <button
            type="button"
            onClick={onLogout}
            className="text-xs font-medium text-gray-500 group-hover:text-gray-700"
          >
            Cambiar contraseña
          </button>
          <hr></hr>
          <button
            type="button"
            onClick={onLogout}
            className="text-xs font-medium text-gray-500 group-hover:text-gray-700"
          >
            Cerrar sesión
          </button>
        </div>
      </div>
    </div>
  )
}

export default UserInfo
