$(document).ready(function(){
    $('.serviceReqForm').off().on('submit', function(e){
        // alert('hello');
        e.preventDefault();
        $('button[type=submit]').prop('disabled', true);
        createService();
    })
});

function randomText() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    for (var i = 0; i < 2; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

// console.log(randomAlphabate());

function randomNumber() {
    var num = "";
    var numbers = "0123456789";

    for(var i = 0; i < 5; i++) 
        num += numbers.charAt(Math.floor(Math.random() * numbers.length));

    return num;
}

async function createService(){
    if(userDetailsFromSessions == '616052e7f52e5c8095f19819'){
        alert('Please Login for Complaint');
        $('.serviceReqForm').trigger('reset');
        return false;
      }
    const arrayData = $('.serviceReqForm').serializeArray();
    // console.log(arrayData);
    const data= {}
    for (let key of arrayData){
        data[key.name] = key.value;
    }
    // console.table(data);
    let URL = Base_url + 'api/serviceRequest';
    let options = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    }

    let response = await fetch(URL, options);
    response = await response.json();
    if(response){
        $('.serviceMsg').text('Request Sent to Admin');
        $('.serviceMsg').attr('class', 'text-success');
        setTimeout(()=>{
            $('.serviceReqForm').trigger('reset');
        },500);
        setTimeout(()=>{
            $('#serviceRequestModal').modal('hide');
        }, 1000);
    }else{
        $('.serviceMsg').text('Something went Wrong');
        $('.serviceMsg').attr('class', 'text-danger');
    }
}