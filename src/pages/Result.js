import React, { Component } from "react";
import "../css/Result.css";
import currency from "../service/currency.js";

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export default class Result extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dispMsg: "Rolling dice...",
      dice: 0,
      bets: this.props.bets,
      balance: this.props.balance,
      winAmt: 0,
      isWon: true,
      isPlay: false,
      locality: this.props.locality,
    };
  }

  displayWinner() {
    const winAmt = this.state.winAmt;
    const balance = this.state.balance + winAmt;
    if (winAmt >= 0) {
      this.setState({
        dispMsg: "Won : " + currency(winAmt, this.state.locality),
        isWon: true,
        isPlay: true,
        balance: balance,
      });
    } else {
      this.setState({
        dispMsg: "Loss : " + currency(Math.abs(winAmt), this.state.locality),
        isPlay: true,
        balance: balance,
        isWon: false,
      });
    }
  }

  calculate() {
    let betAmt = 0;
    this.state.bets.forEach((ele) => {
      betAmt += ele.count;
    });

    const bets = this.state.bets;
    const dice = this.state.dice;
    let winAmt = bets[dice - 1].count * 2 - betAmt;
    this.setState({
      winAmt: winAmt,
    });
  }

  async rollDice() {
    const dice = Math.floor(Math.random() * 6) + 1;
    await delay(2000);

    this.setState({
      dice: dice,
      dispMsg: "Winner : " + dice,
    });

    await delay(2000);

    this.calculate();

    await delay(2000);

    this.displayWinner();
  }

  submit() {
    this.props.parentCallback(this.state.balance, false);
  }
  componentDidMount() {
    this.rollDice();
  }
  render() {
    return (
      <div className="result">
        <div className="displayMsg" woncolor={this.state.isWon}>
          {this.state.dispMsg}
        </div>
        {this.state.isPlay && (
          <button className="displayBtn" onClick={() => this.submit()}>
            Play
          </button>
        )}
      </div>
    );
  }
}
