import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMessageDto } from '../dto/create-message.dto';
import { UpdateMessageDto } from '../dto/update-message.dto';
import { MessageRepository } from '../repositories/message.repository';
import { UserRepository } from '@user/repositories/user.repository';
import { DealRepository } from '@deal/repositories/deal.repository';
import { MessageOutput } from '../outputs/message.output';

@Injectable()
export class MessageService {
  constructor(
    private readonly messageRepository: MessageRepository,
    private readonly userRepository: UserRepository,
    private readonly dealRepository: DealRepository,
  ) {}

  async create(
    createMessageDto: CreateMessageDto,
    dealId: string,
    userId: string,
  ): Promise<MessageOutput> {
    const user = await this.userRepository.findByUserUniqueAttribute(
      'id',
      userId,
    );
    const deal = await this.dealRepository.findDealByUniqueAttribute(
      'id',
      dealId,
    );

    return this.messageRepository.createMessage(createMessageDto, deal, user);
  }

  async findAll(dealId: string): Promise<MessageOutput[]> {
    const messages = await this.messageRepository.findMessagesByDeal(dealId);

    if (!messages.length) {
      throw new NotFoundException(`No messages found for deal ${dealId}`);
    }

    return messages;
  }

  async findOne(id: string, dealId: string): Promise<MessageOutput> {
    const message = await this.messageRepository.findMessageByDealAndId(
      id,
      dealId,
    );

    if (!message) {
      throw new NotFoundException(`Message with id ${id} not found`);
    }

    return message;
  }

  async update(
    id: string,
    updateMessageDto: UpdateMessageDto,
  ): Promise<MessageOutput> {
    const message = await this.messageRepository.updateMessage(
      id,
      updateMessageDto,
    );

    if (!message) {
      throw new NotFoundException(`Message with id ${id} not found`);
    }

    return message;
  }
}
