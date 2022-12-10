import { ChangeEventHandler } from 'react'

type Props = {
  name: string
  value: string | number
  type: 'text' | 'number'
  onChange: ChangeEventHandler<HTMLInputElement>
  required: boolean
  step?: string
  minimum?: number
  maximum?: number
}

// step used for number type to allow decimal places
// minimum and maximum are used for number type
const TextInput = ({
  name,
  value,
  type,
  onChange,
  required,
  step = 'any',
  minimum = null,
  maximum = null,
}: Props) => (
  <div className="p-2">
    <p className="md:text-lg">
      {name}
      {!required ? null : <span className="text-red-850 font-black">*</span>}
    </p>
    <input
      name={name}
      type={type}
      step={step}
      min={minimum}
      max={maximum}
      value={value}
      onChange={onChange}
      className="w-full rounded-xl p-2 mt-1"
    />
  </div>
)

export default TextInput
