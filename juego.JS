// CLASE BASE ACTUALIZADA (Paso 1)
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
// PASO 2: CLASES HIJAS
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