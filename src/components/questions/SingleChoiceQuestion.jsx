function SingleChoiceQuestion({ questionText, options, value, onChange }) {
  return (
    <div>
      <p>{questionText}</p>
      {options.map((opt, i) => (
        <label key={i}>
          <input
            type="radio"
            name={questionText}
            value={opt}
            checked={value === opt}
            onChange={() => onChange(opt)}
          />
          {opt}
        </label>
      ))}
    </div>
  );
}
export default SingleChoiceQuestion; 