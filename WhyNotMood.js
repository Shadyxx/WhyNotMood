var mood = '';
var mood2 = '';
var mood3 = '';
var locmood = '';
var playing = 0;
var country;

function success(position) {
  var mapcanvas = document.createElement('div');
  mapcanvas.id = 'mapcontainer';
  mapcanvas.style.height = '150px';
  mapcanvas.style.width = '250px';

  document.querySelector('article').appendChild(mapcanvas);

  var coords = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

  localStorage.locmoodlat = position.coords.latitude;
  localStorage.locmood = "BE";
  localStorage.locmoodlong = position.coords.longitude;
  
  var options = {
    zoom: 15,
    center: coords,
    mapTypeControl: false,
    navigationControlOptions: {
    	style: google.maps.NavigationControlStyle.SMALL
    },
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  var map = new google.maps.Map(document.getElementById("mapcontainer"), options);

  var marker = new google.maps.Marker({
      position: coords,
      map: map,
      title:"You are here!"
  });
        
}

function createCORSRequest(method, url) {
  var xhr = new XMLHttpRequest();

  if ("withCredentials" in xhr) {
    // XHR for Chrome/Firefox/Opera/Safari.
    xhr.open(method, url, true);

  } else if (typeof XDomainRequest != "undefined") {
    // XDomainRequest for IE.
    xhr = new XDomainRequest();
    xhr.open(method, url);

  } else {
    // CORS not supported.
    xhr = null;
  }
  return xhr;
}

function getcountry(locmoodlat, locmoodlong){
latitude1=locmoodlat;
longitude1=locmoodlong;

var url="http://maps.googleapis.com/maps/api/geocode/json?latlng="+latitude1+","+longitude1+"&sensor=true";
		var xhr = createCORSRequest('POST', url);
           if (!xhr) {
             alert('CORS not supported');
           }
		   
		   xhr.onerror = function() {
               alert('Woops, there was an error making the request.');   	   
           };
		   
           xhr.onload = function() {

            var data =JSON.parse(xhr.responseText);
            
            if(data.results.length>0)
            {
            
            var locationDetails=data.results[0].formatted_address;
            var  value=locationDetails.split(",");
            
            count=value.length;
            
             country=value[count-1];       
             localStorage.locmood = country;
            }
            else
            {
             localStorage.locmood = "error";
            }
            
           };

           xhr.onerror = function() {
               alert('Woops, there was an error making the request.');       
           };
        xhr.send();
}

function activate(){
if (navigator.geolocation) {
	navigator.geolocation.getCurrentPosition(success);
} else {
  error('Geo Location is not supported');
}
}




function selectMood1(){
		var sel = document.getElementById('moodchoice');
		mood = sel.options[sel.selectedIndex].value;
		localStorage.mood1 = mood;
}

function selectMood2(){
		var sel = document.getElementById('moodchoice2');
		mood2 = sel.options[sel.selectedIndex].value;
		localStorage.mood2 = mood2;
}

function selectMood3(){
		var sel = document.getElementById('moodchoice3');
		mood3 = sel.options[sel.selectedIndex].value;
		localStorage.mood3 = mood3;
}

function selectCountry(){
		var sel = document.getElementById('countrychoice');
		locmood = sel.options[sel.selectedIndex].value;
		localStorage.locmood = locmood;
}


function musicStart(){
	mood = localStorage.mood1;
	mood2 = localStorage.mood2;
	mood3 = localStorage.mood3;
	locmoodlat = localStorage.locmoodlat;
	locmoodlong = localStorage.locmoodlong;
	getcountry(locmoodlat, locmoodlong);
	locmood = localStorage.locmood;
	
	document.getElementById("gif").src="images/animated.gif";
	if(locmood == 'BE' ){
		document.getElementById("musicPlayingMix").src="http://youtube.com/embed/do5kXObPOCE";
		mixplaying.innerHTML = "You are in Belgium ! Here is a famous artist from Belgium." + locmoodlat + locmoodlong;
	} else if(locmood == 'FR' ){
		document.getElementById("musicPlayingMix").src="http://youtube.com/embed/na-GFi4XaW0";
		mixplaying.innerHTML = "You are in France ! Here is a famous artist from France.";
	} else if(locmood == 'UK' ){
		document.getElementById("musicPlayingMix").src="http://youtube.com/embed/tN9EC3Gy6Nk";
		mixplaying.innerHTML = "You are in the UK ! Here is a famous song from the UK.";
	} else if(locmood == 'DE' ){
		document.getElementById("musicPlayingMix").src="http://youtube.com/embed/Lur-SGl3uw8";
		mixplaying.innerHTML = "You are in Germany ! Here is a famous song from Germany";
	} else {
		if (mood3 == 'Yes' ){
			document.getElementById("musicPlayingMix").src="http://youtube.com/embed/InYvRyX2Fu4";
			mixplaying.innerHTML = "Christmas fun ! ＼(＾O＾)／ ";
		} else {
			if(typeof mood2 === 'undefined'){
				if (mood == 'Happy'){ 
					document.getElementById("musicPlayingMix").src="http://youtube.com/embed/NJQduiZe8CY";
					mixplaying.innerHTML = "The happy mix ! :-)";
				} else if (mood == 'Sad'){
					document.getElementById("musicPlayingMix").src="http://youtube.com/embed/oh6NKK8M2VQ";
					mixplaying.innerHTML = "The sad mix ! :-(";
				} else if (mood == 'Chill'){
					document.getElementById("musicPlayingMix").src="http://youtube.com/embed/mjwHO1b_tbE";
					mixplaying.innerHTML = "The chill mix ! :-3";
				} else if (mood == 'High'){
					document.getElementById("musicPlayingMix").src="http://youtube.com/embed/tUWhJ3O3cWI";
					mixplaying.innerHTML = "The high mix ! o.O";
				} else if (mood == 'Party'){
					document.getElementById("musicPlayingMix").src="http://youtube.com/embed/y_vJBKy0dAY";
					mixplaying.innerHTML = "The party mix ! <|:-)";
				} else if (mood == 'Study'){
					document.getElementById("musicPlayingMix").src="http://youtube.com/embed/ZVQGVz8xyug";
					mixplaying.innerHTML = "The study mix ! :/";
				} else if (mood == 'Focus'){
					document.getElementById("musicPlayingMix").src="http://youtube.com/embed/Ym8JjY4fy-M";
					mixplaying.innerHTML = "The focus mix ! :O";
				} else if (mood == 'Sick'){
					document.getElementById("musicPlayingMix").src="http://youtube.com/embed/YeuLTL8pQRQ";
					mixplaying.innerHTML = "The sick mix ! :@";
				}  else {
					document.getElementById("musicPlayingMix").src="http://youtube.com/embed/EVlKPyIe2RY";
					mixplaying.innerHTML = "You did not select a first mood, or did something strange. So you get some old hip hop!" + locmood;
				} 
			} else {
				if (typeof mood === 'undefined'){
					document.getElementById("musicPlayingMix").src="http://youtube.com/embed/9nqr8BSvoz0";
					mixplaying.innerHTML = "You did not select a first mood, or did something strange. So you get some old hip hop!";
				} else if ((mood == 'Happy' && mood2 == 'Sad') || (mood == 'Sad' && mood1 == 'Happy')){
					mixplaying.innerHTML = "This combination doesn't work really well now, does it ?";
				} else if ((mood =='Happy' && mood2 == 'Chill') || (mood == 'Chill' && mood2 =='Happy')){
					document.getElementById("musicPlayingMix").src="http://youtube.com/embed/E_9ncvwEf34";
					mixplaying.innerHTML = "Time to relax and be happy !";
				} else if ((mood =='Happy' && mood2 == 'High') || (mood == 'High' && mood2 =='Happy')){
					document.getElementById("musicPlayingMix").src="http://youtube.com/embed/6bbOe2NKZRc";
					mixplaying.innerHTML = "Get happy, get high !";
				} else if ((mood =='Happy' && mood2 == 'Party') || (mood == 'Party' && mood2 =='Happy')){
					document.getElementById("musicPlayingMix").src="http://youtube.com/embed/7ic9RoSgmlM";
					mixplaying.innerHTML = "Happy New Year ! Time to party !";
				} else if ((mood =='Happy' && mood2 == 'Study') || (mood == 'Study' && mood2 =='Happy')){
					document.getElementById("musicPlayingMix").src="http://youtube.com/embed/f1KUQENL7OY";
					mixplaying.innerHTML = "This is a bit weird, but yeah sure.";
				} else if ((mood =='Happy' && mood2 == 'Focus') || (mood == 'Focus' && mood2 =='Happy')){
					document.getElementById("musicPlayingMix").src="http://youtube.com/embed/hxC_Zp3hj7Y";
					mixplaying.innerHTML = "Workout music fo shizzle ma nizzle!";
				} else if ((mood =='Happy' && mood2 == 'Sick') || (mood == 'Sick' && mood2 =='Happy')){
					document.getElementById("musicPlayingMix").src="http://youtube.com/embed/mqMBdRNYcFc";
					mixplaying.innerHTML = "Get well soon friend !";
				} else if (mood =='Happy' && mood2 == 'Happy'){
					document.getElementById("musicPlayingMix").src="http://youtube.com/embed/U2rvxWyxR28";
					mixplaying.innerHTML = "You seem super happy ! GREAT !";
				}
			}
		}
	}
}


function musicoffStart(){
	mood = localStorage.mood1;
	mood3 = localStorage.mood3;
	locmood = localStorage.locmood;
	document.getElementById("gif").src="images/animated.gif";
	if(playing==0){
		if (mood3 == 'Yes' ){
			sound = new Audio("music/Christmas.mp3");
			mixplaying.innerHTML = "Christmas fun ! ＼(＾O＾)／ ";
		} else {
			if (mood == 'Happy'){ 
				sound = new Audio("music/Happy.mp3");
				mixplaying.innerHTML = "The happy mix ! :-)";
			} else if (mood == 'Sad'){
				sound = new Audio("music/Sad.mp3");
				mixplaying.innerHTML = "The sad mix ! :-(";
			} else if (mood == 'Chill'){
				sound = new Audio("music/Chill.mp3");
				mixplaying.innerHTML = "The chill mix ! :|";
			} else if (mood == 'High'){
				sound = new Audio("music/High.mp3");
				mixplaying.innerHTML = "The high mix ! o.O";
			} else if (mood == 'Party'){
				sound = new Audio("music/Party.mp3");
				mixplaying.innerHTML = "The party mix ! <|:-)";
			} else if (mood == 'Study'){
				sound = new Audio("music/Study.mp3");
				mixplaying.innerHTML = "The study mix ! :/";
			} else if (mood == 'Focus'){
				sound = new Audio("music/Focus.mp3");
				mixplaying.innerHTML = "The focus mix ! :O";
			} else if (mood == 'Sick'){
				sound = new Audio("music/Sick.mp3");
				mixplaying.innerHTML = "The sick mix ! :@";
			}  else if (locmood == 'BE'){
				sound = new Audio("music/Belgium.mp3");
				mixplaying.innerHTML = "You are in Belgium ! Here is a famous artist from Belgium.";
			} else if (locmood == 'FR'){
				sound = new Audio("music/France.mp3");
				mixplaying.innerHTML = "You are in France ! Here is a famous artist from France.";
			} else if (locmood == 'DE'){
				sound = new Audio("music/Germany.mp3");
				mixplaying.innerHTML = "You are in Germany ! Here is a famous song from Germany.";
			} else if (locmood == 'UK'){
				sound = new Audio("music/UK.mp3");
				mixplaying.innerHTML = "You are in the UK! Here is a famous song from the UK.";
			} else {
				sound = new Audio("music/Random.mp3");
			}
		}
		sound.play();
		playing = 1;
		
	} else {
	sound.play();
	}
}


function musicStop(){
	document.getElementById("musicPlayingMix").src="";
	document.getElementById("gif").src="images/NoAnime.png";
}

function musicoffStop(){
	sound.pause();
	playing = 1;
	document.getElementById("gif").src="images/NoAnime.png";
}

function clearstorage(){
	localStorage.clear();
}
