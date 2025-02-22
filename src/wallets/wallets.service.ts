import { Injectable } from '@nestjs/common';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Wallet } from './entities/wallet.entity';
import { Model } from 'mongoose';

@Injectable()
export class WalletsService {
  constructor(@InjectModel(Wallet.name) private walletSchemma: Model<Wallet>) {}

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
}
