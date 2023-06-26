import { Request } from 'express';
import { ErrorMessages, TokenTypes } from '../enums';
import { Container } from 'typedi';
import { Security } from '../modules/security';
const security = Container.get(Security);

export const tokenParser = (request: Request) => {
    const token = request.headers[ 'authorization' ];
    if (!token)  {
        return {
            success: false,
            message: ErrorMessages.MISSING_AUTHORIZATION

        };
    }

    const bearerToken = token.split('Bearer ')[ 1 ];

    if (!bearerToken) {
        return {
            success: false,
            message: ErrorMessages.INVALID_AUTHORIZATION_TYPE
        };
    }

    try {
        const  data: any  = security.verifyJwt(bearerToken);

        if(data.data.type !== TokenTypes.ACCESS) {
          return  {
              success: false,
              message: ErrorMessages.INVALID_TOKEN
          }
        }

        return {
            success: true,
            userId: data.data.id
        }

    }catch(e){
        return {
            success: false,
            message: ErrorMessages.TOKEN_PARSE_ERROR
        }
    }
}
