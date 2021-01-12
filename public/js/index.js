/* 
0930371f3cfa4743cd463ea086287acc openweather 키
acf6fc36340f07e21e2c8b28f3e0db29 다음지도 키
https://api.openweathermap.org/data/2.5/onecall?lat=38&lon=127&exclude=minutely,hourly&appid=0930371f3cfa4743cd463ea086287acc&units=metric 7days 정보
https://api.openweathermap.org/data/2.5/weathe 데일리 정보
navigator 객체의 geolocation 객체중 getCurrentPosition 메소드는 브라우저가 로드 되었을때 위치를 불러온다
navigator 객체의 geolocation 객체중 watchPosition 메소드는 사용자으 위치가 변경되었을때 위치를 불러온다

$.get()메소드의 사용법은 인자로 $.get( url(요청할 주소) , url의 쿼리들을 객체로 만들어 보낼 수 있다(내가 원하는 조건!) , callBack(요청해서 받은 데이터 가지고 할것))
 */


/* 전역 설정 */
var weatherUrl = "https://api.openweathermap.org/data/2.5/weather",
  oneCall = "https://api.openweathermap.org/data/2.5/onecall",
  params = {
    appid: "0930371f3cfa4743cd463ea086287acc",
    units: "metric",
    exclude: "minutely,current",
    lang: "KR"
  },
  cities;


/* 사용자함수 */
function star() {
  var count = 200;
  var i = 0;
  var weatherWrapper = document.querySelector(".weather-wrapper");
  while (i < count) {
    var star = document.createElement("i");
    var x = Math.floor(Math.random() * window.innerWidth)
    var y = Math.floor(Math.random() * window.innerHeight)    
    star.style.left=x+"px";
    star.style.top=y+"px";
    size = Math.floor(1+ Math.random()*4);
    star.style.width=size+"px";
    star.style.height=size+"px";
    star.style.animationDuration =2 + durations+"s";
    var durations= Math.random()*2;
    weatherWrapper.appendChild(star);
    i++
  }



}


function updateWol(r) {
  $(".info .first").append(createInfo(r))
}

function updateDaily(r) {
  $(".info .second").empty();
  $(".info .second").append(createInfo(r)); 
  $(".info .second").addClass("active").siblings().hide();  
  setTimeout(function(){
    $(".info .second").removeClass("active").siblings().show();
  },4000)


}

function updateNam(r) {
  $(".info .third").append(createInfo(r))

}

function createInfo(r) {
  var html;
  html = ' <h2 class="city">' + r.name + '</h2>';
  html += ' <h2 class="viewing-city">' + r.name + '<img src="' + updateBg(r.weather[0].icon).svg + '" alt="날씨아이콘">' + '</h2>';
  html += '<div class="info-wrapper">';
  html += ' <div>';
  html += ' <div class="img-wrap">';
  html += '  <img src="' + updateBg(r.weather[0].icon).svg + '" alt="날씨아이콘">';
  html += ' </div>';
  html += ' <div class="temp-wrap">';
  html += '  <h3>' + Math.floor(r.main.temp) + '</h3>';
  html += '  <div>( 체감 ' + r.main.feels_like + '˚ )</div>';
  html += ' </div>';
  html += ' </div>';
  html += ' <div class="info-wrap">';
  html += '  <div class="desc">';
  html += '   <h3 class="main">' + r.weather[0].main + ' <small>(' + r.weather[0].description + ')</small>';
  html += '   </h3>';
  html += '  </div>';
  html += '  <div class="temp">';
  html += '   <span class="title">최고</span>';
  html += '   <span class="info">' + Math.floor(r.main.temp_max) + '˚</span>';
  html += '   <span class="divide">|</span>';
  html += '   <span class="title">최저</span>';
  html += '   <span class="info">' + Math.floor(r.main.temp_min) + '˚</span>';
  html += '  </div>';
  html += '  <div class="wind">';
  html += '   <span class="title">바람</span>';
  html += '   <span class="arrow fa fa-arrow-down"></span>';
  html += '   <span class="info">' + r.wind.speed + '㎧</span>';
  html += '  </div>';
  html += '  <div class="date">';
  html += '   <span class="title">' + moment().format("YYYY년 MM월 DD일 HH") + '시 기준</span>';
  html += '  </div>';
  html += ' </div>';
  html += '</div>';
  return html;
}

function getWeather(param1, param2) {
  if (param1 && param2) {
    params.lat = param1;
    params.lon = param2;
    params.id = "";
  } else {
    params.id = param1
    params.lat = "";
    params.lon = "";
  }
  $.get(weatherUrl, params, onGetWeather)
  $.get(oneCall, params, onCallWeather)
  
}

