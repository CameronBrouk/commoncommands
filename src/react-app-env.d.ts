/// <reference types="react-scripts" />

type DefaultProps = {
  className?: string
  children?: ReactElement
}

type C<P> = DefaultProps & P

type FC<P = {}> = React.FC<P & DefaultProps>

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
