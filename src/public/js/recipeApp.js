$(document).ready(() => {
    const socket = io();

    $('#chatForm').submit((e) => {
        e.preventDefault();
        console.log('da gui');
        let text = $('#chat-input').val();
        let userId = $('#chat-user-id').val();
        let userName = $('#chat-user-name').val();
        socket.emit('message', {
            content: text,
            userName: userName,
            userId: userId,
        });
        $('#chat-input').val('');
        return false;
    });

    socket.on('message', (message) => {
        displayMessage(message);
    });

    socket.on('load all messages', (data) => {
        data.forEach((message) => {
            displayMessage(message);
        });
    });

    socket.on('user disconnected', () => {
        displayMessage({
            userName: 'Notice',
            content: 'User left the chat',
        });
    });

    let displayMessage = (message) => {
        $('#chat').prepend(
            $('<li>').html(`<div class="message ${getCurrentUserClass(
                message.userId,
            )}">
                                <strong>${message.userName}</strong>: 
                                ${message.content}
                            </div>`),
        );
    };

    let getCurrentUserClass = (id) => {
        let userId = $('#chat-user-id').val();
        return userId === id ? 'current-user' : '';
    };
});
