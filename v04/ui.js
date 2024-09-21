const { createElement, createRoot } = window.UILibrary;

const Message = (side) => {
    const bgColor = side === 'left' ? 'text-bg-success' : '';

    return createElement('div', {
        'class': 'toast show m-1',
        'role': 'alert'
    }, [
        createElement('div', {
            'class': 'toast-header ' + bgColor
        }, [
            createElement('strong', {
                'class': 'me-auto'
            }, 'Sender'),
            createElement('small', {}, '11:45:23'),
        ]),
        createElement('div', {
            'class': 'toast-body ' + bgColor
        }, 'Texto del mensaje')
    ]);
}

const MessageContainer = (side) => {
    const justifyAt = side === 'left' ? 'start' : 'end';

    return createElement('div', {
        'class': 'd-flex flex-row m-1 justify-content-' + justifyAt
    }, [
        Message(side)
    ]);
}

const MessagesListBox = () =>
    createElement('div', {
        'class': 'flex-fill overflow-auto'
    }, [
        MessageContainer('left'),
        MessageContainer('right'),
        MessageContainer('left'),
        MessageContainer('left'),
        MessageContainer('right')
    ]);

const SendMessageBox = () =>
    createElement('div', {
        'class': 'input-group mb-3'
    }, [
        createElement('input', {
            'class': 'form-control',
            'type': 'text',
            'placeholder': 'Escribe tu mensaje aquí'
        }),
        createElement('button', {
            'class': 'btn btn-success',
            'type': 'button'
        }, 'Enviar')
    ]);

const App = () =>
    createElement('div', {
        'class': 'w-100 d-flex flex-column p-2'
    }, [
        MessagesListBox(),
        SendMessageBox(),
    ]);

createRoot(document.getElementById('root')).render(
    App
);
