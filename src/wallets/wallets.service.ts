import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';

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
    @InjectConnection() private connection: mongoose.Connection,
  ) {}

  create(createWalletDto: CreateWalletDto) {
    return this.walletSchemma.create(createWalletDto);
  }

  findAll() {
    return this.walletSchemma.find();
  }

  findOne(id: string) {
    return this.walletSchemma.findById(id).populate([
      {
        path: 'assets', //walletasset
        populate: ['asset'],
      },
    ]);
  }

  /* TODO: This method will be implemented soon
  update(id: number, updateWalletDto: UpdateWalletDto) {
    return `This action updates a #${id} wallet`;
  }

  remove(id: number) {
    return `This action removes a #${id} wallet`;
  }*/

  async createWalletAsset(createWalletAssetDto: CreateWalletAssetDto) {
    const session = await this.connection.startSession();

    await session.startTransaction();

    try {
      const docs = await this.walletAssetSchemma.create(
        [
          {
            wallet: createWalletAssetDto.walletId,
            asset: createWalletAssetDto.assetId,
            shares: createWalletAssetDto.shares,
          },
        ],
        { session },
      );

      const walletAsset = docs[0];

      await this.walletSchemma.updateOne(
        { _id: createWalletAssetDto.walletId },
        {
          $push: { assets: walletAsset._id },
        },
        { session },
      );

      await session.commitTransaction();
      return walletAsset;
    } catch (e) {
      console.error(e);
      await session.abortTransaction();
      throw e;
    } finally {
      await session.endSession();
    }
  }
}
