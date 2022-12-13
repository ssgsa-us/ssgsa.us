import { ChangeEventHandler } from 'react'

type Props = {
  name: string
  description?: string
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
  description = '',
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
      {!description ? null : (
        <span className="text-xs md:text-sm">
          <br />
          {description}
        </span>
      )}
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
      onWheelCapture={(e) => e.currentTarget.blur()}
    />
  </div>
)

export default TextInput
