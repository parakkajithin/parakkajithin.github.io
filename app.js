
//Loading Data from Google Sheet
//Google sheet id
var spreadsheetID = "1G6pPn4LC8OgBBBgJepzL0B6eLVLg_evYJeEldAy-2z8";
//Google sheet URL
var url = "https://spreadsheets.google.com/feeds/list/" + spreadsheetID + "/1/public/values?alt=json"; 
//Global variable total to store toal number of news   
let total=0;
//Getting data as Json object                 
$.getJSON(url, function(data) {
    var entry = data.feed.entry;
    $('#newsHere').html(''); //Clearing current data           
    let i=0;   //Used to add unique ID to all news
    //console.log(entry);
    $(entry).each(function(){
      i=parseInt(i+1); // Incrementing each item
      total=total+1
      //The news div starts
      $('#newsHere').append('\
        <div class="col-lg-12 my-3 nsClass" id=news'+i+' cur="'+i+'" srr="'+this.gsx$completenews.$t+'">\
          <div class="card">\
            <img class="card-img-top" src="'+this.gsx$image.$t+'">\
            <div class="card-body">\
              <h6 class="card-title">'+this.gsx$title.$t+'</h6>\
              <p class="card-text text-justify">'+this.gsx$description.$t+'</p>\
            </div>\
            <div class="card-footer">\
            <small>#Source: <a href="'+this.gsx$source.$t+'">'+this.gsx$source.$t+'</a></small>\
            <button class="btn btn-primary chng" cur="'+i+'" nxt="'+parseInt(i-1)+'">Previous</button>\
            <button class="btn btn-primary chng" cur="'+i+'" nxt='+parseInt(i+1)+'>Next</button></div>\
          </div>\
        </div>\
      ');
      //The news div ends
        //adding right swipe event listner
        document.getElementById("news"+i).addEventListener('swiped-right', function(e) {
          let cur=parseInt($(this).attr('cur')); 
          let nxt=parseInt(cur+1); 
          if(nxt>total)alert('Nothing more')
          else{
            $('#news'+nxt).fadeIn();
            $('#news'+cur).fadeOut();
          }
        });
        //adding left swipe event listner
        document.getElementById("news"+i).addEventListener('swiped-left', function(e) {
          let cur=parseInt($(this).attr('cur')); 
          let nxt=parseInt(cur-1); 
          if(nxt<=0){location.reload()}
          else{
            $('#news'+nxt).fadeIn();
            $('#news'+cur).fadeOut();
          }
        });
        //adding swipe up event listner
        document.getElementById("news"+i).addEventListener('swiped-up', function(e) {
          let srr=$(this).attr('srr'); 
          window.open(srr);
        });
      
      });
      $('.nsClass').hide(); //hide all news
      $('#news1').show(); //Show first news

      //When next of previous button is clicked
      $('.chng').click(function(){
        //alert($(this).attr('nxt'));
        let nxt=$(this).attr('nxt');
        let cur=$(this).attr('cur');
        if(nxt<=0 || nxt>total)alert('Nothing more')
        else{
          $('#news'+nxt).fadeIn();
          $('#news'+cur).fadeOut();
        }
      })
});

//When refresh button on top nav clicked reload the page
$("#rFresh").click(function(){
  location.reload();
})
//Registering Service Worker
if('serviceWorker' in navigator){
  try{
      navigator.serviceWorker.register('sw.js');
      console.log('Service worker registered');
    }
    catch(error){
      console.log('Service worker not registered');
    }
}
//Prompt to install app
let deferredPrompt;
const addBtn = document.querySelector('#addButton');
//addBtn.style.display = 'none';
window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent Chrome 67 and earlier from automatically showing the prompt
  e.preventDefault();
  // Stash the event so it can be triggered later.
  deferredPrompt = e;
  // Update UI to notify the user they can add to home screen
  //addBtn.style.display = 'block'; 
  $("#installModel").modal('show');
  addBtn.addEventListener('click', (e) => {
  // hide our user interface that shows our A2HS button
  $("#installModel").modal('hide')
    // Show the prompt
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
     deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the A2HS prompt');
      } 
      else {
            console.log('User dismissed the A2HS prompt');
      }
      deferredPrompt = null;
    });
  });
});