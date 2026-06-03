// wait for page to load
// document.addEventListener("DOMContentLoaded", function(){});

// Get HTML elements to use/link later
let cardContainer = document.getElementById("cardContainer");
let cartTotalText = document.getElementById("cartTotalText");

// list of Cards used by cart 
let adoptCards = [];
let loadCards = () => {
    adoptCards = JSON.parse(localStorage.getItem("adoptCards")) || [];
};

loadCards();

// On addtocart click create card for adoptee
let addCard = (button) => {
    let parentCard = button.closest('.adopteeSection, .altAdopteeSection');


    // Grabbing all the values I will reuse for Cart cards
    let cardId = parentCard.id;
    let adoptName = parentCard.querySelector('h2').textContent;
    let cardImage = parentCard.querySelector('.adopteeImage img').src;
    let cardPrice = parentCard.querySelector('.adopteeHorizontalTextGap h3').textContent;
    let cardNumberAmount = parentCard.querySelector('.adoptNumberCounter input, .altAdoptNumberCounter input',).value;

    // Remove 'R' and ' ' from price to get number
    // by replacing all a-z or\ space with empty, g for global so removes all letters in string and i so is not case sensitive
    let realCardPrice = cardPrice.replace(/[a-z\s,]/gi, '');
    console.log(realCardPrice, "realPrice");

    // Group info into object to push later
    let cardInfo = {
        name: adoptName,
        image: cardImage,
        price: cardPrice,
        priceValue: realCardPrice,
        amount: Number(cardNumberAmount),
        style: parentCard

    };


    let cardDuplicate = false;

    // Update card if already exists
    adoptCards.forEach(cardObject => {
    if (cardInfo.name == cardObject.name){
        cardDuplicate = true;
        cardObject.amount = cardInfo.amount;             
    }});  

    // send card to adoptCards list if not had duplicate
    if (cardDuplicate !== true){
        adoptCards.push(cardInfo);
        saveCards();
    }
    else {
        saveCards();
    };

    showInCart(adoptCards)
};


let showInCart = (adoptCards) => {
    loadCards();
    // make Clean slate to populate
    cardContainer.innerHTML = "";

    let cartTotal = 0;
    
    // Add all cards
    adoptCards.forEach(cardObject => {
        createAdoptCard(cardObject);
        cartTotal += cardObject.priceValue * cardObject.amount;
        
    });

    // Set new Cart total
    cartTotalText.innerHTML = `Total: R ${cartTotal}.00`

};


// Create adopt cards in cart with js:
// programmatically making HTML hierarchies
let createAdoptCard = (cardObject) => {

    // Creating each element
    let cartCard = document.createElement("div");
    cartCard.classList.add("cartCard");

    let cardImageContainer = document.createElement("div");
    cardImageContainer.classList.add("cardImageContainer");

    let cardImage = document.createElement("img");
    cardImage.src = cardObject.image;

    let cardTextContainer = document.createElement("div");
    cardTextContainer.classList.add("cardTextContainer");

    let cardName = document.createElement("h2");
    cardName.textContent = cardObject.name;
    cardName.classList.add(cardObject.name.classList)

    let singleAdoptPrice = document.createElement("h3");
    singleAdoptPrice.textContent = cardObject.price;

    let adoptNumberCounter = document.createElement("div");
    adoptNumberCounter.classList.add("adoptNumberCounter")

    // minus button
    let minusAdoptCart = document.createElement("button");
    minusAdoptCart.classList.add("minusAdoptCart");
    minusAdoptCart.textContent = "-";

    // Set button onclick trigger
    minusAdoptCart.onclick = function(){
        changeNumber('dec', this);
    }

    // input no. field
    let inputNumberField = document.createElement("input");
    inputNumberField.min = "1";
    inputNumberField.type = "number";
    inputNumberField.value = cardObject.amount;

    // plus button
    let plusAdoptCart = document.createElement("button");
    plusAdoptCart.classList.add("plusAdoptCart");
    plusAdoptCart.textContent = "+";

    // Set button onclick trigger
    plusAdoptCart.onclick = function(){
        changeNumber('inc', this);
    }

    // Set total card price
    let cardTotalPrice = document.createElement("h3");
    cardTotalPrice.textContent = `Total: R ${cardObject.priceValue * cardObject.amount}.00`;

    // Add Remove button
    let cancelCard = document.createElement("button");
    cancelCard.classList.add("cancelCardButton");
    cancelCard.textContent = "Remove Item"
    cancelCard.onclick = function(){
        removeCard(this);
    };

    // Creating hierarchy
    cardContainer.appendChild(cartCard);

    // image left
    cartCard.appendChild(cardImageContainer);
    cardImageContainer.appendChild(cardImage)

    // Content right
    cartCard.appendChild(cardTextContainer);
    cardTextContainer.appendChild(cardName);
    cardTextContainer.appendChild(singleAdoptPrice);
    cardTextContainer.appendChild(adoptNumberCounter);
    // Number counter (right):
    adoptNumberCounter.appendChild(minusAdoptCart);
    adoptNumberCounter.appendChild(inputNumberField);
    adoptNumberCounter.appendChild(plusAdoptCart);
    // rest of unindented content right
    cardTextContainer.appendChild(cardTotalPrice);
    cardTextContainer.appendChild(cancelCard);

};

// Remove card Function
const removeCard = (removeButton) => {
    let cardToRemove = removeButton.closest('.cartCard');
    let cardToRemoveName = cardToRemove.querySelector('h2').textContent;
    adoptCards = adoptCards.filter((card) => {
        return card.name !== cardToRemoveName;
    });

    saveCards();
    showInCart(adoptCards);

};

function clearCart(){

    window.location.reload();
    adoptCards = ""
    cardContainer.innerHTML = ""
    saveCards();
};


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

    showInCart(adoptCards);
    
    if (cardContainer.innerHTML == ""){
        // let cardContainer = document.createElement("div");
        let emptyCartText = document.createElement("h3");
        emptyCartText.classList.add("emptyCartText");
        emptyCartText.textContent = "No items in cart."
        cardContainer.appendChild(emptyCartText);
    }
    
    cartModal.show();
};




// on add to cart send card info and amount to cart modal



// Search bar/filter dropdown

// on click show dropdown
function searchDropdownFunction(){
    document.getElementById("searchDropdown").classList.toggle("show");
};

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
};


// Number counters
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

    // Get card button belongs to
    let parentCard = parentCounter.closest('.adopteeSection, .altAdopteeSection, .cartCard');
    let adoptName = parentCard.querySelector('h2').textContent;

    // Update card with new number, save cards and show new info in cart
    adoptCards.forEach(cardObject => {
        if (adoptName == cardObject.name){
            cardDuplicate = true;
            cardObject.amount = num;     

        }});  
    saveCards();
    showInCart(adoptCards);
}



let saveCards = () => {
    // update stored task list:
    localStorage.setItem("adoptCards", JSON.stringify(adoptCards));
}

// load cards saved cards once page has loaded
window.addEventListener("DOMContentLoaded", loadCards);

