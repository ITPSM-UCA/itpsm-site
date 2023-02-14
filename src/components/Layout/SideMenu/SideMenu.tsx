import { useRouter } from 'next/router'
import { MdSchool } from 'react-icons/md'
import { GiTeacher } from 'react-icons/gi'
import { HiOutlineUsers } from 'react-icons/hi'
import { AiOutlineCalendar, AiTwotoneSchedule } from 'react-icons/ai'

import MenuItem from './MenuItem'
import UserInfo from '../User/UserInfo'

interface Props {
  menu: Menu[],
}

const SideMenu = ({ menu }:Props) => {
  const router = useRouter()

  return (
    <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
      <div className="flex-1 flex flex-col min-h-0 border-r border-gray-200 bg-white">
        <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
          <div className="flex items-center flex-shrink-0 px-4" />
          <nav className="mt-5 flex-1 px-2 bg-white space-y-1">
            {menu.map((item) => (
              <MenuItem
                key={item.id}
                label={item.name}
                redirectTo={item.redirectTo}
                Icon={getIcon(item.icon)}
                isActive={item.redirectTo === router.pathname}
              />
            ))}
          </nav>
        </div>
        <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
          <UserInfo />
        </div>
      </div>
    </div>
  )
}

const getIcon = (icon:string) => {
  switch (icon) {
    case 'MdSchool':
      return MdSchool
    case 'GiTeacher':
      return GiTeacher
    case 'AiTwotoneSchedule':
      return AiTwotoneSchedule
    case 'AiOutlineCalendar':
      return AiOutlineCalendar
    case 'HiOutlineUsers':
      return HiOutlineUsers
    default:
      return MdSchool
  }
}

export default SideMenu
