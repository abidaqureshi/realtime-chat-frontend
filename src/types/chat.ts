export type MessageType =
    | 'message'
    | 'read_receipt'
    | 'user_status'
    | 'new_message'
    | 'message_read';

export type User = {
    uuid: string;
    username: string;
    email: string;
    is_online: boolean;
    last_seen?: Date;
    created_at: Date;
};

export type Message = {
    uuid: string;
    sender_username: string;
    receiver_username: string;
    content: string;
    is_read: boolean;
    read_at?: Date;
    created_at: Date;
};

export type WebSocketMessage = {
    type: MessageType;
    data: unknown;
};

export type AuthResponse = {
    token: string;
    user: {
        uuid: string;
        username: string;
        email: string;
    };
};

export type LoginForm = {
    username: string;
    password: string;
};

export type RegisterForm = {
    username: string;
    email: string;
    password: string;
};
