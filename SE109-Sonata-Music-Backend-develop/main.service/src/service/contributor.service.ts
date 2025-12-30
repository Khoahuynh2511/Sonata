import { ContributorLoginReq } from '@/dto/contributor/request/contributor-login.req';
import { ContributorRegisterReq } from '@/dto/contributor/request/contributor-register.req';
import { ContributorUpdateReq } from '@/dto/contributor/request/contributor-update.req';
import { ContributorDetailRes } from '@/dto/contributor/response/contributor-detail.res';
import { ContributorGetMeRes } from '@/dto/contributor/response/contributor-get-me.res';
import { ContributorLoginRes } from '@/dto/contributor/response/contributor-login.res';
import { ContributorSearchRes } from '@/dto/contributor/response/contributor-search.res';
import { PagingResponseDto } from '@/dto/paging-response.dto';
import { SearchDataDto } from '@/dto/search/search-data.dto';
import { ContributorActiveEmailException } from '@/exceptions/contributor/contributor-active-email.exception';
import { ContributorLoginException } from '@/exceptions/contributor/contributor-login.exception';
import { ContributorUpdateByIdException } from '@/exceptions/contributor/contributor-update-by-id.exception';
import { Contributor } from '@/models/contributor.model';
import { IContributorRepository } from '@/repository/interface/i.contributor.repository';
import { BaseCrudService } from '@/service/base/base.service';
import { IContributorService } from '@/service/interface/i.contributor.service';
import DefinedError from '@/utils/error/defined.error';
import { SearchUtil } from '@/utils/search/search.util';
import { inject, injectable } from 'inversify';
import validator from 'validator';
import bcrypt from 'bcrypt';
import { generateAccessToken } from '@/utils/security/generate-access-token.util';
import { RoleCodeEnum } from '@/enums/role-code.enum';
import { ContributorGetMeException } from '@/exceptions/contributor/contributor-get-me-exception';
import redis from '@/utils/redis/redis.util';
import { RedisSchemaEnum } from '@/enums/redis-schema.enum';
import { ContributorRegisterException } from '@/exceptions/contributor/contributor-register.exception';
import { generateRandomOTPString } from '@/utils/generate-random-string.util';
import { ContributorRegisterByEmailCache } from '@/dto/contributor/cache/contributor-register-by-email.cache';
import { TIME_CONSTANTS } from '@/constants/time.constants';
import { sendEmail } from '@/utils/email/email-sender.util';
import { ContributorExchangePremiumException } from '@/exceptions/contributor/contributor-exchange-premium.exception';
import { PREMIUM_EXCHANGE_RULE } from '@/constants/premium-exchange-rule.constants';
import { IListenerRepository } from '@/repository/interface/i.listener.repository';
import { Listener } from '@/models/listener.model';
import { ContributorExchangePremiumReq } from '@/dto/contributor/request/contributor-exchange-premium.req';

@injectable()
export class ContributorService extends BaseCrudService<Contributor> implements IContributorService<Contributor> {
  private contributorRepository: IContributorRepository<Contributor>;
  private listenerRepository: IListenerRepository<Listener>;

  constructor(
    @inject('ContributorRepository') contributorRepository: IContributorRepository<Contributor>,
    @inject('ListenerRepository') listenerRepository: IListenerRepository<Listener>
  ) {
    super(contributorRepository);
    this.contributorRepository = contributorRepository;
    this.listenerRepository = listenerRepository;
  }

