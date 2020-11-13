import { BaseQRCodeProps } from 'qrcode.react'

export type Code = {
  title: string
  url: string
  impressions: number
  canvasSettings: BaseQRCodeProps
}
