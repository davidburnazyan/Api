import { Request, Response } from "express";
import {
  JsonController,
  Post,
  HttpCode,
  Get,
  Put,
  Delete,
  Req,
  Res,
  Authorized,
} from "routing-controllers";
import { Service } from "typedi";

import { WordService } from "../services/word.service";
import { HttpStatus } from "../enums";

@Service()
@JsonController('/words')
export class WordController {

  constructor(private wordService: WordService) { }


  @Get('/')
  @HttpCode(HttpStatus.OK)
  async read(
    @Req() req: Request,
    @Res() res: Response
  ) {
    const response = await this.wordService.getAll(req)

    res.json({ response })
  };

  @Post('/')
  @HttpCode(HttpStatus.OK)
  async create(
    @Req() req: Request,
    @Res() res: Response
  ) {
    const response = await this.wordService.create(req)

    res.json({ response })
  };

  @Put('/')
  @HttpCode(HttpStatus.OK)
  async update(
    @Req() req: Request,
    @Res() res: Response
  ) {
    const response = await this.wordService.create(req)

    res.json({ response })
  };

  @Delete('/')
  @HttpCode(HttpStatus.OK)
  async delete(
    @Req() req: Request,
    @Res() res: Response
  ) {
    const response = await this.wordService.delete(req)

    res.json({ response })
  };
}
