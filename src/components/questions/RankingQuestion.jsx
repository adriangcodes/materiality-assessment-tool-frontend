function RankingQuestion({ questionText, options, value, onChange }) {
  // Normalize options and value to strings
  const stringOptions = (options || []).map(opt => opt?.toString?.() ?? '')
  const stringValue = (value || []).map(val => val?.toString?.() ?? '')

  // Helper to get available options for a given dropdown
  const getAvailableOptions = (dropdownIdx) => {
    // Exclude options already selected in other dropdowns
    return stringOptions.filter(
      (opt) => !stringValue.includes(opt) || stringValue[dropdownIdx] === opt
    )
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
        <div key={idx} style={{ marginBottom: '1rem' }}>
          <label>
            {['1st', '2nd', '3rd', '4th', '5th'][idx]} Choice:&nbsp;
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
          </label>
        </div>
      ))}
    </div>
  )
}

export default RankingQuestion