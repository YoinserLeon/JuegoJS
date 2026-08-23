// CLASE BASE ACTUALIZADA
class Personaje {
  constructor(nombre, vida, danio, defensa, velocidad, clase) {
    this.nombre = nombre;
    this.vida = vida;
    this.vidaMaxima = vida; // Guardamos el máximo para cuando el Clérigo se cure
    this.danio = danio;
    this.defensa = defensa;
    this.velocidad = velocidad;
    this.clase = clase; 
  }

  saludar() {
    console.log(`[SALUDO] ¡Hola! Mi nombre es ${this.nombre} y soy un ${this.clase}.`);
  }

  atacar() {
    return { tipo: "puños", nombreArma: "sus puños", danio: this.danio, critico: false };
  }
}

// ---------------------------------------------------------
// PASO 2: CLASES
// ---------------------------------------------------------

// 1. GUERRERO
class Guerrero extends Personaje {
  constructor(nombre, vida, danio, defensa, velocidad) {
    // Usamos super() para mandar los datos a la clase Personaje y le fijamos la clase "Guerrero"
    super(nombre, vida, danio, defensa, velocidad, "Guerrero");
    this.array_de_armas = ["Espada Pesada", "Hacha de Batalla", "Mazo de Guerra"];
  }

  atacar_con_arma() {
    // Escogemos un arma al azar usando Math.random()
    let armaAleatoria = this.array_de_armas[Math.floor(Math.random() * this.array_de_armas.length)];
    return { tipo: "arma", nombreArma: armaAleatoria, danio: this.danio, critico: false };
  }
}

// 2. MAGO
class Mago extends Personaje {
  constructor(nombre, vida, danio, defensa, velocidad) {
    super(nombre, vida, danio, defensa, velocidad, "Mago");
    this.array_de_hechizos = ["Bola de Fuego", "Rayo de Escarcha", "Tormenta Eléctrica"];
  }

  atacar_con_hechizo() {
    let hechizoAleatorio = this.array_de_hechizos[Math.floor(Math.random() * this.array_de_hechizos.length)];
    return { tipo: "hechizo", nombreArma: hechizoAleatorio, danio: this.danio, critico: false };
  }
}

// 3. ARQUERO
class Arquero extends Personaje {
  constructor(nombre, vida, danio, defensa, velocidad) {
    super(nombre, vida, danio, defensa, velocidad, "Arquero");
    this.array_de_flechas = ["Flecha Perforante", "Flecha de Fuego", "Flecha Envenenada"];
  }

  disparar() {
    let flechaAleatoria = this.array_de_flechas[Math.floor(Math.random() * this.array_de_flechas.length)];
    return { tipo: "flecha", nombreArma: flechaAleatoria, danio: this.danio, critico: false };
  }
}

// 4. CLÉRIGO
class Clerigo extends Personaje {
  constructor(nombre, vida, danio, defensa, velocidad) {
    super(nombre, vida, danio, defensa, velocidad, "Clérigo");
    this.array_de_plegarias = ["Castigo Divino", "Luz Cegadora", "Fuego Sagrado"];
  }

  atacar_con_plegaria() {
    let plegariaAleatoria = this.array_de_plegarias[Math.floor(Math.random() * this.array_de_plegarias.length)];
    return { tipo: "plegaria", nombreArma: plegariaAleatoria, danio: this.danio, critico: false };
  }

  curar() {
    // Calculamos el 25% de su vida máxima
    let curacionMaxima = this.vidaMaxima * 0.25;
    // Se cura un número aleatorio entre 1 y ese 25%
    let curacion = Math.floor(Math.random() * curacionMaxima) + 1; 
    
    this.vida += curacion;
    // Si la curación hace que pase su límite, lo dejamos en el máximo
    if (this.vida > this.vidaMaxima) {
      this.vida = this.vidaMaxima;
    }
    console.log(`[CURACIÓN] ${this.nombre} ha rezado y recuperó ${curacion} de vida. (Vida actual: ${this.vida})`);
  }
}

// 5. PÍCARO
class Picaro extends Personaje {
  constructor(nombre, vida, danio, defensa, velocidad) {
    super(nombre, vida, danio, defensa, velocidad, "Pícaro");
    this.array_de_dagas = ["Daga Sombría", "Cuchillo Arrojadizo", "Hoja Oculta"];
  }

