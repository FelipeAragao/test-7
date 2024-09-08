import { CreateDealDto } from '@deal/dto/create-deal.dto';
import { UpdateDealDto } from '@deal/dto/update-deal.dto';
import { Deal } from '@deal/entities/deal.entity';
import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class DealRepository extends Repository<Deal> {
  constructor(private dataSource: DataSource) {
    super(Deal, dataSource.createEntityManager());
  }

  async createDeal(createDealDto: CreateDealDto): Promise<Deal> {
    const {
      type,
      description,
      value,
      tradeFor,
      location: { lat, lng, address, city, state, zipcode },
      urgency: { type: urgencyType, limitDate },
    } = createDealDto;

    const deal = this.create({
      type,
      description,
      value,
      tradeFor,
      lat,
      lng,
      address,
      city,
      state,
      zipcode,
      urgencyType,
      limitDate,
    });
    await this.save(deal);
    return deal;
  }

  async findDealByUniqueAttribute(
    attribute: string,
    value: string | number,
  ): Promise<Deal> {
    return this.findOneBy({ [attribute]: value });
  }

  async updateDeal(id: string, updateDealDto: UpdateDealDto): Promise<Deal> {
    const {
      type,
      description,
      value,
      tradeFor,
      location: { lat, lng, address, city, state, zipcode } = {},
      urgency: { type: urgencyType, limitDate } = {},
    } = updateDealDto;

    const input = Object.entries({
      type,
      description,
      value,
      tradeFor,
      lat,
      lng,
      address,
      city,
      state,
      zipcode,
      urgencyType,
      limitDate,
    }).reduce(
      (acc, [key, value]) => (value ? { ...acc, [key]: value } : acc),
      {},
    );

    const deal = await this.preload({
      id,
      ...input,
    });

    if (deal) {
      return this.save(deal);
    }

    return;
  }
}
