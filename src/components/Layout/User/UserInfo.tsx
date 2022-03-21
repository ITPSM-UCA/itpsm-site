import useUser from 'hooks/useUser'

const UserInfo = () => {
  const { user, onLogout } = useUser()

  return (
    <div className="flex-shrink-0 w-full group block">
      <div className="flex items-center">
        <div>
          <img
            className="inline-block h-9 w-9 rounded-full"
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt=""
          />
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
            Cerrar sesión
          </button>
        </div>
      </div>
    </div>
  )
}

export default UserInfo
