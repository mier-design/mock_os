let app_name_top = document.querySelector("#app_name");
let targets = ["menu-bar"];
let windowelem = document.querySelector(".window");
let dockparent = document.getElementsByClassName("dock-parent")[0];
let fullscreen_tab = document.querySelector(".fullscreen_tab");
let title = document.querySelector(".title");
let close = document.querySelector(".close_tab");
let batteryelem = document.getElementById("battery");
let loader = document.getElementById("pc_loader");
let data = windowelem.getAttribute("data-window");
let movetoelem = document.querySelectorAll(`[data-window="${data}"]`)[0];
let gotopos = [movetoelem.getBoundingClientRect().left, movetoelem.getBoundingClientRect().top];
let dockelem = document.querySelector(".dock-container");
let backgroundinput = document.getElementById("fileupload");
let siricon = document.getElementById("sircon_top");
let checkboxes = document.querySelectorAll('input[type=checkbox]');
/*-------------------------------------------*/
/*----------------functions------------------*/
/*-------------------------------------------*/
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
function changetitleofwindow(windowname, windowurl, windowdesc) {
  title.innerHTML = `<a href='${windowurl}'>${windowname}: ${windowdesc}</a> 🔍`;
  return;
}
function setwindowcontent(data) {
  app_name_top.innerHTML = data;
}
function fullscreen_window(event, parentcount) {
  windowelem.setAttribute("style", "");
  event = event.target;
  for (i = 0; i < parentcount; i++) {
    event = event.parentNode;
  }
  windowelem.setAttribute("style", "");
  if (dockparent.classList.contains("animation")) {
    windowelem.classList.remove("fullscreen");
    dockparent.classList.remove("animation");
  } else {
    windowelem.classList.add("fullscreen");
    dockparent.classList.add("animation");
  }
}
function closetab(event, parentcount) {
  for (i = 0; i < parentcount; i++) {
    event = event.parentNode;
  }
  if (event != null) {
    event.classList.remove("active");
    dockparent.classList.remove("animation");
    windowelem.setAttribute("data-window", "");
    movetoelem.parentElement.classList.remove("active");
    app_name_top.innerHTML = "Finder";
    changetitleofwindow("default");
    event.classList.add("minimize");
    windowelem.classList.remove("fullscreen");
  }
}

