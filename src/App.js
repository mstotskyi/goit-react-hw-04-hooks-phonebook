import './App.css';
import { useState, useEffect } from 'react';

import { ContactForm } from 'components/ContactForm/ContactForm';
import { Filter } from 'components/Filter/Filter';
import { ContactList } from 'components/ContactList/ContactList';

export default function App() {
  const [contacts, setContacts] = useState(
    JSON.parse(window.localStorage.getItem('localContacts')) ?? [],
  );
  const [filter, setFilter] = useState('');

  const addNewCntacts = obj => {
    setContacts(prevState => [...prevState, obj]);
  };

  useEffect(() => {
    if (contacts !== [])
      window.localStorage.setItem('localContacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleOnChangefilter = e => {
    switch (e.target.name) {
      case 'contact':
        setContacts(e.target.value);
        break;
      case 'filter':
        setFilter(e.target.value);
        break;
      default:
        return;
    }
  };

  const contactsFilter = () => {
    return contacts.filter(contact =>
      contact.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase()),
    );
  };

  const filteredContacts = contactsFilter();

  const deleteContact = id => {
    setContacts(prevState => prevState.filter(contact => contact.id !== id));
  };

  return (
    <div className="App">
      <h1>Phonebook</h1>
      <ContactForm addNewCntacts={addNewCntacts} contacts={contacts} />
      <div className="contacts-wrapper">
        <h2 className="contacts-title">Contacts</h2>
        <Filter
          contacts={contacts}
          filter={filter}
          handleOnChangefilter={handleOnChangefilter}
        />
        <ContactList
          contacts={filteredContacts}
          deleteContact={deleteContact}
        />
      </div>
    </div>
  );
}
