import { IPointService } from '@/service/interface/i.point.service';
import { ITYPES } from '@/types/interface.types';
import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';

@injectable()
export class PointController {
private pointService: IPointService;
constructor(
@inject('PointService') pointService: IPointService
) {
this.pointService = pointService;
}
}