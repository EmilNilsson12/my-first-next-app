import React, { useEffect, useState } from 'react';
import { useChannel } from './AblyReactEffect';
import styles from './AblyChatComponent.module.css';

const AblyChatComponent = () => {
    let inputBox = null;
    let messageEnd = null;

    const [messageText, setMessageText] = useState('');
    const [receivedMessages, setReceivedMessages] = useState([]);
    const messageTextIsEmpty = messageText.trim().length === 0;

    const [channel, ably] = useChannel('chat-demo', (msg) => {
        const history = receivedMessages.slice(-199);
        setReceivedMessages([...history, msg]);
    });

    const sendChatMessage = (msgText) => {
        channel.publish({ name: 'chat-message', data: msgText });
        setMessageText('');
        inputBox.focus();
    };

    const handleFormSubmission = (evt) => {
        evt.preventDefault();
        sendChatMessage(messageText);
    };

    const handleKeyPress = (evt) => {
        if (evt.charCode !== 13 || messageTextIsEmpty) {
            return;
        }

        sendChatMessage(messageText);
        evt.preventDefault();
    };

    const messages = receivedMessages.map((msg, index) => {
        const author = msg.connectionId === ably.connection.id ? 'me' : 'other';
        return (
            <div key={index} className={styles.message} data-author={author}>
                {author}: {msg.data}
            </div>
        );
    });

    useEffect(() => {
        messageEnd.scrollIntoView({ behaviour: 'smooth' });
    });

    return (
        <div className={styles.chatHolder}>
            <div className={styles.chatText}>
                {messages}
                <div
                    ref={(element) => {
                        messageEnd = element;
                    }}
                ></div>{' '}
                {/* empty element to control scroll to bottom */}
            </div>
            <form onSubmit={handleFormSubmission} className={styles.form}>
                <textarea
                    ref={(element) => {
                        inputBox = element;
                    }}
                    value={messageText}
                    placeholder="Type a message..."
                    onChange={(e) => setMessageText(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className={styles.textarea}
                ></textarea>
                <button
                    type="submit"
                    className={styles.button}
                    disabled={messageTextIsEmpty}
                >
                    Send
                </button>
            </form>
        </div>
    );
};

export default AblyChatComponent;
