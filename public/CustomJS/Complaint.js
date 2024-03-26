$(document).ready(function () {
  getUserComplaints();
});

async function getUserComplaints() {
  try {
    const URL = Base_url + "api/getUsercomplaints/";

    let response = await fetch(URL);
    response = await response.json();
    let count = 0;
    if (response.status == 200) {

      //   console.log(response.result);
      let showComplaint = "";
      for (let items of response.result) {
        let urgentBadge = items.complaint_isUrgent == "urgent complaint" ? '<span class="badge badge-pill badge-warning">URGENT</span>' : '<span class="badge badge-pill badge-primary">Not Urgent</span>';
        let status = items.complaint_status == "Open" ? '<span class="badge badge-pill badge-danger">OPEN</span>' : '<span class="badge badge-pill badge-success">RESOLVED</span>';
        let code = items.complaint_code ? items.complaint_code : '<span class="badge badge-pill badge-light">Code Not Provided</span>';
        let date = Date(items.comlpaint_dt);
        let newDate = date.toString().split('GMT')[0];
        // date.getDay()+"-"+date.getMonth('MM')+"-"+date.getFullYear()+" "+date.getTime('HH:mm:ss')
        count++;
        showComplaint +=
          '<tr>' +
          '<td>' + count + '</td>' +
          '<td>' + code + '</td>' +
          '<td>' + String(items.complaint_category) + '</td>>' +
          '<td>' + items.complaint_desc + '</td>' +
          '<td>' + newDate + '</td>' +
          '<td>' + urgentBadge + '</td>' +
          '<td>' + status + '</td>' +
          '</tr>';

        $('.show-complaint').html(showComplaint);
      }
      if(count >= 7){
        $('.response-table').css({
          'height': '30rem',
          'overflow': 'scroll'
        });
      }else{
        $('.response-table').css({
          'height': 'auto',
          'overflow': 'auto'
        });
      }
    }
  } catch (err) {
    console.log(err);
  }
}
