import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Wallet } from './entities/wallet.entity';
import { WalletAsset } from './entities/wallet-asset.entity';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { CreateWalletAssetDto } from './dto/create-wallet-asset.dto';

@Injectable()
export class WalletsService {
  constructor(
    @InjectModel(Wallet.name) private walletSchemma: Model<Wallet>,
    @InjectModel(WalletAsset.name)
    private walletAssetSchemma: Model<WalletAsset>,
  ) {}

  create(createWalletDto: CreateWalletDto) {
    return this.walletSchemma.create(createWalletDto);
  }

  findAll() {
    return this.walletSchemma.find();
  }

  findOne(id: string) {
    return this.walletSchemma.findById(id);
  }

  /* TODO: This method will be implemented soon
  update(id: number, updateWalletDto: UpdateWalletDto) {
    return `This action updates a #${id} wallet`;
  }

  remove(id: number) {
    return `This action removes a #${id} wallet`;
  }*/

  createWalletAsset(createWalletAssetDto: CreateWalletAssetDto) {
    return this.walletAssetSchemma.create(createWalletAssetDto);
  }
}
