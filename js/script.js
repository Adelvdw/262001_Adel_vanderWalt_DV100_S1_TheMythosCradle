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

