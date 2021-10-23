var express = require('express');
var path = require('path');
var index = require('./routes/index');
var app = express();
const docusign = require('docusign-esign');
const apiClient = new docusign.ApiClient();
const host = process.env.HOST || 'localhost';
const fs = require('fs');
const cors = require('cors');
//On execution an envelope is sent to the provided email address, one signHere
//tab is added, the document supplied in workingdirectory\fileName is used.
//Open a new browser pointed at http://localhost:3000 to execute. 
//-------------------------------------------------------------------------------
//-------------------------------------------------------------------------------

//Fill in Variables Here
//Create a Docusign Developer Account and paste your account Id in constant accountId.
//Obtain your accountId from account-d.docusign.com > Go To Admin > API and Keys. e.g. URL: https://admindemo.docusign.com/apps-and-keys

//Obtain an OAuth Token from https://developers.docusign.com/token-generator/ and paste it in the constant OAuthToken.


const OAuthToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IjY4MTg1ZmYxLTRlNTEtNGNlOS1hZjFjLTY4OTgxMjIwMzMxNyJ9.eyJUb2tlblR5cGUiOjUsIklzc3VlSW5zdGFudCI6MTYzNDk4MTg3NiwiZXhwIjoxNjM1MDEwNjc2LCJVc2VySWQiOiI3NGUzMDIxMi04ZjIwLTQ0ZWYtYTM4Zi1iNWNmNDlkNmJjN2YiLCJzaXRlaWQiOjEsInNjcCI6WyJpbXBlcnNvbmF0aW9uIiwiZXh0ZW5kZWQiLCJzaWduYXR1cmUiLCJjbGljay5tYW5hZ2UiLCJjbGljay5zZW5kIiwib3JnYW5pemF0aW9uX3JlYWQiLCJncm91cF9yZWFkIiwicGVybWlzc2lvbl9yZWFkIiwidXNlcl9yZWFkIiwidXNlcl93cml0ZSIsImFjY291bnRfcmVhZCIsImRvbWFpbl9yZWFkIiwiaWRlbnRpdHlfcHJvdmlkZXJfcmVhZCIsImR0ci5yb29tcy5yZWFkIiwiZHRyLnJvb21zLndyaXRlIiwiZHRyLmRvY3VtZW50cy5yZWFkIiwiZHRyLmRvY3VtZW50cy53cml0ZSIsImR0ci5wcm9maWxlLnJlYWQiLCJkdHIucHJvZmlsZS53cml0ZSIsImR0ci5jb21wYW55LnJlYWQiLCJkdHIuY29tcGFueS53cml0ZSIsInJvb21fZm9ybXMiLCJub3Rhcnlfd3JpdGUiLCJub3RhcnlfcmVhZCIsInNwcmluZ19yZWFkIiwic3ByaW5nX3dyaXRlIl0sImF1ZCI6IjFjMDc2ZTRhLWIzM2UtNGIzMy05N2EwLWY0MjQ5ZjhlZmIxYiIsImF6cCI6IjFjMDc2ZTRhLWIzM2UtNGIzMy05N2EwLWY0MjQ5ZjhlZmIxYiIsImlzcyI6Imh0dHBzOi8vYWNjb3VudC1kLmRvY3VzaWduLmNvbS8iLCJzdWIiOiI3NGUzMDIxMi04ZjIwLTQ0ZWYtYTM4Zi1iNWNmNDlkNmJjN2YiLCJhdXRoX3RpbWUiOjE2MzQ5ODE4NjMsInB3aWQiOiJiNTFjZTBlMy1hMTQyLTRmODQtYmJkZi1hZTFmMTU5YmViMmMifQ.bVVDKVgtVzQD_vOV_5DHmlvzu4eXedhSvjK3TjSVf0FiNy4YWT1mWTHyrzxxMcbUDaQiFVzW_2Q8-0HEiNjueZEZWFkwqzlN6WRQ-5aboDxrISAnn6mYkIgteucnbup8Yz3Fz3Jd1MsEyaEniaUgH3nfQpYUwHwj450DI9eQvtnqjL1EX4g24K3fmyQiYAf5h2_12dwZ05aVHGJ6W_mulVvvL7xAHI0pIQJB0MV5LJkBPqyYIMGxNIk3Hd6L-t2teGdXJllhxp-cztvbbcwzWdxeCj2TcyTqlEnnK9harowzS0c-37AmuEMia8yubg6EkyE_2Ap0UXz8Y-0vRKE0ig';
const accountId = '730e49f2-a5f8-40ae-b343-590935be2dc8';



