import jwt from 'jsonwebtoken';

interface IJWTUser {
    email: string,
    password: string,
}

export const generateJWT = (user: IJWTUser) => {
    try {
        return jwt.sign(
            user,
            'secret',
            { expiresIn: "1h" }
          );
    } catch (err) {
        console.log(err, '-----');
    }
}