  async exchangePremium(contributorId: number, data: ContributorExchangePremiumReq): Promise<void> {
    const contributor = await this.contributorRepository.findOne({
      filter: {
        id: contributorId
      }
    });

    if (!contributor) {
      throw new DefinedError(ContributorExchangePremiumException.CONTRIBUTOR_EXCHANGE_PREMIUM_NotFound);
    }

    // Check if contributor has enough points
    if (contributor.points < PREMIUM_EXCHANGE_RULE.points) {
      throw new DefinedError(ContributorExchangePremiumException.CONTRIBUTOR_EXCHANGE_PREMIUM_NotEnoughPoints);
    }

    // Find listener by username
    const listener = await this.listenerRepository.findOne({
      filter: {
        username: data.listenerUsername
      }
    });

    if (!listener) {
      throw new DefinedError(ContributorExchangePremiumException.CONTRIBUTOR_EXCHANGE_PREMIUM_ListenerNotFound);
    }

    // Calculate premiumExpiredAt:

    // If currently have premium: premiumExpiredAt + PREMIUM_EXCHANGE_RULE.duration (days)
    if (listener.premiumExpiredAt) {
      // If listener already has premium, extend the premium duration
      const currentPremiumExpiredAt = new Date(listener.premiumExpiredAt);
      currentPremiumExpiredAt.setDate(currentPremiumExpiredAt.getDate() + PREMIUM_EXCHANGE_RULE.duration);
      listener.premiumExpiredAt = currentPremiumExpiredAt;
    } else {
      // If currently no have premium: today + PREMIUM_EXCHANGE_RULE.duration (days)
      listener.premiumExpiredAt = new Date(Date.now() + PREMIUM_EXCHANGE_RULE.duration * TIME_CONSTANTS.DAY);
    }

    // Update listener's points and premiumExpiredAt
    await this.listenerRepository.findOneAndUpdate({
      filter: {
        id: listener.id
      },
      updateData: {
        premiumExpiredAt: listener.premiumExpiredAt
      }
    });

    // Decrease contributor's points
    await this.contributorRepository.findOneAndUpdate({
      filter: {
        id: contributor.id
      },
      updateData: {
        points: contributor.points - PREMIUM_EXCHANGE_RULE.points
      }
    });
  }

  async updateById(id: number, data: ContributorUpdateReq): Promise<void> {
    const contributor = await this.contributorRepository.findOne({
      filter: {
        id: id
      }
    });

    if (!contributor) {
      throw new DefinedError(ContributorUpdateByIdException.CONTRIBUTOR_UPDATE_NotFound);
    }

    await this.contributorRepository.findOneAndUpdate({
      filter: {
        id: id
      },
      updateData: {
        fullname: data.fullname ? data.fullname : undefined
      }
    });
  }

  async getById(id: number): Promise<ContributorDetailRes> {
    const contributor = await this.contributorRepository.findOne({
      filter: {
        id: id
      },
      relations: ['musics']
    });
    if (!contributor) {
      throw new DefinedError(ContributorActiveEmailException.CONTRIBUTOR_ACTIVE_EMAIL_NotExistsEmail);
    }

    return {
      id: contributor.id,
      username: contributor.username,
      fullname: contributor.fullname,
      email: contributor.email,
      points: contributor.points,
      createAt: contributor.createAt,
      updateAt: contributor.updateAt,
      musics: contributor.musics
    };
  }

  async search(searchData: SearchDataDto): Promise<PagingResponseDto<ContributorSearchRes>> {
    console.log('searchData', searchData);

    const { where, order, paging } = SearchUtil.getWhereCondition(searchData);

    const contributors = await this.contributorRepository.findMany({
      filter: where,
      order: order,
      paging: paging,
      select: {
        id: true,
        email: true,
        username: true,
        fullname: true,
        createAt: true,
        updateAt: true
      }
    });

    const total = await this.contributorRepository.count({
      filter: where
    });

    return new PagingResponseDto(total, contributors);
  }

  async login(contributorLoginReq: ContributorLoginReq): Promise<ContributorLoginRes> {
    let contributor: Contributor | null = null;

    // If email is provide
    if (validator.isEmail(contributorLoginReq.usernameOrEmail)) {
      contributor = await this.contributorRepository.findOne({
        filter: {
          email: contributorLoginReq.usernameOrEmail
        }
      });
    }

    // If username is provided
    else {
      contributor = await this.contributorRepository.findOne({
        filter: {
          username: contributorLoginReq.usernameOrEmail
        }
      });
    }

    // If contributor not found
    if (!contributor) {
      throw new DefinedError(ContributorLoginException.CONTRIBUTOR_LOGIN_NotFound);
    }

    // Compare password
    if (!bcrypt.compareSync(contributorLoginReq.password, contributor.password)) {
      throw new DefinedError(ContributorLoginException.CONTRIBUTOR_LOGIN_WrongPasswordOrUsername);
    }

    // Generate token
    const accessToken = await generateAccessToken(contributor.id, contributor.username, RoleCodeEnum.CONTRIBUTOR);

    // Return response
    return {
      accessToken: accessToken,
      id: Number(contributor.id)
    };
  }

