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
import GroupModal from "../models/group";
import { HttpStatus } from "../enums";

@Service()
@JsonController('/groups')
export class GroupController {
  @Get('/')
  @HttpCode(HttpStatus.OK)
  async readLast(
    @Res() res: Response
  ) {
    try {
      // Add logic if there are group id or name get by these
      const lastCreatedGroup = await GroupModal
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
