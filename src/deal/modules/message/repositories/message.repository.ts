import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Message } from '../entities/message.entity';
import { CreateMessageDto } from '../dto/create-message.dto';
import { Deal } from '@deal/entities/deal.entity';
import { User } from '@user/entities/user.entity';
import { UpdateMessageDto } from '../dto/update-message.dto';

@Injectable()
export class MessageRepository extends Repository<Message> {
  constructor(private dataSource: DataSource) {
    super(Message, dataSource.createEntityManager());
  }

  async createMessage(
    { title, message }: CreateMessageDto,
    deal: Deal,
    user: User,
  ): Promise<Message> {
    const messageEntity = this.create({
      title,
      message,
      user,
      deal,
    });
    await this.save(messageEntity);

    return messageEntity;
  }

  async findMessagesByDeal(dealId: string): Promise<Message[]> {
    return this.find({
      where: { deal: { id: dealId } },
    });
  }

  async findMessageByDealAndId(id: string, dealId: string): Promise<Message> {
    return this.findOne({
      where: { id, deal: { id: dealId } },
      relations: { user: true },
    });
  }

  async updateMessage(
    id,
    { title, message }: UpdateMessageDto,
  ): Promise<Message> {
    const input = Object.entries({
      title,
      message,
    }).reduce(
      (acc, [key, value]) => (value ? { ...acc, [key]: value } : acc),
      {},
    );

    const messageEntity = await this.preload({
      id,
      ...input,
    });

    if (messageEntity) {
      return this.save(messageEntity);
    }

    return;
  }
}
