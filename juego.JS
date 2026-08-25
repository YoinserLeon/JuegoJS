// ==========================================================
// PROYECTO: CLASH OF LEGENDS
// ALUMNO: Yoinser León
// ==========================================================

// ---------------------------------------------------------
// 1. CLASE BASE: PERSONAJE
// ---------------------------------------------------------
class Personaje {
  constructor(nombre, vida, danio, defensa, velocidad, clase, fraseSaludo, fraseVictoria) {
    this.nombre = nombre;
    this.vida = vida;
    this.vidaMaxima = vida; // Para el límite de curación del Clérigo
    this.danio = danio; // Este será el daño EXCLUSIVO de las habilidades
    this.defensa = defensa;
    this.velocidad = velocidad;
    this.clase = clase;
    this.fraseSaludo = fraseSaludo;
    this.fraseVictoria = fraseVictoria;
  }

  saludar() {
    console.log(`[SALUDO] ${this.nombre} (${this.clase}): "${this.fraseSaludo}"`);
  }

  atacar() {
    // Los puños tienen el mismo daño fijo (10) para todas las clases
    return { tipo: "puños", nombreArma: "sus puños", danio: 10, critico: false };
  }
}

// ---------------------------------------------------------
// 2. CLASES HIJAS (Guerrero, Mago, Arquero, Clérigo, Pícaro)
// ---------------------------------------------------------
class Guerrero extends Personaje {
  constructor(nombre, vida, danio, defensa, velocidad, fraseSaludo, fraseVictoria) {
    super(nombre, vida, danio, defensa, velocidad, "Guerrero", fraseSaludo, fraseVictoria);
    this.array_de_armas = ["Espada Pesada", "Hacha de Batalla", "Mazo de Guerra"];
  }
  atacar_con_arma() {
    let arma = this.array_de_armas[Math.floor(Math.random() * this.array_de_armas.length)];
    return { tipo: "arma", nombreArma: arma, danio: this.danio, critico: false };
  }
}

class Mago extends Personaje {
  constructor(nombre, vida, danio, defensa, velocidad, fraseSaludo, fraseVictoria) {
    super(nombre, vida, danio, defensa, velocidad, "Mago", fraseSaludo, fraseVictoria);
    this.array_de_hechizos = ["Bola de Fuego", "Rayo de Escarcha", "Tormenta Eléctrica"];
  }
  atacar_con_hechizo() {
    let hechizo = this.array_de_hechizos[Math.floor(Math.random() * this.array_de_hechizos.length)];
    return { tipo: "hechizo", nombreArma: hechizo, danio: this.danio, critico: false };
  }
}

class Arquero extends Personaje {
  constructor(nombre, vida, danio, defensa, velocidad, fraseSaludo, fraseVictoria) {
    super(nombre, vida, danio, defensa, velocidad, "Arquero", fraseSaludo, fraseVictoria);
    this.array_de_flechas = ["Flecha Perforante", "Flecha de Fuego", "Flecha Envenenada"];
    this.flechas = 7; // Cantidad inicial de munición
  }
  disparar() {
    this.flechas--; // Resta una flecha
    let flecha = this.array_de_flechas[Math.floor(Math.random() * this.array_de_flechas.length)];
    console.log(`🏹 [MUNICIÓN] A ${this.nombre} le quedan ${this.flechas} flechas.`);
    return { tipo: "flecha", nombreArma: flecha, danio: this.danio, critico: false };
  }
}

class Clerigo extends Personaje {
  constructor(nombre, vida, danio, defensa, velocidad, fraseSaludo, fraseVictoria) {
    super(nombre, vida, danio, defensa, velocidad, "Clérigo", fraseSaludo, fraseVictoria);
    this.array_de_plegarias = ["Castigo Divino", "Luz Cegadora", "Fuego Sagrado"];
  }
  atacar_con_plegaria() {
    let plegaria = this.array_de_plegarias[Math.floor(Math.random() * this.array_de_plegarias.length)];
    return { tipo: "plegaria", nombreArma: plegaria, danio: this.danio, critico: false };
  }
  curar() {
    let curacionMaxima = this.vidaMaxima * 0.25;
    let curacion = Math.floor(Math.random() * curacionMaxima) + 1;
    this.vida += curacion;
    if (this.vida > this.vidaMaxima) this.vida = this.vidaMaxima;
    console.log(`💚 [CURACIÓN] ${this.nombre} ha rezado y recuperó ${curacion} de vida. (Vida actual: ${this.vida})`);
  }
}

