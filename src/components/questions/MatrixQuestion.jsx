function MatrixQuestion({ questionId, questionText, options, value, onChange, matrixType }) {
  let columns = [];
  if (matrixType === "matrix-importance") {
    columns = ["Not Important", "Somewhat Important", "Important", "Very Important"];
  } else if (matrixType === "matrix-impact") {
    columns = ["No Impact", "Minor Impact", "Moderate Impact", "Significant Impact"];
  } else if (matrixType === "matrix-performance") {
    columns = ["Poor", "Fair", "Good", "Excellent"];
  } else {
    columns = ["1", "2", "3", "4", "5"];
  }

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
                    name={`matrix-${questionId}-${i}`}
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
  )
}
export default MatrixQuestion