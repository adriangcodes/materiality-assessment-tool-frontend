// This file acts as a central export hub (a "barrel file") for all question component types.
// It allows other parts of the app to import components more cleanly, like:
// import { SingleChoiceQuestion, TextQuestion } from './components/questions'

export { default as SingleChoiceQuestion } from './SingleChoiceQuestion';
export { default as TextQuestion } from './TextQuestion';
export { default as MatrixQuestion } from './MatrixQuestion';
export { default as RankingQuestion } from './RankingQuestion'; 