import { Request, Response } from "express";
import {
  JsonController,
  HttpCode,
  Get,
  QueryParams,
  Req,
  Res,
  Params,
  Delete,
} from "routing-controllers";
import { Service } from "typedi";
import WordModal from "../models/word";
import GroupModal from "../models/group";
import { HttpStatus } from "../enums";
import { GroupService } from "../services/group.service";

@Service()
@JsonController("/groups")
export class GroupController {
  constructor(private groupService: GroupService) { }

  @Get("/")
  @HttpCode(HttpStatus.OK)
  async get(@Res() res: Response) {
    try {
      const response = await this.groupService.getAll();

      res.json({ data: response });
    } catch (err) {
      res.json({ message: "Something went wrong." });
    }
  }

  @Get("/:id")
  @HttpCode(HttpStatus.OK)
  async getOne(@Params() params: any, @Res() res: Response) {
    try {
      const groups = await this.groupService.getById(params.id);

      res.json(groups);
    } catch (err) {
      res.json({ message: "Something went wrong." });
    }
  }

  @Delete('/all')
  @HttpCode(HttpStatus.OK)
  async deleteAll(
    @Res() res: Response
  ) {
    const response = await this.groupService.deleteAll()

    res.json({ response })
  };
}
