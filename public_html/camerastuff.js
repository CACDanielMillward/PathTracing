/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//coordinates of top left corner of window
const TopLeftPixelX = -60; //-50
const TopLeftPixelY = 60; //50
const TopLeftPixelZ = 40;
const PixelWidth = 1;

//camera coordinates
const CameraX = 0;
const CameraY = 0;
const CameraZ = 0;

function Camera() {
    
    //takes row and column, generates random ray from camera to that pixel?
    //returns a 3x2 matrix of origin and direction (normalized)
    this.generateRay = function(row, column) {
        var pixelTopLeftX = TopLeftPixelX + (column - 1); // top left corner of relevant pixel
        var pixelTopLeftY = TopLeftPixelY + (row-1);
        
        var randomX = pixelTopLeftX + Math.random()*PixelWidth; // random point in pixel to raycast Math.random()*PixelWidth
        var randomY = pixelTopLeftY + Math.random()*PixelWidth;
        
        var XDiff = randomX - CameraX; // difference between window coord and camera
        var YDiff = randomY - CameraY;
        var ZDiff = TopLeftPixelZ - CameraZ;
        
        var distance = Math.hypot(XDiff, YDiff, ZDiff); // absolute distance
        
        var raydX = XDiff/distance; // normalizing
        var raydY = YDiff/distance;
        var raydZ = ZDiff/distance;
        
        var theRay = new Ray(math.matrix([CameraX, CameraY, CameraZ]), math.matrix([raydX, raydY, raydZ]));
        
        return theRay;

    };
    
}
