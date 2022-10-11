function drawListImage ()
{
  var insert = '';
  for ( var i = 0 ; i < m_listImgURL.length ; i++ )
  {
    insert += '<canvas id="myCanvas'+i+'" width="30" height="30" onclick="(function(){m_level.setIndice('+i+');m_level.drawImageCurrent();}());">';
    insert += '</canvas>';
  }
  liste_image.innerHTML = insert;
  reloadListImage();
}

function reloadListImage() {
  console.log(m_listImgURL.length)
  var path = 'assets/';
  var onClickFunction = "(function(){m_level.setIndice('+i+');m_level.drawImageCurrent();}());";
  for ( var i = 0 ; i < m_listImgURL.length ; i++ )
  {
      drawImageByContext(path + m_listImgURL[i], "myCanvas"+i, onClickFunction);
  }
}
  
function drawImageByContext(url, id ,onclick = null) 
{
  var canvas = document.getElementById(id);
  var img = document.createElement("IMG");
  img.src = url;
  img.onclick = onclick;
  var context = canvas.getContext("2d");
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.save();
  context.translate(canvas.width/2, canvas.height/2);
  context.rotate(Math.PI*(document.getElementById('rotate').value)/180);
  context.drawImage(img, -img.width/2, -img.width/2);
  context.restore();
}