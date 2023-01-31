status="";
object=[];
function setup(){
    canvas=createCanvas(350,350);
    canvas.center();
    video= createCapture(VIDEO)
    video.size(350,350);
    video.hide();
}
function start(){
    objectDetector=ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML="Baby Not Found";
    if(object[0].label!="person"){
        video.stop();
        objectDetector.detect(gotResult);
        document.getElementById("status").innerHTML="Baby is Gone!"
       
        
    }
    else{
        document.getElementById("status").innerHTML="Baby is Here!" 
        
    }
}
function modelLoaded(){
    console.log("MODEL LOADED!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
    status=true;
}
function draw(){
    image(video,0,0,350,350);
        if(status!=""){
            objectDetector.detect(video,gotResult);
            for(i=0 ;i<object.length; i++){
               
                fill("white");
                percent= Math.floor(object[i].confidence * 100);
                text(object[i].label +" "+ percent + "%", object[i].x +20, object[i].y +20);
                noFill();
                stroke("white");
                rect(object[i].x,object[i].y, object[i].width,object[i].height);
            }
        }
    
}
function gotResult(error,results){
    if(error){
        console.log(error);
    }
    console.log(results)
    object=results;
}
function preload(){
   
}