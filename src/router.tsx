import { createBrowserRouter } from 'react-router-dom';
import QuestionPanel from './components/QuestionPanel';
import Question from './features/question/Question';
import StartGame from './components/StartGame';

const App = () => (
  <>
    <StartGame />
  </>
)

export const router = createBrowserRouter([
  { path: '/trivia-marathon', element: <App /> },
  { path: '/trivia-marathon/pick-category', element: <QuestionPanel /> },
  { path: '/trivia-marathon/question', element: <Question /> }
]);