class Picaro extends Personaje {
  constructor(nombre, vida, danio, defensa, velocidad, fraseSaludo, fraseVictoria) {
    super(nombre, vida, danio, defensa, velocidad, "Pícaro", fraseSaludo, fraseVictoria);
    this.array_de_dagas = ["Daga Sombría", "Cuchillo Arrojadizo", "Hoja Oculta"];
  }
  atacar_con_daga() {
    let daga = this.array_de_dagas[Math.floor(Math.random() * this.array_de_dagas.length)];
    let esCritico = (Math.floor(Math.random() * 100) + 1) <= 5; // 5% de probabilidad
    return { tipo: "daga", nombreArma: daga, danio: this.danio, critico: esCritico };
  }
}

// ---------------------------------------------------------
// 3. CREACIÓN DE LOS 7 PERSONAJES OBLIGATORIOS (Con frases)
// ---------------------------------------------------------
let g1 = new Guerrero("Balthazar \"Puño de Hierro\"", 150, 20, 15, 8, "El destino nos ha reunido en el lodo y la sangre. Demuéstrame si tu nombre merece ser recordado.", "El polvo y el acero hablan por sí solos. Limpia mi espada, esto ha terminado.");
let g2 = new Guerrero("Thalia \"Corazón de León\"", 140, 22, 18, 6, "No temo a la muerte ni a tu espada. ¡Veamos de qué estás hecho en este instante!", "El campo de batalla ha hablado. Mi espada sigue intacta; tu destino, no.");
let m1 = new Mago("Ignis \"El Tejehechizos\"", 90, 25, 8, 14, "El conocimiento es el arma más peligrosa... y yo domino la tormenta y el fuego.", "La magia siempre prevalece sobre la fuerza bruta. Un resultado predecible.");
let m2 = new Mago("Morgana \"La Atrapa Almas\"", 85, 28, 8, 12, "Tu mente es un libro abierto... y estoy a punto de arrancar la última página.", "Las estrellas han dictado su sentencia. Su fuego se ha apagado.");
let c1 = new Clerigo("Cassian \"El Custodio del Alba\"", 110, 15, 12, 18, "Incluso en la oscuridad más profunda, la luz sagrada busca a los infieles. Arrodíllate.", "La penitencia ha sido pagada. Que el descanso eterno sea clemente con ellos.");
let a1 = new Arquero("Thorne Ojo de Halcón", 100, 22, 12, 15, "Una sola flecha, un solo latido. No te preocupes, ni siquiera sentirás el impacto.", "La distancia nunca fue un problema. Cada flecha encuentra siempre su destino.");
let p1 = new Picaro("Nyx \"La Daga Invisible\"", 95, 24, 10, 20, "Dicen que la muerte llega sin avisar... hoy me he tomado la libertad de adelantarme.", "El oro es efímero, pero la sombra que dejo tras de mí es eterna. Adiós.");

let jugadores = [g1, g2, m1, m2, c1, a1, p1];

// ---------------------------------------------------------
// 4. MOTOR DEL JUEGO (BATALLA)
// ---------------------------------------------------------
console.log("==================================================");
console.log("                CLASH OF LEGENDS                  ");
console.log("==================================================");

// Saludo inicial
console.log("\n--- PRESENTACIÓN DE LOS CAMPEONES ---");
jugadores.forEach(jugador => jugador.saludar());

let ronda = 1;

