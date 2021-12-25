import { useState, useEffect } from "react";
import shortid from "shortid";
import ContactForm from "../ContactForm/ContactForm.jsx";
import Filter from "../Filter/Filter.jsx";
import ContactList from "../ContactList/ContactList.jsx";
import s from "./App.module.css";

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState("");
  const localstorageKey = "contacts";

  useEffect(() => {
    const parsedContacts = JSON.parse(localStorage.getItem(localstorageKey));
    if (parsedContacts) {
      setContacts(parsedContacts);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(localstorageKey, JSON.stringify(contacts));
  }, [contacts]);

  const addNewContact = (name, number) => {
    const normalizedName = name.toLowerCase();

    const duplicateName = contacts.find(
      (contact) => contact.name.toLowerCase() === normalizedName
    );

    if (duplicateName) {
      alert(`${name} is already in contacts.`);
      return;
    }
    if (name === "") {
      alert(`Please type your info in the field. It is empty.`);
    } else {
      const contactName = {
        name: name,
        number: number,
        id: shortid.generate(),
      };

      setContacts((prevState) => [...prevState, contactName]);
    }
  };

  const deleteContact = (id) => {
    setContacts(contacts.filter((contact) => contact.id !== id));
  };

  const filterContacts = () => {
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const updateFilter = (event) => {
    const { value } = event.currentTarget;
    setFilter(value);
  };

  return (
    <div className={s.container}>
      <h1 className={s.title}>Phonebook</h1>
      <ContactForm onSubmit={addNewContact} />
      <h2 className={s.title}>Contacts</h2>
      <Filter filter={filter} onChange={updateFilter} />
      <ContactList contacts={filterContacts()} onClick={deleteContact} />
    </div>
  );
};

export default App;
