import { ContributorController } from '@/controller/contributor.controller';
import { ContributorService } from '@/service/contributor.service';
import { Contributor } from '@/models/contributor.model';
import { ContributorRepository } from '@/repository/contributor.repository';
import { IContributorService } from '@/service/interface/i.contributor.service';
import { IContributorRepository } from '@/repository/interface/i.contributor.repository';
import { BaseContainer } from '@/container/base.container';
import { IListenerRepository } from '@/repository/interface/i.listener.repository';
import { listenerRepository } from '@/container/listener.container';

class ContributorContainer extends BaseContainer {
  constructor() {
    super(Contributor);
    this.container.bind<IContributorService<Contributor>>('ContributorService').to(ContributorService);
    this.container.bind<IContributorRepository<Contributor>>('ContributorRepository').to(ContributorRepository);
    this.container.bind<ContributorController>(ContributorController).toSelf();

    // Import
    this.container.bind<IListenerRepository<any>>('ListenerRepository').toConstantValue(listenerRepository);
  }

  export() {
    const contributorController = this.container.get<ContributorController>(ContributorController);
    const contributorService = this.container.get<IContributorService<any>>('ContributorService');
    const contributorRepository = this.container.get<IContributorRepository<any>>('ContributorRepository');

    return { contributorController, contributorService, contributorRepository };
  }
}

const contributorContainer = new ContributorContainer();
const { contributorController, contributorService, contributorRepository } = contributorContainer.export();
export { contributorController, contributorService, contributorRepository };
