import type { Message, WebSocketMessage } from '../../types/chat';

class WebSocketService {
    private socket: WebSocket | null = null;
    private messageCallbacks: ((message: Message) => void)[] = [];
    private readReceiptCallbacks: ((data: unknown) => void)[] = [];
    private userStatusCallbacks: ((data: unknown) => void)[] = [];

    connect(token: string) {
        this.socket = new WebSocket(
            `ws://localhost:8000/api/v1/chat/ws/${token}`,
        );
        this.socket.onopen = () => {
            console.log('WebSocket connection established');
        };
        this.socket.onmessage = (event) => {
            const messageData: WebSocketMessage = JSON.parse(event.data);
            this.handleMessage(messageData);
        };

        this.socket.onclose = () => {
            console.log('WebSocket connection closed');
        };

        this.socket.onerror = (error) => {
            console.error('WebSocket error:', error);
        };
    }

    private handleMessage(messageData: WebSocketMessage) {
        switch (messageData.type) {
            case 'new_message':
                this.messageCallbacks.forEach((callback) =>
                    callback(messageData.data as Message),
                );
                break;
            case 'read_receipt':
                this.readReceiptCallbacks.forEach((callback) =>
                    callback(messageData.data),
                );
                break;
            case 'user_status':
                this.userStatusCallbacks.forEach((callback) =>
                    callback(messageData.data),
                );
                break;
            default:
                console.warn('Unknown message type:', messageData.type);
        }
    }

    sendMessage(message: Message) {
        if (this.socket && this.socket.readyState === WebSocket.OPEN) {
            this.socket.send(
                JSON.stringify({
                    type: 'message',
                    data: message,
                }),
            );
        } else {
            console.error('WebSocket is not connected');
        }
    }

    onMessage(callback: (message: Message) => void) {
        this.messageCallbacks.push(callback);
    }

    onReadReceipt(callback: (data: unknown) => void) {
        this.readReceiptCallbacks.push(callback);
    }

    onUserStatus(callback: (data: unknown) => void) {
        this.userStatusCallbacks.push(callback);
    }

    disconnect() {
        if (this.socket) {
            this.socket.close();
            this.socket = null;
        }
    }
}

export default new WebSocketService();
