const CategoriesRepository = require('../repositories/CategoriesRepository');

class CategoryController {
  async index(request, response) {
    const categories = await CategoriesRepository.findAll();

    response.json(categories);
  }

  async store(request, response) {
    const { name } = request.body;
    const nameExists = await CategoriesRepository.findByName(name);

    if (!name) {
      return response.status(400).json({ error: 'Name is required' });
    }

    if (nameExists) {
      return response.status(400).json({ error: 'Category already exists' });
    }

    const category = await CategoriesRepository.create({ name });

    response.json(category);
  }
}

module.exports = new CategoryController();
