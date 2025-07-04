function RankingQuestion({ questionText, options, value, onChange }) {
  // value: array of selected options in order
  // onChange: (newOrder) => void
  return (
    <div>
      <p>{questionText}</p>
      {/* TODO: Implement drag-and-drop or select-based ranking */}
      <p>[Ranking UI goes here]</p>
    </div>
  );
}
export default RankingQuestion; 