import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  Request,
  Logger,
} from '@nestjs/common';
import { BidService } from '../services/bid.service';
import { CreateBidDto } from '../dto/create-bid.dto';
import { UpdateBidDto } from '../dto/update-bid.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import {
  MultipleBidsRequestOutput,
  SingleBidRequestOutput,
} from '@deal/modules/bid/outputs/deal.output';
import { JwtAuthGuard } from '@auth/guards/jwt.guard';

@ApiTags('bids')
@Controller({ path: 'deals/:dealId/bids', version: '1' })
export class BidController {
  private readonly logger = new Logger('BIDS');

  constructor(private readonly bidService: BidService) {}

  @ApiCreatedResponse({
    description: 'Bid succesfully created',
    type: SingleBidRequestOutput,
  })
  @ApiUnauthorizedResponse({
    description: 'Bid creation failed due to authorization error',
    example: {
      error: 'Unauthorized',
    },
  })
  @ApiBadRequestResponse({
    description: 'Bid creation failed due to input error',
    example: {
      error: 'Bad request',
    },
  })
  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Body() createBidDto: CreateBidDto,
    @Param('dealId') dealId: string,
    @Request() { userId },
  ) {
    try {
      return this.bidService.create(createBidDto, dealId, userId);
    } catch ({ message, status }) {
      this.logger.error({
        message: message,
        status: status,
      });
      return { error: message };
    }
  }

  @ApiOkResponse({
    description: 'All bids for this deal retrieved',
    type: MultipleBidsRequestOutput,
  })
  @ApiNotFoundResponse({
    description: 'No bids found for this deal',
    example: {
      error: 'No bids found for deal f59cfd6f-4b65-4e95-b65d-814cbe32b817',
    },
  })
  @Get()
  findAll(@Param('dealId') dealId: string) {
    try {
      return this.bidService.findAll(dealId);
    } catch ({ message, status }) {
      this.logger.error({
        message: message,
        status: status,
      });
      return { error: message };
    }
  }

  @ApiOkResponse({
    description: 'Bid retrieved',
    type: SingleBidRequestOutput,
  })
  @ApiNotFoundResponse({
    description: 'Bid not found',
    example: {
      error: 'Bid f59cfd6f-4b65-4e95-b65d-814cbe32b817 not found',
    },
  })
  @Get(':id')
  findOne(@Param('dealId') dealId: string, @Param('id') id: string) {
    try {
      return this.bidService.findOne(id, dealId);
    } catch ({ message, status }) {
      this.logger.error({
        message: message,
        status: status,
      });
      return { error: message };
    }
  }

  @ApiOkResponse({
    description: 'Bid updated',
    type: SingleBidRequestOutput,
  })
  @ApiUnauthorizedResponse({
    description: 'Bid update failed due to authorization error',
    example: {
      error: 'Unauthorized',
    },
  })
  @ApiNotFoundResponse({
    description: 'Bid not found',
    example: {
      error: 'Bid f59cfd6f-4b65-4e95-b65d-814cbe32b817 not found',
    },
  })
  @ApiBadRequestResponse({
    description: 'Bid update failed due to input error',
    example: {
      error: 'Bad request',
    },
  })
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBidDto: UpdateBidDto) {
    try {
      return this.bidService.update(id, updateBidDto);
    } catch ({ message, status }) {
      this.logger.error({
        message: message,
        status: status,
      });
      return { error: message };
    }
  }
}
