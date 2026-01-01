import { IBaseCrudController } from '@/controller/interfaces/i.base-curd.controller';
import { SearchDataDto } from '@/dto/search/search-data.dto';
import { Contributor } from '@/models/contributor.model';
import { IContributorService } from '@/service/interface/i.contributor.service';
import { ITYPES } from '@/types/interface.types';
import { getCurrentLoggedUser } from '@/utils/get-current-logged-user.util';
import { getSearchData } from '@/utils/search/get-search-data.util';
import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';

@injectable()
export class ContributorController {
  public common: IBaseCrudController<Contributor>;
  private contributorService: IContributorService<Contributor>;
  constructor(
    @inject('ContributorService') contributorService: IContributorService<Contributor>,
    @inject(ITYPES.Controller) common: IBaseCrudController<Contributor>
  ) {
    this.contributorService = contributorService;
    this.common = common;
  }

  /**
   * * POST /contributor/login
   */
  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await this.contributorService.login(req.body);
      res.send_ok('Login successfully', result);
    } catch (error) {
      next(error);
    }
  }

  /**
   * * * GET /contributor/me
   * * Get current contributor information
   */
  async getMe(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const user = await getCurrentLoggedUser(req);

      const result = await this.contributorService.getMe(user.id);

      res.send_ok('Get current contributor information successfully', result);
    } catch (error) {
      next(error);
    }
  }

  /**
   * * POST /contributor/register
   */
  async register(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await this.contributorService.register(req.body);
      res.send_ok('The otp have been sent to your email', result);
    } catch (error) {
      next(error);
    }
  }

  /**
   * * POST /contributor/activate/email
   */
  async activateEmail(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, otp } = req.query as {
        email: string;
        otp: string;
      };

      await this.contributorService.activateEmail(email, otp);
      res.send_ok('Activate email successfully, you can login now');
    } catch (error) {
      next(error);
    }
  }

  /**
   * * POST /contributor/search
   * @param req
   * @param res
   * @param next
   */
  async search(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const searchData: SearchDataDto = getSearchData(req);

      const result = await this.contributorService.search(searchData);

      res.send_ok('contributors fetched successfully', result);
    } catch (error) {
      next(error);
    }
  }

  /**
   * * GET /contributor/:id
   */
  async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = parseInt(req.params.id);

      const result = await this.contributorService.getById(id);

      res.send_ok('contributor fetched successfully', result);
    } catch (error) {
      next(error);
    }
  }

  /**
   * * DELETE /contributor/:id
   */
  async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = parseInt(req.params.id);

      const result = await this.contributorService.findOneAndDelete({
        filter: {
          id: id
        }
      });

      res.send_ok('contributor deleted successfully', result);
    } catch (error) {
      next(error);
    }
  }

  /**
   * * PUT /contributor/:id
   */
  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = parseInt(req.params.id);

      const result = await this.contributorService.updateById(id, req.body);

      res.send_ok('contributor updated successfully', result);
    } catch (error) {
      next(error);
    }
  }

  /**
   * * POST /contributor/exchange-premium
   */
  async exchangePremium(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const user = await getCurrentLoggedUser(req);

      const data = req.body;

      const result = await this.contributorService.exchangePremium(user.id, data);

      res.send_ok('Exchange premium successfully', result);
    } catch (error) {
      next(error);
    }
  }
}
