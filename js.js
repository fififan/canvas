window.onload = function()
{
    var canvas = document.getElementById("myCanvas");
    if(!canvas)
    {
        alert("Impossible de récupérer le canvas");
        return;
    }
    
    var context = canvas.getContext("2d");
    if(!context)
    {
        alert("Impossible de récupérer le context");
        return;
    }
        
    var diametreBalle = 20;
    
    var posX = 1+diametreBalle/2;
    var posY = 1+diametreBalle/2;
    var vitesseX = 3;
    var vitesseY = 3;
    
    var myInterval = setInterval(animate, 1000/30);
    
    function animate()
    {
        context.clearRect(0, 0, canvas.width, canvas.height);
        
        //Tracé de la balle
        context.beginPath();
        context.arc(posX, posY, diametreBalle/2, 0, Math.PI*2);
        context.fill();
        
        //On va vérifier si la balle à toucher l'un des bords du canvas.
        if(posX+diametreBalle/2 >= canvas.width || posX <= 0+diametreBalle/2)//Si on touche le bord gauche ou droit
        {
            vitesseX *= -1;//On inverse la vitesse de déplacement sur l'axe horizontal.
        }

        if(posY+diametreBalle/2 >= canvas.height || posY <= 0+diametreBalle/2)//Si on touche le bord du bas ou du haut
        {
            vitesseY *= -1;//On inverse la vitesse de déplacement sur l'axe vertical.
        }
        
        //On additionne les vitesses de déplacement avec les positions
        posX += vitesseX;
        posY += vitesseY;

        var diametreBalle = 20;
    
    var posX2 = 1+diametreBalle/2;
    var posY2 = 1+diametreBalle/2;
    var vitesseX2 = 3;
    var vitesseY2 = 3;
    
    var myInterval = setInterval(animate, 1000/30);
    
    function animate()
    {
        context.clearRect(0, 0, canvas.width, canvas.height);
        
        //Tracé de la balle
        context.beginPath();
        context.arc(posX2, posY2, diametreBalle/2, 0, Math.PI*2);
        context.fill();
        
        //On va vérifier si la balle à toucher l'un des bords du canvas.
        if(posX2+diametreBalle/2 >= canvas.width || posX2 <= 0+diametreBalle/2)//Si on touche le bord gauche ou droit
        {
            vitesseX2 *= -1;//On inverse la vitesse de déplacement sur l'axe horizontal.
        }

        if(posY2+diametreBalle/2 >= canvas.height || posY2 <= 0+diametreBalle/2)//Si on touche le bord du bas ou du haut
        {
            vitesseY2 *= -1;//On inverse la vitesse de déplacement sur l'axe vertical.
        }
        
        //On additionne les vitesses de déplacement avec les positions
        posX2+= vitesseX2;
        posY2 += vitesseY2;
    }
    
}
