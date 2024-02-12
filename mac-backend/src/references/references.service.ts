import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateReferenceDto } from './dto/create-reference.dto';
import { UpdateReferenceDto } from './dto/update-reference.dto';
import { Reference, ReferenceDocument } from './references.schema';

@Injectable()
export class ReferencesService {
  constructor(
    @InjectModel(Reference.name)
    private referenceModel: Model<ReferenceDocument>,
  ) {}

  async create(createReferenceDto: CreateReferenceDto): Promise<Reference> {
    const newReference = new this.referenceModel(createReferenceDto);
    return newReference.save();
  }

  async findAll(): Promise<Reference[]> {
    return this.referenceModel.find().exec();
  }

  async findOne(id: string): Promise<Reference> {
    return this.referenceModel.findById(id).exec();
  }

  async update(
    id: string,
    updateReferenceDto: UpdateReferenceDto,
  ): Promise<Reference> {
    return this.referenceModel
      .findByIdAndUpdate(id, updateReferenceDto, { new: true })
      .exec();
  }

  async remove(id: string): Promise<Reference> {
    return this.referenceModel.findByIdAndDelete(id).exec();
  }
}