
// JavaScript document 

// declaring variables
var videoPlayer;
var btn_play, btn_volume;
var interval;
var divControls;
var volume_bar, volume_progress_bar;
var newVolume=1;
var time_bar, time_progress_bar;
var videoInterval;

// function that will be call when page finished loading
window.addEventListener("load", function() {

	videoPlayer = document.getElementById("video-player");
	videoPlayer.addEventListener("mouseenter", showControlDiv, false);
	videoPlayer.addEventListener("mouseleave", hideControlDiv, false);

	btn_play= document.getElementById("btn-play");
	btn_play.addEventListener("click", playVideo, false);

	btn_volume = document.getElementById("btn-volume");
	btn_volume.addEventListener("click", manageVolume, false);

	divControls = document.getElementById("controls");
	divControls.addEventListener("mouseenter", showControlDiv, false);
	divControls.addEventListener("mouseleave", hideControlDiv, false);

	volume_bar = document.getElementById("volume-bar");
	volume_bar.addEventListener("click", changeVolume, false);
	volume_progress_bar = document.getElementById("volume-progress-bar");

	time_bar = document.getElementById("time-bar");
	time_bar.addEventListener("click", changeTimeVideo, false);
	time_progress_bar = document.getElementById("time-progress-bar");

	// starts the video when user clicks on the cover
	// this function will be call just one time then it removes
	document.getElementById("btn-cover-play").addEventListener("click", function(e) {
		e.target.parentNode.style.display = 'none';
		videoPlayer.play();
		btn_play.innerHTML = "pause";

		videoInterval = setInterval(playingVideo, 10);

	}, false);

}, false);

// function will be call every 10 miliseconds 
// and changes the progress bar
function playingVideo(e){

	if(!videoPlayer.ended){
		let maxW = 250;
		let newWidth = (maxW * videoPlayer.currentTime) / videoPlayer.duration;
		time_progress_bar.style.width = newWidth+'px';
	}
	else{
		time_progress_bar.style.width = '0px';
		btn_play.innerHTML = "play_arrow";
		clearInterval(videoInterval);
	}

}


function changeTimeVideo(e){

	let x = e.offsetX;
	time_progress_bar.style.width = x+'px';
	let maxW = 250;
	let newTime = (videoPlayer.duration * x) / maxW;
	videoPlayer.currentTime = newTime;
}

function changeVolume(e){

	let x = e.offsetX;
	volume_progress_bar.style.width = x+'px';
	newVolume = (x / 5) / 10;
	if(newVolume > 0.5){
		btn_volume.innerHTML="volume_up";
		videoPlayer.muted = false;
	}
	else if(newVolume > 0 && newVolume <= 0.5){
		btn_volume.innerHTML ="volume_down";
		videoPlayer.muted = false;
	}
	else{
		btn_volume.innerHTML ="volume_off";
		videoPlayer.muted = true;
	}
	videoPlayer.volume = newVolume;
}

function manageVolume(e){
	let button = e.target;
	if(!videoPlayer.muted){
		videoPlayer.muted = true;
		button.innerHTML = "volume_off";
		//var p = (newVolume*5)*10;
		volume_progress_bar.style.width = '0px';
		videoPlayer.volume = 0;
	}
	else{
		videoPlayer.muted = false;

		if(newVolume > 0.5){
			button.innerHTML="volume_up";
		}
		else if(newVolume > 0 && newVolume <= 0.5){
			button.innerHTML ="volume_down";
		}
		else{
			button.innerHTML ="volume_off";
		}

		//button.innerHTML = "volume_up";
		var p = (newVolume*5)*10;
		volume_progress_bar.style.width = p+'px';
		videoPlayer.volume = newVolume;
	}

}

function playVideo(e){
	let button = e.target;
	if (videoPlayer.paused==true) {
		videoPlayer.play();
		button.innerHTML = "pause";
		videoInterval = setInterval(playingVideo, 10);	
	}
	else{
		videoPlayer.pause();
		button.innerHTML = "play_arrow";
		clearInterval(videoInterval);
	}

}

function showControlDiv(e){
	clearTimeout(interval);
	divControls.style.bottom = '0px';
}

function hideControlDiv(e){
	interval = setTimeout(function() {
		divControls.style.bottom = '-40px';
	}, 2000);

}


// alert window

function greetings(){

	alert("hello world, this is javascript");

}
