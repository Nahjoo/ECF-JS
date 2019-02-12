// call file main.js
require: "main.js";

//declared variable
var API_URL = "http://api-students.popschool-lens.fr/api";

const url = new URL(window.location.href);
const params = new URLSearchParams(url.search);
const promotionID = params.get('id'); // recover the ID in the URL
console.log(promotionID);


// declared button in the html
var deletepro = document.querySelector("#deletepromo");

// call the function deletepromotion in click on the button
deletepro.addEventListener('submit', deletepromotion);
var select = document.querySelector("#select");
// call the function deletestudent in click on the button
var deletestud = document.querySelector("#deletestudent");
deletestud.addEventListener('submit', deletestudents);
// create option
var option = document.createElement("option");



var ul = document.querySelector('#list');
// create function GET student
function getstudents() {
    fetch(API_URL + "/promotions/" + promotionID)  // fecth get list-promotions ID
               .then(r => r.json())
               .then(promo =>{
                       console.log(promo);
                       ul.innerHTML = ""; // allows to empty the fields so as not to duplicate them
                       select.innerHTML = "";
                       promo.students.forEach(studentURL => { // loop on the promotion , for recover the students
                               fetch("http://api-students.popschool-lens.fr" + studentURL) // fecth get list-student of the promotion
                               .then(r => r.json())
                               .then(student => { 
                                        var li = document.createElement("li"); 
                                        var option = document.createElement("option");
                                        li.id = "student" + student.id; 
                                        select.appendChild(option); // add balise OPTION in the SELECT 
                                        option.innerHTML = `${student.id} ${student.lastname} ${student.firstname}` // add in the OPTION student.ID etc..
                                        ul.appendChild(li);
                                        li.innerHTML = student.id + student.lastname + student.firstname;
                                        var deleteStudent = document.createElement("button"); // create button 
                                        li.appendChild(deleteStudent);
                                        deleteStudent.innerHTML = "supprimer";
                                        deleteStudent.value = student.id; 
                                        deleteStudent.dataset.firstname = student.firstname; // dataset provides read and write access to all custom data attributes defined on the element
                                        deleteStudent.dataset.lastname = student.lastname;
                                        deleteStudent.dataset.path = student['@id'];
                                        deleteStudent.addEventListener("click", deletestudents); // call function when click on the button                                
                               })
                           }
                       );
                   }
               );
}


function deletepromotion(event) {
    event.preventDefault(event); // tells the user agent that if the event is not explicitly processed, its default action should not be taken into account
    fetch(API_URL + '/promotions/' + promotionID, { // GET the promotion.id 
            method: 'DELETE', // delete the promotion
            headers: {
                'Content-Type': 'application/json'
            }
        })

        .then(function (response) {
            getstudents(event);
            console.log("promo sup");
        })
        .catch(error => console.log(error));
}



function deletestudents(event) {
        var data_target = event.target.dataset;
        event.preventDefault(event);
        // pop-up to confirm delete promotion
        if( confirm("Êtes-vous certain de vouloir supprimer l'étudiant " + data_target.firstname + " " + data_target.lastname + " ?")) {
            console.log("ok br " + data_target.firstname);
            fetch("http://api-students.popschool-lens.fr" + data_target.path,{
                method: "DELETE",
            })
            .then(function (response) {
                var liStudent = document.querySelector("#student" + event.target.value);
                liStudent.remove(); // delete LI selected
                console.log("promo sup");
            })
            .catch(error => console.log(error))   
        }  
}



var createstudent = document.querySelector("#poststudent");
createstudent.addEventListener('submit', poststudent);

function poststudent(event) {
    event.preventDefault(event);
    const firstnameInput = document.querySelector("#new-firstname-stud"); // recover value of the input with id = new-firstname-studen
    const lastnameInput = document.querySelector("#new-lastname-stud")
    const birthdateInput = document.querySelector("#birthdate-stud")
    const sexeInput = document.querySelector("#sexe-stud")
    
    
    fetch("http://api-students.popschool-lens.fr/api/students/", { // GET all student
        method: "POST", // create new student
        headers: new Headers({
            'content-type': 'application/json'
        }),
        body: JSON.stringify({ // converts a JavaScript value to a JSON string

            firstname: firstnameInput.value,
            lastname: lastnameInput.value,
            birthdate: birthdateInput.value,
            sex: sexeInput.value,
            promotion: "/api/promotions/" + promotionID,
            

        })
    })
    .then(function (response) {
        console.log("student sup");
        getstudents(event);
        
    })
    .catch(error => console.log(error));    
}

var modify = document.querySelector("#modifyStud");
modify.addEventListener("submit", putstudent);

function putstudent(event) {
    event.preventDefault(event);
    var new_firstname = document.querySelector("#new-firstname-student") // recover value of the input with id = new-firstname-stud
    var new_lastname = document.querySelector("#new-lastname-student") // --
    fetch("http://api-students.popschool-lens.fr/api/students/" + select.value, { // GET student select 
        method: "PUT", // modify the student select
        headers: new Headers({
            'content-type': 'application/json'
        }),
        body: JSON.stringify({

            firstname: new_firstname.value,
            lastname: new_lastname.value,
            

        })
    })
    .then(function (response) {
        console.log("student sup");
        getstudents(event);
        
    })
    .catch(error => console.log(error));    
}

getstudents();