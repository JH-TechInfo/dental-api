// node?
// npm install express
// npm install cors
// npm install body..parser

const port = process.env.PORT || 3000;
const express = require('express');
const app = express();
app.use(express.json());

const cors = require('cors');
app.use(cors())

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}))

const mysql_connector = require('mysql');
const connectionDev = mysql_connector.createConnection({
    host: 'localhost',
    user: 'root',
    password:'Jesus@123',
    database: 'dbdental'
  });
const connectionPROD = mysql_connector.createConnection({
    host: '31.170.160.103',
    user: 'u950689955_dentuser',
    password:'Jesus@123',
    database: 'u950689955_dental'
  });
const connection = connectionPROD;

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

app.get('/', (req, res) => {
  res.send('Welcome to Dental API Services!')
})

app.get('/api/getPatients', (req, res) => {
  const sqlSelect = "select * from patients";
  connection.query(sqlSelect, (err, results) => {
    res.json(results);
  });
})

connection.connect(function(error){
  if(!!error) console.log(error);
  else console.log('Database Connected!');
});

app.post('/api/insertPatient', (req, res) => {
  const PatID = req.body.PatID;
  const PatName = req.body.PatName;
  const PatMobile = req.body.PatMobile;
  const patGender = req.body.patGender;
  const patAge = req.body.patAge;
  const City = req.body.City;

  const sqlInsert = "INSERT INTO patients (PatID, PatName, PatMobile, patGender, patAge, City) VALUES (?, ?, ?, ?, ?, ?)";
  connection.query(sqlInsert, [PatID, PatName, PatMobile, patGender, patAge, City], (err, results, next) => {
    // if(err) throw err;
    // res.send(apiResponse(results));
    if (err) {
      res.send(apiResponse("Unable to Insert", err));
    } else{
      res.send(apiResponse("Sucess!", results));
    }
  });
})

function apiResponse(msg, results){
  return JSON.stringify({"status": 200, "result": msg, "response": results});
}

app.post('/api/updatePatient', (req, res) => {

  const PatID = req.body.PatID;
  const PatName = req.body.PatName;
  const PatMobile = req.body.PatMobile;
  const PatEmail = req.body.PatEmail;
  const patGender = req.body.patGender;
  const patAge = req.body.patAge;
  const EmergencyContactNo = req.body.EmergencyContactNo;
  const Address = req.body.Address;
  const City = req.body.City;
  const State = req.body.State;
  const Country = req.body.Country;
  const Pincode = req.body.Pincode;
  const BloodGroup = req.body.BloodGroup;
  const CurrentMedication = req.body.CurrentMedication;
  const sqlUpdate = "UPDATE patients SET PatName = ?, PatMobile = ?, PatEmail = ?, patGender = ?, patAge = ?, EmergencyContactNo = ?, Address = ?, City = ?, State = ?, Country = ?, Pincode = ?, BloodGroup = ?, CurrentMedication = ? WHERE (PatID = " + PatID + ")";
  console.log(PatID, PatName, PatMobile, PatEmail, patGender, patAge, EmergencyContactNo, Address, City, State, Country, Pincode, BloodGroup, CurrentMedication);
  connection.query(sqlUpdate, [PatName, PatMobile, PatEmail, patGender, patAge, EmergencyContactNo, Address, City, State, Country, Pincode, BloodGroup, CurrentMedication], (err, results, next) => {
    if (err) {
      res.send(apiResponse("Unable to Update", err));
    } else{
      res.send(apiResponse("Sucess!", results));
    }
  });
})


  
