/****************** Main Contents ***********************/
/**
 * Crea un componente de DOM del tipo del elemento dado o con el componente dado,
 * asignando todas las props como atributo o pasandolas como argumento, y asignando
 * todos los hijos al elemento DOM, o pasando en "children" los componentes hijos.
 * Las props y los children son opcionales.
 *
 * @param {string|function} elemType - Un string con el tipo de elemento a crear
 *      (el nombre de la etiqueta) o una función que representa un componente.
 * @param {object|undefined} props - Un objeto donde las claves corresponden
 *      a atributos HTML y los valores al valor a asignar a dicho atributo, si se
 *      pasó un string el elemType, o un objeto que será pasado como props, si se
 *      trata de una función.
 * @param {string|array|undefined} children - O bien un string, si se desea que
 *      el elemento creado contenga texto, o bien un array con otros componentes
 *      como elementoss, si se desea que tenga otros elementos como hijos. Si
 *      se pasó una función en elemType, este valor será pasado como prop.children
 *      al componnte a invocar.
 * @returns
 */
const createElement = (elemType, props, ...children) => {
    // Verificamos primero que efectivamente haya un elemType y que sea,
    // o bien un string o bien una función
    if (!elemType || (typeof elemType !== 'string' && typeof elemType !== 'function')) {
        throw new TypeError('The first argument of createElement must be a string representing the name of a tag or a component function');
    }
    // Si se trata de un string, creamos un elemento del DOM,
    // con el mismo código que antes, salvo que manejamos el caso de
    // className como especial.
    if (typeof elemType === 'string') {
        // Creamos un nuevo elemento del DOM.
        const newElem = document.createElement(elemType);
        // Si hay atributos, los asignamos uno a uno al nuevo elemento creado.
        if (props) {
            for (const attrKey of Object.keys(props)) {
                const attrValue = props[attrKey];
                // Considerar que className es lo mismo que class.
                if (attrKey === 'className') {
                    newElem.setAttribute('class', attrValue);
                } else {
                    newElem.setAttribute(attrKey, attrValue);
                }
            }
        }
        // Si hay hijos...
        if (children && children.length > 0) {
            // En el caso de que se haya dado un string, lo asignamos como texto
            if (children.length === 1 && typeof children[0] === 'string') {
                newElem.textContent = children[0];
            } else {
                // En el caso de un array, agregamos uno a uno a los hijos.
                for (const child of children) {
                    // Verifiquemos que el hijo dado no sea null o undefined, para evitar errores
                    if (!child) {
                        throw new TypeError('A child passed to createElement cannot be undefined nor null');
                    }
                    // Si es un componente, lo llamamos, sino, agregamos al hijo.
                    if (typeof child === 'function') {
                        child(newElem)
                    } else {
                        newElem.appendChild(child);
                    }
                }
            }
        }
        return newElem;
    }
    // Si se trata de una función, entonces es un componnte que hay que invocar
    // para obtener el elemento, y hay que pasar las props a la función.
    if (typeof elemType === 'function') {
        // Simpre pasamos props, incluso si no nos la dieron, usamos un objeto vacío.
        // Recordemos que incluso si al invocar, paso argumntos, pero la función no define
        // el parámetro, no hay problema, ya que el argumento se ignora y listo, no falla.
        if (!props) {
            props = {};
        }
        // Si hay children lo agrego a las props
        if (children) {
            props.children = children;
        }
        // Llamamos a la función y devolvemos el resultado
        return elemType(props);
    }
}

/**
 * Una variable que contiene un objeto con la información
 * de la aplicación principal, la que incluye el elemento
 * del DOM principal en donde se va a montar la aplicación,
 * y una función que va a permitir iniciar el rendering de la aplicación.
 */
let rootApp = undefined;

/**
 * Inicializa rootApp con la información de la aplicación y el componente dado.
 * El elemento devuelto posee una función render, que puede ser llamada con un
 * elemento del DOM para mostrar sobre el componente principal.
 *
 * @param {HTMLElement} rootElem - El elemento del DOM principal sobre el cual montar la apliación
 * @returns La rootApp
 */
const createRoot = (rootElem) => {
    rootApp = {
        mainDOMElement: rootElem,
        lastRenderedElement: undefined,
        render: function (element) {
            // Si se pasa un elemento, entonces, ese es
            // el elemento a renderizar
            if (element) {
                this.lastRenderedElement = element;
            }
            // Solo se puede renderizar si hay un valor en lastRenderedElement
            if (this.lastRenderedElement) {
                this.mainDOMElement.innerHTML = '';
                // Debemos llamar al componente a renderizar
                this.mainDOMElement.appendChild(this.lastRenderedElement());
            }
        }
    }
    return rootApp;
}

/** Devuelve la rootApp */
const getRootApp = () => rootApp;

/**
 * Los elementos exportados por esta library, en un único objeto
 */
window.UILibrary = {
    createElement: createElement,
    createRoot: createRoot,
    getRootApp: getRootApp
};
