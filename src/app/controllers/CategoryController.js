const CategoriesRepository = require('../repositories/CategoriesRepository');

class CategoryController {
  async index(request, response) {
    const categories = await CategoriesRepository.findAll();

    response.json(categories);
  }

  async show(request, response) {
    const { id } = request.params;

    const category = await CategoriesRepository.findById(id);

    if (!category) {
      return response.status(404).json({ error: 'Category not found' });
    }

    return response.status(200).json({ category });
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

  async update(request, response) {
    const { id } = request.params;
    const { name } = request.body;

    const category = await CategoriesRepository.update(id, name);

    return response.status(200).json(category);
  }
}

module.exports = new CategoryController();
