import { Service } from 'typedi';
import WordModal from "../models/word";

@Service()
export class WordRepository {

    async create(body: any) {
        return await WordModal.create(body)
    }

    async findAll() {
        return await WordModal.find()
    }

    async findAllByGroup({ groupId }: any) {
        return await WordModal.find({ group: groupId })
    }

    async findByName(req: any) {
        return await WordModal.find({ $or: [{ 'en': { $regex: req.body.en } }] })
    }

    async isExist(req: any) {
        return await WordModal
            .find({ $or: [{ 'en': req.body.en }, { 'arm': req.body.arm }] })
            .find({ $or: [{ 'en': { $regex: req.body.en } }, { 'arm': { $regex: req.body.arm } }] })
    }

    async findOneAndUpdate(req: any) {
        return await WordModal
            .findOneAndUpdate({
                $or: [{ 'en': req.body.find.en }, { 'arm': req.body.find.arm }]
            }, req.body.update)
    }

    async findOneAndDelete(req: any) {
        return await WordModal
            .findOneAndDelete({ $or: [{ 'en': req.body.en }, { 'arm': req.body.arm }] })
    }
}
