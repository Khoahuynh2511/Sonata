import { TimelessPiecesController } from '@/controller/timeless_pieces.controller';
import { TimelessPiecesService } from '@/service/timeless_pieces.service';
import { TimelessPiecesRepository } from '@/repository/timeless_pieces.repository';
import { ITimelessPiecesService } from '@/service/interface/i.timeless_pieces.service';
import { ITimelessPiecesRepository } from '@/repository/interface/i.timeless_pieces.repository';
import { BaseContainer } from '@/container/base.container';
import { TimelessPieces } from '@/models/timeless_pieces.model';

class TimelessPiecesContainer extends BaseContainer {
  constructor() {
    super(TimelessPieces);
    this.container.bind<ITimelessPiecesService<TimelessPieces>>('TimelessPiecesService').to(TimelessPiecesService);
    this.container
      .bind<ITimelessPiecesRepository<TimelessPieces>>('TimelessPiecesRepository')
      .to(TimelessPiecesRepository);
    this.container.bind<TimelessPiecesController>(TimelessPiecesController).toSelf();
  }

  export() {
    const timelessPiecesController = this.container.get<TimelessPiecesController>(TimelessPiecesController);
    const timelessPiecesService = this.container.get<ITimelessPiecesService<any>>('TimelessPiecesService');
    const timelessPiecesRepository = this.container.get<ITimelessPiecesRepository<any>>('TimelessPiecesRepository');

    return { timelessPiecesController, timelessPiecesService, timelessPiecesRepository };
  }
}

const timelessPiecesContainer = new TimelessPiecesContainer();
const { timelessPiecesController, timelessPiecesService, timelessPiecesRepository } = timelessPiecesContainer.export();
export { timelessPiecesController, timelessPiecesService, timelessPiecesRepository };
