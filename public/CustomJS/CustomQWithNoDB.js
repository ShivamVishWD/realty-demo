$(document).ready(function () {
  getCommunity();
  modalInit();
  $(".serviceForm")
    .off()
    .on("submit", (e) => {
      e.preventDefault();
      createCommunity();
    });
});

async function createCommunity() {
  const array = $(".serviceForm").serializeArray();
  let data = {};
  for (let key of array) {
    data[key.name] = key.value;
  }
  console.log(data);
  addToDatabase(data);
  $(".serviceForm").trigger('reset');
  $("#serviceModal").modal("hide");
  getCommunity();
}

function addToDatabase(data) {
  let result = localStorage.setItem("customService", JSON.stringify(data));
  alert("Addedd");
}

function getCommunity() {
  let response = JSON.parse(localStorage.getItem("customService"));
  if (response) {
    let tableHTML = "";
    tableHTML +=
      '  <div class="col-lg-3" >' +
      '<div class="card">' +
      '<div class="card-body create-service">' +
      '<img src="/images/icons/customer-service.png" alt="contact icon" class="img-fluid">' +
      '<h5 class="card-title">Your Created Service</h5>' +
      '<p class="card-text"><b>Name: </b>' +
      response.serviceName +
      "</p>" +
      '<p class="card-text"><b>Service Type: </b>' +
      response.serviceType +
      "</p>" +
      '<p class="card-text"><b>Service Description: </b>' +
      response.serviceDesc +
      "</p>" +
      '<p class="card-text"><b>Service Cost: </b>' +
      response.serviceCost +
      " AED.</p>" +
      "</div>" +
      "</div>" +
      "</div>";
    $("#community").append(tableHTML);
  }
}

function modalInit() {
  let target = $(".cp-actions");
  target.each(function () {
    target.find(".card-body").on("click", function () {
      $("#exampleModal").modal("hide");
      $("#guestModal").modal("show");
    });
  });

  let formTarget = $(".cp-modalCard");
  formTarget.each(function () {
    formTarget.find(".formTarget").on("click", function () {
      $("#exampleModal").modal("hide");
      $("#guestModal").modal("hide");
    });
    formTarget.find(".close").on("click", function () {
      $("#exampleModal").modal("show");
      $("#guestModal").modal("hide");
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
    formControl.find(".close").on("click", function () {
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
}
