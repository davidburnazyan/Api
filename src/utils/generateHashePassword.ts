import bcrypt from 'bcryptjs';

export const generateHashedPassword = async (password: string) => {
    try {
        const hashPassword = await bcrypt.hash(password, 10);

        return hashPassword
    } catch(err) {
        console.log(err, '-----err')
    }
}