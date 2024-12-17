import { useState, useEffect, createContext, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import Questions from '../components/Questions';
import { Panel } from 'primereact/panel';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Button } from 'primereact/button';


const QuestionsContext = createContext();

  const QuestionProvider = ({ children, difficulty }) => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(`https://opentdb.com/api.php?amount=${difficulty}&type=multiple`);

        if (response.data && response.data.results && response.data.results.length > 0) {
          const formattedQuestions = response.data.results.map((question) => ({
            question: question.question,
            options: [...question.incorrect_answers, question.correct_answer].sort(() => Math.random() - 0.5),
            correctAnswer: question.correct_answer,
          }));
          setQuestions(formattedQuestions);
        } else {
          setError('No questions found for the selected difficulty. Please try again.');
        }
      } catch (err) {
        console.error('Error fetching questions:', err);
        setError(`Error fetching questions: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [difficulty]);

  return (
    <QuestionsContext.Provider value={{ questions, loading, error }}>
      {children}
    </QuestionsContext.Provider>
  );
};

const Question = () => {
  const navigate = useNavigate();
  const currentPlayer = JSON.parse(localStorage.getItem('currentPlayer'));
  const { questions, loading, error } = useContext(QuestionsContext);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);

  const handleNext = (selectedAnswer) => {
    if (selectedAnswer === questions[currentIndex].correctAnswer) {
      setScore((prevScore) => prevScore + 1);
    }

    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      currentPlayer.score = score + 1;
      const players = JSON.parse(localStorage.getItem('players')) || [];
      players.push({ name: currentPlayer.name, score: currentPlayer.score });
      localStorage.setItem('players', JSON.stringify(players));
      navigate('/result');
    }
  };

  if (loading) {
    return (
      <div className="p-d-flex p-jc-center p-ai-center" style={{ minHeight: '100vh' }}>
        <ProgressSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-d-flex p-flex-column p-ai-center p-jc-center" style={{ minHeight: '100vh', padding: '40px' }}>
        <Panel header="Error" className="panel-opacity" style={{ width: '100%', maxWidth: '600px', textAlign: 'center' }}>
          <h2>{error}</h2>
          <Button
            label="Go Back"
            icon="pi pi-arrow-left"
            className="p-button-rounded p-button-danger p-mt-4"
            onClick={() => navigate('/')}
          />
        </Panel>
      </div>
    );
  }

  return (
    <div className="p-d-flex p-flex-column p-ai-center p-jc-center" style={{ minHeight: '100vh', padding: '40px' }}>
      <Header playerName={currentPlayer.name} />
      <Panel header={`Question ${currentIndex + 1}`} className="panel-opacity" style={{ width: '100%', maxWidth: '1300px', marginTop: '30px' }}>
        <Questions
          question={questions[currentIndex].question}
          options={questions[currentIndex].options}
          onAnswer={handleNext}
        />
      </Panel>
    </div>
  );
};

const QuestionWithProvider = () => {
  const currentPlayer = JSON.parse(localStorage.getItem('currentPlayer'));
  const difficulty = currentPlayer ? currentPlayer.difficulty : 10; 
  return (
    <QuestionProvider difficulty={difficulty}>
      <Question />
    </QuestionProvider>
  );
};

export default QuestionWithProvider;


