// wait for page to load
document.addEventListener("DOMContentLoaded", function(){})


let addCard = (button) => {
    console.log("addcardTriggeered")
    let parentCard = button.closest('.adopteeSection');

    // Grabbing all the values I will reuse for Cart cards
        let cardId = parentCard.id;
        let cardImage = parentCard.querySelector('.adopteeImage img').src;
        let cardPrice = parentCard.querySelector('.adopteeHorizontalTextGap h3').textContent;
        let cardNumberAmount = parentCard.querySelector('.adoptNumberCounter input').value;
        console.log(cardId, cardImage, cardPrice, cardNumberAmount);

    console.log("buttonclicked");

};




// on add to cart button clicked
// find section /sectionID it belongs to and grab name,pic,price,amount and counters and add delete button
// push those into a new card (template & sub info grabbed)
// Clear AddCard Action to empty?

// on open cart
// make modal pop up open (Done:) )
// Set up cards and display them 
// set continue searching to close(think is so already)
// Set Adopt finish to refresh page (clearing items)









// let Adoptees = document.getElementsByClassName("AdopteeSectionContainer")
//  sectionId

// Add Animal card on Add to cradle click
// let AddCardToCradle = (event) => {
//     // event.preventDefault();
//     console.log("buttonclicked")
//     // let currentAdoptee = 
// }


// Form pop up thank you 

    // find form in html
    let myForm = document.forms['contactUsForm'];

    // listen for form submit if there is a contact form on the page so it doesn't get confused in the other 2 pgs
    if (myForm) {
        myForm.addEventListener("submit", getName);
    };

// Get name for thanks pop-up from form
function getName(event)
{
    event.preventDefault();

    let nameData = {
        "name": this['name'].value
    };

    let output = 
    `
        <p> Hi ${nameData["name"]}, <br> Thank you for your Response! <br> We'll get back to you soon. </p>
    `;

    let outSection = document.querySelector(".thanksOutputContainer");

    outSection.innerHTML = output;

    let formThanksModal = new bootstrap.Modal(
        document.getElementById("formThanksModal")
    );
    
    formThanksModal.show();
};



// NOT Working yet tbc
// Open Cart modal
function openCart(){
    // event.preventDefault();

    let cartModal = new bootstrap.Modal(
        document.getElementById("cartModal")
    );
    
    cartModal.show();
}




// on add to cart send card info and amount to cart modal



// Search bar/filter dropdown

// on click show dropdown
function searchDropdownFunction(){
    document.getElementById("searchDropdown").classList.toggle("show");
}

function filterFunction() {

    // getting type input
    let input = document.getElementById("searchInput");
    let filter = input.value.toLowerCase();

    // get all <a></a> in container
    let dropdown = document.getElementById("searchDropdown");
    let a = dropdown.getElementsByTagName("a");
    for (i = 0; i < a.length; i++){
        textValue = a[i].textContent || a[i].innerText;
        if (textValue.toLowerCase().indexOf(filter) > -1) {
            a[i].style.display = "";
        } else {
            a[i].style.display = "none";
        }
    }
}


// Number counter adopt pg 


const changeNumber = (type, button) =>
{
    // find counter that the pressed button belongs to
    let parentCounter = button.parentElement;

    // Use that counter and identify its number counter input (the number)
    let inputField = parentCounter.querySelector('input[type="number"]');


    // get current value and make it an int not a string
    let num = parseInt(inputField.value);

    if  (type == "inc")
    {
        num ++;
    };

    if  (type == "dec")
    {
        if (num != 0)
        {
            num -=1;
        }
    };

    inputField.value = num;
    
}

