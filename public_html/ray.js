/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function Ray(start, dir) {
    this.origin = start;
    this.direction = dir;
    this.hitSomething = false;
    this.sphereID = '';
    this.distanceToPoint = 0;
    this.hasRunFind = false;
    
    this.FindNearestObject = function() {
        //foreach object in scene, test intersection
        var intersections = [[],[]]; // 0th for sphere index, 1th for distance
        
        for (var i = 0; i < theScene.length;i++) { // for every object in the scene
                //do quadratic formula

            var aMinusC = math.subtract(start, theScene[i].center);
            var a = 1;
            //math.dot(this.direction, this.direction);
            var b = math.multiply(2, math.dot(this.direction, aMinusC));
            var c = math.subtract(math.dot(aMinusC, aMinusC), (theScene[i].radius * theScene[i].radius));
            
            var discriminant = (Math.pow(b,2))-4*a*c;
            console.log("discriminant: " + discriminant);
            if (discriminant < 0) {
                //hitSomething's already false, so...
               
            } else if (discriminant === 0) { // perpendicular to sphere
                this.hitSomething = true;
                var answer = -b/(2*a);
                intersections.push([i],[answer]);
            } else if (discriminant > 0 ) { // actually hit something
                this.hitSomething = true;
               var q = -0.5 * (b + Math.sign(b)* Math.sqrt(discriminant));
               console.log("b: " + b);
               console.log("c: " + c);
               console.log("q: " + q);
               var xOne = q/a;
               console.log("first intersect: " + xOne);
               
               var xTwo = c/q;
               console.log("second intersect: " + xTwo);
               if (xOne < xTwo) {
                   intersections[0].push(i);
                   intersections[1].push(xOne);
               } else {
                   intersections[0].push(i);
                   intersections[1].push(xTwo);
               }
            }
        }
        
        var lowest = 100000000;
        var toReturn;
        
         // puts nearest distance in intersections[1]=lowest and "id" in intersections[0]=toReturn
        for (var i = 0; i < intersections[0].length; i++) {
                if (intersections[1][i] < lowest) {
                    lowest = intersections[1][i];
                    toReturn = intersections[0][i];
                }
            }
            
        this.distanceToPointBetter = lowest; // distance
        this.kindaIDBetter = toReturn; // what it hit
        
        console.log(lowest);
        this.hasRunFindBetter = true;
        
        return toReturn;    
    };
    
    
    
    this.pointWhereObjectWasHit = function() { // point in space where sphere was hit
        if (this.hasRunFindBetter !== true) {
            var temp = this.FindNearestObject();
        }
      var toAdd = math.multiply(this.distanceToPointBetter, this.direction);
      var adding = math.add(this.origin, toAdd);
      return adding;
    };
    
    this.normalWhereObjWasHit = function() {
        console.log("the kinda ID: " + this.kindaIDBetter);
        var normal = math.subtract(this.pointWhereObjectWasHit(), theScene[this.kindaIDBetter].center);
        var newNormal = math.divide(normal, theScene[this.kindaIDBetter].radius);
        return newNormal;
    };
}



function RandomUnitVectorInHemisphereOf(normal) {
    var randomTheta = Math.random() * Math.PI;
    var randomPhi = Math.random() * Math.PI * 2;
    var randUnitX = Math.sin(randomTheta) * Math.cos(randomPhi);
    var randUnitY = Math.sin(randomTheta) * Math.sin(randomPhi);
    var randUnitZ = Math.cos(randomTheta);
    var randUnitVec = math.matrix([randUnitX, randUnitY, randUnitZ]);
    console.log('unitvec: '+ randUnitVec);
    var testDotProduct = math.dot(normal, randUnitVec);
    
    if (testDotProduct < 0 ) {
       return RandomUnitVectorInHemisphereOf(normal);
        
    } else {
        return randUnitVec;
    }
}


