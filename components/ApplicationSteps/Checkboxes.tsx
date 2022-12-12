import { ChangeEvent } from 'react'

type Props = {
  name: string
  value: string | number | boolean
  onChange: (
    e: ChangeEvent<HTMLInputElement>,
    optionValue: string | number | boolean,
  ) => void // option value is provided to update field with the respective value instead of boolean
  required: boolean
  options: Array<{ label: string; value: string | number | boolean }>
}

// Only accept 2 options
const CheckBoxes = ({ name, value, onChange, required, options }: Props) => (
  <div className="p-2">
    <p className="md:text-lg">
      {name}
      {!required ? null : <span className="text-red-850 font-black">*</span>}
    </p>
    <div className="flex justify-around items-center">
      {options.map((option, index) => (
        <div
          key={index}
          className={`flex items-center w-48 border-2 ${
            value == option.value ? 'border-black' : 'border-green-800'
          } rounded-xl p-2 mt-1 mr-4`}
        >
          <input
            type="checkbox"
            checked={value == option.value}
            onChange={(e) => onChange(e, option.value)}
            className="w-4 cursor-pointer"
          />
          <label className="pl-2">{option.label}</label>
        </div>
      ))}
    </div>
  </div>
)

export default CheckBoxes
