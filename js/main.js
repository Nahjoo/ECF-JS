var API_URL = "http://api-students.popschool-lens.fr/api";


function getpromotions() {
    fetch(API_URL + '/promotions')
        .then(response => response.json())
        .then(function (promo) {
            const promotions = promo['hydra:member'];
            console.log(promotions);

            const list = document.querySelector(".list-container");
            list.innerHTML = '';

            promotions.forEach(promot => {
                console.log(promot.name);
                const li = document.createElement("li");
                const link = document.createElement("a");
                link.href = "promotion.html?id=" + promot.id;
                link.textContent = promot.name;
                li.appendChild(link)
                list.appendChild(li);
            });
            return promotions;
        })
    
}


var createpromo = document.querySelector("#create-new-promotion");
createpromo.addEventListener('submit', createPromotion);

function createPromotion(event) {
    event.preventDefault();
    const nameInput = document.querySelector("#new-promotion-name");
    const startInput = document.querySelector("#new-promotion-startdate")
    const endInput = document.querySelector("#new-promotion-endDate")
    console.log(nameInput.value);

    fetch(API_URL + '/promotions', {
            method: 'POST',
            headers: new Headers({
                'content-type': 'application/json'
            }),
            body: JSON.stringify({

                name: nameInput.value,
                startDate: startInput.value,
                endDate: endInput.value,
                students: []

            })
        })

        .then(function (response) {
            getpromotions()
        })
        .catch(error => console.log(error));
}






getpromotions();