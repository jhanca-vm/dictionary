import type { Error as ErrorType } from './types'

export function autoCloseDialog(
  node: HTMLElement,
  _dialog: HTMLDialogElement | undefined
) {
  let dialog: HTMLDialogElement

  const handleClick = ({ target }: MouseEvent) => {
    if (!node.contains(target as Node)) dialog.close()
  }

  const update = (value: HTMLDialogElement) => {
    dialog = value
    document.addEventListener('click', handleClick, true)
  }

  const destroy = () => document.removeEventListener('click', handleClick, true)

  return { update, destroy }
}

export class CustomError extends Error {
  title: string
  resolution: string

  constructor({ title, message, resolution }: ErrorType) {
    super(message)
    this.title = title
    this.resolution = resolution
  }
}
