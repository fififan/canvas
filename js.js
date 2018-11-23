window.onload = function()
{

  const VITESSE_MAX = 10;
  const NOMBRE_BALL =20;
  const TAILLE_BALL = 140;

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

   var audio = new Audio();
   audio.src = "doh.mp3";


   // function




   function colisionCanvas(pos, diametreBalle, vitesse, canvasSize) {
     //On va vérifier si la balle à toucher l'un des bords du canvas.
     if(pos + diametreBalle / 2 >= canvasSize || pos <= 0 + diametreBalle / 2)//Si on touche le bord gauche ou droit
     {
         vitesse *= -1;//On inverse la vitesse de déplacement sur l'axe horizontal.
     }
     return vitesse;
   }

   function colisionEnnemy(posX_Joueur, posY_Joueur, diametreBalleJoueur, posX, posY, diametreBalle) {
      /*
      var bordDroit = posX_Joueur + diametreBalleJoueur / 2;
      var bordGaucheEnnemy = posX - diametreBalle / 2;
      var bordGauche = posX_Joueur - diametreBalleJoueur / 2;
      var bordDroitEnnemy = posX + diametreBalle / 2;

      if(bordDroit > bordGaucheEnnemy
      && bordGauche < bordDroitEnnemy) {
        console.log("colision X");
      }

      var bordHaut = posY_Joueur - diametreBalleJoueur / 2;
      var bordBasEnnemy = posY + diametreBalle / 2;
      var bordBas = posY_Joueur + diametreBalleJoueur / 2;
      var bordHautEnnemy = posY - diametreBalle / 2;

      if(bordHaut < bordBasEnnemy
      && bordBas > bordHautEnnemy) {
        console.log("colision Y");
      }
      */
      var colision = false;
      if(posX_Joueur + diametreBalleJoueur / 2 > posX - diametreBalle / 2
      && posX_Joueur - diametreBalleJoueur / 2 < posX + diametreBalle / 2
      && posY_Joueur - diametreBalleJoueur / 2 < posY + diametreBalle / 2
      && posY_Joueur + diametreBalleJoueur / 2 > posY - diametreBalle / 2) {
        colision = true;
      }
      return colision;
   }

   function deplacement(pos, vitesse) {
      //On additionne les vitesses de déplacement avec les positions
       pos += vitesse;
       return pos;
   }

  function checkMaxGrown(diametreBalleJoueur) {
      if (diametreBalleJoueur >= TAILLE_BALL ) {
        diametreBalleJoueur = TAILLE_BALL;
      }
      return diametreBalleJoueur;
  }

  function checkMaxSpeed(vitesse) {
      if(vitesse >= VITESSE_MAX) {
        vitesse = VITESSE_MAX;
      }
      if(vitesse <= -VITESSE_MAX) {
        vitesse = -VITESSE_MAX;
      }
      return vitesse;
   }

   function balleGrossi(audio, grossi, Player, tic, maxTic) {
      if(!grossi) {
        audio.play();
        Player["diametreBalle"] += 20;
        Player["diametreBalle"] = checkMaxGrown(Player["diametreBalle"]);
        grossi = true;
      }
      tic++;
      if(tic >= maxTic) {
        tic = 0;
        grossi = false;
      }

      var tabRes = [];
      tabRes['grossi'] = grossi;
      tabRes['tic'] = tic;
      tabRes['diametrePlayer'] = Player["diametreBalle"];
      return tabRes;
   }

   // initialisation des balles
  var diametreBalle = [];
  var max_ball = NOMBRE_BALL;
  var posX = [];
  var posY = [];
  var vitesseX = [];
  var vitesseY = [];
  var joueur = [];

  var Player = {};
  var tic = 0;
  var maxTic = 3;
  var grossi = false;

  for(i = 0; i <= max_ball; i++) {
      if(i == 0) {
        Player["diametreBalle"] = 40;
        Player["posX"] = 700 + Player["diametreBalle"] / 2;
        Player["posY"] = 800 + Player["diametreBalle"] / 2;
        Player["vitesseX"] = 0;
        Player["vitesseY"] = 0;
        Player["joueur"] = true;
        } else {
          diametreBalle[i-1] = 10;
          posX[i-1] = randomInt(550) + diametreBalle[i-1] / 2;
          posY[i-1] = randomInt(550) + diametreBalle[i-1] / 2;
          vitesseX[i-1] = 10;
          vitesseY[i-1] = 10;
          joueur[i-1] = false;
          ennemy[i-1] = false;
          couleur[i-1] = "black";
          if(ennemy[i-1]) {
            couleur[i-1] = "red";
          }
        //meBouffe[i-1] = false; // construire un paramètre qui permet de savoir
        //si on peu le bouffer
       }
   }


   // controle utilisateur
   window.addEventListener("keydown", function(e) {
      switch(e.key) {
        case "d":
          Player['vitesseX']++;
          Player['vitesseX'] = checkMaxSpeed(Player['vitesseX'])
          break;
        case "q":
          Player['vitesseX']--;
          Player['vitesseX'] = checkMaxSpeed(Player['vitesseX'])
          break;
        case "z":
          Player['vitesseY']--;
          Player['vitesseY'] = checkMaxSpeed(Player['vitesseY'])
          break;
        case "s":
          Player['vitesseY']++;
          Player['vitesseY'] = checkMaxSpeed(Player['vitesseY'])
          break;
      }
      console.log("vitesse X : " + Player['vitesseX']);
      console.log("vitesse Y : " + Player['vitesseY']);
   });





   // jeu
   var myInterval = setInterval(animate, 1000/30);
   function animate() {
      context.clearRect(0, 0, canvas.width, canvas.height);

      Player['vitesseX'] = colisionCanvas(Player['posX'], Player['diametreBalle'], Player['vitesseX'], canvas.width);
      Player['vitesseY'] = colisionCanvas(Player['posY'], Player['diametreBalle'], Player['vitesseY'], canvas.height);
      Player['posX'] = deplacement(Player['posX'], Player['vitesseX']);
      Player['posY'] = deplacement(Player['posY'], Player['vitesseY']);

      for(i = 0; i <= max_ball - 1; i++) {
        vitesseX[i] = colisionCanvas(posX[i], diametreBalle[i], vitesseX[i], canvas.width);
        vitesseY[i] = colisionCanvas(posY[i], diametreBalle[i], vitesseY[i], canvas.height);
        
        var colision = false;
        colision = colisionEnnemy(Player["posX"], Player["posY"], Player["diametreBalle"], posX[i], posY[i], diametreBalle[i]);
        if(colision) {
          // ETAPE 3
           if (!ennemy[i]) {
            // ETAPE 1 DETRUIRE
              diametreBalle.splice(i, 1);
              posX.splice(i, 1);
              posY.splice(i, 1);
              vitesseX.splice(i, 1);
              vitesseY.splice(i, 1);
              joueur.splice(i, 1);
              ennemy.splice(i, 1);
              couleur.splice(i, 1);

              var tabRes = balleGrossi(audio, grossi, Player, tic, maxTic)
              grossi = tabRes['grossi'];
              tic = tabRes['tic'];
              Player["diametreBalle"] = tabRes['diametrePlayer'];
            } else {
              alert('TAPERDU GROSS MERD');
            }
            //} else {
              // ETPA 4 le fait qui te bouff

            //}
          //}
          

        }

        posX[i] = deplacement(posX[i], vitesseX[i]);
        posY[i] = deplacement(posY[i], vitesseY[i]);

        draw(context, posX[i], posY[i], diametreBalle[i], couleur[i]);
      }
      draw(context, Player['posX'], Player['posY'], Player['diametreBalle']);
   }
}