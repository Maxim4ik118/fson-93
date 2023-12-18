import React, { Component } from 'react';

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


export class Modal extends Component {

  handleOverlayClick = (event) => {
    if(event.target === event.currentTarget) {
      this.props.handleCloseModal();
    }
  }

  handleKeyPress = (event) => {
    if(event.code === "Escape") {
      this.props.handleCloseModal();
    }
  }

  componentDidMount() {
    document.body.style.overflow = "hidden";

    window.addEventListener("keydown", this.handleKeyPress)
  }

  componentWillUnmount() {
    document.body.style.overflow = "auto";

    window.removeEventListener("keydown", this.handleKeyPress)
  }

  render() {
    return (
      <div className={css.overlay} onClick={this.handleOverlayClick}>
        <div className={css.modal}>
          <button onClick={this.props.handleCloseModal} className={css.closeModalBtn}>&times;</button>
          <h2>Profile Details</h2>
          <p>Profile Name: {this.props.modalData.name}</p>
          <p>Profile Age: {this.props.modalData.age}</p>
          <p>Is profile favourite?: {this.props.modalData.isFavourite ? '❤' : '🤷‍♂️'} </p>
        </div>
      </div>
    );
  }
}
