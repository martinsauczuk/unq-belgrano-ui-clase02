
/**
 * Implementa un objeto observer.
 */
class Observer {
    /**
     * Crea un nuevo observer, sin observadores al momento.
     */
    constructor() {
        this.observers = [];
    }
    /**
     * Agrega un nuevo observador a este observer. El observador es una función
     * que será llamada cuando el evento ocurra.
     *
     * @param {function} obs - El observador a agregar
     */
    addObserver(obs) {
        this.observers.push(obs);
    }
    /**
     * Marca que el evento a ocurrido, notificando a todos los observadores
     * del mismo, es decir, invocando a cada función que está registrada
     * como observador.
     */
    triggerEvent() {
        for (const obs of this.observers) {
            obs();
        }
    }
    /**
     * Limpia la lista de observadores.
     */
    clear() {
        this.observers = [];
    }
};

window.Observer = Observer;