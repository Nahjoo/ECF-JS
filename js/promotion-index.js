
require: "main.js";

var API_URL = "http://api-students.popschool-lens.fr/api";
var API_URL2 = "http://api-students.popschool-lens.fr/";


const url = new URL(window.location.href);
const params = new URLSearchParams(url.search);
const promotionID = params.get('id');
console.log(promotionID);

var deletepro = document.querySelector("#deletepromo");
deletepro.addEventListener('submit', deletepromotion);

function deletepromotion(event){
    event.preventDefault();
    fetch(API_URL + '/promotions/' + promotionID, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
          }
    })

    .then(function (response) {
        
        console.log("promo sup");
    })
    .catch(error => console.log(error));
}


function getstudents() {
    fetch(API_URL + '/promotions')
        .then(response => response.json())
        .then(function (promo) {
            const promotions = promo['hydra:member'];
            console.log(promotions);

            // const list = document.querySelector(".list-container");
            // list.innerHTML = '';

            promotions.forEach(promot => {
                console.log(promot.id);
                if(promotionID == promot.id){
                    console.log()
                }
                
                
            });
           
        })


    // fetch(API_URL2 +  )
    // .then(response => response.json())
    // .then(function (promo) {
        
    //     console.log(promotions);

    //     // const list = document.querySelector(".list-container");
    //     // list.innerHTML = '';

    //     promotions.forEach(promot => {
            
            
    //     });
        
    // })
    
    
}

getstudents();
