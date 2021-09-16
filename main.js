prediction_1="";
prediction_2="";

Webcam.set
({
  width:350,
  height:300,
  image_format:'png',
  png_quality: 100
});

cam=document.getElementById("camera")
Webcam.attach('#cam')

function capture()
{
 Webcam.snap(function(data_uri){
  document.getElementById("Result").innerHTML='<img id="Captured_image"src="'+data_uri+'">';

 });
}

classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/wQ3k1VM2c/model.json',modelLoaded);

function modelLoaded()
{
  console.log("modelLoaded");
}

function speak()
{
  var synth=window.speechSynthesis;
  speak1="first prediction is: "+prediction_1;
  speak2="second prediction is: "+prediction_2;
  var utterthis= new SpeechSynthesisUtterance(speak1+speak2);
  synth.speak(utterthis);
}

function identify_img()
{
  var img=document.getElementById("Captured_image");
  classifier.classify(img,gotresult);
}

function gotresult(error,results)
{
 if(error)
 {
  console.error(error);
 }
  else
  {
   console.log(results);
   document.getElementById("prediction_1").innerHTML=results[0].label;
   document.getElementById("prediction_2").innerHTML=results[1].label;
   prediction_1=results[0].label;
   prediction_2=results[1].label;

  speak();
  
  }
}