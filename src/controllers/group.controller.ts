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
import { GroupService } from "../services/group.service";

@Service()
@JsonController("/groups")
export class GroupController {
  constructor(private groupService: GroupService) {}

  @Get("/")
  @HttpCode(HttpStatus.OK)
  async get(@Req() req: Request, @Res() res: Response) {
    try {
      // const lastCreatedGroup = await this.groupService.getLastOne();
      const groups = await this.groupService.getAll();

      res.json(groups);
    } catch (err) {
      res.json({ message: "Something went wrong." });
    }
  }
}
