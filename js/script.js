
// Form pop up thank you 

let myForm = document.forms['contactForm'];

myForm.addEventListener("submit", getName);

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


// Number counter adopt pg 
// TBC Not right yet - must call by id of dragon's counter clicked each respectively

changeNumber = (type) =>
{
    let num = document.getElementById('adoptee1KitNumber').value;

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

    document.getElementById('adoptee1KitNumber').value = num;
    
}
