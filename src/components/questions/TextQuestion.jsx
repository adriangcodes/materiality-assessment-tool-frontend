function TextQuestion({ questionText, value, onChange }) {
  return (
    <div>
      <p>{questionText}</p>
      <textarea value={value} onChange={e => onChange(e.target.value)} />
    </div>
  );
}
export default TextQuestion; 