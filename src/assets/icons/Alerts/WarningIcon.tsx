/* eslint-disable max-len */
/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react'
import { SVGProps } from 'react'

const WarningIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={40}
    height={40}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect width={40} height={40} rx={20} fill="#FFC400" />
    <path
      d="M20 10a10 10 0 1 0 10 10 10.01 10.01 0 0 0-10-10Zm0 18a8 8 0 1 1 8-8 8.01 8.01 0 0 1-8 8Zm0-8.5a1 1 0 0 0-1 1v3a1 1 0 0 0 2 0v-3a1 1 0 0 0-1-1Zm0-4a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5Z"
      fill="#fff"
    />
  </svg>
)

export default WarningIcon
