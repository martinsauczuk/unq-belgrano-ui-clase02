const UI = window.UILibrary;

const Message = (side) => {
    const bgColor = side === 'left' ? 'text-bg-success' : '';

    return UI.createElement('div', {
        'class': 'toast show m-1',
        'role': 'alert'
    }, [
        UI.createElement('div', {
            'class': 'toast-header ' + bgColor
        }, [
            UI.createElement('strong', {
                'class': 'me-auto'
            }, 'Sender'),
            UI.createElement('small', {}, '11:45:23'),
        ]),
        UI.createElement('div', {
            'class': 'toast-body ' + bgColor
        }, 'Texto del mensaje')
    ]);
}

const MessageContainer = (side) => {
    const justifyAt = side === 'left' ? 'start' : 'end';

    return UI.createElement('div', {
        'class': 'd-flex flex-row m-1 justify-content-' + justifyAt
    }, [
        Message(side)
    ]);
}

const MessagesListBox = () =>
    UI.createElement('div', {
        'class': 'flex-fill overflow-auto'
    }, [
        MessageContainer('left'),
        MessageContainer('right'),
        MessageContainer('left'),
        MessageContainer('left'),
        MessageContainer('right')
    ]);

const SendMessageBox = () =>
    UI.createElement('div', {
        'class': 'input-group mb-3'
    }, [
        UI.createElement('input', {
            'class': 'form-control',
            'type': 'text',
            'placeholder': 'Escribe tu mensaje aquí'
        }),
        UI.createElement('button', {
            'class': 'btn btn-success',
            'type': 'button'
        }, 'Enviar')
    ]);

const App = () =>
    UI.createElement('div', {
        'class': 'w-100 d-flex flex-column p-2'
    }, [
        MessagesListBox(),
        SendMessageBox(),
    ]);

UI.createRoot(document.getElementById('root')).render(
    App
);
