import toast from 'react-hot-toast'
import ErrorIcon from 'assets/icons/Alerts/ErrorIcon'
import CustomAlert from 'components/Alerts/CustomAlert'
import WarningIcon from 'assets/icons/Alerts/WarningIcon'
import SuccessIcon from 'assets/icons/Alerts/SuccessIcon'

const showMessage = (
  title: string,
  message: string,
  type: string = 'success',
) => {
  toast.custom((t: any) => (
    <CustomAlert
      title={title}
      text={message}
      onClose={() => toast.remove(t.id)}
      className={getClassName(type)}
      Icon={getIcon(type)}
    />
  ))
}

const icons:any = {
  success: SuccessIcon,
  warning: WarningIcon,
  error: ErrorIcon,
}

const classNames:any = {
  success: 'bg-green-100 border-green-400 text-green-800',
  warning: 'bg-yellow-100 border-yellow-400 text-yellow-800',
  error: 'bg-red-100 border-red-400 text-red-800',
}

const getIcon = (type: string) => icons[type] ?? icons.success
const getClassName = (type: string) => classNames[type] ?? classNames.success

export default showMessage
