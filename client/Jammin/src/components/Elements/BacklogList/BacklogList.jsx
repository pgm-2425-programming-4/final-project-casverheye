const BacklogList = ({ tasks }) => {
  return (
    <table className="table is-fullwidth">
      <thead>
        <tr>
          <th className="title pl-3">Title</th>
          <th className="title pl-3">Description</th>
          <th className="title pl-3">Status</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map((task) => (
          <tr key={task.id}>
            <td className="is-family-code">{task.title}</td>
            <td className="is-family-code">{task.description}</td>
            <td className="is-family-code">{task.taskStatus?.name}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default BacklogList