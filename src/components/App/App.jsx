import { Component } from 'react';
import { GlobalStyles } from '../GlobalStyles';
import { nanoid } from 'nanoid';
import PhoneBookForm from '../PhoneBookForm';
import ContactsList from '../ContactsList';
import Filter from 'components/Filter';
import Layout from '../Layout';
import { Title, Title2 } from './App.styled';

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  filterContacts = contactName => {
    const contacts = this.state.contacts;
    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(contactName)
    );
  };

  getFilteredName = filterName => {
    this.setState({ filter: filterName });
  };

  addContact = values => {
    const contacts = this.state.contacts;
    const haveName = contacts.find(
      contact => contact.name.toLowerCase() === values.name.toLowerCase()
    );
    if (haveName) {
      alert(`${values.name} is already in the contact list`);
      return;
    }

    const newContact = {
      name: values.name,
      number: values.number,
      id: nanoid(),
    };
    console.log(newContact);

    this.setState(prevState => {
      return {
        contacts: [...prevState.contacts, newContact],
      };
    });
  };

  deleteContact = contactId => {
    console.log('deleteContact', contactId);
    this.setState(prevState => {
      return {
        contacts: prevState.contacts.filter(
          contact => contact.id !== contactId
        ),
      };
    });
  };

  render() {
    const data = this.state;

    return (
      <Layout>
        <Title>My phonebook</Title>
        <PhoneBookForm onSubmit={this.addContact} />

        <Title2>My contacts</Title2>
        <Filter onFilter={this.getFilteredName} value={data.filter} />
        <ContactsList
          contacts={
            data.filter ? this.filterContacts(data.filter) : data.contacts
          }
          onDelete={this.deleteContact}
        />

        <GlobalStyles />
      </Layout>
    );
  }
}

export default App;