  atacar_con_daga() {
    let dagaAleatoria = this.array_de_dagas[Math.floor(Math.random() * this.array_de_dagas.length)];
    
    // Lógica del Ataque Furtivo: 5% de probabilidad de ignorar defensa
    let probabilidad = Math.floor(Math.random() * 100) + 1; // Número del 1 al 100
    let esCritico = false;
    
    if (probabilidad <= 5) {
      esCritico = true; // Si cae del 1 al 5, es un ataque crítico (5%)
    }

    return { tipo: "daga", nombreArma: dagaAleatoria, danio: this.danio, critico: esCritico };
  }
}

// --- PRUEBA CREANDO ALGUNOS PERSONAJES DEL PROYECTO ---
let arturo = new Guerrero("Arturo", 150, 20, 15, 8);
let merlin = new Mago("Merlín", 90, 30, 5, 12);
let robin = new Arquero("Robin", 100, 25, 10, 18);
let sancho = new Clerigo("Sancho", 110, 15, 12, 10);
let sombra = new Picaro("Sombra", 85, 28, 8, 20);

// Comprobamos que funciona:
console.log(merlin.atacar_con_hechizo()); 
console.log(sombra.atacar_con_daga()); 
sancho.curar();
// ---------------------------------------------------------
// PASO 3: EL MOTOR DEL JUEGO (RONDAS Y TURNOS)
// ---------------------------------------------------------

// 1. Creamos a los 7 personajes obligatorios (2 Guerreros, 2 Magos, 1 Arquero, 1 Clérigo, 1 Pícaro)
let g1 = new Guerrero("Garen", 150, 20, 15, 8);
let g2 = new Guerrero("Caballero", 140, 22, 18, 6);
let m1 = new Mago("Ann", 90, 25, 8, 14);
let m2 = new Mago("Ahri", 85, 28, 8, 12);
let a1 = new Arquero("Ashe", 100, 22, 12, 15);
let c1 = new Clerigo("Morgana", 110, 15, 12, 18);
let p1 = new Picaro("Joker", 95, 24, 10, 20);

// Los metemos todos en un "arreglo" (lista) que representará a los peleadores vivos
let jugadores = [g1, g2, m1, m2, a1, c1, p1];

console.log("=== INICIO DEL JUEGO ===");
// Hacemos que todos saluden usando un ciclo forEach
jugadores.forEach(jugador => jugador.saludar());

// 2. Iniciamos el control de las rondas
let ronda = 1;

// El juego sigue MIENTRAS haya más de 1 jugador vivo
while (jugadores.length > 1) {
  console.log(`\n=== RONDA ${ronda} ===`);

  // 3. Calcular el orden de ataque basado en la velocidad
  let ordenTurno = [];

  for (let i = 0; i < jugadores.length; i++) {
    let jugador = jugadores[i];
    // Generamos un número del 1 a la velocidad del personaje
    let tiradaVelocidad = Math.floor(Math.random() * jugador.velocidad) + 1;
    
    // Guardamos al personaje y su número en una lista temporal
    ordenTurno.push({
      personaje: jugador,
      numeroTirada: tiradaVelocidad
    });
  }

  // Ordenamos la lista de mayor a menor según el número que sacaron
  ordenTurno.sort((a, b) => b.numeroTirada - a.numeroTirada);

  // 4. Ciclo de Ataques (Cada personaje hace su acción)
  for (let i = 0; i < ordenTurno.length; i++) {
    let atacante = ordenTurno[i].personaje;

    // Solo ataca si sigue vivo (pudo haber muerto en el turno de alguien más en esta misma ronda)
    if (atacante.vida > 0) {
      
      // Filtramos para obtener a los enemigos (que no sea él mismo y que estén vivos)
      let posiblesObjetivos = jugadores.filter(p => p !== atacante && p.vida > 0);
      
      // Si todavía hay a quién pegarle...
      if (posiblesObjetivos.length > 0) {
        // Escogemos un objetivo al azar
        let objetivoAleatorio = posiblesObjetivos[Math.floor(Math.random() * posiblesObjetivos.length)];
        
        console.log(`-> ${atacante.nombre} (Sacó ${ordenTurno[i].numeroTirada} en vel) se prepara para atacar a ${objetivoAleatorio.nombre}.`);
        
        // AQUÍ IRÁ LA LÓGICA DE DAÑO Y DEFENSA DEL PASO 4
      }
    }
  }

  // Limpiamos la arena: filtramos el arreglo para que solo queden los vivos para la siguiente ronda
  jugadores = jugadores.filter(p => p.vida > 0);
  ronda++; // Sumamos 1 al contador de la ronda
  
  // Condición de seguridad para evitar un ciclo infinito mientras probamos (se puede borrar después)
  if (ronda > 5) break; 
}

// Mensaje final
if (jugadores.length === 1) {
    console.log(`\n¡EL GANADOR ES ${jugadores[0].nombre}!`);
}