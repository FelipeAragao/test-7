import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDealDto } from '../dto/create-deal.dto';
import { UpdateDealDto } from '../dto/update-deal.dto';
import { DealRepository } from '@deal/repositories/deal.repository';
import { DealOutput } from '@deal/outputs/deal.output';
import { CustomFile } from '@shared/types/customFile.type';
import { PhotoRepository } from '@deal/repositories/photo.repository';
import { UserRepository } from '@user/repositories/user.repository';

@Injectable()
export class DealService {
  constructor(
    private readonly dealRepository: DealRepository,
    private readonly photoRepository: PhotoRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async create(
    createDealDto: CreateDealDto,
    userId: string,
    photos: CustomFile[] = [],
  ): Promise<DealOutput> {
    const user = await this.userRepository.findByUniqueAttribute('id', userId);
    const deal = await this.dealRepository.createDeal(createDealDto, user);

    await Promise.all([
      photos.map(
        async (photo) => await this.photoRepository.createPhoto(photo, deal),
      ),
    ]);

    return deal;
  }

  async findDealById(id: string) {
    const deal = await this.dealRepository.findDealByUniqueAttribute('id', id);

    if (!deal) {
      throw new NotFoundException(`Deal with id ${id} not found`);
    }

    return deal;
  }

  async update(id: string, updateDealDto: UpdateDealDto, photos: CustomFile[]) {
    const deal = await this.dealRepository.updateDeal(id, updateDealDto);

    if (!deal) {
      throw new NotFoundException(`Deal with id ${id} not found`);
    } else if (photos) {
      await this.photoRepository.updatePhotos(photos, deal);
    }

    return deal;
  }
}
