import { ContributorExchangePremiumReq } from '@/dto/contributor/request/contributor-exchange-premium.req';
import { ContributorLoginReq } from '@/dto/contributor/request/contributor-login.req';
import { ContributorRegisterReq } from '@/dto/contributor/request/contributor-register.req';
import { ContributorUpdateReq } from '@/dto/contributor/request/contributor-update.req';
import { ContributorDetailRes } from '@/dto/contributor/response/contributor-detail.res';
import { ContributorGetMeRes } from '@/dto/contributor/response/contributor-get-me.res';
import { ContributorLoginRes } from '@/dto/contributor/response/contributor-login.res';
import { ContributorSearchRes } from '@/dto/contributor/response/contributor-search.res';
import { PagingResponseDto } from '@/dto/paging-response.dto';
import { SearchDataDto } from '@/dto/search/search-data.dto';
import { IBaseCrudService } from '@/service/interface/i.base.service';
import { BaseModelType } from '@/types/base-model.types';

export interface IContributorService<T extends BaseModelType> extends IBaseCrudService<T> {
  /**
   * Update contributor by id
   * @param id
   * @param data
   */
  updateById(id: number, data: ContributorUpdateReq): Promise<void>;

  /**
   * Get contributor by id
   * @param id
   */
  getById(id: number): Promise<ContributorDetailRes>;

  /**
   * Search contributor
   * @param searchData
   */
  search(searchData: SearchDataDto): Promise<PagingResponseDto<ContributorSearchRes>>;

  /**
   * Login contributor
   * @param contributorLoginReq
   */
  login(contributorLoginReq: ContributorLoginReq): Promise<ContributorLoginRes>;

  /**
   * Get current contributor information
   * @param contributorId
   */
  getMe(contributorId: number): Promise<ContributorGetMeRes>;

  /**
   * Register contributor
   * @param contributorRegisterReq
   */
  register(contributorRegisterReq: ContributorRegisterReq): Promise<void>;

  /**
   * Activate email by otp
   * @param email
   * @param otp
   */
  activateEmail(email: string, otp: string): Promise<void>;

  /**
   *  * Exchange premium for contributor
   * @param contributorId
   */
  exchangePremium(contributorId: number, data: ContributorExchangePremiumReq): Promise<void>;
}
