const Observer = window.Observer;

/****************** Main Contents ***********************/
const renderFinishedObserver = new Observer();

/** Funcion auxiliar para crear un elemento del DOM */
const createDOMElement = (elemType, props, children) => {
    // Notar que es el mismo código de antes, salvo que separado del manejo de componentes.
    const newElem = document.createElement(elemType);
    if (props) {
        for (const attrKey of Object.keys(props)) {
            const attrValue = props[attrKey];
            if (attrKey === 'className') {
                newElem.setAttribute('class', attrValue);
            } else if (attrKey.startsWith('on')) {
                const eventName = attrKey.substring(2).toLowerCase();
                newElem.addEventListener(eventName, attrValue);
            } else {
                newElem.setAttribute(attrKey, attrValue);
            }
        }
    }
    if (children) {
        if (children.length === 1 && typeof children[0] === 'string') {
            newElem.textContent = children[0];
        } else {
            for (const child of children) {
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

/** Funcion auxiliar para crear un elemento componente */
const createComponentElement = (elemType, props, children) => {
    // Notar que es el mismo código de antes, salvo que separado del manejo del DOM.
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
const createElement = (elemType, propsWithRef, ...children) => {
    if (!elemType || (typeof elemType !== 'string' && typeof elemType !== 'function')) {
        throw new TypeError('The first argument of createElement must be a string representing the name of a tag or a component function');
    }

    let newElem = undefined;

    // Separamos la creación del componente en dos casos bien separados
    if (typeof elemType === 'string') {
        // Primero miramos si las props tienen un ref, y nos quedamos con las props
        // por un lado y la ref por otra, para lo cual usamos asignación desestructurada.
        const {ref, ...props } = propsWithRef;
        // Desde acá la creación del componente es identica, salvo que
        // luego de crear el componente, debemos manejar la referencia.
        newElem = createDOMElement(elemType, props, children);
        // Manejamos la ref, si existe
        if (ref) {
            ref.current = newElem;
        }
    } else if (typeof elemType === 'function') {
        // En el caso de los componentes, la ref se pasa como prop, ya que
        // no tenemos un componente concreo al cual asignarlo.
        newElem = createComponentElement(elemType, propsWithRef, children);
    }

    return newElem;
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
                // Como eliminamos los componentes viejos, ya no hay nadie
                // observando eventos. Estos se van a recrear al recargar la
                // interfaz. Debemos limpiar el observer.
                renderFinishedObserver.clear();
                // Debemos  resetear la cuenta del numero de useStates usados.
                resetStateCount();
                // Debemos llamar al componente a renderizar
                this.mainDOMElement.appendChild(this.lastRenderedElement());
            }
            // Ahora tenemos que avisar que se terminó de renderizar,
            // para llamar a todos los que están observando.
            renderFinishedObserver.triggerEvent();
        }
    }
    return rootApp;
}

/****************** Hooks ***********************/
const useEffect = (f) => {
    renderFinishedObserver.addObserver(f);
};

const useRef = (initialVal) => {
    return { current: initialVal };
};

/**
 * Esta variable va a almacenar los estados generales de la aplicación.
 * Cada estado se relacionará con quien llamó a useState (o sea, guardamos el
 * nombre de la función del componente). Esto permite que cuando se vuelva a llamar en el
 * proximo renderizado, si bien el DOM cambia, la función siempre es la misma.
 *
 * Para cada caller, vamos a guardar un objeto con dos elementos: Primero, la
 * cantidad de veces que fue llamada la función useState desde ese componente,
 * de modo que cada llamada se corresponda a un estado distinto a almacenar;
 * En segundo lugar vamos a guardar los valores efectivos de cada estado en un
 * array, donde la posición se corresponde a cada llamada.
 *
 * La forma de operar con esta variable es un poco "hack", para poder usar
 * useState de forma similar a como lo haríamos en React.
 */
const states = {}

/**
 * De la misma forma que debemos limpiar los observadores antes de re-renderizar,
 * también debemos limpiar la cantidad de llamadas de cada componente. resetStateCount
 * hace precisamente eso.
 */
const resetStateCount = () => {
    for (const caller of Object.keys(states)) {
        states[caller].numCalls = 0;
    }
}

/**
 * Esta función es el hook que se va a exportar. Devuelve una lista
 * con dos elementos, el valor del estado, y una función que permite
 * actualizar el valor del estado.
 *
 * @param {any} initialVal - El valor inicial del estado
 * @returns
 */
const useState = (initialVal) => {
    // Vamos a guardar el caller. Esta tecnica es sucia y no es la más
    // feliz, pero, funciona para nuestro caso de uso y es suficiente
    // para ejemplificar lo que hace useState.
    let caller = undefined;

    // Obtener el caller requiere mirar el stack trace
    try { throw new Error() }
    catch (err) {
        // Y parsearlo
        let callerInStack = err.stack.split('\n')[2];
        callerInStack = callerInStack.substring(callerInStack.indexOf('at ') + 3);
        callerInStack = callerInStack.substring(0, callerInStack.indexOf(' '));
        // Finalmente deberíamos tenerlo
        caller = callerInStack;
    }

    // Si no pudimos calcular el caller, fallamos.
    if (!caller) {
        return;
    }

    // Obtener los elementos para este componente
    let callerElements = states[caller];

    // Si el componente jamas ha llamado a useState, debemos crear
    // un nuevo elemento para este componente.
    if (!callerElements) {
        callerElements = {
            numCalls: 0,
            elements: []
        };
        states[caller] = callerElements;
    }

    // Hay que asegurarse de que haya tantos elementos en la lista como llamadas
    // Y sino, debemos agregar nuevos elementos, y debemos dar el valor inicial
    // al mismo. Asumimos que siempre hay valores para los anteriores elementos
    if (callerElements.elements.length <= callerElements.numCalls) {
        callerElements.elements.push(initialVal);
    }
    // Tomamos el valor actual, puede ser el que existía o el que acabamos de crear
    const currentValue = callerElements.elements[callerElements.numCalls];
    const currentCalls = callerElements.numCalls;

    // Incrementamos el numero de llamadas.
    callerElements.numCalls++;

    // Devolvemos el valor actual, y una función que actualiza el valor actual
    // para poder usarlo en el próximo renderizado.
    return [currentValue, function(value) {
        callerElements.elements[currentCalls] = value;
    }];
};

/***************** Root App *********************/
/** Devuelve la rootApp */
const getRootApp = () => rootApp;

/**
 * Los elementos exportados por esta library, en un único objeto
 */
window.UILibrary = {
    createElement: createElement,
    createRoot: createRoot,
    getRootApp: getRootApp,
    useEffect: useEffect,
    useRef: useRef,
    useState: useState
};
