import { TimelessPieces } from '@/models/timeless_pieces.model';
import { ITimelessPiecesRepository } from '@/repository/interface/i.timeless_pieces.repository';
import { BaseCrudService } from '@/service/base/base.service';
import { ITimelessPiecesService } from '@/service/interface/i.timeless_pieces.service';
import { inject, injectable } from 'inversify';

@injectable()
export class TimelessPiecesService
  extends BaseCrudService<TimelessPieces>
  implements ITimelessPiecesService<TimelessPieces>
{
  private timelessPiecesRepository: ITimelessPiecesRepository<TimelessPieces>;

  constructor(@inject('TimelessPiecesRepository') timelessPiecesRepository: ITimelessPiecesRepository<TimelessPieces>) {
    super(timelessPiecesRepository);
    this.timelessPiecesRepository = timelessPiecesRepository;
  }
}
