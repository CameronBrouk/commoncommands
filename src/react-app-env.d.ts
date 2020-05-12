/// <reference types="react-scripts" />

type FC<T> = React.FC<T>

type ID = string

type ButtonElement = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>

type InputElement = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>
type LabelElement = React.DetailedHTMLProps<
  React.LabelHTMLAttributes<HTMLLabelElement>,
  HTMLLabelElement
>
type DivElement = React.DetailedHTMLProps<
  React.DivHTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>
