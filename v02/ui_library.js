/**
 * Crea un componente de DOM del tipo del elemento dado, con varios atributos,
 * y otros elementos como hijos. Los atributos y los hijos son optativos.
 *
 * @param {string} elemType - Un string con el tipo de elemento a crear
 *      (el nombre de la etiqueta)
 * @param {object|undefined} attributes - Un objeto donde las claves corresponden
 *      a atributos HTML y los valores al valor a asignar a dicho atributo.
 * @param {string|array|undefined} children - O bien un string, si se desea que
 *      el elemento creado contenga texto, o bien un array con otros componentes
 *      como elementoss, si se desea que tenga otros elementos como hijos.
 * @returns
 */
const createElement = (elemType, attributes, children) => {
    // Verificamos primero que efectivamente haya un elemType y que sea un string
    if (!elemType || typeof elemType !== 'string') {
        throw new TypeError('The first argument of createElement must be a string representing the name of a tag');
    }
    // Creamos un nuevo elemento del DOM.
    const newElem = document.createElement(elemType);
    // Si hay atributos, los asignamos uno a uno al nuevo elemento creado.
    if (attributes) {
        for (const attrKey of Object.keys(attributes)) {
            const attrValue = attributes[attrKey];
            newElem.setAttribute(attrKey, attrValue);
        }
    }
    // Si hay hijos...
    if (children) {
        // En el caso de que se haya dado un string, lo asignamos como texto
        if (typeof children === 'string') {
            newElem.textContent = children
        }
        // En el caso de un array, agregamos uno a uno a los hijos.
        if (typeof children === 'object' && Array.isArray(children)) {
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

/*
 Hacemos la función de acceso global.
*/
window.createElement = createElement;