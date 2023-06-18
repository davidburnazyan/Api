import { Request, Response } from "express";
import {
  JsonController,
  HttpCode,
  Get,
  QueryParams,
  Req,
  Res,
} from "routing-controllers";
import { Service } from "typedi";
import WordModal from "../models/word";
import WordGroupModal from "../models/group";
import { HttpStatus } from "../enums";

@Service()
@JsonController('/groups')
export class GroupController {
  @Get('/')
  @HttpCode(HttpStatus.OK)
  async read(
    @QueryParams() query: any,
    @Req() req: Request,
    @Res() res: Response
  ) {
    try {
      // Add logic if there are group id or name get by these
      const lastCreatedGroup = await WordGroupModal
        .findOne().limit(1).sort({ $natural: -1 })

      if (!lastCreatedGroup) {
        return res.json({
          message: 'Group is missing.'
        });
      }

      const wordsByGroup = await WordModal.find({ group: lastCreatedGroup._id })

      return res.json({
        group: {
          name: lastCreatedGroup.name,
          words: wordsByGroup
        }
      });
    } catch (err) {
      res.json({ message: 'Something went wrong.' });
    }
  };

}
