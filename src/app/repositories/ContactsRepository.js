const { v4 } = require('uuid');

let contacts = [
  {
    id: v4(),
    name: 'Victor',
    email: 'victorguirra@mail.com',
    phone: '123456789',
    category_id: v4(),
  },
  {
    id: v4(),
    name: 'Carlos',
    email: 'carlosdev@mail.com',
    phone: '123123123',
    category_id: v4(),
  },
];

class ContactsRespository {
  findAll() {
    return new Promise((resolve) => resolve(contacts));
  }

  findById(id) {
    return new Promise((resolve) => resolve(
      contacts.find((contact) => contact.id === id),
    ));
  }

  findByEmail(email) {
    return new Promise((resolve) => resolve(
      contacts.find((contact) => contact.email === email),
    ));
  }

  create({
    name, email, phone, category_id,
  }) {
    return new Promise((resolve) => {
      const newContact = {
        id: v4(),
        name,
        email,
        phone,
        category_id,
      };

      contacts.push(newContact);
      resolve(contacts);
    });
  }

  update(id, {
    name, email, phone, category_id,
  }) {
    return new Promise((resolve) => {
      const updatedContact = {
        id,
        name,
        email,
        phone,
        category_id,
      };

      contacts = contacts.map((contact) => (
        contact.id === id ? updatedContact : contact
      ));

      resolve(updatedContact);
    });
  }

  delete(id) {
    return new Promise((resolve) => {
      contacts = contacts.filter((contact) => contact.id !== id);
      resolve();
    });
  }

//   delete(id) {
//     return new Promise((resolve) => resolve(
//       contacts = contacts.filter((contact) => contacts.id !== id),
//     ));
//   }
}

module.exports = new ContactsRespository();
