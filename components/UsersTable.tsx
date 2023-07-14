export default function UsersTable(props) {
  return (
    <table className="border-separate p-2">
      <thead>
        <tr>
          <th className="border border-blue-850 p-2">S.No.</th>
          <th className="border border-blue-850 p-2">Name</th>
          <th className="border border-blue-850 p-2">Email</th>
        </tr>
      </thead>
      <tbody>
        {props.users.map((user, index) => (
          <tr key={index}>
            <td className="border border-blue-850 p-2">{index + 1}</td>
            <td className="border border-blue-850 p-2">{user.name}</td>
            <td className="border border-blue-850 p-2">{user.email}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
