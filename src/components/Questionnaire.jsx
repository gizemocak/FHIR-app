import React from 'react';
import { Button } from '@material-ui/core';
import Question from './Question';
import questionnaire from '../assets/questionnaire';

const VALUE_MAP = {
  string: 'valueString',
  date: 'valueDate',
  boolean: 'valueBoolean'
};

const flattenQuestions = questions => {
  const flatQuestions = [];
  questions.forEach(q => {
    if (q.item) {
      flatQuestions.push(...flattenQuestions(q.item));
    } else {
      flatQuestions.push(q);
    }
  });
  return flatQuestions;
};

const createValueObject = (type, value) => {
  const valueObject = {};

  valueObject[VALUE_MAP[type]] = value;
  return valueObject;
};

const parseResults = (questionnaireResponse, answers) => {
  answers.forEach(answer => {
    let linkIdNumber = Number(answer.linkId);
    if (linkIdNumber % 1 === 0) {
      let question = questionnaireResponse.item.find(
        qr => qr.linkId === answer.linkId
      );
      question.answer = [answer.answer];
    } else {
      let question = questionnaireResponse.item.find(
        qr => Number(qr.linkId) === parseInt(answer.linkId)
      );

      if (question) {
        question = question.item.find(qr => qr.linkId === answer.linkId);
        question.answer = [answer.answer];
      }
    }
  });
  questionnaireResponse.resourceType = 'QuestionnaireResponse';
  questionnaireResponse.status = 'completed';
  return questionnaireResponse;
};

const Questionnaire = () => {
  const questionnaireResponse = JSON.parse(JSON.stringify(questionnaire));
  const [answers, setAnswers] = React.useState(
    flattenQuestions(questionnaireResponse.item)
  );
  const [isFormValid, setIsFormValid] = React.useState(false);
  const [errors, setErrors] = React.useState({});
  const [result, setResult] = React.useState(null);

  const hasAllAnswers = React.useMemo(() => {
    return answers.every(ans => ans.answer && Array.isArray(ans.answer));
  }, [answers]);

  return (
    <div>
      <h1 className="title">Questionnaire</h1>
      <form validate>
        {answers.map(answer => {
          return (
            <Question
              type={answer.type}
              text={answer.text}
              linkId={answer.linkId}
              onChange={(value, linkId, type) => {
                let valueObject = createValueObject(type, value);
                setAnswers(
                  answers.map(el =>
                    el.linkId === linkId
                      ? {
                          ...el,
                          ...{
                            answer: [valueObject]
                          }
                        }
                      : el
                  )
                );
              }}
              onError={(error, linkId) => {
                let newErrors = {};
                if (error) {
                  let errorObject = {};
                  errorObject[linkId] = error;
                  newErrors = { ...errors, ...errorObject };
                  setErrors(newErrors);
                } else {
                  newErrors = { ...errors };
                  delete newErrors[linkId];
                  setErrors(newErrors);
                }
                setIsFormValid(Object.keys(newErrors).length === 0);
              }}
            />
          );
        })}
        <Button
          disabled={!isFormValid || !hasAllAnswers}
          onClick={() => {
            let result = parseResults(questionnaireResponse, answers);
            setResult(result);
          }}
        >
          Submit
        </Button>
      </form>
      {result && (
        <div>
          <pre>{JSON.stringify(result, null, 3)}</pre>
        </div>
      )}
    </div>
  );
};

export default Questionnaire;
