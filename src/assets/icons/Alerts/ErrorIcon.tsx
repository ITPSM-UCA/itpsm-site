/* eslint-disable max-len */
/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react'
import { SVGProps } from 'react'

const ErrorIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={40}
    height={40}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect width={40} height={40} rx={20} fill="#FF507A" />
    <path
      d="M23.71 16.29a1 1 0 0 0-1.42 0L20 18.59l-2.29-2.3a1.004 1.004 0 1 0-1.42 1.42l2.3 2.29-2.3 2.29a1.002 1.002 0 0 0 .325 1.639.999.999 0 0 0 1.095-.219l2.29-2.3 2.29 2.3a1.001 1.001 0 0 0 1.639-.325 1 1 0 0 0-.22-1.095L21.41 20l2.3-2.29a.999.999 0 0 0 0-1.42Zm3.36-3.36a10 10 0 1 0-14.14 14.14 10 10 0 1 0 14.14-14.14Zm-1.41 12.73A8 8 0 1 1 28 20a7.95 7.95 0 0 1-2.34 5.66Z"
      fill="#fff"
    />
  </svg>
)

export default ErrorIcon
