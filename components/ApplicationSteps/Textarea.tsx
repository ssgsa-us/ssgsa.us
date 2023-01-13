import { ChangeEventHandler } from 'react'

type Props = {
  name: string
  description?: string
  value: string
  onChange: ChangeEventHandler<HTMLTextAreaElement>
  required: boolean
  rows?: number
  cols?: number
  wordLimit?: number
}

const Textarea = ({
  name,
  description = '',
  value,
  onChange,
  required,
  rows = 4,
  cols = 10,
  wordLimit = 0,
}: Props) => (
  <div className="p-2">
    <div className="flex justify-between items-center">
      <p className="md:text-lg">
        {name}
        {!required ? null : <span className="text-red-850 font-black">*</span>}
      </p>
      {!wordLimit ? null : (
        <p className="text-red-850 font-black">
          {!value ? 0 : value.split(' ').length}/{wordLimit}
        </p>
      )}
    </div>

    {!description ? null : <p className="text-xs md:text-sm">{description}</p>}
    <textarea
      name={name}
      value={value}
      rows={rows}
      cols={cols}
      onChange={onChange}
      className="w-full rounded-xl p-2 mt-1"
    />
  </div>
)

export default Textarea
