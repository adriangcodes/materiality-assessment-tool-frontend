function MatrixQuestion({ questionText, options, value, onChange, matrixType }) {
  // value: { [topic]: selectedValue }
  // onChange: (topic, selectedValue) => void
  const columns = ["1", "2", "3", "4", "5"]; // Customize per matrixType if needed
  return (
    <div>
      <p>{questionText}</p>
      <table>
        <thead>
          <tr>
            <th></th>
            {columns.map(col => <th key={col}>{col}</th>)}
          </tr>
        </thead>
        <tbody>
          {options.map((topic, i) => (
            <tr key={i}>
              <td>{topic}</td>
              {columns.map(col => (
                <td key={col}>
                  <input
                    type="radio"
                    name={topic}
                    value={col}
                    checked={value[topic] === col}
                    onChange={() => onChange(topic, col)}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default MatrixQuestion; 