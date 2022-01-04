// Initialize Firebase (ADD YOUR OWN DATA)
var config = {
  apiKey: "AIzaSyCa2tmCOs94_vXRXPMPwnQsGB5soaKSNyg",
  authDomain: "form-bddbf.firebaseapp.com",
  databaseURL: "https://form-bddbf-default-rtdb.firebaseio.com",
  projectId: "form-bddbf",
  storageBucket: "form-bddbf.appspot.com",
  messagingSenderId: "495564225940",
  appId: "1:495564225940:web:943cbb4160304012d8a381"
};

firebase.initializeApp(config);

// Reference messages collection
var messagesRef = firebase.database().ref('messages');

// Listen for form submit
document.getElementById('contactForm').addEventListener('submit', submitForm);

// Submit form
function submitForm(e){
  e.preventDefault();

  // Get values
  var name = getInputVal('name');
  var company = getInputVal('company');
  var email = getInputVal('email');
  var phone = getInputVal('phone');
  var message = getInputVal('message');

  // Save message
  saveMessage(name, company, email, phone, message);

  // Show alert
  document.querySelector('.alert').style.display = 'block';

  // Hide alert after 3 seconds
  setTimeout(function(){
    document.querySelector('.alert').style.display = 'none';
  },3000);

  // Clear form
  document.getElementById('contactForm').reset();
}

// Function to get get form values
function getInputVal(id){
  return document.getElementById(id).value;
}

// Save message to firebase
function saveMessage(name, company, email, phone, message){
  var newMessageRef = messagesRef.push();
  newMessageRef.set({
    name: name,
    company:company,
    email:email,
    phone:phone,
    message:message
  });
}