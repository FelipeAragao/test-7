import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Logger,
  Request,
  UseGuards,
} from '@nestjs/common';
import { MessageService } from '../services/message.service';
import { CreateMessageDto } from '../dto/create-message.dto';
import { UpdateMessageDto } from '../dto/update-message.dto';
import { JwtAuthGuard } from '@auth/guards/jwt.guard';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { MessageRequestOutput } from '../outputs/message.output';

@ApiTags('messages')
@Controller({ path: '/deals/:dealId/messages', version: '1' })
export class MessageController {
  private readonly logger = new Logger('MESSAGES');

  constructor(private readonly messageService: MessageService) {}

  @ApiCreatedResponse({
    description: 'Message succesfully created',
    type: MessageRequestOutput,
  })
  @ApiUnauthorizedResponse({
    description: 'Message creation failed due to authorization error',
    example: {
      error: 'Unauthorized',
    },
  })
  @ApiBadRequestResponse({
    description: 'Message creation failed due to input error',
    example: {
      error: 'Bad request',
    },
  })
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body() createMessageDto: CreateMessageDto,
    @Param('dealId') dealId: string,
    @Request() { userId },
  ) {
    try {
      const message = await this.messageService.create(
        createMessageDto,
        dealId,
        userId,
      );
      return { message };
    } catch ({ message, status }) {
      this.logger.error({
        message: message,
        status: status,
      });
      return { error: message };
    }
  }

  @ApiOkResponse({
    description: 'All messages for this deal retrieved',
    type: MessageRequestOutput,
    isArray: true,
  })
  @ApiNotFoundResponse({
    description: 'No messages found for this deal',
    example: {
      error: 'No message found for deal f59cfd6f-4b65-4e95-b65d-814cbe32b817',
    },
  })
  @Get()
  async findAll(@Param('dealId') dealId: string) {
    try {
      return this.messageService.findAll(dealId);
    } catch ({ message, status }) {
      this.logger.error({
        message: message,
        status: status,
      });
      return { error: message };
    }
  }

  @ApiOkResponse({
    description: 'MEssage retrieved',
    type: MessageRequestOutput,
  })
  @ApiNotFoundResponse({
    description: 'Message not found',
    example: {
      error: 'Message f59cfd6f-4b65-4e95-b65d-814cbe32b817 not found',
    },
  })
  @Get(':id')
  async findOne(@Param('id') id: string, @Param('dealId') dealId: string) {
    try {
      const message = await this.messageService.findOne(id, dealId);
      return { message };
    } catch ({ message, status }) {
      this.logger.error({
        message: message,
        status: status,
      });
      return { error: message };
    }
  }

  @ApiOkResponse({
    description: 'Message updated',
    type: MessageRequestOutput,
  })
  @ApiUnauthorizedResponse({
    description: 'Message update failed due to authorization error',
    example: {
      error: 'Unauthorized',
    },
  })
  @ApiNotFoundResponse({
    description: 'Message not found',
    example: {
      error: 'Message f59cfd6f-4b65-4e95-b65d-814cbe32b817 not found',
    },
  })
  @ApiBadRequestResponse({
    description: 'Message update failed due to input error',
    example: {
      error: 'Bad request',
    },
  })
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateMessageDto: UpdateMessageDto,
  ) {
    try {
      const message = await this.messageService.update(id, updateMessageDto);
      return { message };
    } catch ({ message, status }) {
      this.logger.error({
        message: message,
        status: status,
      });
      return { error: message };
    }
  }
}
