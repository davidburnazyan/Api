// import { Action } from 'routing-controllers';
// import { Exception } from '../modules/exeption';
// import { UserRepository } from '../repositories/user.repository';
// import { ClubRepository } from '../repositories/club.repository';
// import { MemberRepository } from '../repositories/member.repository';
// import { getCustomRepository } from 'typeorm';
// import { ErrorMessages, HttpStatusMessages, UserRoles } from '../enums';
// import { tokenParser } from '../helpers/token.parser';

// export const authorizationChecker = async (action: Action, roles: string[]): Promise<boolean> => {
//     const result =  tokenParser(action.request);
//     if (!result.success) {
//         throw new Exception(HttpStatusMessages.BAD_REQUEST, { message: result.message })
//     }

//     const userRepository = getCustomRepository(UserRepository);
//     const user = await userRepository.findOne(result.userId);
//     if (!user)  {
//         throw new Exception(HttpStatusMessages.BAD_REQUEST, { message: ErrorMessages.USER_NOT_FOUND })
//     }
//     if (!user.isVerified) {
//         throw new Exception(HttpStatusMessages.BAD_REQUEST, { message: ErrorMessages.USER_IS_NOT_VERIFIED })
//     }

//     if (!user.isActive)  {
//         throw new Exception(HttpStatusMessages.BAD_REQUEST, { message: ErrorMessages.USER_IS_NOT_ACTIVE })
//     }

//     if (user.role === UserRoles.CLUB) {
//         const clubRepository = getCustomRepository(ClubRepository);
//         const club = await clubRepository.findOne({ where: { userId: user.id } });
//         if (!club)  {
//             throw new Exception(HttpStatusMessages.BAD_REQUEST, { message: ErrorMessages.CLUB_NOT_FOUND })
//         }
//         action.request.club = club ;
//     }

//     if (user.role === UserRoles.MEMBER) {
//         const memberRepository = getCustomRepository(MemberRepository);
//         const member = await memberRepository.findOne({ where: { userId: user.id } });
//         if (!member)  {
//             throw new Exception(HttpStatusMessages.BAD_REQUEST, { message: ErrorMessages.MEMBER_NOT_FOUND })
//         }
//         action.request.member = member ;
//     }

//     if (roles && roles.length) {
//         if(!result.success) {
//             throw new Exception(HttpStatusMessages.BAD_REQUEST, { message: ErrorMessages.INVALID_TOKEN })
//         }
//         if (!roles.includes(user.role)) {
//             throw new Exception(HttpStatusMessages.FORBIDDEN, { message: ErrorMessages.FORBIDDEN });
//         }
//     }

//     action.request.user = user ;
//     return  true;
// };
