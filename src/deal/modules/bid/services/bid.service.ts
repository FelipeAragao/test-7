import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBidDto } from '../dto/create-bid.dto';
import { UpdateBidDto } from '../dto/update-bid.dto';
import { BidRepository } from '@deal/modules/bid/repositories/bid.repository';
import { UserRepository } from '@user/repositories/user.repository';
import { DealRepository } from '@deal/repositories/deal.repository';
import { BidOutput } from '@deal/modules/bid/outputs/deal.output';

@Injectable()
export class BidService {
  constructor(
    private readonly bidRepository: BidRepository,
    private readonly userRepository: UserRepository,
    private readonly dealRepository: DealRepository,
  ) {}

  async create(
    createBidDto: CreateBidDto,
    dealId: string,
    userId: string,
  ): Promise<BidOutput> {
    const user = await this.userRepository.findByUserUniqueAttribute(
      'id',
      userId,
    );
    const deal = await this.dealRepository.findDealByUniqueAttribute(
      'id',
      dealId,
    );

    return this.bidRepository.createBid(createBidDto, deal, user);
  }

  async findAll(dealId: string): Promise<BidOutput[]> {
    const bids = await this.bidRepository.findBidsByDeal(dealId);

    if (!bids.length) {
      throw new NotFoundException(`No bids found for deal ${dealId}`);
    }

    return bids;
  }

  async findOne(id: string, dealId: string): Promise<BidOutput> {
    const bid = await this.bidRepository.findBidByDealAndId(id, dealId);

    if (!bid) {
      throw new NotFoundException(`Bid with id ${id} not found`);
    }

    return bid;
  }

  async update(id: string, updateBidDto: UpdateBidDto): Promise<BidOutput> {
    const bid = await this.bidRepository.updateBid(id, updateBidDto);

    if (!bid) {
      throw new NotFoundException(`Bid with id ${id} not found`);
    }

    return bid;
  }
}
