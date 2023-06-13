// the type the clients receive on front-end
type UserI = {
    username: string;
    email?: string;
    registeredAt: number;
};

// the type needed to create a user document
// used like: UserModel.create(User)
type User = {
    username?: string;
    email?: string;
    registeredAt?: number;
};


// the hydrated document that is used in the back-end to make logical operations
// used like: const userDoc = await UserModel.find(User); userDoc.method1()
type UserDocument = {
    _id: string;
    id: string;
    // ...
    username: string;
    email?: string;
    registeredAt: number;

    method1(): void;
};
