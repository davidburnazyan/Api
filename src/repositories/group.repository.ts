import { Inject, Service } from 'typedi';
import group from "../models/group";

@Service()
export class GroupRepository {

    async findLastOne() {
        return await group.findOne().limit(1).sort({ $natural: -1 })
    }

    async create({ name }: any) {
        return await group.create({ name })
    }

    async countDocuments() {
        return await group.countDocuments()
    }

}
