import { MdSpaceDashboard } from 'react-icons/md'

const menu:Menu[] = [
  {
    id: 1,
    name: 'Estudiantes',
    redirectTo: '/dashboard/estudiantes',
    icon: MdSpaceDashboard,
    current: true,
  },
  {
    id: 2,
    name: 'Catedráticos',
    redirectTo: '/dashboard/catedraticos',
    icon: MdSpaceDashboard,
    current: false,
  },
  {
    id: 3,
    name: 'Plan de estudios',
    redirectTo: '/dashboard/plan-de-estudios',
    icon: MdSpaceDashboard,
    current: false,
  },
  {
    id: 4,
    name: 'Calendar',
    redirectTo: '/dashboard',
    icon: MdSpaceDashboard,
    current: false,
  },
  {
    id: 5,
    name: 'Documents',
    redirectTo: '/dashboard',
    icon: MdSpaceDashboard,
    current: false,
  },
  {
    id: 6,
    name: 'Reports',
    redirectTo: '/dashboard',
    icon: MdSpaceDashboard,
    current: false,
  },
]

export default menu
