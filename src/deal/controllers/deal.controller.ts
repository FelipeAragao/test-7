import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  UploadedFiles,
  UseInterceptors,
  Request,
  Logger,
} from '@nestjs/common';
import { DealService } from '../services/deal.service';
import { CreateDealDto } from '../dto/create-deal.dto';
import { UpdateDealDto } from '../dto/update-deal.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '@auth/guards/jwt.guard';
import { DealRequestOutput } from '@deal/outputs/deal.output';
import { FilesInterceptor } from '@nestjs/platform-express';
import { CustomFile } from '@shared/types/customFile.type';

@ApiTags('deals')
@UseGuards(JwtAuthGuard)
@Controller({ path: 'deals', version: '1' })
export class DealController {
  private readonly logger = new Logger('DEALS');

  constructor(private readonly dealService: DealService) {}

  @ApiCreatedResponse({
    description: 'Deal succesfully created',
    type: DealRequestOutput,
  })
  @ApiUnauthorizedResponse({
    description: 'Deal creation failed due to authorization error',
    example: {
      error: 'Unauthorized',
    },
  })
  @ApiBadRequestResponse({
    description: 'Deal creation failed due to input error',
    example: {
      error: 'Bad request',
    },
  })
  @UseInterceptors(FilesInterceptor('photos'))
  @Post()
  async create(
    @Body() createDealDto: CreateDealDto,
    @UploadedFiles() photos: CustomFile[],
    @Request() { user: { userId } },
  ) {
    try {
      const deal = await this.dealService.create(createDealDto, userId, photos);
      return { deal };
    } catch ({ message, status }) {
      this.logger.error({
        message: message,
        status: status,
      });
      return { error: message };
    }
  }

  @ApiOkResponse({
    description: 'Deal retrieved',
    type: DealRequestOutput,
  })
  @ApiUnauthorizedResponse({
    description: 'Deal retrieval failed due to authorization error',
    example: {
      error: 'Unauthorized',
    },
  })
  @ApiNotFoundResponse({
    description: 'Deal not found',
    example: {
      error: 'Deal f59cfd6f-4b65-4e95-b65d-814cbe32b817 not found',
    },
  })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const deal = await this.dealService.findDealById(id);
      return { deal };
    } catch ({ message, status }) {
      this.logger.error({
        message: message,
        status: status,
      });
      return { error: message };
    }
  }

  @ApiOkResponse({
    description: 'Deal updated',
    type: DealRequestOutput,
  })
  @ApiUnauthorizedResponse({
    description: 'Deal update failed due to authorization error',
    example: {
      error: 'Unauthorized',
    },
  })
  @ApiNotFoundResponse({
    description: 'Deal not found',
    example: {
      error: 'Deal f59cfd6f-4b65-4e95-b65d-814cbe32b817 not found',
    },
  })
  @ApiBadRequestResponse({
    description: 'Deal update failed due to input error',
    example: {
      error: 'Bad request',
    },
  })
  @UseInterceptors(FilesInterceptor('photos'))
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateDealDto: UpdateDealDto,
    @UploadedFiles() photos: CustomFile[],
  ) {
    try {
      const deal = await this.dealService.update(id, updateDealDto, photos);
      return { deal };
    } catch ({ message, status }) {
      this.logger.error({
        message: message,
        status: status,
      });
      return { error: message };
    }
  }
}
