import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDealDto } from '../dto/create-deal.dto';
import { UpdateDealDto } from '../dto/update-deal.dto';
import { DealRepository } from '@deal/repositories/deal.repository';
import { DealOutput } from '@deal/outputs/deal.output';

@Injectable()
export class DealService {
  constructor(private readonly dealRepository: DealRepository) {}

  async create(createDealDto: CreateDealDto): Promise<DealOutput> {
    return this.dealRepository.createDeal(createDealDto);
  }

  async findDealById(id: string) {
    const deal = await this.dealRepository.findDealByUniqueAttribute('id', id);

    if (!deal) {
      throw new NotFoundException(`Deal with id ${id} not found`);
    }

    return deal;
  }

  async update(id: string, updateDealDto: UpdateDealDto) {
    const deal = await this.dealRepository.updateDeal(id, updateDealDto);

    if (!deal) {
      throw new NotFoundException(`Deal with id ${id} not found`);
    }

    return deal;
  }
}
