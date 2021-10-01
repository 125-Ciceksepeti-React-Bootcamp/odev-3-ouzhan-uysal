import './App.scss';
import React from 'react';
import Cards from './components/Cards';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: '',
      cardCount: props.cards,
      cards: [],
      filteredCards: []
    }
  }
  handleInput = e => {
    this.setState({
      searchInput: e.target.value
    })
  }
  handleSearch = e => {
    const filteredCards = this.state.cards.filter(card => card.title.includes(e.target.value));
    this.setState({
      filteredCards
    })
  }
  render() {
    return (
      <React.Fragment>
        <header id="pageHeader">
          <div className="header-split">
            <img src="./ciceksepeti.png" alt="header-logo" />

            <input type="text" value={this.state.searchInput} placeholder="Search..." onChange={this.handleInput} />

            <p>Number of Cards: { this.state.cardCount }</p>
          </div>
        </header>

        <main id="pageMain">
          <Cards itemCount={this.state.cardCount} />
        </main>

        <footer id="pageFooter">
          <a href="https://github.com/ouzhan-uysal">GitHub</a>
        </footer>
      </React.Fragment>
    )
  }
}

export default App;
