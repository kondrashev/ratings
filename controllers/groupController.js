const { Group } = require("../models/models");
const ApiError = require("../error/ApiError");

class GroupController {
  async addGroup(req, res, next) {
    try {
      const { name, disciplineId, moodle } = req.body;
      const getGroup = await Group.findOne({ where: { name } });
      if (!getGroup) {
        const group = await Group.create({ name, disciplineId, moodle });
        return res.json(group);
      } else {
        return res.json("This group already exists!!!");
      }
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
  async updateGroup(req, res, next) {
    try {
      const { id, name, moodle } = req.body;
      const group = await Group.update(name ? { name } : { moodle }, {
        where: { id },
      });
      return res.json(group);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
  async getGroups(req, res) {
    const { disciplineId } = req.query;
    const groups = await Group.findAll({ where: { disciplineId } });
    return res.json(groups);
  }
  deleteGroups(req, res) {
    const { listId } = req.body;
    listId.forEach(async (id) => {
      await Group.destroy({ where: { id } });
    });
    return res.json(listId);
  }
}
module.exports = new GroupController();
