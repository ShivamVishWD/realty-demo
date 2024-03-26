$(document).ready(function () {
  let registerData = $(".signUpForm");
  registerData.off().on("submit",(e) => {
    e.preventDefault();
    registerUser();
  });
});

async function registerUser(){
    const arrayData = $('.signUpForm').serializeArray();
    if(!(arrayData[0].value && arrayData[1].value && arrayData[2].value))
    {
        alert('Please fill fields');
        return;
    }
    let data = {};
    for (key of arrayData) {
      data[key.name] = key.value;
    }

    const URL = Base_url +'api/registerUser';
    // console.log(URL);
    const option = {
      method:'POST',
      body:JSON.stringify(data),
      headers:{
        "Content-type":"Application/json"
      }
    }
    let response = await fetch(URL,option);
    response = await response.json();
    if(response){
      $('.signUpForm').trigger("reset");
      // alert("Successfully Register");
      $('#message').text("Signup Successfull");
      setTimeout(() =>{
        window.location.href = '/login';
      }, 1000);
    }
    else{
      $('.signUpForm').find("input:text").focus();
      $('.signUpForm').trigger("reset");
      alert("Some Problem Here");
    }
  }