function updateBg(icon) {
  var bg,
    svg;

  switch (icon) {
    case "01d":
      svg = "../img/sun-only.svg"
      bg = "../img/earth-day.jpg"
      break;
    case "02d":
    case "03d":
    case "04d":
      svg = "../img/cloudy-only.svg"
      bg = "../img/earth-day.jpg"
      break;
    case "09d":
    case "10d":
      svg = "../img/rain-only.svg"
      bg = "../img/earth-cloud.jpg"
      break
    case "11d":
      svg = "../img/lightning-only.svg"
      bg = "../img/earth-cloud.jpg"
      break
    case "13d":
      svg = "../img/snow-only.svg"
      bg = "../img/earth-cloud.jpg"
      break
    case "50d":
      svg = "../img/mist.svg"
      bg = "../img/earth-cloud.jpg"
      break
    case "01n":
      svg = "../img/night-only.svg"
      bg = "../img/earth-night.jpg"
      break;
    case "02n":
    case "03n":
    case "04n":
      svg = "../img/nightcloudy-only.svg"
      bg = "../img/earth-night.jpg"
      break;
    case "09n":
    case "10n":
      svg = "../img/rainnight-only.svg"
      bg = "../img/earth-night.jpg"
      break
    case "11n":
      svg = "../img/lightning-only.svg"
      bg = "../img/earth-night.jpg"
      break
    case "13n":
      svg = "../img/snow-only.svg"
      bg = "../img/earth-night.jpg"
      break
    case "50n":
      svg = "../img/mist.svg"
      bg = "../img/earth-night.jpg"
      break
  }
  return {
    svg: svg,
    bg: bg
  };

}

function map2Init() {
  var container = document.getElementById('map2');
  var options = { //지도를 생성할 때 필요한 기본 옵션
    center: new kakao.maps.LatLng(33.499717, 126.531073), //지도의 중심좌표.
    level: 12, //지도의 레벨(확대, 축소 정도)
    draggable: false,
    disableDoubleClick: true
  };
  map2 = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
  map2.setMapTypeId(kakao.maps.MapTypeId.SKYVIEW);
  map2.addOverlayMapTypeId(kakao.maps.MapTypeId.OVERLAY);
  $.get("../json/city.json", onGetJeju);
}

function mapInit() {
  var container = document.getElementById('map');
  var options = { //지도를 생성할 때 필요한 기본 옵션
    center: new kakao.maps.LatLng(36.15, 127.87), //지도의 중심좌표.
    level: 12, //지도의 레벨(확대, 축소 정도)
    draggable: false,
    disableDoubleClick: true
  };
  map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
  map.setMapTypeId(kakao.maps.MapTypeId.SKYVIEW);
  map.addOverlayMapTypeId(kakao.maps.MapTypeId.OVERLAY);
  $.get("../json/city.json", onGetCity);


}

function onCreatMarker(r) {
  var city = cities.filter(function (v) {
    return v.id === r.id
  });
  console.log(city);
  r.city = city[0].name;
  var content;
  content = '<div class="overlay ' + city[0].class + '" onclick="getWeather(' + city[0].lat + ',' + city[0].lon + ')">';
  content += '<h3 class="location">' + city[0].name + ' <i class="fa fa-location-arrow" aria-hidden="true"></i></h3>';
  content += '<div class="img-temp-wrap">';
  content += '<img src="' + updateBg(r.weather[0].icon).svg + '" alt="">';
  content += '<div class="current-temp">' + Math.floor(r.main.temp) + '</div>';
  content += '</div>';
  content += '<div>';
  content += '<span class="max-temp">최고:' + Math.floor(r.main.temp_max) + '˚C</span>';
  content += '<span class="min-temp">최저:' + Math.floor(r.main.temp_min) + '˚C</span>';
  content += '</div>';
  content += '</div>';
  var position = new kakao.maps.LatLng(r.coord.lat, r.coord.lon);
  // 커스텀 오버레이를 생성합니다
  var customOverlay = new kakao.maps.CustomOverlay({
    position: position,
    content: content,
  });
  // 커스텀 오버레이를 지도에 표시합니다    
  customOverlay.setMap(map)

  //틸트
  VanillaTilt.init(document.querySelectorAll(".overlay"), {
    max: 25,
    speed: 5000
  });

}

