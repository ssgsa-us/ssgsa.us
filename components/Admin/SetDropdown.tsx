import { ChangeEventHandler } from 'react'

type Props = {
  set?: string
  multipleSets?: Array<string>
  onChange: ChangeEventHandler<HTMLSelectElement>
  disabled: boolean
  multiple?: boolean
}

export default function SetDropdown({
  set = '',
  multipleSets = [],
  onChange,
  disabled,
  multiple = false,
}: Props) {
  return (
    <select
      className={`text-white text-base md:text-lg rounded-lg bg-blue-850
        ${!multiple ? 'py-1 px-3' : ''}
      `}
      value={!multiple ? set : multipleSets}
      multiple={multiple}
      disabled={disabled}
      onChange={onChange}
    >
      {!multiple ? (
        <option
          label="Select"
          value={undefined || null || ''}
          className="bg-gray-400 hover:bg-blue-800"
        />
      ) : null}
      {[
        'A',
        'B',
        'C',
        'D',
        'E',
        'F',
        'G',
        'H',
        'I',
        'J',
        'K',
        'L',
        'M',
        'N',
        'O',
        'P',
        'Q',
        'R',
        'S',
        'T',
        'U',
        'V',
        'W',
        'X',
        'Y',
        'Z',
      ].map((char: string, index: number) => (
        <option
          label={char}
          value={char}
          className={`hover:bg-blue-800 ${
            !multiple
              ? 'bg-gray-400'
              : !multipleSets.includes(char)
              ? 'bg-gray-400 py-1 px-10'
              : 'bg-blue-850 text-white py-1 px-10'
          }`}
          key={index}
        />
      ))}
    </select>
  )
}
