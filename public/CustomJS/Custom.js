window.onload = function(){
  //hide the preloader
  $('#preloader').fadeOut(2500);
}
$(document).ready(function () {
  getCommunity();
  modalInit();
  $(".serviceForm")
    .off()
    .on("submit", (e) => {
      e.preventDefault();
      createCommunity();
    });

  $('.complaintForm').off().on('submit', (e) => {
    e.preventDefault();
    raiseComplaint();
  });

  $('.callbackForm').off().on('submit', (e)=>{
    e.preventDefault();
    alert('We will call you soon');
    $('.callbackForm').trigger('reset');
  })

  $('.contactForm').off().on('submit', (e) => {
    e.preventDefault();
    $('.contactMsg').text('Message Reached to Us');
    $('.contactMsg').attr('class', 'text-default');
    setTimeout(()=>{
      $('.contactForm').trigger('reset');
    }, 500);
    setTimeout(()=>{
      $('.contactMsg').text('');
    },900)
  });

  $('.carEntryForm').off().on('submit', (e) => {
    e.preventDefault();
    $('.carEntryMsg').text('Success');
    $('.carEntryMsg').attr('class', 'text-success');
    setTimeout(()=>{
      $('.carEntryForm').trigger('reset');
    }, 500);
    setTimeout(()=>{
      $('#cabEntryOnce').modal('hide');
    },1000);
  });

  $('.deliveryEntryForm').off().on('submit', (e) => {
    e.preventDefault();
    $('.deliveryEntryMsg').text('Success');
    $('.deliveryEntryMsg').attr('class', 'text-success');
    setTimeout(()=>{
      $('.deliveryEntryForm').trigger('reset');
    }, 500);
    setTimeout(()=>{
      $('#deliveryEntryOnce').modal('hide');
    },1000);
  });

  $('.visitEntryForm').off().on('submit', (e) => {
    e.preventDefault();
    alert('Hope Visitor Solve your Problem');
    $('.visitEntryForm').trigger('reset');
  });

  $('.msgToGuardForm').off().on('submit', (e) => {
    e.preventDefault();
    $('.guardMsg').text('Success');
    $('.guardMsg').attr('class', 'text-success');
    setTimeout(()=>{
      $('.msgToGuardForm').trigger('reset');
    }, 500);
    setTimeout(()=>{
      $('#msgToGaurdModal').modal('hide');
    },1000);
  });

  $('.kidKitForm').off().on('submit', (e) => {
    e.preventDefault();
    $('.allowMsg').text('Success');
    $('.allowMsg').attr('class', 'text-success');
    setTimeout(()=>{
      $('.kidKitForm').trigger('reset');
    }, 500);
    setTimeout(()=>{
      $('#kidAllowModal').modal('hide');
    },1000);
  });

  $('.alertForm').off().on('submit', (e) => {
    e.preventDefault();
    $('.securityMsg').text('Success');
    $('.securityMsg').attr('class', 'text-success');
    setTimeout(()=>{
      $('.alertForm').trigger('reset');
    }, 500);
    setTimeout(()=>{
      $('#securityModalForm').modal('hide');
    },1000);
  });

  $('.propertyForm').off().on('submit', (e) => {
    e.preventDefault();
    alert('Form Submiteed');
    $('.propertyForm').trigger('reset');
  });

  $('#passwordToggle').on('click',function(){
    if($('#profile_psw').attr('type') != "password"){
        $('#profile_psw').attr('type','password');
        $('#passwordToggle').attr('class', 'fa fa-eye');
    }else{
        $('#profile_psw').attr('type','text');
        $('#passwordToggle').attr('class', 'fa fa-eye-slash');
    }
  });

  $('.enquiryForm').off().on('submit', (e)=>{
    e.preventDefault();
    $('.enquiryMessage').text('Success');
    $('.enquiryMessage').attr('class', 'text-success');
    setTimeout(()=>{
      $('.enquiryForm').trigger('reset');
    }, 500);
    setTimeout(()=>{
      $('#enquiryModal').modal('hide');
    },1000);
  })

  $(window).scroll(function () {
    var SCROLL = $(window).scrollTop();
    if (SCROLL > 100) {
      $('.navbar').addClass('scroll', 300);
    }
    else {
      $('.navbar').removeClass('scroll', 300);
    }
  });

  // setTimeout(function () {
  //   setInterval(function () {
  //     const imgChange = $('.logo-img').attr('src', $('.logo-img').data('change'))
  //     imgChange.css({
  //       'height': '38px',
  //       'aspect-ratio': '1/1',
  //       'margin': '1rem',
  //       'transition': '0.3s ease-in-out'
  //     })
  //   }, 1)
  // }, 3500);

  // Video Play Puase Jqeury Start
  $('.cp-banner').find('.sec').off().on('click', function () {
    // console.log(video);
    let pauseBtn = $('.cp-banner').find('.play-pause-btn').data('pause');
    let playBtn = $('.cp-banner').find('.play-pause-btn').data('play');
    if ($('.video-banner').hasClass('show')) {
      $('.play-pause-btn').attr('src', playBtn);
      $('#current').text('Watch Video');
      $('.video-banner').removeClass('show');
    }
    else {
      $('.video-banner').addClass('show');
      $('.cp-banner').find('video').trigger('play')
      $('.play-pause-btn').attr('src', pauseBtn);
      $('#current').text('Pause Video');
    }
  });
  let checkVideobanner = $('.cp-banner').find('.video-banner');
  let pauseBtn = $('.cp-banner').find('.play-pause-btn').data('pause');
  let playBtn = $('.cp-banner').find('.play-pause-btn').data('play');
  if(checkVideobanner.hasClass('show')) {
    $('.cp-banner').find('#myVideo').trigger('play');
    $('.play-pause-btn').attr('src', pauseBtn);
    $('#current').text('Pause Video');
  }else{
    $('.cp-banner').find('#myVideo').trigger('pause');
    $('.play-pause-btn').attr('src', playBtn);
    $('#current').text('Watch Video');
  }
  // Video Play Pasue Jquery End

  // Scroll Effect on Get started Button
  $('.first').on('click', function () {
    $('html, body').animate({
      scrollTop: $(".cp-callback").offset().top
    }, 1000);
  });

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

  async function raiseComplaint() {
    if (userDetailsFromSessions == '616052e7f52e5c8095f19819') {
      alert('Please Login for Complaint');
      $('.complaintForm').trigger('reset');
      return false;
    }
    const arrayData = $('.complaintForm').serializeArray();
    // console.log(arrayData);

    let data = {};
    for (let key of arrayData) {
      data[key.name] = key.value;
    }

    let date = new Date();
    let printCode = date.getDate()+""+date.getMonth()+""+date.getFullYear()+randomText()+randomNumber();

    data.complaint_code = printCode;
    // console.table(data);

    let URL = Base_url + 'api/insertComplaint/';
    const options = {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        "Content-type": "Application/json"
      }
    }

    let response = await fetch(URL, options);
    response = await response.json();
    let msg = '';
    if (response) {
      msg += `Request No. - ${printCode}`;
      $('.helpMessage').empty().html(msg);
      $('.response-table').addClass('refreshAnimation')
      setTimeout(()=>{
        $('.complaintForm').trigger('reset');
      },500);
      setTimeout(()=>{
        $('.response-table').removeClass('refreshAnimation', 300);
      },1000);
      setTimeout(()=>{
        getUserComplaints();
      }, 1000);
      printCode = '';
    }else{
      msg += `Something Went Wrong <br/> Please Try Again`;
      $('.errorMessage').empty().html(msg);
    }
  }

  async function createCommunity() {
    if (userDetailsFromSessions == '616052e7f52e5c8095f19819') {
      alert('Please Login for Complaint');
      $('.serviceForm').trigger('reset');
      return false;
    }
    const array = $(".serviceForm").serializeArray();
    let data = {};
    for (let key of array) {
      data[key.name] = key.value;
    }
    //   console.log(data);
    //   addToDatabase(data);
    const URL = Base_url + 'api/insertService';
    //   console.log(URL);
    const option = {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        "Content-type": "Application/json"
      }
    }
    let response = await fetch(URL, option);
    response = await response.json();
    // console.log(response);
    if (response) {
      alert('Service is Created');
      $(".serviceForm").trigger('reset');
      $("#serviceModal").modal("hide");
    }

    getCommunity();
  }

  function addToDatabase(data) {
    let result = localStorage.setItem("customService", JSON.stringify(data));
    alert("Addedd");
  }

  async function getCommunity() {
    const URL = Base_url + 'api/getService';
    let response = await fetch(URL);
    response = await response.json();
    // console.log(response)
    if (response.status == 200) {
      let tableHTML = "";
      for (let items of response.result) {
        // console.log(items);
        tableHTML +=
          '  <div class="col-lg-3" >' +
          '<div class="card">' +
          '<div class="card-body create-service">' +
          '<img src="/images/icons/customer-service.png" alt="contact icon" class="img-fluid">' +
          '<h5 class="card-title"><b>Your Created Service</b></h5>' +
          '<p class="card-text"><b>Name: </b>' +
          items.service_by +
          "</p>" +
          '<p class="card-text"><b>Service Type: </b>' +
          items.service_type +
          "</p>" +
          '<p class="card-text"><b>Service Description: </b>' +
          items.service_desc +
          "</p>" +
          '<p class="card-text"><b>Service Cost: </b>' +
          items.service_cost +
          " Rs.</p>" +
          "</div>" +
          "</div>" +
          "</div>";
        $("#community").html(tableHTML);
      }
    }
  }

  function modalInit() {
    let modalTarget = $(".cp-actions");
    modalTarget.each(function () {
      modalTarget.find(".guestBtn").on("click", function () {
        $("#exampleModal").modal("hide");
        $("#guestModal").modal("show");
      });
    });

    modalTarget.each(function () {
      modalTarget.find(".carEntryBtn").on("click", function () {
        $("#exampleModal").modal("hide");
        $("#cabEntryModal").modal("show");
      });
    });

    modalTarget.each(function () {
      modalTarget.find(".deliveryBtn").on("click", function () {
        $("#exampleModal").modal("hide");
        $("#deliveryEntry").modal("show");
      });
    });

    modalTarget.each(function () {
      modalTarget.find(".visitBtn").on("click", function () {
        $("#exampleModal").modal("hide");
        $("#visitEntry").modal("show");
      });
    });

    modalTarget.each(function () {
      modalTarget.find(".msgToGuardBtn").on("click", function () {
        $("#exampleModal").modal("hide");
        $("#msgToGaurdModal").modal("show");
      });
    });

    modalTarget.each(function () {
      modalTarget.find(".kidAllowBtn").on("click", function () {
        $("#exampleModal").modal("hide");
        $("#kidAllowModal").modal("show");
      });
    });

    modalTarget.each(function () {
      modalTarget.find(".securityAlrtBtn").on("click", function () {
        $("#exampleModal").modal("hide");
        $("#securityModalForm").modal("show");
      });
    });    

    let formTarget = $(".cp-modalCard");
    formTarget.each(function () {
      formTarget.find(".formTarget").on("click", function () {

        $("#exampleModal").modal("hide");
        $("#cabEntryModal").modal("hide");
        $("#deliveryEntry").modal("hide");
        $("#visitEntry").modal("hide");
        $("#guestModal").modal("hide");
      });
      formTarget.find(".closeCabEntryModal").on("click", function () {
        $("#exampleModal").modal("show");
        $("#cabEntryModal").modal("hide");
      });
      formTarget.find(".closeDeloiveryModal").on("click", function () {
        $("#exampleModal").modal("show");
        $("#deliveryEntry").modal("hide");
      });
      formTarget.find(".closeGuestModal").on("click", function () {
        $("#exampleModal").modal("show");
        $("#guestModal").modal("hide");
      });
      formTarget.find(".closeVisitModal").on("click", function () {
        $("#exampleModal").modal("show");
        $("#visitEntry").modal("hide");
      });      
    });

    let closeModal = $('.cp-modalForm');
    closeModal.each(function () {
      closeModal.find('.closeCabEntryForm').on("click", function () {
        $("#cabEntryModal").modal("show");
        $("#cabEntryOnce").modal("hide");
      })
      closeModal.find('.closeDeliveryForm').on("click", function () {
        $("#deliveryEntry").modal("show");
        $("#deliveryEntryOnce").modal("hide");
      })
      closeModal.find('.closeVisitForm').on("click", function () {
        $("#visitEntry").modal("show");
        $("#visitEntryModal").modal("hide");
      })
      closeModal.find(".closeMsgGuardModal").on("click", function () {
        $("#exampleModal").modal("show");
        $("#msgToGaurdModal").modal("hide");
      });
      closeModal.find(".closeKidModal").on("click", function () {
        $("#exampleModal").modal("show");
        $("#kidAllowModal").modal("hide");
      });
      closeModal.find(".closeSecurityModal").on("click", function () {
        $("#exampleModal").modal("show");
        $("#securityModalForm").modal("hide");
      });
      
    });

    let formControl = $(".cp-modalForm");
    formControl.each(function () {
      var count = 0;
      formControl
        .find(".inviteForm")
        .off()
        .on("submit", function (e) {
          // alert('Guest is Invited');
          e.preventDefault();
          const arrayData = $(".inviteForm").serializeArray();
          console.log(arrayData);
          $(".inviteForm").trigger("reset");
          $("#manuallyModal").modal("hide");
        });
      formControl.find(".closeGuestForm").on("click", function () {
        $("#guestModal").modal("show");
        $("body").addClass("modal-open");
      });
    });

    let communityModals = $(".cp-community");
    communityModals.each(function () {
      communityModals.find(".create-service").on("click", function () {
        $("#serviceModal").modal("show");
      });
    });

    $(".cp-community").find('.serviceRequest').on('click', function () {
      $('button[type=submit]').prop('disabled', false);
      $('#serviceRequestModal').modal('show');
    });

    $('.cp-community').find('.emergencyNo').on('click', function () {
      $('#emergencyModal').modal('show');
    });

    $('.cp-community').find('.noticeBoardCard').on('click', function () {
      $('#noticeModal').modal('show');
    });

    $('.cp-community').find('.residentModalBtn').on('click', function () {
      $('#residentModal').modal('show');
    });

    $('.cp-community').find('.dailyHelpBtn').on('click', function () {
      $('#helpModal').modal('show');
    });

    $('.cp-community').find('.documentCard').on('click', function () {
      $('#documentModal').modal('show');
    });

    $('.cp-community').find('.prepaidMeterCard').on('click', function () {
      $('#prepaidModal').modal('show');
    });

    $('.cp-community').find('.covidCard').on('click', function () {
      $('#covidModal').modal('show');
    });

    $('.enquiryModalBtn').on('click', ()=>{
      $('#enquiryModal').modal('show');
    })
  }