import { Injectable } from '@nestjs/common';
import { CreateAssetDto } from './dto/create-asset.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Asset } from './entities/asset.entity';
import { Model } from 'mongoose';

@Injectable()
export class AssetsService {
  constructor(@InjectModel(Asset.name) private assetSchemma: Model<Asset>) {}

  create(createAssetDto: CreateAssetDto) {
    return this.assetSchemma.create(createAssetDto);
  }

  findAll() {
    return this.assetSchemma.find();
  }

  findOne(symbol: string) {
    return this.assetSchemma.findOne({ symbol });
  }

  /* TODO: This method will be implemented soon
  update(id: number, updateAssetDto: UpdateAssetDto) {
    return `This action updates a #${id} asset`;
  }

  remove(id: number) {
    return `This action removes a #${id} asset`;
  }*/
}
