import { ChangeEventHandler } from 'react'

type Props = {
  name: string
  value: string | number
  onChange: ChangeEventHandler<HTMLSelectElement>
  required: boolean
  options: Array<{ label: string; value: string | number }>
}

const SelectInput = ({ name, value, onChange, required, options }: Props) => (
  <div className="p-2">
    <p className="md:text-lg">
      {name}
      {!required ? null : <span className="text-red-850 font-black">*</span>}
    </p>
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="w-full rounded-xl p-2 mt-1"
    >
      {options.map((option, index) => (
        <option key={index} label={option.label} value={option.value} />
      ))}
    </select>
  </div>
)

export default SelectInput
