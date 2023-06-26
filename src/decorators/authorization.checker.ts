import { Action } from 'routing-controllers';
import { Exception } from '../modules/exeption';
// import { UserRepository } from '../repositories/user.repository';
// import { ClubRepository } from '../repositories/club.repository';
// import { MemberRepository } from '../repositories/member.repository';
import { getCustomRepository } from 'typeorm';
import { ErrorMessages, HttpStatusMessages, UserRoles } from '../enums';
import { tokenParser } from '../helpers/token.parser';
import userModel from '../models/user';

export const authorizationChecker = async (action: Action, roles: string[]): Promise<boolean> => {
    const result = tokenParser(action.request);

    console.log(result, '-----result');

    if (!result.success) {
        throw new Exception(HttpStatusMessages.BAD_REQUEST, { message: result.message })
    }

    // const userRepository = getCustomRepository(UserRepository);
    const user = await userModel.findOne(result.userId);

    if (!user) {
        throw new Exception(HttpStatusMessages.BAD_REQUEST, { message: ErrorMessages.USER_NOT_FOUND })
    }

    // if (!user.isVerified) {
    //     throw new Exception(HttpStatusMessages.BAD_REQUEST, { message: ErrorMessages.USER_IS_NOT_VERIFIED })
    // }

    // if (!user.isActive) {
    //     throw new Exception(HttpStatusMessages.BAD_REQUEST, { message: ErrorMessages.USER_IS_NOT_ACTIVE })
    // }



    action.request.user = user;
    return true;
};
