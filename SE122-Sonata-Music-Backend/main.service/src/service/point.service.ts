import { BaseCrudService } from '@/service/base/base.service';
import { IPointService } from '@/service/interface/i.point.service';
import { inject, injectable } from 'inversify';

@injectable()
export class PointService implements IPointService {}