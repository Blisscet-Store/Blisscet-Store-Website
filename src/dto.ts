export interface user {
    _id: string;
    username: string;
    firstName: string;
    lastName: string;
    email?: string;
    userAvatar: { public_id: string; url: string };
    admin: boolean;
    cart: [
        {
            _id: string;
            productImage: { public_id: string; url: string };
            name: string;
            category: string;
            price: number;
            count: number;
        }
    ];
    createdAt: string;
}

export interface updateUser {
    _id?: string;
    username: string | undefined;
    firstName: string | undefined;
    lastName: string | undefined;
    email: string | undefined;
    userAvatar?: File;
}

export interface updatePassword {
    _id?: string;
    password: string | undefined;
}

export interface Products {
    _id?: string;
    productImage: { public_id: string; url: string };
    name: string;
    category: string;
    price: number;
    count: number;
}

export interface login {
    email: string;
    password: string;
    token?: string;
    _id?: string;
    username?: string;
    firstName?: string;
    lastName?: string;
    userAvatar?: { public_id: string; url: string };
    cart?: [
        {
            _id: string;
            porductImage: { public_id: string; url: string };
            name: string;
            category: string;
            price: number;
            count: number;
        }
    ];
    admin?: boolean;
}

export interface register {
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    _id?: string;
    userAvatar?: { public_id: string; url: string };
    cart?: [
        {
            _id: string;
            porductImage: { public_id: string; url: string };
            name: string;
            category: string;
            price: number;
            count: number;
        }
    ];
    admin?: boolean;
    token?: string;
}
