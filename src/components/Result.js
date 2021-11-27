import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransitionGroup } from 'react-transition-group';

function Result(props) {
  return (
    <CSSTransitionGroup
      className="container result"
      component="div"
      transitionName="fade"
      transitionEnterTimeout={800}
      transitionLeaveTimeout={500}
      transitionAppear
      transitionAppearTimeout={500}
    >
      <div>
        You prefer <strong>{props.quizResult}</strong>!

        your Selection <ul>
          <li>A :{props.quizSelection.a}</li>
          <li>b :{props.quizSelection.b}</li>
          <li>C: {props.quizSelection.c}</li>

        </ul>
      </div>
      <button className="btn btn-primary margin-top-20" onClick={props.restartQuiz}>Restart</button>
    </CSSTransitionGroup>
  );
}

Result.propTypes = {
  quizResult: PropTypes.string.isRequired
};

export default Result;
