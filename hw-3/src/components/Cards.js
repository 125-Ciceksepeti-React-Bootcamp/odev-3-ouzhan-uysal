import React, { useState, useEffect } from 'react';

function Cards() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [modalMessage, setModalMessage] = useState({
    show: false,
  })

  //  <button>&#10003;</button> --> Tik
  //  <button>&#10008;</button> --> X
  // get data from api
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then(response => response.json())
      .then(data => {
        setIsLoaded(true);
        setItems(data);
      }, error => {
        setIsLoaded(true);
        setError(error);
      })
  }, [])
  const deleteCard = id => {
    const copyCards = items.filter(card => card.id !== id)
    setItems(copyCards);
    console.log(`Card #${id} deleted.`)
  }

  if (error) {
    return <div className="errorMessage">Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div className="loadingMessage">Loading...</div>;
  } else {
    return (
      <React.Fragment>
        <div className="card-container">
          {items.map(card => (
            <div className="card-item" key={card.id}>
              {/* card image */}
              <img src="https://lh3.ggpht.com/NUd3Y8lgHqtv3otuSHfSFVR6p4Rig3vTIs92WIGFLOBau1lF-Nv5jiLRfO3wkpyF6Q=w128" alt="cardImage" />

              {/* card title */}
              <p className="title">{card.title}</p>

              {/* Rate stars */}

              {/* card body */}
              <p className="description">{card.body}</p>
              {/* delete card button */}
              <button onClick={() => deleteCard(card.id)}>Remove Card </button>

            </div>
          ))}
        </div>
      </React.Fragment>
    )
  }
}

export default Cards;