const socket = io();


if (navigator.geolocation) {
  navigator.geolocation.watchPosition(
    (position) => {
      const { latitude, longitude } = position.coords;
      socket.emit("send-location", { latitude, longitude });
    },
    (error) => {
      console.log(error);
    },
    {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    }
  );
}

const map=L.map("map").setView([0,0],10);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
  attribution:"FindMyFriends"
}).addTo(map);


const markers={}

socket.on("recieve-location",(data)=>{
  const {id,latitude,longitude}=data;
  map.setView([latitude,longitude]);
  if(markers[id]){
    markers[id].setLatLang([latitude,longitude])
  }
  else{
    L.marker([latitude,longitude]).addTo(map)
  }
})