async function loados() {
  document.documentElement.style.setProperty('--minimize-position-x', `${gotopos[0]}px`);
  document.documentElement.style.setProperty('--minimize-position-y', `${gotopos[1]}px`);
  let i = 0;
  loader.style.width = 0;
  loaderwidth = (loader.style.width.replace("%", ""));
  loaderwidth = (loaderwidth.replace("px", ""));
  loaderwidth = Number(loaderwidth);
  batteryinfo();
  while (100 > i) {
    i = i + (Math.random() * 5);
    await sleep(50);
    loader.style.width = `${i}%`;
  }
  await sleep(1000);
  loader.parentElement.parentElement.style.display = "none";
}
/*-------------------------------------------*/
/*------Stolen-functions---------------------*/
/*-------------------------------------------*/
function menutime() {

  // We create a new Date object and assign it to a letiable called "time".
  let time = new Date(),

    // Access the "getHours" method on the Date object with the dot accessor.
    hours = time.getHours(),

    // Access the "getMinutes" method with the dot accessor.
    minutes = time.getMinutes(),


    seconds = time.getSeconds();

  document.querySelectorAll('.menutime')[0].innerHTML = harold(hours) + ":" + harold(minutes);

  function harold(standIn) {
    if (standIn < 10) {
      standIn = '0' + standIn
    }
    return standIn;
  }
}/*
function loop(battery) {
  let batteryelem = document.getElementById("battery");
  setTimeout(() => {
    batteryelem.innerHTML = battery + ' <i class="fas fa-battery-empty"></i>';
    setTimeout(() => {
      batteryelem.innerHTML = battery + ' <i class="fas fa-battery-quarter"></i>';
    }, 1000);
    setTimeout(() => {
      batteryelem.innerHTML = battery + ' <i class="fas fa-battery-half"></i>';
    }, 2000);
    setTimeout(() => {
      batteryelem.innerHTML = battery + ' <i class="fas fa-battery-three-quarters"></i>';
    }, 3000);
    setTimeout(() => {
      batteryelem.innerHTML = battery + ' <i class="fas fa-battery-full"></i>';
    }, 4000);
    loop(battery);
  }, 5000);
};*/
function dragElement(elmnt) {
  let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    // if present, the header is where you move the DIV from:
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    let iframes = document.querySelectorAll("iframe");
    for(i = 0; iframes.length > i; i++){
      iframes[i].style.pointerEvents = "none";
    }
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    if (pos3 < 10 || pos3 + 10 >= document.body.clientWidth || pos4 < 30) {

    }
    document.onmouseup = function (e) {
      closeDragElement(e, pos3, pos4);
    }
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    let windowelem = document.getElementById("window");
    // set the element's new position:
    let heightfromtop = windowelem.offsetTop + windowelem.clientHeight;
    let widthfromleft = windowelem.offsetLeft + windowelem.clientWidth;
    if (elmnt.offsetTop - pos2 < 30) {
      pos5 = 30;
    } else {
      if (window.innerHeight <= heightfromtop - pos2) {
        pos5 = window.innerHeight - windowelem.clientHeight;
      } else {
        pos5 = elmnt.offsetTop - pos2;
      }
    }
    if (elmnt.offsetLeft - pos1 < 0) {
      pos6 = 0;
    } else {
      if (window.innerWidth <= widthfromleft - pos1) {
        pos6 = window.innerWidth - windowelem.clientWidth;
      } else {
        pos6 = elmnt.offsetLeft - pos1;
      }
    }
    if (windowelem.innerHeight + pos1 > window.innerHeight) {
      return;
    }
    elmnt.style.top = pos5 + "px";
    elmnt.style.left = pos6 + "px";
  }

  function closeDragElement(e, x, y) {
    let iframes = document.querySelectorAll("iframe");
    for(i = 0; iframes.length > i; i++){
      iframes[i].style.pointerEvents = "auto";
    }
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
    if (y <= 30) {
      fullscreen_window(e, 1);
    } else if (x <= 10) {
      resize_window(e, 50, 100, "%", 0, 30);
    } else if (x + 10 >= document.body.clientWidth) {
      resize_window(e, 50, 100, "%", 50, 30);
    }
  }
}
/*-------------------------------------------*/
/*------Check-this-later---------------------*/
/*-------------------------------------------*/
if (navigator.usb) {
  navigator.usb.getDevices()
    .then((devices) => {
      //`Total devices: ${devices.length}`
      devices.forEach((device) => {
        console.log(`Product name: ${device.productName}, serial number ${device.serialNumber}`);
      });
    });
} else {
  //no devices
}
////check////
if (navigator.bluetooth) {
  navigator.bluetooth.getAvailability()
    .then(isBluetoothAvailable => {
      //`Bluetooth is ${isBluetoothAvailable ? 'available' : 'unavailable'}`
    });
  if ('onavailabilitychanged' in navigator.bluetooth) {
    navigator.bluetooth.addEventListener('availabilitychanged', function (event) {
      //`Bluetooth is ${isBluetoothAvailable ? 'available' : 'unavailable'}`
    });
  }
}
/*-------------------------------------------*/
/*------Event-Listeners----------------------*/
/*-------------------------------------------*/
siricon.addEventListener("click", async function (event) {
  openapp("sir");
  await sleep(500);
});
document.addEventListener("click", function closecontextmenu() {
  document.querySelector(".menu.first").style.display = "none";
  document.querySelector(".menu.second").style.display = "none";
  document.querySelector(".menu.third").style.display = "none";
})
document.addEventListener('contextmenu', function (event) {
  document.querySelector(".menu.first").style.display = "none";
  document.querySelector(".menu.second").style.display = "none";
  document.querySelector(".menu.third").style.display = "none";
  event.preventDefault();
  let context = document.querySelector(".menu.first");
  if (event.target) {
    if (targets.some(r => event.target.className.includes(r))) {
      let context = document.querySelector(".menu.first");
    } else if (targets.some(windowcontexts => event.target.className.includes(windowcontexts))) {
      let context = document.querySelector(".menu.second");
    } else {
      let context = document.querySelector(".menu.third");
      targets.some(r => event.target.className.includes(r))
    }
  } else {
    return;
  }
  let x = event.pageX;
  let y = event.pageY;
  context.style.position = "absolute";
  context.style.display = "block";
  if (document.body.clientHeight < context.childNodes[0].parentNode.clientHeight + event.clientY) {
    y = y - context.childNodes[0].parentNode.clientHeight;
  }
  context.style.left = `${x}px`;
  context.style.top = `${y}px`;
})
title.addEventListener('dblclick', function (e) {
  fullscreen_window(e, 2);
});
dockelem.addEventListener('click', async event => {
  if (event.target.hasAttribute("data-window")) {
    setactive(event.target);
    openapp(event.target.getAttribute("data-window"));
  } else if (event.target.children[0].hasAttribute("data-window")) {
    openapp(event.target.childNodes[0].getAttribute("data-window"));
  }
});
backgroundinput.addEventListener("change", uploadfile);
function uploadfile(event) {
  let file = event.target.files[0];
  if (file.type.match('image.*')) {

  } else if (file.type.match('video.*')) {
    readSingleFile(event);
    return;
  } else if (file.type.match('audio.*')) {
    return;
  } else {
    return;
  }
  let reader = new FileReader();
  reader.onloadend = function () {
    let r = document.querySelector(':root');
    r.style.setProperty('--background', 'url(' + reader.result + ') ');
    let video = document.querySelector('.videobg').src = "#";
  }
  if (file) {
    reader.readAsDataURL(file);
  }
};
fullscreen_tab.addEventListener("click", (e) => {
  fullscreen_window(e, 3);
});
/*-------------------------------------------*/
/*------Call-Some-Functions-Before-Load------*/
/*-------------------------------------------*/
setInterval(menutime, 1000);
changetitleofwindow("default");
document.querySelector(".title").addEventListener("mousedown", function (e) {
  setactive(e.target.parentElement.parentElement);
  dragElement(windowelem);
});
/*-------------------------------------------*/
/*------Check-Some-Things-Before-Load--------*/
/*-------------------------------------------*/
async function batteryinfo() {
  if (navigator.getBattery != null) {
    await navigator.getBattery().then((battery) => {
      function updateAllBatteryInfo() {
        updateLevelInfo();
      }
      updateAllBatteryInfo();
      battery.addEventListener("levelchange", () => {
        updateLevelInfo();
      });
      function updateLevelInfo() {
        let level = battery.level * 100;
        if (level < 10) {
          batteryelem.innerHTML = level + '<i class="fas fa-battery-empty"></i>';
        }
        if (level >= 10 && battery.level < 30) {
          batteryelem.innerHTML = level + '<i class="fas fa-battery-quarter"></i>'
        }
        if (level >= 30 && battery.level < 60) {
          batteryelem.innerHTML = level + '<i class="fas fa-battery-half"></i>'
        }
        if (level >= 60 && battery.level < 90) {
          batteryelem.innerHTML = level + '<i class="fas fa-battery-three-quarters"></i>'
        }
        if (level > 90) {
          batteryelem.innerHTML = level + '<i class="fas fa-battery-full"></i>'
        }
      }
    });
  } else {
    batteryelem.innerHTML = '<i class="fas fa-battery-empty"></i>';
  }
}
for (i = 0; i < checkboxes.length; i++) {
  checkboxes[i].addEventListener('change', function () {
    let checking;
    if (this.checked == true) {
      checking = true;
    } else {
      checking = false;
    }
    checkboxes.forEach(checkbox => {
      checkbox.checked = false;
    });
    this.checked = checking;
  });
}
/*-------------------------------------------*/
/*--------------No logging :kekw:------------*/
/*-------------------------------------------*/
/*

let DEBUG = false;
if(!DEBUG){
    if(!window.console) window.console = {};
    let methods = ["log", "debug", "warn", "info", "table", "error"];
    for(let i=0;i<methods.length;i++){
        console[methods[i]] = function(){};
    }
}
*/
/*-------------------------------------------*/
/*--------------Load-In-The-"os"-------------*/
/*-------------------------------------------*/
loados();
/*-------------------------------------------*/
/*--------------End of onload----------------*/
/*-------------------------------------------*/
window.onoffline = (event) => {
  let wifielem = document.getElementById("wifi");
  wifielem.innerHTML = '<i class="bi bi-wifi-off"></i>';
};
window.ononline = (event) => {
  let wifielem = document.getElementById("wifi");
  wifielem.innerHTML = '<i class="bi bi-wifi"></i>';
};
window.addEventListener("keydown", shortcuts);
function shortcuts(event) {
  if ((event.shiftKey && event.key == "f4") || (event.shiftKey && event.key.toLowerCase() == "w")) {
    //close event
    closetab(document.querySelector(".active"), 0);
    event.preventDefault();
  } else if (event.key == "F3" || (event.ctrlKey && event.key == "f")) {
    //search event
    event.preventDefault();
  } else if ((event.shiftKey && event.key == "D") || (event.ctrlKey && event.key == "d")) {
    // duplicate event
    duplicate();
    event.preventDefault();
  } else if ((event.shiftKey && event.key == "B") || (event.ctrlKey && event.key == "b")){
    //background change
    backgroundinput.click();
  } else {
  }
}
async function openapp(name) {
  let data_old = windowelem.getAttribute("data-window");
  let movetoelem_old = document.querySelectorAll(`[data-window="${data_old}"]`)[0];
  if (movetoelem_old.parentElement.classList.contains("active")) {
    windowelem.classList.add("minimize");
    setwindowcontent("finder");
    return;
  }
  setactive(windowelem);
  windowelem.setAttribute("data-window", name);
  if (windowelem.classList.contains("fullscreen")) {
    dockparent.classList.add("animation");
  }
  await fetch('./assets/frames/frames.json')
    .then(response => response.json())
    .then(json => {
      if (json[name]) {
        if (json[name].specialsize == true) {
          document.querySelector(".specialstyle").setAttribute("href", json[name].styleurl);
        } else {
          document.querySelector(".specialstyle").setAttribute("href", "./emptystyle.css");
        }
        setwindowcontent(json[name].title);
        changetitleofwindow(json[name].title, json[name].url, json[name].desc);
        let frame = document.querySelector(".tab");
        frame.setAttribute("src", json[name].source);
        windowelem.classList.remove("minimize");
      } else {
        document.querySelector(".specialstyle").setAttribute("href", "./emptystyle.css");
        setwindowcontent(name);
        let frame =  document.querySelector(".tab")
        frame.setAttribute("src", "./no_app.html");
        changetitleofwindow(name, "#", "this has not been made yet");
        windowelem.classList.remove("minimize");
      }
    })
}
function filter(prop, value, type) {
  if (type == "toggle") {
    // -1 means not found => confusing
    if (document.body.style.filter.indexOf(`${prop}(${value}%)`) !== -1) {
      document.body.style.filter = document.body.style.filter.replaceAll(`${prop}(${value}%)`, "");
    } else {
      document.body.style.filter = document.body.style.filter + `${prop}(${value}%)`;
    }
  } else if (type == "add") {
    document.body.style.filter += `${prop}(${value}%)`;
    document.querySelector(`.${prop}[data-filter='remove']`).classList.remove("disabled");
  } else if (type == "remove") {
    document.body.style.filter = document.body.style.filter.replace(`${prop}(${value}%)`, "");
    if (document.body.style.filter.indexOf(`${prop}(${value}%)`) == -1) {
      document.querySelector(`.${prop}[data-filter='${type}']`).classList.add("disabled");
    }
  }
}
function readSingleFile(evt) {
  let video = document.querySelector('.videobg')
  //Retrieve the first (and only!) File from the FileList object
  let f = evt.target.files[0];

  if (f) {
    let r = new FileReader();
    r.onload = function (e) {
      let contents = e.target.result;
      let uint8Array = new Uint8Array(contents);

      let arrayBuffer = uint8Array.buffer;
      let blob = new Blob([arrayBuffer]);
      video.src = URL.createObjectURL(blob);
    }
    r.readAsArrayBuffer(f);

  } else {
    alert("Failed to load file");
  }
}
function setactive(parent) {
  let actives = document.querySelectorAll(".active");
  actives.forEach(element => {
    element.classList.remove("active");
  });
  parent.classList.add("active");
}
function duplicate() {
  let toclone = document.querySelector(".window.active").childNodes[0].parentNode.cloneNode(true);
  let actives = document.querySelectorAll(".active");
  actives.forEach(element => {
    element.style.zIndex = 120;
    element.classList.remove("active");
  });
  toclone.style.top = "30px";
  toclone.style.left = "0px";
  document.body.appendChild(toclone);
}
function resize_window(target, xdim, ydim, unit, xpos, ypos) {
  windowelem.classList.remove("fullscreen");
  dockparent.classList.remove("animation");
  if (target == null) {
    target = document.querySelector(".active")
  } else {
    target = target.path.reverse()[4];
  }
  try {
    target.style.width = `${xdim}${unit}`;
    target.style.left = `${xpos}${unit}`;
    target.style.height = `calc(${ydim}${unit} - 30px)`;
    target.style.top = `${ypos}px`;
  } catch (error) {
    //probably got out of the browser tab when dragging
  }
}
function invert(elem){
  document.querySelector(elem).classList.toggle("inverted");
}