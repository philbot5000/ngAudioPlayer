"use strict";angular.module("ngAudioPlayerApp",["ngCookies","ngResource","ngSanitize","com.mountcrystal.audioPlaylist","ngRoute"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl"}).otherwise({redirectTo:"/"})}]),angular.module("ngAudioPlayerApp").controller("MainCtrl",["$scope","audioPlaylistService",function(a,b){a.myRadPlaylist=[{order:0,name:"David Bowie",song:"John, I'm only dancing",src:"audio/bowie.mp3",url:"",twitter:""},{order:1,name:"The Black Angels",song:"Winter 68",src:"http://reviewstalker.com/wp-content/uploads/2011/10/03-Winter-68.mp3"},{order:2,name:"The Beatles",song:"Winter 68",src:"http://reviewstalker.com/wp-content/uploads/2011/10/03-Winter-68.mp3"}],a.playlists=[{name:"Playlist One",list:[{order:0,name:"David Bowie",song:"John, I'm only dancing",src:"audio/bowie.mp3",url:"",twitter:""},{order:1,name:"The Black Angels",song:"Winter 68",src:"http://reviewstalker.com/wp-content/uploads/2011/10/03-Winter-68.mp3"},{order:2,name:"The Beatles",song:"Winter 68",src:"http://reviewstalker.com/wp-content/uploads/2011/10/03-Winter-68.mp3"}]},{name:"Playlist Two",list:[{order:0,name:"Prince",song:"Raspberry Baret",src:"audio/bowie.mp3",url:"",twitter:""},{order:1,name:"The Gap Band",song:"You Dropped a Bomb on Me",src:"http://reviewstalker.com/wp-content/uploads/2011/10/03-Winter-68.mp3"},{order:2,name:"Roy Orbison",song:"Only the Lonely",src:"http://reviewstalker.com/wp-content/uploads/2011/10/03-Winter-68.mp3"}]}],a.playThisList=function(){b.setPlaylist([{order:0,name:"Prince",song:"Raspberry Baret",src:"audio/bowie.mp3",url:"",twitter:""},{order:1,name:"The Gap Band",song:"You Dropped a Bomb on Me",src:"http://reviewstalker.com/wp-content/uploads/2011/10/03-Winter-68.mp3"},{order:2,name:"Roy Orbison",song:"Only the Lonely",src:"http://reviewstalker.com/wp-content/uploads/2011/10/03-Winter-68.mp3"}])}}]),angular.module("com.mountcrystal.audioPlaylist",[]).directive("audioPlaylist",["audioPlaylistService",function(a){return{templateUrl:"views/audio-playlist.html",restrict:"E",replace:!0,scope:{playlist:"="},controller:"audioPlaylistController",link:function(b,c,d,e){var f=c.find("audio")[0];b.audio=f,f.src=b.currentlyPlaying.src,f.addEventListener("timeupdate",function(){var a=this.currentTime,c=this.duration;b.$apply(function(){b.currentTime=e.timeElapsed(a),b.remainingTime=e.timeRemaining(c,a),b.percentElapsed=e.percentElapsed(c,a)})}),f.addEventListener("playing",function(){b.$apply(function(){b.player.buttonIcon=e.playerControls.pauseIcon})}),f.addEventListener("pause",function(){b.$apply(function(){b.player.buttonIcon=e.playerControls.playIcon})}),f.addEventListener("ended",function(){e.nextTrack()}),f.addEventListener("progress",function(){var a=this.duration,c=this.buffered.end(0);b.$apply(function(){b.percentLoaded=e.percentLoaded(a,c)})}),f.addEventListener("waiting",function(){b.$apply(function(){b.player.buttonIcon=e.playerControls.loadingIcon})});var g=c.find("button");g.bind("click",function(){e.toggleAudio()}),b.$watch(function(){return a.getPlaylist()},function(a){"undefined"!=typeof a&&e.loadPlaylist(a)},!0)}}}]).controller("audioPlaylistController",["$scope","$attrs","audioPlaylistService",function(a,b,c){a.currentlyPlaying=a.playlist[0],this.playerControls={playIcon:'<i class="fa fa-play fa-lg"></i>',pauseIcon:'<i class="fa fa-pause fa-lg"></i>',loadingIcon:'<i class="fa fa-circle-o-notch fa-spin fa-lg"></i>'},a.player={buttonIcon:this.playerControls.playIcon},this.loadPlaylist=function(){a.playlist=c.getPlaylist(),a.audio.src=a.playlist[0].src,a.currentlyPlaying=a.playlist[0],a.audio.load(),a.audio.play()},this.timeElapsed=function(a){var b=a,c=Math.floor(b%60),d=10>c?"0"+c:c,e=Math.floor(b/60%60),f=10>e?"0"+e:e,g=Math.floor(b/60/60%60);return 0===g?f+":"+d:g+":"+f+":"+d},this.timeRemaining=function(a,b){var c=a,d=b,e=c-d,f=Math.floor(e%60)||0,g=10>f?"0"+f:f,h=Math.floor(e/60%60)||0,i=10>h?"0"+h:h,j=Math.floor(e/60/60%60)||0;return 0===j?"-"+i+":"+g:"-"+j+":"+i+":"+g},this.percentLoaded=function(a,b){return parseInt(b/a*100,10)},this.percentElapsed=function(a,b){return Math.floor(100/a*b)||0},this.toggleAudio=function(){a.audio.paused?a.audio.play():a.audio.pause()},this.nextTrack=function(){if(a.playlist.length>=a.currentlyPlaying.order){var b=a.currentlyPlaying.order+1;a.currentlyPlaying=a.playlist[b],a.audio.load(),a.audio.play()}else alert("all done"),a.currentlyPlaying=a.playlist[0],a.audio.pause()},a.previousTrack=function(){var b=a.currentlyPlaying.order-1;0>b?a.currentlyPlaying=a.playlist[0]:(a.audio.src=a.playlist[b].src,a.currentlyPlaying=a.playlist[b],a.audio.load(),a.audio.play())},a.playTrack=function(b){a.audio.src=b.src,a.currentlyPlaying=b,a.audio.load(),a.audio.play()}}]).factory("audioPlaylistService",function(){var a=this;return this.playlist=null,{setPlaylist:function(b){a.playlist=b},getPlaylist:function(){return null!==a.playlist?a.playlist:void 0}}});