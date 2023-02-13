import React, { Component } from "react";
import "../css/Game.css";
import currency from "../service/currency.js";

const delay = (ms) => new Promise((res) => setTimeout(res, ms)); // used to delay time

export default class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bets: [],
      timer: 10,
      displayBet: true,
      displayTimer: true,
      betsClosed: false,
      locality: this.props.locality,
    };
  }
  decrease(id) {
    let count = this.state.bets;
    if (count[id - 1].count <= 0) return;
    count[id - 1].count--;
    this.setState({
      bets: count,
    });
  }
  increase(id) {
    let count = this.state.bets;
    count[id - 1].count++;
    this.setState({
      bets: count,
    });
  }

  async timer() {
    console.log("timer started....");

    let timeleft = this.state.timer;
    let tempTime = setInterval(async () => {
      if (timeleft <= 0) {
        // stop betting
        this.setState({
          displayTimer: false,
          betsClosed: true,
        });
        await delay(3000);
        this.props.parentCallback(this.state.bets, false);
        clearInterval(tempTime);
        return;
      } else {
        this.setState({ timer: timeleft });
      }
      timeleft -= 1;
    }, 1000);
  }

  componentDidMount() {
    const initBets = [
      {
        id: 1,
        count: 0,
      },
      {
        id: 2,
        count: 0,
      },
      {
        id: 3,
        count: 0,
      },
      {
        id: 4,
        count: 0,
      },
      {
        id: 5,
        count: 0,
      },
      {
        id: 6,
        count: 0,
      },
    ];
    this.setState({
      bets: initBets,
    });

    this.timer();
  }
  render() {
    return (
      <div className="game">
        {this.state.displayTimer && (
          <div className="game_timer">{this.state.timer}S</div>
        )}

        <div className="bets">
          {this.state.displayBet &&
            this.state.bets.map((bet, idx) => {
              return (
                <li
                  key={bet.id}
                  className="card"
                  disabled={this.state.betsClosed}
                >
                  <div className="card_text">{bet.id}</div>
                  <div className="card_counter">
                    <button onClick={() => this.decrease(bet.id)}>-</button>
                    <div>{currency(bet.count, this.state.locality)}</div>
                    <button onClick={() => this.increase(bet.id)}>+</button>
                  </div>
                </li>
              );
            })}
        </div>
        {this.state.betsClosed && <div>Bets closed. Hang on...</div>}
      </div>
    );
  }
}
