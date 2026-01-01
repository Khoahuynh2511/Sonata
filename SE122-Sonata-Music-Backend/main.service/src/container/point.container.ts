import { PointController } from '@/controller/point.controller';
import { PointService } from '@/service/point.service';
import { IPointService } from '@/service/interface/i.point.service';
import { Container } from 'inversify';

class PointContainer{
  private container = new Container();
  constructor() {
this.container.bind<IPointService>('PointService').to(PointService);
this.container.bind<PointController>(PointController).toSelf();
}

export() {
    const pointController = this.container.get<PointController>(PointController);
    const pointService = this.container.get<IPointService>('PointService');

return { pointController, pointService};
}
}

const pointContainer = new PointContainer();
const { pointController, pointService} = pointContainer.export();
export { pointController, pointService};