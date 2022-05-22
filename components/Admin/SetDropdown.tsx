import { ChangeEventHandler } from 'react'

type Props = {
  set: string
  onChange: ChangeEventHandler<HTMLSelectElement>
  disabled: boolean
}

export default function SetDropdown({ set, onChange, disabled }: Props) {
  return (
    <select
      className="text-white text-base md:text-lg py-1 px-3 rounded-lg bg-blue-850"
      value={set}
      disabled={disabled}
      onChange={onChange}
    >
      <option
        label="Select"
        value={undefined || null || ''}
        className="bg-gray-400 hover:bg-blue-850"
      />
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
          className="bg-gray-400 hover:bg-blue-850"
          key={index}
        />
      ))}
    </select>
  )
}
