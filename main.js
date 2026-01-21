// --- Videos ---
const videos = [
  {title:"How to go viral on your VR YouTube Channel", url:"https://www.youtube.com/watch?v=K774EMV6kfE", img:"https://img.youtube.com/vi/K774EMV6kfE/maxresdefault.jpg"},
  {title:"I know who @g.t404 is 🤫🤫", url:"https://youtu.be/7CPn5n5laKg?si=g1mDDE6D38N3Blkt", img:"https://i.ytimg.com/vi/7CPn5n5laKg/hqdefault.jpg"},
  {title:"Easiest Way to Make Gorilla Tag Blender Profile Pictures!", url:"https://youtu.be/igwnmZs6T7o?si=BJjLCOtl8ktr3g7h", img:"https://i.ytimg.com/an_webp/igwnmZs6T7o/mqdefault_6s.webp?du=3000&sqp=CNjQpcsG&rs=AOn4CLCBpbCf1P6Eolv2LYgQmowYY125yw"},
  {title:"How I Got 1,000 Subs on My VR YouTube Channel (FAST + Easy Strategy)", url:"https://youtu.be/qmeMYSgQzeM?si=Dc6I0UPYwhyDaxg2", img:"https://i.ytimg.com/an_webp/qmeMYSgQzeM/mqdefault_6s.webp?du=3000&sqp=CMLmpcsG&rs=AOn4CLDqIquMXIRfCvx6VtAcKcq34shp8w"},
  {title:"How I Got 1,000 Subs on My VR YouTube Channel (FAST + Easy Strategy)", url:"https://youtu.be/QqObesy6QxU?si=J2rIl0dpSQRxPu2d", img:"https://i.ytimg.com/an_webp/QqObesy6QxU/mqdefault_6s.webp?du=3000&sqp=CNjcpcsG&rs=AOn4CLA9rTttYBVRnJi3lxtqHl2M9Mp84A"}
];
let videosLoaded = 0;
const videoGrid = document.getElementById("videoGrid");

function loadVideos() {
  const nextVideos = videos.slice(videosLoaded, videosLoaded+2);
  nextVideos.forEach(v=>{
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `<a href="${v.url}" target="_blank">
      <img src="${v.img}" alt="">
      <p>${v.title}</p>
      <div class="btn">Watch on YouTube</div>
    </a>`;
    videoGrid.appendChild(card);
  });
  videosLoaded += 2;
  if(videosLoaded >= videos.length) document.getElementById("loadMoreBtn").style.display="none";
}
document.getElementById("loadMoreBtn").onclick = loadVideos;

// --- Sign-In / Avatar ---
let selectedAvatar = null;
const avatarOptions = document.querySelectorAll(".avatarOption");
avatarOptions.forEach(img=>{
  img.onclick = function(){
    avatarOptions.forEach(a=>a.classList.remove("selected"));
    this.classList.add("selected");
    selectedAvatar = this.dataset.logo;
  }
});

function showWelcome(name, avatar){
  const welcome = document.getElementById("welcomeMsg");
  welcome.innerHTML = `<img src="${avatar}"> Welcome, ${name}! <button id="editProfileBtn" class="btn">Edit Profile</button>`;
  
  document.getElementById("editProfileBtn").onclick = function() {
    document.getElementById("usernameInput").value = localStorage.getItem("username") || "";
    selectedAvatar = localStorage.getItem("avatar") || null;
    avatarOptions.forEach(a=>{
      a.classList.remove("selected");
      if(a.dataset.logo === selectedAvatar) a.classList.add("selected");
    });
    document.getElementById("signinModal").style.display = "flex";
  }
}

window.onload = function() {
  const user = localStorage.getItem("username");
  const avatar = localStorage.getItem("avatar");
  if(user){
    document.getElementById("signinModal").style.display="none";
    showWelcome(user, avatar);
  } else {
    document.getElementById("signinModal").style.display="flex";
  }
  loadVideos(); // initial 2 videos
};

document.getElementById("signInBtn").onclick = function(){
  const name = document.getElementById("usernameInput").value.trim();
  if(name!==""){
    localStorage.setItem("username", name);
    localStorage.setItem("avatar", selectedAvatar||"https://i.imgur.com/placeholder.png");
    document.getElementById("signinModal").style.display="none";
    showWelcome(name, selectedAvatar||"https://i.imgur.com/placeholder.png");
  } else alert("Please enter your name!");
};

document.getElementById("continueBtn").onclick = function(){
  // Indigo Mode guest avatar
  const guestAvatar = "https://i.imgur.com/3Vt5tQf.png"; // replace with your indigo-style avatar
  localStorage.setItem("username","Guest");
  localStorage.setItem("avatar", guestAvatar);
  document.getElementById("signinModal").style.display="none";
  showWelcome("Guest", guestAvatar);
};