//-------------------------------------------------------------------------------
//-------------------------------------------------------------------------------

app.use(cors({
  methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}));

app.get('/users', function (req, res) {
//Recipient Information goes here
const recipientName = req.query.name;
const recipientEmail = req.query.email;
console.log(recipientName);
console.log(recipientEmail);

//Point this to the document you wish to send's location on the local machine. Default location is __workingDir\fileName
const fileName = 'HackForest.pdf'; //IE: test.pdf
  apiClient.setBasePath('https://demo.docusign.net/restapi');
  apiClient.addDefaultHeader('Authorization', 'Bearer ' + OAuthToken);

  // *** Begin envelope creation ***
  

  //Read the file you wish to send from the local machine.
  fileStream = process.argv[2];
  pdfBytes = fs.readFileSync(path.resolve(__dirname, fileName));
  pdfBase64 = pdfBytes.toString('base64');

  docusign.Configuration.default.setDefaultApiClient(apiClient);

  var envDef = new docusign.EnvelopeDefinition();

  //Set the Email Subject line and email message
  envDef.emailSubject = 'Please sign this forest conservation document';
  envDef.emailBlurb = 'Please sign this document to support forest conservation program';

  //Read the file from the document and convert it to a Base64String
  var doc = new docusign.Document();
  doc.documentBase64 = pdfBase64;
  doc.fileExtension = 'pdf';
  doc.name = 'ForestConservationProgram';
  doc.documentId = '1';

  //Push the doc to the documents array.
  var docs = [];
  docs.push(doc);
  envDef.documents = docs;

  //Create the signer with the previously provided name / email address
  var signer = new docusign.Signer();
  signer.name = recipientName;
  signer.email = recipientEmail;
  signer.routingOrder = '1';
  signer.recipientId = '1';

  //Create a tabs object and a signHere tab to be placed on the envelope
  var tabs = new docusign.Tabs();

  var signHere = new docusign.SignHere();
  signHere.documentId = '1';
  signHere.pageNumber = '1';
  signHere.recipientId = '1';
  signHere.tabLabel = 'SignHereTab';
  signHere.xPosition = '50';
  signHere.yPosition = '50';

  //Create the array for SignHere tabs, then add it to the general tab array
  signHereTabArray = [];
  signHereTabArray.push(signHere);

  tabs.signHereTabs = signHereTabArray;

  //Then set the recipient, named signer, tabs to the previously created tab array
  signer.tabs = tabs;

  //Add the signer to the signers array
  var signers = [];
  signers.push(signer);

  //Envelope status for drafts is created, set to sent if wanting to send the envelope right away
  envDef.status = 'sent';

  //Create the general recipients object, then set the signers to the signer array just created
  var recipients = new docusign.Recipients();
  recipients.signers = signers;

  //Then add the recipients object to the enevelope definitions
  envDef.recipients = recipients;

  // *** End envelope creation ***
  
  
  //Send the envelope
  var envelopesApi = new docusign.EnvelopesApi();
  envelopesApi.createEnvelope(accountId, { 'envelopeDefinition': envDef }, function (err, envelopeSummary, response) {

    if (err) {
      return res.send('Error while sending a DocuSign envelope:' + err);
    }

    res.send(envelopeSummary);

  });
});
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', index);

module.exports = app;
