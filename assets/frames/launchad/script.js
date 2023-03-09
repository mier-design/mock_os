async function loadapps(){
    await fetch('../frames.json')
    .then(response => response.json())
    .then(json => {
        console.warn(json)
        for (const [key, value] of Object.entries(json)) {
            console.log(`${key}: ${value}`);
            if(ImageExist(value.logosrc) && key != "launchad"){
                document.body.innerHTML += `<a onclick="parent.openapp('${key}')"><img alt=${value.title} src="../../.${value.logosrc}"><p>${key}</p></a>`;
            }
        }
    })
}
loadapps();
function ImageExist(url)
{
   var img = new Image();
   img.src = "../../."+url;
   return img.height != 0;
}