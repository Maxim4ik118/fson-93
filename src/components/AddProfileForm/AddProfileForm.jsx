import React, { Component } from 'react';
import cn from 'classnames';
import css from './AddProfileForm.module.css';

export class AddProfileForm extends Component {
  handleFormSubmit = event => {
    event.preventDefault();

    const name = event.currentTarget.elements.profileName.value;
    const age = event.currentTarget.elements.profileAge.value;
    const isFavourite = event.currentTarget.elements.profileFavourite.checked;

    const formData = {
      name,
      age: Math.abs(Number(age)),
      isFavourite
    }

    this.props.handleAddProfile(formData);
    event.currentTarget.reset();
  };

  render() {
    return (
      <form className={css.form} onSubmit={this.handleFormSubmit}>
        <label className={css.formLabel}>
          <span className={css.formLabelText}>Name:</span>
          <input
            className={css.formInput}
            type="text"
            placeholder="Ivan"
            name="profileName"
            required
          />
        </label>
        <label className={css.formLabel}>
          <span className={css.formLabelText}>Age:</span>
          <input
            className={css.formInput}
            type="number"
            name="profileAge"
            required
          />
        </label>
        <label className={cn(css.formLabel, css.formLabelCheckbox)}>
          <span className={css.formLabelText}>Is contact favourite?</span>
          <input type="checkbox" name="profileFavourite" />
        </label>
        <button type="submit">Add New Profile</button>
      </form>
    );
  }
}
