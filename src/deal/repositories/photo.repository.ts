import { Deal } from '@deal/entities/deal.entity';
import { Photo } from '@deal/entities/photo.entity';
import { Injectable } from '@nestjs/common';
import { CustomFile } from '@shared/types/customFile.type';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class PhotoRepository extends Repository<Photo> {
  constructor(private dataSource: DataSource) {
    super(Photo, dataSource.createEntityManager());
  }

  async createPhoto(file: CustomFile, deal: Deal): Promise<Photo> {
    const photo = new Photo();

    if (file.location) {
      photo.location = file.location;
    } else {
      photo.path = file.path;
    }

    photo.deal = deal;

    await this.save(photo);

    return photo;
  }

  async updatePhotos(files: CustomFile[], deal: Deal): Promise<void> {
    await this.delete({ deal });

    await Promise.all([
      files.map(async (file) => await this.createPhoto(file, deal)),
    ]);
  }
}
