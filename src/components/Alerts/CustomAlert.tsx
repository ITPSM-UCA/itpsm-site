const CustomAlert = ({ text, className, onClose }:any) => (
  <div role="alert" className={`relative py-3 px-4 text-sm rounded-lg ${className}`}>
    <p>{text}</p>
    <button className="absolute inset-y-0 right-0 flex items-center mr-2" type="button" onClick={onClose}>
      <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
        <path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" />
      </svg>
    </button>
  </div>
)
export default CustomAlert
