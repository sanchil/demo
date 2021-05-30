
function loadCanvas(){
    var cnv = document.getElementById('myCanvas');
    var cnvaspect = cnv.width/cnv.height;
    var ctx = cnv.getContext('2d');
   var img = new Image();
   img.onload = function(){
       var imgaspect = img.width/img.height;
    //    

       console.log('img aspect: '+ imgaspect+' canvas aspect: '+ cnvaspect);
       ctx.drawImage(img,0.5*(img.width - img.height*cnvaspect),0,img.height*cnvaspect,img.height,0,0,cnv.width,cnv.height);
   //  ctx.drawImage(img,0,0,img.width,img.height,0,0,cnv.width,cnv.height);
    }
   img.src= './banners/banner_home1.png';
}

window.onload = loadCanvas();