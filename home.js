// Create the modal component using React.createElement
function LoginModal({ closeModal }) {
    const handleSubmit = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        alert(`Email: ${email}, Password: ${password}`);
        closeModal();
    };

    return React.createElement(
        'div',
        { className: 'modal' },
        React.createElement(
            'div',
            { className: 'modal-content' },
            React.createElement(
                'span',
                { className: 'close', onClick: closeModal },
                '\u00D7'
            ),
            React.createElement('h2', null, 'Login'),
            React.createElement(
                'form',
                { onSubmit: handleSubmit },
                React.createElement('label', { htmlFor: 'email' }, 'Email:'),
                React.createElement('input', {
                    type: 'email',
                    id: 'email',
                    name: 'email',
                    required: true
                }),
                React.createElement('label', { htmlFor: 'password' }, 'Password:'),
                React.createElement('input', {
                    type: 'password',
                    id: 'password',
                    name: 'password',
                    required: true
                }),
                React.createElement('button', { type: 'submit' }, 'Sign In')
            )
        )
    );
}

// Handle the sign-in button click event
document.getElementById('signInButton').addEventListener('click', function (event) {
    event.preventDefault();
    showModal();
});

// Function to render the modal component
function showModal() {
    ReactDOM.render(
        React.createElement(LoginModal, {
            closeModal: function () {
                ReactDOM.unmountComponentAtNode(document.getElementById('modal-root'));
            }
        }),
        document.getElementById('modal-root')
    );
}
