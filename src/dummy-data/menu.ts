import { MdSchool } from 'react-icons/md'
import { GiTeacher } from 'react-icons/gi'
import { AiTwotoneSchedule, AiOutlineCalendar } from 'react-icons/ai'

const menu:Menu[] = [
  {
    id: 1,
    name: 'Estudiantes',
    redirectTo: '/dashboard/estudiantes',
    icon: MdSchool,
  },
  {
    id: 2,
    name: 'Catedráticos',
    redirectTo: '/dashboard/catedraticos',
    icon: GiTeacher,
  },
  {
    id: 3,
    name: 'Plan de estudios',
    redirectTo: '/dashboard/plan-de-estudios',
    icon: AiTwotoneSchedule,
  },
  {
    id: 3,
    name: 'Ciclo de estudios',
    redirectTo: '/dashboard/ciclo-de-estudios',
    icon: AiOutlineCalendar,
  },
  {
    id: 3,
    name: 'Inscripción de materias',
    redirectTo: '/dashboard/inscripcion-de-materias',
    icon: AiOutlineCalendar,
  },
  // {
  //   id: 4,
  //   name: 'Ciclos',
  //   redirectTo: '/dashboard',
  //   icon: GiCalendarHalfYear,
  //   current: false,
  // },
  // {
  //   id: 5,
  //   name: 'Documents',
  //   redirectTo: '/dashboard',
  //   icon: MdSpaceDashboard,
  //   current: false,
  // },
  // {
  //   id: 6,
  //   name: 'Reportes',
  //   redirectTo: '/dashboard',
  //   icon: GoRepo,
  //   current: false,
  // },
]

export default menu