function onCreatMarkker(r) {
  var city = cities.filter(function (v) {
    return v.id === r.id
  });
  r.city = city[0].name;
  var content;
  content = '<div class="overlay ' + city[0].class + '" onclick="getWeather(' + city[0].lat + ',' + city[0].lon + ')">';
  content += '<h3 class="location">' + city[0].name + ' <i class="fa fa-location-arrow" aria-hidden="true"></i></h3>';
  content += '<div class="img-temp-wrap">';
  content += '<img src="' + updateBg(r.weather[0].icon).svg + '" alt="">';
  content += '<div class="current-temp">' + Math.floor(r.main.temp) + '</div>';
  content += '</div>';
  content += '<div>';
  content += '<span class="max-temp">최고:' + Math.floor(r.main.temp_max) + '˚C</span>';
  content += '<span class="min-temp">최저:' + Math.floor(r.main.temp_min) + '˚C</span>';
  content += '</div>';
  content += '</div>';
  var position = new kakao.maps.LatLng(r.coord.lat, r.coord.lon);
  // 커스텀 오버레이를 생성합니다
  var customOverlay = new kakao.maps.CustomOverlay({
    position: position,
    content: content,
  });
  // 커스텀 오버레이를 지도에 표시합니다    
  customOverlay.setMap(map2)

  //틸트
  VanillaTilt.init(document.querySelectorAll(".overlay"), {
    max: 25,
    speed: 5000
  });
}

function getWol() {
  params.lat = 37.351391;
  params.lon = 127.945282;
  $.get(weatherUrl, params, onGetWol);
}

function getNam() {
  params.lat = 37.540001;
  params.lon = 127.205559;
  $.get(weatherUrl, params, onGetNam);
}



/* 이벤트 등록 */
$(window).resize(onRsize).trigger("resize");
mapInit();
map2Init();
navigator.geolocation.getCurrentPosition(onGetPosition, onGetPositionError);
getWol();
getNam();
$(".daily").hover(onEnter, onLeave)
star();

/* 이벤트 콜백 */
function onCallWeather(r) {
  $(".hours-wrapper .swiper-wrapper").empty();
  $(".weekly-wrapper .swiper-wrapper").empty();
  for (var i in r.hourly) {
    var html;
    html = '<div class="swiper-slide">';
    html += '<div class="title">' + ((i == 0) ? "지금" : moment(r.hourly[i].dt * 1000).format("D") + "일" + moment(r.hourly[i].dt * 1000).format("H") + "시") + '</div>';
    html += '<div class="img-wrap"><img src="' + updateBg(r.hourly[i].weather[0].icon).svg + '" alt=""></div>';
    html += '<div class="temp">' + Math.floor(r.hourly[i].temp) + '˚</div>';
    html += '</div>';
    $(".hours-wrapper .swiper-wrapper").append(html);
  }
  var mySwiper = new Swiper('.hours-wrapper .swiper-container', {
    slidesPerView: 5,
    spaceBetween: 10,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    }
  })
  for (var i in r.daily) {
    var html;
    html = '<div class="swiper-slide weekly-slide">';
    html += '<div class="day">' + moment(r.daily[i].dt * 1000).format('dddd') + '</div>';
    html += '<div class="icon"><img src="' + updateBg(r.daily[i].weather[0].icon).svg + '" alt="">';
    html += '<div class="desc">' + r.daily[i].weather[0].main + '</div>';
    html += '</div>';
    html += '<div class="temp">';
    html += '<div class="max-temp">최고' + Math.floor(r.daily[i].temp.min) + '˚C</div>';
    html += '<div class="min-temp">최저' + Math.floor(r.daily[i].temp.max) + '˚C</div>';
    html += '</div>';
    html += '</div>';
    $(".weekly-wrapper .swiper-wrapper").append(html);
  }
  var mySwiper2 = new Swiper('.weekly-wrapper .swiper-container', {
    slidesPerView: 4,
    spaceBetween: 10,
    navigation: {
      nextEl: '.weekly-wrapper .swiper-button-next',
      prevEl: '.weekly-wrapper .swiper-button-prev',
    }
  })
}

function onEnter() {
  $(this).siblings().css("opacity", "0");
}

function onLeave() {
  $(this).siblings().css("opacity", "1");

}

function onRsize() {}

function onGetWol(r) {
  updateWol(r);
}

function onGetNam(r) {
  updateNam(r);
}


function onGetCity(r) {
  cities = r.cities;
  for (var i of cities) {
    params.lat = "";
    params.lon = "";
    params.id = i.id;
    $.get(weatherUrl, params, onCreatMarker);
  }
}

function onGetJeju(r) {
  cities = r.cities;
  params.lat = "";
  params.lon = "";
  params.id = 1846266;
  $.get(weatherUrl, params, onCreatMarkker);

}

function onGetWeather(r) {
  $('.weather-wrapper').css('background-image', 'url(' + updateBg(r.weather[0].icon).bg + ')');
  updateDaily(r);



}

function onGetPosition(r) {
  getWeather(r.coords.latitude, r.coords.longitude);

}

function onGetPositionError(e) {
  getWeather(37.566661, 126.978400);
}