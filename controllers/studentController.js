// @ts-nocheck
const { Discipline, Group, Student, Dates } = require('../models/models');
const ApiError = require('../error/ApiError');
const { Op } = require('sequelize');
const { getRating, getExam } = require('../controllers/someFunctions');
class StudentController {
  async addStudent(req, res, next) {
    try {
      const { surName, groupId } = req.body;
      const getGroup = await Group.findOne({
        where: {
          id: groupId,
        },
      });
      const getDiscipline = await Discipline.findOne({
        where: {
          id: getGroup.disciplineId,
        },
      });
      const getStudent = await Student.findOne({
        where: { surName: surName, groupId: groupId },
      });
      if (!getStudent) {
        const student = await Student.create({
          surName,
          groupId,
          nameDiscipline: getDiscipline.name,
          options: '',
          teacher: 0,
          conspectus: 0,
          exercise: 0,
          rating: 0,
          report: '-',
          exam: 'Н/З',
        });
        return res.json(student);
      } else {
        return res.json('This student already exists!!!');
      }
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
  async updateStudent(req, res, next) {
    try {
      const { studentId, item, valueItem } = req.body;
      await Student.update({ [item]: valueItem }, { where: { id: studentId } });
      const getStudent = await Student.findOne({ where: { id: studentId } });
      const tests = JSON.parse(getStudent?.options || '[]');
      const newRating = getRating(tests, getStudent?.teacher, getStudent?.conspectus, getStudent?.exercise);
      const newExam = getExam(newRating, getStudent?.report);
      await Student.update({ rating: newRating, exam: newExam }, { where: { id: studentId } });
      return res.json(getStudent);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
  async getStudents(req, res, next) {
    try {
      const { groupId } = req.query;
      const students = await Student.findAll({ where: { groupId } });
      return res.json(students);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
  async getSearchGroup(req, res, next) {
    try {
      const { nameGroup } = req.query;
      const group = await Group.findOne({ where: { name: nameGroup } });
      const students = await Student.findAll({ where: { groupId: group.id } });
      return res.json(students);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
  deleteStudents(req, res, next) {
    try {
      const { listId } = req.body;
      listId.forEach(async (id) => {
        await Student.destroy({ where: { id } });
      });
      return res.json(listId);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
  async addListDates(req, res, next) {
    try {
      const { listDates, groupId } = req.body;
      const getDates = await Dates.findOne({
        where: {
          groupId,
        },
      });
      const datesList = JSON.parse(getDates?.get('listDates') || '[]');
      listDates.forEach((item, index) => {
        const [test, date] = item || [['', '']];
        if (date) {
          const box = [...(datesList[index] || [['', '']])];
          box[0] = test;
          box[1] = date;
          datesList[index] = box;
        }
      });
      const sortDates = JSON.stringify(datesList);
      const newListDates = !getDates
        ? await Dates.create({ listDates: sortDates, groupId })
        : await Dates.update({ listDates: sortDates, groupId }, { where: { groupId } });
      return res.json(newListDates);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
  async getListDates(req, res, next) {
    try {
      const { groupId } = req.query;
      const listDates = await Dates.findOne({ where: { groupId } });
      return res.json(listDates);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
  async getSearchListDates(req, res, next) {
    try {
      const { nameGroup } = req.query;
      const group = await Group.findOne({ where: { name: nameGroup } });
      const listDates = await Dates.findOne({ where: { groupId: group.id } });
      return res.json(listDates);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
  async searchStudent(req, res, next) {
    try {
      const { surName } = req.query;
      const student = await Student.findOne({ where: { surName } });
      const group = await Group.findOne({ where: { id: student.groupId } });
      const discipline = await Discipline.findOne({
        where: { id: group.disciplineId },
      });
      const searchStudent = [];
      searchStudent[0] = discipline.id;
      searchStudent[1] = discipline.name;
      searchStudent[2] = group.id;
      searchStudent[3] = group.name;
      searchStudent[4] = group.moodle;
      searchStudent[5] = student;
      return res.json(searchStudent);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
  async searchStudents(req, res, next) {
    try {
      const { pattern } = req.query;
      const students = await Student.findAll({ where: { surName: { [Op.startsWith]: pattern } } });
      return res.json(students);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
}
module.exports = new StudentController();
