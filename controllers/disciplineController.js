// @ts-nocheck
const { Discipline, Group, Student } = require("../models/models");
const ApiError = require("../error/ApiError");
const csv = require("csvtojson");
const path = require("path");
const {
  informationUpload,
  getRating,
  getExam,
} = require("../controllers/someFunctions");

class DisciplineController {
  async addDiscipline(req, res, next) {
    try {
      const { name } = req.body;
      const getDiscipline = await Discipline.findOne({ where: { name } });
      if (!getDiscipline) {
        const discipline = await Discipline.create({ name });
        return res.json(discipline);
      } else {
        return res.json("This discipline already exists!!!");
      }
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
  async updateDiscipline(req, res, next) {
    try {
      const { id, name } = req.body;
      const discipline = await Discipline.update({ name }, { where: { id } });
      return res.json(discipline);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
  async getDisciplines(req, res) {
    const disciplines = await Discipline.findAll();
    return res.json(disciplines);
  }
  deleteDisciplines(req, res) {
    const { listId } = req.body;
    listId.forEach(async (id) => {
      await Discipline.destroy({ where: { id } });
    });
    return res.json(listId);
  }
  async uploadInformation(req, res, next) {
    try {
      const { csvFile } = req.files;
      const { disciplineId, groupId } = req.body;
      const getDiscipline = await Discipline.findOne({
        where: {
          id: disciplineId,
        },
      });
      const getGroup = await Group.findOne({
        where: {
          id: groupId,
        },
      });
      const fileName = "data.csv";
      csvFile.mv(path.resolve(__dirname, "..", "static/csv", fileName));
      let data = await csv().fromFile("static/csv/data.csv");
      data = informationUpload(data, getGroup.name, getDiscipline);
      data.forEach(async (item) => {
        const student = await Student.findOne({
          where: {
            surName: item.surName,
            groupId: getGroup.id,
          },
        });
        if (!student) {
          await Student.create({
            surName: item.surName,
            groupId,
            nameDiscipline: getDiscipline.name,
            options: JSON.stringify(item.options),
            teacher: 0,
            conspectus: 0,
            exercise: 0,
            rating: getRating(item, 0, 0, 0),
            report: "-",
            exam: getExam(getRating(item, 0, 0, 0), "-"),
          });
        } else {
          await Student.update(
            {
              surName: item.surName,
              options: JSON.stringify(item.options),
              teacher: student.teacher,
              conspectus: student.conspectus,
              exercise: student.exercise,
              rating: getRating(
                item,
                student.teacher,
                student.exercise,
                student.conspectus
              ),
              report: student.report,
              exam: getExam(
                getRating(
                  item,
                  student.teacher,
                  student.exercise,
                  student.conspectus
                ),
                student.report
              ),
            },
            { where: { id: student.id } }
          );
        }
      });
      return res.json(data);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
}
module.exports = new DisciplineController();
