/* eslint-disable no-unused-vars */
export {}

declare global {
  type Menu = {
    id: number,
    name: string,
    redirectTo: string,
    icon: any,
  }

  type User = {
    id: number|null,
    name: string|null,
    token: string|null,
    expiresIn?: number,
  }
}
