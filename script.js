"use strict";
let navBar = document.getElementById("navBar");
let burger = document.getElementById("burgerBar");

burger.addEventListener("click", function () {
  navBar.classList.toggle("activeNav");
});

const accordions = document.querySelectorAll(".accordion");

accordions.forEach((accordion) => {
  accordion.addEventListener("click", () => {
    const body = accordion.querySelector(".accordion-body");
    body.classList.toggle("active");
  });
});

const postWraper = document.getElementById("postWraper");
const postOverlay = document.getElementById("overLay");
const contentBlock = document.getElementById("content");
const closeOverlay = document.getElementById("close");
const btnAdd = document.getElementById("add");
const addOverlay = document.getElementById("addOverlay");
const form = document.getElementById("formAddOverlay");

function ajax(url, callback) {
  fetch(url, {
    method: "GET",
  })
    .then(function (response) {
      if (response.status !== 200) {
        throw response.status;
      }
      return response.json();
    })
    .then(function (responseData) {
      callback(responseData);
    })
    .catch(function (error) {
      if (error === 404) {
        console.log("Page Not Found");
      } else if (error === 500) {
        console.log("Internal Error");
      }
    });
}

ajax("https://softwium.com/api/peoples", function (data) {
  data.forEach((element) => {
    createComments(element);
  });
});

function createComments(item) {
  const divContainer = document.createElement("div");
  divContainer.classList.add("comments");
  divContainer.setAttribute("data-id", item.id);

  const h3Post = document.createElement("h3");
  h3Post.innerText = item.id;

  const h2Post = document.createElement("h2");
  h2Post.innerText = item.firstName;

  const last_Name = document.createElement("p");
  last_Name.innerText = item.lastName;

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "ველის წაშლა";
  deleteBtn.classList.add("delete-btn");
  deleteBtn.setAttribute("data-id", item.id);

  divContainer.appendChild(h3Post);
  divContainer.appendChild(h2Post);
  divContainer.appendChild(last_Name);
  divContainer.appendChild(deleteBtn);

  deleteBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    const deleteId = e.target.getAttribute("data-id");
    console.log(deleteId);
    const deleteUrl = `https://softwium.com/api/peoples/${deleteId}`;
    console.log(deleteUrl);
    fetch(deleteUrl, {
      method: "DELETE",
    }).then(function (deletedData) {
      console.log(deletedData);
      divContainer.remove();
    });
  });

  divContainer.addEventListener("click", function () {
    console.log(this);
    const postId = this.getAttribute("data-id");
    console.log(postId);
    postOverlay.classList.add("activeOverlay");
    const newUrl = `https://softwium.com/api/peoples/${postId}`;
    console.log(newUrl);
    ajax(newUrl, function (elementNew) {
      overlayInfo(elementNew);
    });
  });

  postWraper.appendChild(divContainer);
}

function overlayInfo(item) {
  const pDescr = document.createElement("p");
  pDescr.innerText = item.age;
  pDescr.classList.add("pdescstyle");
  contentBlock.appendChild(pDescr);
}

closeOverlay.addEventListener("click", function () {
  postOverlay.classList.remove("activeOverlay")
  contentBlock.innerHTML = " ";
});

btnAdd.addEventListener("click", function () {
  addOverlay.classList.add("ActiveAdd");
});

