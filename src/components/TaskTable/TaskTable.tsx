interface Props {
  tasks: string[]
}

const TaskTable = ({ tasks }: Props): JSX.Element => {
  return (
    <table className="table is-hoverable">
      <thead>
        <tr>
          <th>Task</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map(task => (
          <tr key={task}>{task}</tr>
        ))}
      </tbody>
    </table>
  );
};

export default TaskTable;
