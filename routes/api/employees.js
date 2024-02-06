const express = require('express');
const router = express.Router();
const employeesController = require('../../controllers/contactsController');

// router.route('/').get(employeesController.getAllEmployees)
//     .post(employeesController.createNewContact)
//     .put(employeesController.updateEmployee)
//     .delete(employeesController.deleteEmployee);



router.post('/', employeesController.getAllContactsAddByUser);
router.post('/add', employeesController.createNewContact);
router.post('/edit', employeesController.editContact);
router.post('/delete', employeesController.deleteContact);
router.post('/search', employeesController.getSearchContacts);
//router.route('/:id').get(employeesController.getEmployee);

module.exports = router;