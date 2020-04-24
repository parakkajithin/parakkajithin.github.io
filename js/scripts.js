$(document).ready(function () {
    let cnt='';
});
$('#calculate').click(function(){
    $("#infield").hide();
   let serries1=parseInt($("#series1").val());
   let serries2=parseInt($("#series2").val());
   let assignment=parseInt($("#assignment").val());
   let total=serries1+serries2+assignment;
   $("#result").html(total);
})