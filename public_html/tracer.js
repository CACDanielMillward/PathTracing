/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
const MaxDepth = 5;
var Black = 0; // no color, so 0
var depth = 0;
var picArray = new Array();



/*
 takes ray - a 3d matrix?
 */
function tracing(ray, depth) {
    if (depth >= MaxDepth) {
      return Black;  // Bounced enough times.
    }
    
    var intersectedSphere = ray.FindNearestObject(); // index of which sphere intersected
    if (typeof ray.hitSomething === false || ray.kindaIDBetter === undefined){
      return Black;  
    }
    
    var newRayOrigin = ray.pointWhereObjectWasHit(); // the findnearestobj changes ray object to make this happen
    
    // This is NOT a cosine-weighted distribution!
    var newRayDirection = RandomUnitVectorInHemisphereOf(ray.normalWhereObjWasHit());
    
    var newRay = new Ray(newRayOrigin, newRayDirection);
    
    const p = 1/(2*Math.PI);
    //TAKEOUT
    var newRaynorm = mathNorm(newRay.direction);
    var normalNormy = mathNorm(ray.normalWhereObjWasHit());
    var cos_theta = math.dot(newRaynorm, normalNormy);
    var theBRDF = BRDF(
            theScene[ray.kindaIDBetter].specular,
            theScene[ray.kindaIDBetter].roughVal,
            ray.direction,
            newRay.direction,
            ray.normalWhereObjWasHit());
    depth += 1;            
    var incoming = tracing(newRay, depth);
    
    console.log(theScene[ray.kindaIDBetter].emittance);
    
    return theScene[ray.kindaIDBetter].emittance + (theBRDF * incoming * cos_theta / p);
}

function Render(width, height, numSamples) {
    var camera = new Camera();

    var picsArray = new Array(width);
    
    for (var m = 0; m < picsArray.length; m++) {
             picsArray[m] = new Array(height);
    }
    
    for (var i = 0; i < width; i++) {
        for (var j = 0; j < height; j++) {
            //for each sample
            for (var k = 0; k < numSamples; k++) {
                var r = camera.generateRay(i,j);
                var toAddValue = tracing(r, 0);
                //console.log("The light: " + toAddValue);
                picsArray[i][j] += toAddValue; // starts with 0 cuz does adding automatically
            }
            
            picsArray[i][j] /= numSamples;
        }
        console.log(i + "% ...");
        var para = document.createElement("p");
        var node = document.createTextNode(i + "% ...");
        para.appendChild(node);
    }
    return picsArray;    
}

