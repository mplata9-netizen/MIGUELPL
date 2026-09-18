/* =========================================================
   01. PARTÍCULAS DEL HERO
   Este archivo puede conservarse casi igual para los 3 clientes.
   Funciona en GitHub Pages porque es JavaScript puro.
   ========================================================= */

const canvas = document.getElementById("energyCanvas");
const ctx = canvas.getContext("2d");

let particles = [];
let canvasWidth = 0;
let canvasHeight = 0;


/* Ajustar el Canvas al tamaño del Hero */
function resizeCanvas() {
    const hero = document.querySelector(".hero");
    const rect = hero.getBoundingClientRect();

    canvasWidth = rect.width;
    canvasHeight = rect.height;

    const ratio = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width = canvasWidth * ratio;
    canvas.height = canvasHeight * ratio;

    canvas.style.width = `${canvasWidth}px`;
    canvas.style.height = `${canvasHeight}px`;

    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
}


/* Crear UNA partícula */
function createParticle(initial = false) {
    return {
        x: Math.random() * canvasWidth,
        y: initial
            ? Math.random() * canvasHeight
            : canvasHeight + Math.random() * 40,

        size: .6 + Math.random() * 2,
        speed: .25 + Math.random() * .85,
        drift: (Math.random() - .5) * .30,
        alpha: .10 + Math.random() * .34
    };
}


/* Crear el grupo de partículas */
function buildParticles() {
    const total = Math.min(
        90,
        Math.max(35, Math.floor(canvasWidth / 16))
    );

    particles = Array.from(
        { length: total },
        () => createParticle(true)
    );
}


/* Dibujar y mover las partículas */
function animateParticles() {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    particles.forEach((particle, index) => {
        particle.y -= particle.speed;
        particle.x += particle.drift;

        ctx.beginPath();
        ctx.arc(
            particle.x,
            particle.y,
            particle.size,
            0,
            Math.PI * 2
        );

        /* CAMBIAR:
           si quieren otro color de partículas,
           pueden modificar estos valores RGB. */
        ctx.fillStyle =
            `rgba(215, 255, 63, ${particle.alpha})`;

        ctx.fill();

        /* Cuando sale por arriba vuelve a empezar abajo */
        if (particle.y < -10) {
            particles[index] = createParticle(false);
        }
    });

    requestAnimationFrame(animateParticles);
}


/* =========================================================
   02. MOVIMIENTO SUAVE DE LA IMAGEN
   La imagen se mueve levemente con el mouse.
   ========================================================= */

const heroImage = document.getElementById("heroImage");

window.addEventListener("mousemove", (event) => {
    if (window.innerWidth < 900) return;

    const moveX =
        (event.clientX / window.innerWidth - .5) * 12;

    const moveY =
        (event.clientY / window.innerHeight - .5) * 8;

    heroImage.style.transform =
        `translate(${moveX}px, ${moveY}px)`;
});


/* =========================================================
   03. INICIAR
   ========================================================= */

function start() {
    resizeCanvas();
    buildParticles();
    animateParticles();
}

window.addEventListener("resize", () => {
    resizeCanvas();
    buildParticles();
});

start();
