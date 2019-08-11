import React, { Component } from "react";
import moment from "moment";

import CollapseAnswers from './CollapseAnswers.jsx';

class Answers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      answers: [this.props.answers],
      username: this.props.username,
      createdDate: this.props.createdDate,
      show: true
    };
  }

  render() {
    const {answers} = this.state;
    const nthAnswers = this.props.answers.length - 1;

    // all answers except the first 1
    const answerForCollaps = [...this.props.answers];
    answerForCollaps.splice(0,1);
    return (
        <div className="a-fixed-left-grid a-spacing-base">
          <div
            className="a-fixed-left-grid-inner"
            style={{ paddingLeft: "100px" }}
          >
            <div
              className="a-fixed-left-grid-col a-col-left"
              style={{ width: "100px", marginLeft: "-100px", float: "left" , textAlign: 'left'}}
            >
              <span className="a-text-bold">Answer:</span>
            </div>
            {answers.map((answer, id) => (
              <div key={id}
                className="a-fixed-left-grid-col a-col-right"
                style={{ paddingLeft: "0%", float: "left", textAlign: 'left' }}
              >
                <span>{answer}</span>
                <br />
                <span className="a-color-tertiary">
                  By {this.state.username} on {moment(this.state.createdDate).format("LL")}
                </span>
                <br />
                <div>
                  <CollapseAnswers nthAnswers={nthAnswers} id={answer._id} answersExceptOne={answerForCollaps}/>
                </div>
              </div>
            ))}
          </div>
        </div>
    );
  }
}

export default Answers;
