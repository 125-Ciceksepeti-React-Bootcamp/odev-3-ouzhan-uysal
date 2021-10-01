import './App.scss';
import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Cards from './components/Cards';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cardCount: 0,
    }
  }
  render() {
    return (
      <React.Fragment>
        <header id="pageHeader">
          <Header />
        </header>

        <main id="pageMain">
          <Cards/>
        </main>

        <footer id="pageFooter">
          <Footer />
        </footer>
      </React.Fragment>
    )
  }
}

export default App;
