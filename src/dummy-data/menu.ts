import { MdSchool } from 'react-icons/md'
import { GiTeacher, GiCalendarHalfYear } from 'react-icons/gi'
import { AiTwotoneSchedule } from 'react-icons/ai'
import { GoRepo } from 'react-icons/go'

const menu:Menu[] = [
  {
    id: 1,
    name: 'Estudiantes',
    redirectTo: '/dashboard/estudiantes',
    icon: MdSchool,
    current: true,
  },
  {
    id: 2,
    name: 'Catedráticos',
    redirectTo: '/dashboard/catedraticos',
    icon: GiTeacher,
    current: false,
  },
  {
    id: 3,
    name: 'Plan de estudios',
    redirectTo: '/dashboard/plan-de-estudios',
    icon: AiTwotoneSchedule,
    current: false,
  },
  {
    id: 4,
    name: 'Ciclos',
    redirectTo: '/dashboard',
    icon: GiCalendarHalfYear,
    current: false,
  },
  // {
  //   id: 5,
  //   name: 'Documents',
  //   redirectTo: '/dashboard',
  //   icon: MdSpaceDashboard,
  //   current: false,
  // },
  {
    id: 6,
    name: 'Reportes',
    redirectTo: '/dashboard',
    icon: GoRepo,
    current: false,
  },
]

export default menu
