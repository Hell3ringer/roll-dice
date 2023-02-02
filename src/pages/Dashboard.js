import React, { Component } from "react";
import "../css/Dashboard.css";
import Result from "./Result";
import Game from "./Game";
import Play from "./Play";
import currency from "../service/currency.js";

// const curr = (amount , locality) => currency(amount , locality);

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      balance: 100,
      isPlay: true,
      isGame: false,
      isResult: false,
      bets: [],
      totalGames: 0,
      wonGames: 0,
      locality: "USD",
    };
    this.handleCurrency = this.handleCurrency.bind(this);
  }
  handleGame = (bets, flag) => {
    this.setState({
      bets: bets,
      isGame: flag,
      isResult: !flag,
    });
  };
  handlePlay = (flag) => {
    this.setState({
      isPlay: flag,
      isGame: !flag,
    });
  };
  handleResult = (balance, flag) => {
    let totalGames = this.state.totalGames;
    let wonGames = this.state.wonGames;
    if (balance >= this.state.balance) wonGames++;
    totalGames++;
    this.setState({
      isResult: flag,
      balance: balance,
      isPlay: !flag,
      wonGames: wonGames,
      totalGames: totalGames,
    });
  };
  handleCurrency(event) {
    if (event === undefined) return;

    this.setState({
      locality: event.target.value,
    });
  }
  render() {
    return (
      <div className="dash">
        <div className="navbar">
          <h1>Dice Roll</h1>
          {this.state.isPlay && (
            <select value={this.state.locality} onChange={this.handleCurrency}>
              <option value="INR">INR</option>
              <option value="USD">USD</option>
              <option value="JPY">JPY</option>
            </select>
          )}
          <h1>👛 {currency(this.state.balance, this.state.locality)}</h1>
        </div>
        {this.state.isPlay && (
          <Play id="isPlay" parentCallback={this.handlePlay}></Play>
        )}
        {this.state.isGame && (
          <Game
            id="isGame"
            parentCallback={this.handleGame}
            locality={this.state.locality}
          ></Game>
        )}
        {this.state.isResult && (
          <Result
            parentCallback={this.handleResult}
            bets={this.state.bets}
            balance={this.state.balance}
            locality={this.state.locality}
          ></Result>
        )}
        {this.state.isPlay && (
          <div className="winper">
            <div>Win : {this.state.wonGames}</div>
            <div>Loss : {this.state.totalGames - this.state.wonGames}</div>
          </div>
        )}
      </div>
    );
  }
}
