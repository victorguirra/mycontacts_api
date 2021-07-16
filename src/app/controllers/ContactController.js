const ContactsRespository = require('../repositories/ContactsRepository');

class ContactController {
  async index(request, response) {
    const contacts = await ContactsRespository.findAll();

    response.json(contacts);
  }

  async show(request, response) {
    const { id } = request.params;
    const contact = await ContactsRespository.findById(id);

    if (!contact) {
      // 404: Not Found
      return response.status(404).json({ error: 'User not found' });
    }

    response.json(contact);
  }

  async store(request, response) {
    const {
      name, email, phone, category_id,
    } = request.body;

    if (!name) {
      return response.status(400).json({ erro: 'Name is required' });
    }

    const contactExists = await ContactsRespository.findByEmail(email);

    if (contactExists) {
      return response.status(400).json({ erro: 'This email is already in use' });
    }

    const contact = await ContactsRespository.create({
      name, email, phone, category_id,
    });

    response.json(contact);
  }

  async update(request, response) {
    const { id } = request.params;
    const {
      name, email, phone, category_id,
    } = request.body;

    const contactExists = await ContactsRespository.findById(id);

    if (!contactExists) {
      return response.status(404).json({ error: 'User not found' });
    }

    if (!name) {
      return response.status(400).json({ error: 'Name is required' });
    }

    const contactByEmail = await ContactsRespository.findByEmail(email);

    if (contactByEmail && contactByEmail.id !== id) {
      return response.status(400).json({ error: 'This email is already in use' });
    }

    const contact = await ContactsRespository.update(id, {
      name, email, phone, category_id,
    });

    response.json(contact);
  }

  async delete(request, response) {
    const { id } = request.params;
    const contact = await ContactsRespository.findById(id);

    if (!contact) {
      return response.status(404).json({ error: 'User not found' });
    }

    await ContactsRespository.delete(id);
    // 204: No Content
    response.sendStatus(204);
  }
}

// Singleton
module.exports = new ContactController();
