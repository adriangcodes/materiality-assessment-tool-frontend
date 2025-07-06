// This component allows a user to rank their top 5 choices from a list of options.

function RankingQuestion({ questionText, options, value, onChange }) {
  // Debug log
  console.log('RankingQuestion options:', options, 'value:', value)
  // Normalize options and value to strings
  const stringOptions = (options || []).map(opt => opt?.toString?.() ?? '')
  const stringValue = (value || []).map(val => val?.toString?.() ?? '')

  // Helper to get available options for a given dropdown, always including the current value
  const getAvailableOptions = (dropdownIdx) => {
    const baseOptions = stringOptions.filter(
      (opt) => !stringValue.includes(opt) || stringValue[dropdownIdx] === opt
    )
    // Always include the current value, even if not in baseOptions
    const current = stringValue[dropdownIdx]
    if (current && !baseOptions.includes(current)) {
      return [...baseOptions, current]
    }
    return baseOptions
  }

  const handleSelect = (idx, selected) => {
    const newValue = [...stringValue];
    newValue[idx] = selected;
    onChange(newValue);
  }

  return (
    <div>
      <p>{questionText}</p>
      {[0, 1, 2, 3, 4].map((idx) => (
        <div key={idx} style={{ marginBottom: '1.5rem' }}>
          <label className="ranking-question-label">
            {['1st', '2nd', '3rd', '4th', '5th'][idx]} Choice:
          </label>
          <select
            className="ranking-dropdown"
            value={stringValue[idx] || ""}
            onChange={e => handleSelect(idx, e.target.value)}
          >
            <option value="">Select...</option>
            {getAvailableOptions(idx).map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>
      ))}
    </div>
  )
}

export default RankingQuestion