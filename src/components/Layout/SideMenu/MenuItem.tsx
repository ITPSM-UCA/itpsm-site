import Link from 'next/link'

interface Props {
  label: string,
  redirectTo: string,
  Icon: any,
  isActive: boolean,
}

const MenuItem = ({
  Icon,
  label,
  isActive,
  redirectTo,
}:Props) => {
  const className = isActive ? `${baseClassName} bg-gray-100 text-gray-900` : `${baseClassName} text-gray-500 hover:bg-gray-50 hover:text-gray-900`
  const iconClassName = isActive ? `${baseIconClassName} text-gray-500` : `${baseIconClassName} text-gray-400 group-hover:text-gray-500`

  return (
    <Link href={redirectTo}>
      <a className={className}>
        <Icon className={iconClassName} />
        <span>{label}</span>
      </a>
    </Link>
  )
}

const baseIconClassName = 'mr-4 flex-shrink-0 h-6 w-6'
const baseClassName = 'group flex items-center px-2 py-2 text-sm rounded-md cursor-pointer font-medium'

export default MenuItem
