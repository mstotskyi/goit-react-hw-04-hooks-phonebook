import { useState } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuid } from 'uuid';

import styles from 'components/ContactForm/ContactForm.module.css';

export function ContactForm({ addNewCntacts, contacts }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const IdName = uuid();
  const IdNumber = uuid();

  const handleOnSubmit = e => {
    e.preventDefault();
    const obj = {
      name: name,
      number: number,
      id: uuid(),
    };
    const existedContact = contacts.some(
      element =>
        element.name.toLocaleLowerCase() === obj.name.toLocaleLowerCase(),
    );

    if (existedContact) {
      return alert(`${obj.name} is already in the contact list`);
    }
    addNewCntacts(obj);
    resetForm();
  };

  const handleOnChange = e => {
    switch (e.target.name) {
      case 'name':
        setName(e.target.value);
        break;
      case 'number':
        setNumber(e.target.value);
        break;
      default:
        return;
    }
  };

  const resetForm = () => {
    setName('');
    setNumber('');
  };

  return (
    <form onSubmit={handleOnSubmit} className={styles.form}>
      <label htmlFor={IdName} className={styles.label}>
        Name
      </label>
      <br />
      <input
        className={styles.formInput}
        id={IdName}
        type="text"
        name="name"
        value={name}
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
        required
        onChange={handleOnChange}
      />
      <br />
      <label htmlFor={IdNumber} className={styles.label}>
        Number
      </label>
      <br />
      <input
        className={styles.formInput}
        id={IdNumber}
        type="tel"
        name="number"
        value={number}
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
        required
        onChange={handleOnChange}
      />
      <br />
      <button type="submit">Add contact</button>
    </form>
  );
}

ContactForm.propTypes = {
  contacts: PropTypes.array,
  addNewCntacts: PropTypes.func,
};
