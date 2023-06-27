import { Action } from 'routing-controllers';
import { Exception } from '../modules/exeption';
// import { UserRepository } from '../repositories/user.repository';
// import { ClubRepository } from '../repositories/club.repository';
// import { MemberRepository } from '../repositories/member.repository';
import { ErrorMessages, HttpStatusMessages } from '../enums';
import { tokenParser } from '../helpers/token.parser';
import user from "../models/user";

export const authorizationChecker = async (action: Action, roles: string[]): Promise<boolean> => {
    const result = tokenParser(action.request);

    if (!result.success) {
        throw new Exception(HttpStatusMessages.BAD_REQUEST, { message: result.message })
    }

    const responseUser = await user.findOne({ email: result.email });

    if (!responseUser) {
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
