// @ts-nocheck
const Router = require('express');
const router = new Router();
const studentController = require('../controllers/studentController');
const checkRole = require('../middleware/checkRoleMiddleware');
router.post('/add', checkRole('ADMIN'), studentController.addStudent);
router.get('/get', checkRole('ADMIN'), studentController.getStudents);
router.post('/delete', checkRole('ADMIN'), studentController.deleteStudents);
router.post('/update', checkRole('ADMIN'), studentController.updateStudent);
router.get('/search', checkRole('ADMIN'), studentController.searchStudent);
router.get('/search/students', checkRole('ADMIN'), studentController.searchStudents);
router.post('/add/dates', checkRole('ADMIN'), studentController.addListDates);
router.get('/get/dates', checkRole('ADMIN'), studentController.getListDates);
router.get('/get/dates/search', checkRole('USER'), studentController.getSearchListDates);
router.get('/get/search/group', checkRole('USER'), studentController.getSearchGroup);
module.exports = router;
