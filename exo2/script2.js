document.addEventListener("DOMContentLoaded", () => {
    const element = document.getElementById("element");
    const elementSize = 50; // Taille de l'élément (doit être la même que dans le CSS)
    let posX = (window.innerWidth - elementSize) / 2;
    let posY = (window.innerHeight - elementSize) / 2;
    const speed = 150; // Vitesse de déplacement
    const margin = 10; // Marge pour éviter qu'il disparaisse sur les bords

    function updatePosition(x, y) {
        const maxX = window.innerWidth - elementSize - margin;
        const maxY = window.innerHeight - elementSize - margin;

        // On s'assure que l'élément ne sort pas de l'écran
        posX = Math.max(margin, Math.min(maxX, x));
        posY = Math.max(margin, Math.min(maxY, y));

        element.style.left = `${posX}px`;
        element.style.top = `${posY}px`;
    }

    // Position initiale correcte
    updatePosition(posX, posY);

    document.addEventListener("mousemove", (e) => {
        const deltaX = e.clientX - posX;
        const deltaY = e.clientY - posY;
        const angle = Math.atan2(deltaY, deltaX);
        
        const newX = posX - Math.cos(angle) * speed;
        const newY = posY - Math.sin(angle) * speed;
        
        updatePosition(newX, newY);
    });
});


