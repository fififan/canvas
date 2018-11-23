function randomInt(int) {
   return Math.floor(Math.random() * int) + 500;
}

 function draw(context, posX, posY, diametreBalle, couleur) {
  context.beginPath();
  context.arc(posX, posY, diametreBalle / 2, 0, Math.PI * 2);
  context.fillStyle = couleur;
  context.fill();
}

