import { Contributor } from '@/models/contributor.model';
import { BaseRepository } from '@/repository/base/base.repository';
import { IContributorRepository } from '@/repository/interface/i.contributor.repository';
import { ITYPES } from '@/types/interface.types';
import { inject } from 'inversify';
import 'reflect-metadata';
import { DataSource } from 'typeorm';

export class ContributorRepository extends BaseRepository<Contributor> implements IContributorRepository<Contributor> {
  constructor(@inject(ITYPES.Datasource) dataSource: DataSource) {
    super(dataSource.getRepository(Contributor));
  }
}
