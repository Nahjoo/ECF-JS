require: "main.js";

var API_URL = "http://api-students.popschool-lens.fr/api";
var API_URL1 = "/api/promotions/";


const url = new URL(window.location.href);
const params = new URLSearchParams(url.search);
const promotionID = params.get('id');
console.log(promotionID);



var deletepro = document.querySelector("#deletepromo");
deletepro.addEventListener('submit', deletepromotion);
var select = document.querySelector("#select");
var deletestud = document.querySelector("#deletestudent");
deletestud.addEventListener('submit', deletestudents);



function getstudents() {
    fetch(API_URL + '/students')
        .then(response => response.json())
        .then(function (studentlist) {
            const students = studentlist['hydra:member'];
            console.log(students)
            students.forEach(student => {
                if (student.promotion == API_URL1 + promotionID) {
                    console.log(student.lastname);
                    var option = document.createElement("option");
                    select.appendChild(option);
                    option.innerHTML = `${student.id} ${student.firstname} ${student.lastname}`
                }
            });
        });
}


function deletepromotion(event) {
    event.preventDefault(event);
    fetch(API_URL + '/promotions/' + promotionID, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        .then(function (response) {
            getstudents();
            console.log("promo sup");
        })
        .catch(error => console.log(error));
}


function deletestudents(event) {
    event.preventDefault(event);
    fetch(API_URL + '/students/' + select.value, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        .then(function (response) {
            getstudents();
            console.log("student supp");
        })
        .catch(error => console.log(error));
}



var createstudent = document.querySelector("#poststudent");
createstudent.addEventListener('submit', poststudent);

function poststudent(event) {
    event.preventDefault(event);
    const firstnameInput = document.querySelector("#new-firstname-stud");
    const lastnameInput = document.querySelector("#new-lastname-stud")
    const birthdateInput = document.querySelector("#birthdate-stud")
    const sexeInput = document.querySelector("#sexe-stud")
    

    fetch(API_URL + '/students', {
            method: 'POST',
            headers: new Headers({
                'content-type': 'application/json'
            }),
            body: JSON.stringify({

                firstname: firstnameInput.value,
                lastname: lastnameInput.value,
                birthdate: birthdateInput.value,
                sexe: sexeInput.value,
                promotion: API_URL1 + promotionID,

            })
        })

        .then(function (response) {
            getstudents();
            
        })
        .catch(error => console.log(error));
}


getstudents();