form.addEventListener("submit", function (e) {
  e.preventDefault();
  console.log(e.target[0].value);
  let formdataSend = {
    firstName: e.target[0].value,
    lastName: 11,
  };

  fetch("https://softwium.com/api/peoples", {
    method: "POST",
    body: JSON.stringify(formdataSend),
    headers: {
      "content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((SendedObj) => {
      createComments(SendedObj);
      e.target[0].value = "";
      addOverlay.classList.remove("ActiveAdd");
    });
});

// carousell

document.addEventListener("DOMContentLoaded", function () {
  new Splide("#image-carousel", {
    heightRatio: 0.5,
  }).mount();
});

document.addEventListener("DOMContentLoaded", function () {
  new Splide("#image-carousel", {
    cover: true,
    heightRatio: 0.5,
  }).mount();
});

document.addEventListener("DOMContentLoaded", function () {
  new Splide("#card-carousel", {
    perPage: 2,
    breakpoints: {
      640: {
        perPage: 1,
      },
    },
  }).mount();
});

document.addEventListener("DOMContentLoaded", function () {
  new Splide("#fullscreen-carousel", {
    width: "100vw",
    height: "100vh",
  }).mount();
});

// Get the button
let mybutton = document.getElementById("myBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

//  filter

let ulResult = document.getElementById("result");
let inputField = document.getElementById("filter");

let listItems = [];

async function asyncFncfetch() {
  const response = await fetch("https://reqres.in/api/users?delay=3");
  console.log(response);
  if (!response.ok) {
    throw new Error("can not fetch data");
  }
  const recinf = await response.json();
  return recinf;
}

asyncFncfetch()
  .then((responseData) => {
    responseData.data.forEach((element) => {
      let li = document.createElement("li");
      li.textContent = `${element.first_name} ${element.last_name}`;

      const UsPic = document.createElement("img");
      UsPic.setAttribute("src", element.avatar);
      UsPic.setAttribute("alt", "face");
      li.appendChild(UsPic);

      listItems.push(li);
      ulResult.appendChild(li);
    });
  })
  .catch((err) => {
    if (err == 404) console.log("Page Not Found");
  });

function filterData(searchItem) {
  listItems.forEach((item) => {
    console.log(item);

    if (item.innerText.toLowerCase().includes(searchItem.toLowerCase())) {
      item.classList.remove("hide");
    } else {
      item.classList.add("hide");
    }
  });
}

inputField.addEventListener("keyup", function () {
  filterData(this.value);
});

// ---- form element
const formElement = document.getElementById("resgitration");

formElement.addEventListener("submit", function (event) {
  event.preventDefault();

  const errors = {};

  let usernameValue = document.getElementById("usernamefield").value;

  if (usernameValue == "") {
    errors.username = "შეავსეთ მომხმარებლის სახელი";
  }

  let passwValue = document.getElementById("passwordfield").value;
  let passw2Value = document.getElementById("passwordfield2").value;

  if (passwValue == "") {
    errors.passw = "პაროლის ველი ცარიელია";
  }

  if (passwValue != passw2Value) {
    errors.passw2 = "პაროლი არ ემთხვევა";
  }

  let gender = false;

  formElement.querySelectorAll('[name = "gender"]').forEach((item) => {
    if (item.checked) {
      gender = true;
    }
  });

  if (!gender) {
    errors.gender = "აირჩიეთ სქესი";
  }

  let MesaageValue = document.getElementById("user-message").value;

  if (MesaageValue == "") {
    errors.message = "შეავსეთ შეტყობინების ველი";
  }

  let emailValues = document.getElementById("emailfield").value;

  if (emailValues == "") {
    errors.email = "შეავსეთ ელ-ფოსტის ველი";
  }

  let checkInput = document.getElementById("agree").checked;

  if (!checkInput) {
    errors.check = "გთხოვთ დაეთანხმეთ საიტის მოხმარების წესებს";
  }

  formElement.querySelectorAll(".error-text").forEach((el) => {
    el.textContent = " ";
  });

  formElement.querySelectorAll(".error-text").forEach((el) => {
    el.textContent = " ";
  });

  for (let item in errors) {
    console.log(item);

    let errorPelement = document.getElementById("error-" + item);
    console.log(errorPelement);

    if (errorPelement) {
      errorPelement.textContent = errors[item];
    }
  }

  if (Object.keys(errors).length == 0) {
    formElement.submit();
  }

  console.log(errors);
});

let passwShow = document.getElementById("passwordfield");
let passwShow2 = document.getElementById("passwordfield2");
let icon = document.getElementById("showIcon");
let icon2 = document.getElementById("showIcon2");

icon.addEventListener("click", function () {
  if (passwShow.type == "password") {
    passwShow.setAttribute("type", "text");
    icon.classList.remove("fa-eye");
    icon.classList.add("fa-eye-slash");
  } else {
    passwShow.setAttribute("type", "password");
    icon.classList.remove("fa-eye-slash");
    icon.classList.add("fa-eye");
  }
});

icon2.addEventListener("click", function () {
  if (passwShow2.type == "password") {
    passwShow2.setAttribute("type", "text");
    icon2.classList.remove("fa-eye");
    icon2.classList.add("fa-eye-slash");
  } else {
    passwShow2.setAttribute("type", "password");
    icon2.classList.remove("fa-eye-slash");
    icon2.classList.add("fa-eye");
  }
});

let email = document.getElementById("emailfield");

function validationEmail() {
  let emailValue = document.getElementById("emailfield").value;
  let textError = document.getElementById("error-email");
  let emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  if (emailPattern.test(emailValue)) {
    textError.innerText = "ელ-ფოსტა სწორია";
    textError.style.color = "green";
  } else {
    textError.innerText = "ელ-ფოსტა არასწორია";
    textError.style.color = "red";
  }

  if (emailValue == "") {
    textError.innerHTML = "";
  }
}

email.addEventListener("keyup", validationEmail);

// local 

let addButton = document.querySelector(".add");
let input = document.querySelector(".input");
let added = document.querySelector(".task");
let reset = document.querySelector(".reset");
let myArray = []
let delButton = document.createElement("button")
let contentBox = document.createElement("div")


// Execute a function when the user presses a key on the keyboard
input.addEventListener("keypress", function(event) {
    // If the user presses the "Enter" key on the keyboard
    if (event.key === "Enter") {
      // Cancel the default action, if needed
        event.preventDefault();
      // Trigger the button element with a click
        addButton.click();
        location.reload = function (){
            input.focus();
        }
    }
});


// condetion
if (window.localStorage.getItem("name")){

            myArray = JSON.parse(window.localStorage.getItem("name"))

                    myArray.forEach(data => {
                
                    let contentBox = document.createElement("div")
                    let cerh1 = document.createElement("h2")
                    let delButton = document.createElement("button")
                    
                    delButton.id = data.name;
                    cerh1.className = "task-box"
                    delButton.innerText = "Delete"
                    contentBox.className = "dilBox"
                    delButton.className = "dilButton"

                    cerh1.appendChild(delButton)
                    added.appendChild(contentBox)
                    contentBox.appendChild(cerh1)
                    contentBox.appendChild(delButton)
                    
                    cerh1.innerHTML = data.name;
            })
}

// add to page and local storage
    addButton.onclick = function () {

        if (input.value === "" ){
            return;
        } else{

            myArray.push(JSON.parse(`{"id": "${"#"}","name": "${input.value}"}`))
            window.localStorage.setItem("name", JSON.stringify(myArray))

                    let contentBox = document.createElement("div")
                    let cerh1 = document.createElement("h2")
                    let delButton = document.createElement("button")
                    
                    delButton.id = input.value
                    cerh1.className = "task-box"
                    delButton.innerText = "Delete"
                    contentBox.className = "dilBox"
                    delButton.className = "dilButton"

                    cerh1.appendChild(delButton)
                    added.appendChild(contentBox)
                    contentBox.appendChild(cerh1)
                    contentBox.appendChild(delButton)

                    cerh1.innerHTML = input.value

                                location.reload() = function (){
                                document.querySelector(".input").focus();
            }

            input.value = ""
            
        }
}

// delet task from page
let button = document.querySelectorAll(".dilButton")
console.log(document.querySelector(".dilButton"))
button.forEach((t) =>{

    t.onclick = function () {

        t.parentElement.remove()
        
                // this new variable always will be number of local storage
                var items = JSON.parse(localStorage.getItem('name'));

                for(i = 0; i <= myArray.length; i ++){
        
                   
                    let testmyArray = myArray.filter((task) => task.name != t.id)
                  
                    myArray = testmyArray
                   
                    localStorage.setItem("name", JSON.stringify(myArray))
                }
        }
})

reset.onclick = function  (){
    window.localStorage.clear()
    location.reload()
}
