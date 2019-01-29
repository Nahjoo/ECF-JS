Technical Help


The promotion’s list is displayed thanks to the function getPromotion();
Inside the function we use fetch to get the promotion list from the api, then display it in html ( in a div with their id, in a select menu )

When we click on «creer» button: we launch the addPromotion() function
It will fetch to the promotion api then add the data entered in the input field 

To delete a promotion, we have to select it in the menu then click «effacer»
It will start the function deletePromotion(), it will fetch the promotion api with the «idPromo», so that we can delete a promotion that we select.

To modify a promotion, we have to enter the new name in the input field, then click on «modifier» button, that will launch the function modifyPromo()

We’ve added a getPromotion(); to regenerate an updated list on every changes