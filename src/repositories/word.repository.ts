import { Service } from 'typedi';
import WordModal from "../models/word";
import { Request } from 'express';
import { Types } from 'mongoose';

interface ICreatePayload {
    en: string
    arm: string
    group: Types.ObjectId
}

type ID = Types.ObjectId


@Service()
export class WordRepository {

    async create(payload: ICreatePayload) {
        return await WordModal.create(payload)
    }

    async findRandom() {
        return await WordModal.aggregate([
            { $sample: { size: 10 } }
        ]);
    }

    async findAll() {
        return await WordModal.find()
    }

    async findAllByGroup(groupId: ID) {
        return await WordModal.find({ group: groupId })
    }

    async findByName(req: Request) {
        return await WordModal.find({ $or: [{ 'en': { $regex: req.body.en } }] })
    }

    async isExist(req: Request) {
        return await WordModal
            .find({ $or: [{ 'en': req.body.en }, { 'arm': req.body.arm }] })
            .find({ $or: [{ 'en': { $regex: req.body.en } }, { 'arm': { $regex: req.body.arm } }] })
    }

    async findById(id: ID) {
        return await WordModal.findById(id)
    }

    // async findByIdAndUpdate(id: ID, req: Request) {
    //     return await WordModal.findById(id)
    //     // return await WordModal
    //     //     .findOneAndUpdate({
    //     //         $or: [{ 'en': req.body.find.en }, { 'arm': req.body.find.arm }]
    //     //     }, req.body.update)
    // }

    async deleteById(id: ID) {
        return await WordModal.findByIdAndDelete(id)
    }

    async findOneAndDelete(req: Request) {
        return await WordModal
            .findOneAndDelete({ $or: [{ 'en': req.body.en }, { 'arm': req.body.arm }] })
    }

    async deleteAll() {
        return await WordModal.remove({})
    }
}