// El juego continúa mientras quede más de un jugador vivo
while (jugadores.length > 1) {
  console.log(`\n=================== Ronda ${ronda} ===================`);

  // Determinar el orden de ataque de la ronda actual según la velocidad
  let ordenTurno = [];
  for (let i = 0; i < jugadores.length; i++) {
    let tiradaVelocidad = Math.floor(Math.random() * jugadores[i].velocidad) + 1;
    ordenTurno.push({ personaje: jugadores[i], numeroTirada: tiradaVelocidad });
  }
  
  // Ordenamos de mayor a menor (el de mayor número ataca primero)
  ordenTurno.sort((a, b) => b.numeroTirada - a.numeroTirada);

  // Ciclo de acciones por personaje
  for (let i = 0; i < ordenTurno.length; i++) {
    let atacante = ordenTurno[i].personaje;

    // Solo ataca si sigue vivo
    if (atacante.vida > 0) {
      
      // Filtrar posibles objetivos (vivos y que no sea él mismo)
      let posiblesObjetivos = jugadores.filter(p => p !== atacante && p.vida > 0);
      
      if (posiblesObjetivos.length > 0) {
        // Elegir un objetivo al azar
        let objetivo = posiblesObjetivos[Math.floor(Math.random() * posiblesObjetivos.length)];
        let accion; 
        
        // Probabilidad: 1/3 (33%) puños, 2/3 (66%) habilidad de clase
        let probabilidadArma = Math.floor(Math.random() * 3) + 1; 

        if (probabilidadArma === 1) {
          accion = atacante.atacar(); // Puños
        } else {
          // Habilidad especial según su clase
          if (atacante.clase === "Guerrero") accion = atacante.atacar_con_arma();
          else if (atacante.clase === "Mago") accion = atacante.atacar_con_hechizo();
          else if (atacante.clase === "Pícaro") accion = atacante.atacar_con_daga();
          else if (atacante.clase === "Arquero") {
            // Verifica si le quedan flechas antes de disparar
            if (atacante.flechas > 0) {
              accion = atacante.disparar();
            } else {
              console.log(`⚠️ ${atacante.nombre} se quedó sin flechas y ataca con los puños.`);
              accion = atacante.atacar();
            }
          }
          else if (atacante.clase === "Clérigo") {
            // Inteligencia artificial simple: si está herido, 50% de curarse en vez de atacar
            if (Math.random() > 0.5 && atacante.vida < atacante.vidaMaxima) {
              atacante.curar();
              continue; // Consume el turno y pasa al siguiente personaje
            } else {
              accion = atacante.atacar_con_plegaria();
            }
          }
        }

        // --- SISTEMA DE DEFENSA Y DAÑO ---
        let tiradaDefensa = Math.floor(Math.random() * objetivo.defensa) + 1;
        let armaUsada = accion.nombreArma;

        // Verificar el ataque furtivo del Pícaro (ignora defensa)
        if (accion.critico) {
          console.log(`🗡️ ¡ATAQUE FURTIVO! ${atacante.nombre} sorprende a ${objetivo.nombre} ignorando su defensa.`);
          tiradaDefensa = 0; 
        }

        // Verificar si el ataque tiene éxito o falla
        if (tiradaDefensa > accion.danio) {
          console.log(`🛡️ FALLO: ${atacante.nombre} ataca con ${armaUsada} a ${objetivo.nombre}, pero la defensa fue superior. (Defensa: ${tiradaDefensa} > Daño: ${accion.danio})`);
        } else {
          // El ataque entra, se resta la vida
          objetivo.vida -= accion.danio;
          console.log(`⚔️ ÉXITO: ${atacante.nombre} ataca con ${armaUsada} a ${objetivo.nombre} causándole ${accion.danio} de daño. (Vida restante: ${objetivo.vida})`);

          // Comprobar si el objetivo ha muerto
          if (objetivo.vida <= 0) {
            objetivo.vida = 0;
            console.log(`☠️ ¡MUERTE! ${objetivo.nombre} ha caído en combate.`);
          }
        }
      }
    }
  }

  // Al final de la ronda, eliminar a los personajes muertos del arreglo principal
  jugadores = jugadores.filter(p => p.vida > 0);
  ronda++; 
}

// ---------------------------------------------------------
// 5. FIN DEL JUEGO
// ---------------------------------------------------------
if (jugadores.length === 1) {
    let ganador = jugadores[0];
    console.log("\n==================================================");
    console.log(`🏆 ¡EL JUEGO HA TERMINADO! EL GANADOR ES: ${ganador.nombre.toUpperCase()} 🏆`);
    console.log(`🗣️ ${ganador.nombre}: "${ganador.fraseVictoria}"`);
    console.log("==================================================");
} else {
    console.log("\nEmpate o todos murieron simultáneamente.");
}