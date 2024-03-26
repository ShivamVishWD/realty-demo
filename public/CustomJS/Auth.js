$(document).ready(function(){
    // console.log(userDetails,'pop');
    UserController.getUserDetails();
    UserController.getUserContact();
    // $('.logout-btn').on('click', UserController.doUserLogout());
    $('.logout-btn').on('click', ()=>{
        UserController.doUserLogout();
    });

    $('.user-contact').on('submit', (e) => {
        e.preventDefault();
        // alert('update user details');
        UserController.insertUserContact();
    })
});
const UserController = {
    async getUserDetails(){
        try{
            //Check User ID
            if(!userDetails)
            return;
            //Get User Details from API
            const URL = Base_url + 'api/userDetail/';

            let response = await fetch(URL);
            response = await response.json();
            if(response.status == 200){
                //Apply to UI
                // console.log(response.result, 'userdata UI')
                if(response.result){
                    let profileName = response.result.name;
                    let profileMail = response.result.email;
                    let profilePsw = response.result.password;
                    console.log(response.result, "User Detail");
                    if(response.result.userType == "Resident"){
                        $('#community-nav').css('display', 'block');
                    }else {
                        $('.propertyDet').hide();
                        $('.propertyDet').css('display', 'none');
                        $('.propertyDet a').removeClass('active');
                        $('.profile-location').css('display', 'none');
                    }
                    
                    // console.log(profileName,'user name');
                      $("#profile").text(profileName);
                      $('#login-nav').css('display', 'none');
                      $('.profile-name').text(profileName);
                      $('.logout-btn').addClass('show-btn');
                      $('.cp-float').addClass('show');
                      $('#profile_name').val(profileName);
                      $('#profile_email').val(profileMail);
                      $('#profile_psw').val(profilePsw);
                      $('#profile_id').val(userDetailsFromSessions);
                      $('.cp-features').addClass('show');
                      $('.cp-visitors').addClass('show');
                }
            }
            else{

            }
            
        }
        catch(err){
            console.log(err)
        }
    },

    async insertUserContact(){
        try{
            // console.log(userDetailsFromSessions);
            const arrayData = $('.user-contact').serializeArray();
            // console.log(arrayData);
            let data = {};
            for(let key of arrayData){
                data[key.name] = key.value;
            }
            // console.table(data);

            const URL = Base_url + 'api/insertUserContact/';
            const option = {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    "Content-type":"Application/json"
                }
            }

            let response = await fetch(URL, option);
            response = await response.json();
            if(response){
                $('.contactMessage').text('Detail Updated');
                $('.contactMessage').attr('class', 'text-success');
                setTimeout(()=>{
                    window.location.href='/profile';
                }, 100);
            }else{
                $('.contactMessage').text('Detail not Updated');
                $('.contactMessage').attr('class', 'text-danger');
            }
        }
        catch(err){
            console.log(err);
        }
    },

    async getUserContact(){
        try{
            if(!userDetails)
            return;

            const URL = Base_url + 'api/getUserContact/' + userDetails;

            let response = await fetch(URL);
            response = await response.json();

            if(response.status == 200){
                let user_flatno = response.result.user_flat;
                let user_towerno = response.result.user_tower;
                let user_society = response.result.user_society;
                let user_mob = response.result.user_mobile;
                let call_no = 'tel:'+user_mob;
                // console.log(call_no);
                console.log(`${user_mob} and ${user_towerno} and ${user_society}`);

                $('#profile_flat').val(user_flatno);
                $('#profile_tower').val(user_towerno);
                $('#profile_society').val(user_society);
                $('#profile_number').val(user_mob);
                $("#profile_flat").prop('disabled', true);
                $("#profile_tower").prop('disabled', true);
                $("#profile_society").prop('disabled', true);
                $("#profile_number").prop('disabled', true);
                $('.btn-update-contact').addClass('hide');
                $('.tower-no').text(user_towerno);
                $('.flat-no').text(user_flatno);
                $('.user-mob').text(user_mob);
                $('.user-mob').attr('href', call_no);
                $('.cp-locationStrip').addClass('show');
                $('.navbar').addClass('shift');
                
            }
        }
        catch(err){
            console.log(err);
        }
    },

    async doUserLogout(){
        try{
            if(!userDetails)
            return;
            const URL = Base_url + 'api/userLogout/'; 
            
            let response = await fetch(URL);
            response = await response.json();
            if(response)
            window.location.href='/';
            
        }
        catch(err){
            console.log(err)
        }
    }
}