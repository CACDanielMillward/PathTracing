/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function Sphere(cen, rad, specular, rough, emit) {
    this.center = cen;
    this.radius = rad;
    this.specular = specular;
    this.roughVal = rough;
    this.emittance = emit;
}

//Spheres in the scene.
var theScene = [
    new Sphere(math.matrix([-30,0,25]), 30, 0.4, 0.1, 0.9),
    new Sphere(math.matrix([10,30,35]), 20, 0.01, 0.95, 0)
];

//calculates BRDF based on rays and material properties
function BRDF(specColor, roughness, inRay, outRay, normal) {
    var tempH = math.add(inRay, outRay);
    var myX = math.subset(tempH, math.index(0));
    var myY = math.subset(tempH, math.index(1));
    var myZ = math.subset(tempH, math.index(2));
    
    var h = normalize(myX, myY, myZ); // normalized h part of BRDF
//TODO: normalize?
    var nTimesH = math.dot(normal, h);
    var DPartOne = 1/(Math.PI * roughness * roughness * Math.pow(nTimesH, 4));
    var DPartTwo = Math.exp((nTimesH*nTimesH-1)/(roughness*roughness*nTimesH*nTimesH));
    var dVar = DPartOne * DPartTwo;
    
    var fVar = specColor + (1-specColor) * Math.pow(math.dot(inRay, h), 5);
    
    var gVar = Math.min(
            1, 
            (2*nTimesH*math.dot(normal, outRay))/(math.dot(outRay, h)),
            (2*nTimesH*math.dot(normal, inRay))/math.dot(outRay, h) 
    );
    
    var brdf = (dVar*fVar*gVar) / (4*math.dot(normal, inRay)*math.dot(normal, outRay));
    return brdf;
}

//normalize 3 numbers
function normalize(x,y,z) {
    var length = Math.sqrt(x*x + y*y + z*z);
    var normaledX = x / length;
    var normaledY = y / length;
    var normaledZ = z / length;
    var normalizedMatrix = math.matrix([normaledX, normaledY, normaledZ]);
    return normalizedMatrix;
}

//normalize a math.matrix object
function mathNorm(vector) {
    var hypotenuse = math.hypot(vector);
    var normalizedVec = math.divide(vector, hypotenuse);
    return normalizedVec;
}
