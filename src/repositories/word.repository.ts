import { Service } from 'typedi';
import WordModal from "../models/word";
import { Request } from 'express';
import { Types } from 'mongoose';

interface ICreatePayload {
    en: string
    arm: string
    group: Types.ObjectId
}

type GroupId = Types.ObjectId


@Service()
export class WordRepository {

    async create(payload: ICreatePayload) {
        return await WordModal.create(payload)
    }

    async findAll() {
        return await WordModal.find()
    }

    async findAllByGroup(groupId: GroupId) {
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

    async findOneAndUpdate(req: Request) {
        return await WordModal
            .findOneAndUpdate({
                $or: [{ 'en': req.body.find.en }, { 'arm': req.body.find.arm }]
            }, req.body.update)
    }

    async findOneAndDelete(req: Request) {
        return await WordModal
            .findOneAndDelete({ $or: [{ 'en': req.body.en }, { 'arm': req.body.arm }] })
    }
}
