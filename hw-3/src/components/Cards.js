import React, { useState, useEffect } from 'react';
// import Modals from './Modals';
import { Rating } from 'react-simple-star-rating'
import Swal from 'sweetalert2';

function Cards(props) {
  // console.log("Props: ", props.itemCount)
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [itemCount, setItemCount] = useState(0);
  const [rating, setRating] = useState(0) // initial rating value
  // const [modalMessage, setModalMessage] = useState({
  //   show: false,
  //   id: 0,
  //   edit: false,
  //   remove: false,
  // })
  // rating value
  const handleRating = (rate) => {
    setRating(rate)
    // Some logic
  }
  // card counter
  useEffect(() => {
    setItemCount(items.length)
  }, [items])
  // get data from api
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then(res => res.json())
      .then(data => {
        setIsLoaded(true);
        setItems(data);
        setItemCount(itemCount + 1)
      }, error => {
        setIsLoaded(true);
        setError(error);
      })
  }, [])
  const deleteCard = id => {
    Swal.fire({
      title: 'Aman Ha!',
      text: "Gidiyor bak emin misin?",
      icon: 'warning',
      showDenyButton: true,
      confirmButtonColor: '#093',
      denyButtonColor: '#c00',
      confirmButtonText: 'Sil!',
      denyButtonText: 'Silme!'
    }).then((result) => {
      if (result.isConfirmed) {
        const copyCards = items.filter(card => card.id !== id)
        setItems(copyCards);
        setItemCount(itemCount - 1);

        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })

        Toast.fire({
          icon: 'success',
          title: 'Kart başarıyla silindi'
        })
      }
      else {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })

        Toast.fire({
          icon: 'warning',
          title: 'İşlem iptal edildi.'
        })
      }
    })
  }
  const editCard = async id => {
    // open edit modal
    const { value: formValues } = await Swal.fire({
      title: `Card${id}: New Values`,
      html:
        '<p>Title:</p> <input id="newTitleInput" class="swal2-input">' +
        '<p>Body:</p> <input id="newBodyInput" class="swal2-input">',
      focusConfirm: false,
      showDenyButton: true,
      confirmButtonColor: '#093',
      denyButtonColor: '#c00',
      icon: 'question',
      preConfirm: () => {
        return [
          document.getElementById('newTitleInput').value,
          document.getElementById('newBodyInput').value
        ]
      },
      preDeny: () => {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })

        Toast.fire({
          icon: 'warning',
          title: 'Değişiklik Yapılmadı!'
        })
      }
    })
    if (formValues) {
      document.getElementById(`title${id}`).innerHTML = formValues[0];
      document.getElementById(`description${id}`).innerHTML = formValues[1];

      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })

      Toast.fire({
        icon: 'success',
        title: 'İçerik değişikliği başarılı.'
      })
    }
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
            <div className="card-item" key={card.id} id={"card" + card.id}>
              {/* card image */}
              <img src="https://lh3.ggpht.com/NUd3Y8lgHqtv3otuSHfSFVR6p4Rig3vTIs92WIGFLOBau1lF-Nv5jiLRfO3wkpyF6Q=w128" alt="cardImage" />

              {/* card title */}
              <p className="title" id={"title" + card.id}>{card.title}</p>

              {/* Rate stars */}
              <Rating onClick={handleRating} ratingValue={rating} /* Rating Props */ />

              {/* card body */}
              <p className="description" id={"description" + card.id}>{card.body}</p>
              <div>
                {/* delete card button */}
                <button onClick={() => deleteCard(card.id)}>Remove Card</button>
                {/* edit card button */}
                <button onClick={() => editCard(card.id)}>Edit Card</button>
              </div>
            </div>
          ))}
        </div>
      </React.Fragment>
    )
  }
}

export default Cards;