import { TimelessPieces } from '@/models/timeless_pieces.model';
import { BaseRepository } from '@/repository/base/base.repository';
import { ITimelessPiecesRepository } from '@/repository/interface/i.timeless_pieces.repository';
import { ITYPES } from '@/types/interface.types';
import { inject } from 'inversify';
import 'reflect-metadata';
import { DataSource } from 'typeorm';

export class TimelessPiecesRepository
  extends BaseRepository<TimelessPieces>
  implements ITimelessPiecesRepository<TimelessPieces>
{
  constructor(@inject(ITYPES.Datasource) dataSource: DataSource) {
    super(dataSource.getRepository(TimelessPieces));
  }
}