  async getMe(contributorId: number): Promise<ContributorGetMeRes> {
    const contributor = await this.contributorRepository.findOne({
      filter: {
        id: contributorId
      },
      relations: ['musics']
    });
    if (!contributor) {
      throw new DefinedError(ContributorGetMeException.CONTRIBUTOR_GET_ME_NotFound);
    }

    return {
      id: contributor.id,
      username: contributor.username,
      fullname: contributor.fullname,
      email: contributor.email,
      points: contributor.points,
      createAt: contributor.createAt,
      updateAt: contributor.updateAt,
      musics: contributor.musics
    };
  }

  async register(contributorRegisterReq: ContributorRegisterReq): Promise<void> {
    // Rate limit register request by check in cache
    const emailActivateCached = await redis.get(
      `${RedisSchemaEnum.ContributorRegisterByEmail}:${contributorRegisterReq.email}`
    );

    // If found in cache, that mean this user is trying to register too many times
    if (emailActivateCached) {
      throw new DefinedError(ContributorRegisterException.CONTRIBUTOR_REGISTER_TooManyRequest);
    }

    // Check if email is exists
    if (
      await this.contributorRepository.exists({
        filter: {
          email: contributorRegisterReq.email
        }
      })
    ) {
      throw new DefinedError(ContributorRegisterException.CONTRIBUTOR_REGISTER_EmailExists);
    }

    // Check if username is exists
    if (
      await this.contributorRepository.exists({
        filter: {
          username: contributorRegisterReq.username
        }
      })
    ) {
      throw new DefinedError(ContributorRegisterException.CONTRIBUTOR_REGISTER_UsernameExists);
    }

    // Hash password
    contributorRegisterReq.password = bcrypt.hashSync(contributorRegisterReq.password, 12);

    const otp = generateRandomOTPString(6);

    redis.set(
      `${RedisSchemaEnum.ContributorRegisterByEmail}:${contributorRegisterReq.email}`,
      JSON.stringify(new ContributorRegisterByEmailCache(contributorRegisterReq, otp)),
      'EX',
      (TIME_CONSTANTS.MINUTE * 3) / 1000
    );

    //Valid phone number or email
    sendEmail({
      from: { name: 'Sonata - Nền tảng chia sẻ nhạc cổ điển hàng đầu' },
      to: {
        emailAddress: [contributorRegisterReq.email]
      },
      subject: 'Xác thực tài khoản Sonata',
      text: `Mã xác thực của bạn là: ${otp}`
    });

    return;
  }

  async activateEmail(email: string, otp: string): Promise<void> {
    const emailActivateCached = await redis.get(`${RedisSchemaEnum.ContributorRegisterByEmail}:${email}`);

    // If not found in cache, that mean otp is expired
    if (!emailActivateCached) {
      throw new DefinedError(ContributorActiveEmailException.CONTRIBUTOR_ACTIVE_EMAIL_OtpExpired);
    }

    // If otp is not match, that mean otp is expired
    const contributorRegisterByEmailCache: ContributorRegisterByEmailCache = JSON.parse(emailActivateCached);
    if (contributorRegisterByEmailCache.otp !== otp) {
      throw new DefinedError(ContributorActiveEmailException.CONTRIBUTOR_ACTIVE_EMAIL_OtpExpired);
    }

    const { contributorRegisterReq } = contributorRegisterByEmailCache;

    let contributor = new Contributor();

    // Map data from request to entity
    contributor = contributorRegisterReq as Contributor;

    await this.contributorRepository.create({
      data: contributor
    });
  }
}
