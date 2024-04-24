export default function EvaluatorsTableHeader() {
  return (
    <thead>
      <tr>
        <th className="border border-blue-850 p-2 sticky left-0 z-10 bg-gray-200">
          S.No.
        </th>
        <th className="border border-blue-850 p-2 sticky left-0 z-10 bg-gray-200">
          Name
        </th>
        <th className="border border-blue-850 p-2" rowSpan={3}>
          Email Address
        </th>
        <th className="border border-blue-850 p-2" rowSpan={3}>
          Assigned Sets
        </th>
        <th className="border border-blue-850 p-2" rowSpan={3}>
          Select Sets To Update
        </th>
        <th className="border border-blue-850 p-2" rowSpan={3}>
          Update
        </th>
      </tr>
    </thead>
  )
}
