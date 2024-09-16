# Repaso de tecnologías que estamos utilizando

La idea de este archivo es hacer un repaso sobre todas las tecnologías involucradas en nuestros proyectos, para entender bien qué rol juega cada una y por tanto poder sacar verdadero provecho a las mismas, así como reforzar nuestro aprendizaje.

## Lenguajes de programación

Conocidos:
    * Java, Python, Haskell, Smalltalk, ...

Nosotros usamos:
    * TypeScript/JavaScript
JavaScript:
    Tipado dinámico, implicito, estructural
TypeScript
    Tipado estático, explicito (para ser útil), estructural

Algunos comentarios sobre sistemas de tipos:
    Un sistema de tipos comprende los conceptos que un lenguaje tiene
    sobre los tipos y como los manipula y verifica.
    Algunas cosas que nos interesan de un sistema de tipos son:
    * Cantidad de información de tipos que debo escribir
    * Momento en que se verifican los tipos
    * Como se definen los tipos

**Cantidad de información de tipos que debo escribir**
Lenguaje con tipado explicito
```java
var x = 5;
public static String algo(Animal a, int b) {
    ((Perro) a).ladrar()
}
```
Lenguaje con tipado implicito
```python
x = 5
def algo(a, b):
    a.nombre
    b.nombre
```

**Momento en que se verifican los tipos**
* Tipado dinámico: Se verifica en tiempo de ejecución
* Tipado estático: Se verifica en tiempo de compilación
```haskell
f x y = x + y
```

**Como se definen los tipos**
* Tipado nominal
* Tipado estructural


# Ejecución de programas

**TypeScript** necesito compilar a JavaScript
Para ello, se usa **tsc** (TypeScript Compiler).
¿Con qué configuración se compila?
Para ello, existe un archivo llamado **tsconfig.json**.

**JavaScript** se ejecuta mediante un Engine de JavaScript.
* Todo browser incluye un engine de JS.
* Hay engines que corren en mi maquina o un servidor:
    * Node.js (Usamos este)
    - Deno
    - Bun

En otras tecnologías:
    * Compiladores (Ej. Java javac, C cc, C++, cpp)
    * Interpretes(JIT Compilers) (Ej. Java JVM, Python CPython, ...)

## Otras tecnologías web

HTML, CSS, SVG

## Dependency Managers / Package Managers

En otras tecnologías:
    * Java (Maven, SBT)
    * PHP (Composer)
    * Python (PIP, easy_install)

En JS/TS
    * npm (Node Package Manager)
    * yarn
    - pnpm
    - bower

Un buen manejador de depencias se descarga mis depencias declaradas y las dependencias de mis dependencias.
yo dependo de A
A depende de B
B depende de C
Cuando instalo, se baja A, B y C.

## Bundlers / Empaquetadores / Configuración de compilación

En otras tecnologías
    * C (make, Makefiles)
    * Java (Ant, Maven)
    * ...

En JS/TS
    - Webpack
    - Rollup
    * Vite (Su archivo asociado es **vite.config.ts**)
    - esbuild
    - swc

## Framework/Library de desarrollo de componentes web

* React (Nosotros usamos este)
- Vue
- Preact
- Svelte
- Angular

Utilizamos JSX/TSX (Extensión a la sintaxis del lenguaje para definir componentes web más facilmente).