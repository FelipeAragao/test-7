import { Deal } from '@deal/entities/deal.entity';
import { Injectable } from '@nestjs/common';
import { User } from '@user/entities/user.entity';
import { CreateBidDto } from '@deal/modules/bid/dto/create-bid.dto';
import { UpdateBidDto } from '@deal/modules/bid/dto/update-bid.dto';
import { Bid } from '@deal/modules/bid/entities/bid.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class BidRepository extends Repository<Bid> {
  constructor(private dataSource: DataSource) {
    super(Bid, dataSource.createEntityManager());
  }

  async createBid(
    { value, description }: CreateBidDto,
    deal: Deal,
    user: User,
  ): Promise<Bid> {
    const bid = this.create({
      accepted: false,
      value: value,
      description: description,
      user,
      deal,
    });
    await this.save(bid);
    return bid;
  }

  async findBidsByDeal(dealId: string): Promise<Bid[]> {
    return this.find({
      where: { deal: { id: dealId } },
    });
  }

  async findBidByDealAndId(id: string, dealId: string): Promise<Bid> {
    return this.findOne({
      where: { id, deal: { id: dealId } },
      relations: { user: true },
    });
  }

  async updateBid(
    id,
    { accepted, value, description }: UpdateBidDto,
  ): Promise<Bid> {
    const input = Object.entries({
      accepted,
      value,
      description,
    }).reduce(
      (acc, [key, value]) => (value ? { ...acc, [key]: value } : acc),
      {},
    );

    const bid = await this.preload({
      id,
      ...input,
    });

    if (bid) {
      return this.save(bid);
    }

    return;
  }
}
