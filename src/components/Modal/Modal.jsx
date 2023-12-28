import React, { useEffect, useRef, useState } from 'react';

import css from './Modal.module.css';

/*
  componenDidMount - метод житєвого циклу, що викликається один
                     раз після того, як компонента відрендерелася.
  Для чого використовують:
    - надсилають мережеві запити.
    - зчитати дані з локального сховища.
    - встановлюються глобальні слухачі подій (window.addEventListener)
    - встановлюються setTimeout, setInterval.

  componentWillUnmount - метод житєвого циклу, що викликається один
                     раз перед ти, як компонента повністю видалиться з DOM-дерева.
  Для чого використовують:
    - відхиляти мережеві запити.
    - прибирають глобальні слухачі подій (window.removeEventListener)
    - очищуються clearTimeout, clearInterval.
  
  componentDidUpdate - метод житєвого циклу, що викликається кожен раз
                    пілся того, як компонента оновилася(змінилися пропси, або стан).
  Для чого використовують:
    - надсилають мережеві запити.
    - оновлються(синхронізуються) стейт з локальним сховищем.
    - відслідковується яка частина стану, або пропсів змінилася (prevState.isModalOpen !=== this.state.isModalOpen)
*/

// export class Modal extends Component {

//   handleOverlayClick = (event) => {
//     if(event.target === event.currentTarget) {
//       this.props.handleCloseModal();
//     }
//   }

//   handleKeyPress = (event) => {
//     if(event.code === "Escape") {
//       this.props.handleCloseModal();
//     }
//   }

//   componentDidMount() {
//     document.body.style.overflow = "hidden";

//     window.addEventListener("keydown", this.handleKeyPress)
//   }

//   componentWillUnmount() {
//     document.body.style.overflow = "auto";

//     window.removeEventListener("keydown", this.handleKeyPress)
//   }

//   render() {
//     return (
//       <div className={css.overlay} onClick={this.handleOverlayClick}>
//         <div className={css.modal}>
//           <button onClick={this.props.handleCloseModal} className={css.closeModalBtn}>&times;</button>
//           <h2>Profile Details</h2>
//           <p>Profile Name: {this.props.modalData.name}</p>
//           <p>Profile Age: {this.props.modalData.age}</p>
//           <p>Is profile favourite?: {this.props.modalData.isFavourite ? '❤' : '🤷‍♂️'} </p>
//         </div>
//       </div>
//     );
//   }
// }

// const button = document.querySelector('.close-modal-btn')
// button.style.width = '500px';
// button.textContent = "Close Modal";
// button.focus();


export const Modal = ({ handleCloseModal, modalData }) => {
  const [clickCounter, setClickCounter] = useState(0);
  const [tabPanel, setTabPanel] = useState('users'); // "users" | "groups" | "comments"
  const buttonRef = useRef();
  const inputRef = useRef();
  const isFirstRenderRef = useRef(true);

  const handleOverlayClick = event => {
    if (event.target === event.currentTarget) {
      handleCloseModal();
    }
  };

  useEffect(() => {
    const handleKeyPress = event => {
      if (event.code === 'Escape') {
        handleCloseModal();
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyPress);

    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleCloseModal]);

  useEffect(() => {
    if(!isFirstRenderRef.current) {
      console.log('Tab panel: ' + tabPanel)
    }

    return () => isFirstRenderRef.current = false
  }, [tabPanel])

  useEffect(() => {
    inputRef.current.focus();
  }, [])

  const handleCounterClick = () => {
    setClickCounter(prevState => prevState + 1);
    // console.log(buttonRef.current.textContent);
    inputRef.current.focus();
  };

  return (
    <div className={css.overlay} onClick={handleOverlayClick}>
      <div className={css.modal}>
        <button onClick={handleCloseModal} className={css.closeModalBtn}>
          &times;
        </button>
        <br />
        <br />
        <p>Click counter: {clickCounter}</p>
        <button ref={buttonRef} onClick={handleCounterClick}>Change counter</button>
        <br />
        <br />
        <label >
          <span>Some text input</span>
          <input type="text" ref={inputRef} placeholder='Hello fson93' />
        </label>
        <br />
        <button onClick={() => setTabPanel('users')}>Users</button>
        <button onClick={() => setTabPanel('groups')}>Groups</button>
        <button onClick={() => setTabPanel('comments')}>Comments</button>

        {tabPanel === 'users' && (
          <>
            <h2>Profile Details</h2>
            <p>Profile Name: {modalData.name}</p>
            <p>Profile Age: {modalData.age}</p>
            <p>Is profile favourite?: {modalData.isFavourite ? '❤' : '🤷‍♂️'} </p>
          </>
        )}
        {tabPanel === 'groups' && <p>Here goes some groups</p>}
        {tabPanel === 'comments' && <p>Here goes comments!!</p>}
      </div>
    </div>
  );
};
