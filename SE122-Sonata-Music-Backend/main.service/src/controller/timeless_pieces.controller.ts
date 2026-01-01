import { IBaseCrudController } from '@/controller/interfaces/i.base-curd.controller';
import { TimelessPieces } from '@/models/timeless_pieces.model';
import { ITimelessPiecesService } from '@/service/interface/i.timeless_pieces.service';
import { ITYPES } from '@/types/interface.types';
import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';

@injectable()
export class TimelessPiecesController {
  public common: IBaseCrudController<TimelessPieces>;
  private timelessPiecesService: ITimelessPiecesService<TimelessPieces>;
  constructor(
    @inject('TimelessPiecesService') timelessPiecesService: ITimelessPiecesService<TimelessPieces>,
    @inject(ITYPES.Controller) common: IBaseCrudController<TimelessPieces>
  ) {
    this.timelessPiecesService = timelessPiecesService;
    this.common = common;
  }
}
