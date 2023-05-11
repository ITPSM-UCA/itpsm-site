import { useRouter } from 'next/router'
import { MdSchool } from 'react-icons/md'
import { GiTeacher } from 'react-icons/gi'
import { HiOutlineUsers } from 'react-icons/hi'
import { AiTwotoneSchedule, AiOutlineCalendar } from 'react-icons/ai'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Link from 'next/link'
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Icon } from '@material-ui/core'
import CardActions from '@material-ui/core/CardActions';





interface Props {
  Icon: any,
}

const DashboardMenu = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const platformMenus = useSelector((state:any) => state.user.platform_menus)
  const menu: Menu[] =platformMenus
  const router = useRouter()
  const baseIconClassName = 'mr-4 flex-shrink-0 h-6 w-6'
  const baseClassName = 'group flex items-center px-2 py-2 text-sm rounded-md cursor-pointer font-medium'
  const className =  `${baseClassName} text-gray-1000 hover:bg-gray-1000 hover:text-gray-900`
  const iconClassName = `${baseIconClassName} text-gray-400 group-hover:text-gray-500`

  const Iconos = (icon: any) => {
    let Icon = getIcon(icon);

    return <Icon className={iconClassName} size={1300} style={{alignItems:'center'}}/>
  }

  return (
    <div className="d-flex flex-wrap">
      {menu.map((item) => (
        <div>
        <Card style={{ width: '18rem' } } >
          <Card.Body>
          {/* <Icon variant='top' src={getIcon(item.icon)}></Icon> */}
          <div className="d-flex justify-content-start">
          {Iconos(item.icon)}
          <Card.Title>{item.name}</Card.Title>
          </div>
          <Card.Link href={item.redirectTo} >Ver</Card.Link>
          
          
          
          <Card.Img variant="top" src="" /> 
          
          </Card.Body>
        </Card>
        </div>
            ))}
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

export default DashboardMenu
