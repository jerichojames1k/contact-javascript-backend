const crud = require("../crud/crud.js");
const data = {
  employees: require("../model/employees.json"),
  setEmployees: function (data) {
    this.employees = data;
  },
};

const getAllContactsAddByUser = (req, res) => {
  const {userId } = req.body;
  try {
    crud.getAllContactsAddByUser(userId)(async (results) => {
       res.status(201).json(results);
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



const createNewContact = (req, res) => {
  const { name, company, phone, email,userId } = req.body;
  crud.checkEmailExistInContacts(email)(async (results) => {
    const duplicate = results?.[0];
    if (duplicate) {
      return res.sendStatus(409); //Conflict
    }
    try {
      const newContact = {
        userId,
        name: name,
        company: company,
        phone: phone,
        email: email,
      };
      crud.addContact(newContact)(async (results) => {
        return res.json(results?.[0]);
      });
      res.status(201).json({ success: `New contact created!` });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
};


const editContact= (req, res) => {
    const { name, company, phone, email,id } = req.body;
    // crud.checkEmailExistInContacts(email)(async (results) => {
    //   const duplicate = results?.[0];
    //   if (duplicate) {
    //     return res.sendStatus(409); //Conflict
    //   }
      try {
        const editContactData = {
          id,
          name: name,
          company: company,
          phone: phone,
          email: email
        };
        crud.editContact(editContactData)(async (results) => {
          return res.json(results?.[0]);
        });
        res.status(201).json({ success: `Contact successfully updated!` });
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
    // });
  };


  const deleteContact= (req, res) => {
    const {id } = req.body;
      try {
        const newContact = {
          id,
        };
        crud.deleteContact(newContact)(async (results) => {
          return res.json(results?.[0]);
        });
        res.status(201).json({ success: `Contact successfully deleted!` });
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
  };

const deleteEmployee = (req, res) => {
  const employee = data.employees.find(
    (emp) => emp.id === parseInt(req.body.id)
  );
  if (!employee) {
    return res
      .status(400)
      .json({ message: `Employee ID ${req.body.id} not found` });
  }
  const filteredArray = data.employees.filter(
    (emp) => emp.id !== parseInt(req.body.id)
  );
  data.setEmployees([...filteredArray]);
  res.json(data.employees);
};
const getSearchContacts = (req, res) => {
  const {searchTerm,userId
  } = req.body;
  console.log("%c 😄: getSearchContacts -> searchTerm ", "font-size:16px;background-color:#5148d8;color:white;", searchTerm)

  try {
    crud.getSearchContacts(searchTerm,userId)(async (results) => {
       res.status(201).json(results);
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



module.exports = {
  getAllContactsAddByUser,
  createNewContact,
  editContact,
  deleteEmployee,
  deleteContact,
  getSearchContacts
// getEmployee,
};
