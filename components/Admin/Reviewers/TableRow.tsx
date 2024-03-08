import { useState } from 'react'
import SetDropdown from '../SetDropdown'

type Props = {
  index: number
  name: string
  email: string
  sets: Array<string>
  updateSets: (sets: Array<string>) => void
}

export default function ReviewersTableRow({
  index,
  name,
  email,
  sets = [],
  updateSets,
}: Props) {
  const [selectedSets, setSelectedSets] = useState([])

  return (
    <tr>
      <td className="border border-blue-850 p-2 text-center sticky left-0 z-10 bg-gray-200">
        {index}
      </td>
      <td className="border border-blue-850 p-2 sticky left-12 z-10 bg-gray-200">
        {name}
      </td>
      <td className="border border-blue-850 p-2">{email}</td>
      <td className="border border-blue-850 p-2">
        {!sets.length ? null : sets.join(', ')}
      </td>
      <td className="border border-blue-850 p-2">
        <div className="flex justify-center">
          <SetDropdown
            multipleSets={selectedSets}
            multiple={true}
            disabled={false}
            onChange={(e) => {
              if (selectedSets.includes(e.target.value))
                setSelectedSets((prev) =>
                  prev.filter((set) => set != e.target.value),
                )
              else setSelectedSets((prev) => [...prev, e.target.value])
            }}
          />
        </div>
      </td>
      <td className="border border-blue-850 p-2">
        <button
          className="text-white text-base md:text-lg py-1 px-3 rounded-lg bg-blue-850"
          onClick={() => updateSets(selectedSets)}
        >
          Update
        </button>
      </td>
    </tr>
  )
}
