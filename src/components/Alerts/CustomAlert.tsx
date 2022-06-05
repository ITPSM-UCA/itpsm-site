interface Props {
  title?: string,
  text: string,
  Icon?: any,
  className: string,
  onClose: () => void,
}

const CustomAlert = ({
  title,
  text,
  Icon,
  className,
  onClose,
}:Props) => (
  <div role="alert" className={`relative py-3 px-4 text-sm rounded-xl flex items-center space-x-2 ${className}`}>
    <div>
      <Icon />
    </div>
    <div className="px-2">
      <h4 className="text-lg font-medium">{title}</h4>
      <div className="">{text}</div>
      <button className="absolute inset-y-0 right-0 flex items-center mr-2" type="button" onClick={onClose}>
        <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
          <path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" />
        </svg>
      </button>
    </div>
  </div>
)

export default CustomAlert
