/* eslint-disable react/button-has-type */
import { Dialog } from '@headlessui/react'
import React from 'react'
import { AiOutlineClose } from 'react-icons/ai'

const CustomModal = ({
  showModal, onToggleModal, className, children,
}:any) => (
  <Dialog
    open={showModal}
    onClose={onToggleModal}
    className={`relative z-10 bg-indigo-200 rounded-2xl mx-auto ${className}`}
  >
    <div>
      {children}
    </div>

    {onToggleModal && (
    <button
      onClick={onToggleModal}
      className="absolute right-2 top-2 bg-sgray0 rounded-full p-3 focus:outline-none"
    >
      <AiOutlineClose />
    </button>
    )}
  </Dialog>
)

export default CustomModal
