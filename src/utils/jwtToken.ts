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
            { expiresIn: "365d" }
          );
    } catch (err) {
        console.log(err, '-----');
    }
}