function setup() {
    canvas= createCanvas(380, 300)
    canvas.position(570, 300)

    video= createCapture(VIDEO);
    video.hide()
    //model starts here
    classifier= ml5.imageClassifier('MobileNet', modelLoaded)
}
function draw() {
image(video, 0, 0, 380, 300 )
classifier.classify(video, gotResults);
}
function modelLoaded() {
    console.log("Model Loaded")
}
prev_results= '';
function gotResults(error, results){
if(error){
    console.error(error);
}
else{
    if((results[0].confidence>0.5)&&(prev_results!=results[0].label)){
        console.log(results)
        prev_results= results[0].label;
        var synth= window.speechSynthesis;
        speak_data= 'Object detected is- '+results[0].label;
        var utterThis= new SpeechSynthesisUtterance(speak_data);
        synth.speak(utterThis);
        document.getElementById("obj_n").innerHTML= "Object Name: "+results[0].label
        document.getElementById("acc").innerHTML=  "Accuracy: "+floor(results[0].confidence*100)
        +"%"
        
    }
}
}