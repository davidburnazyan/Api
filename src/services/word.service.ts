import { Service, Inject } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { WordRepository } from '../repositories/word.repository';
// import { Security } from '../modules/security';

@Service()
export class MemberService {

    /**
     * 
     * @param wordRepository
     * @param security
     * 
     */

    constructor(
        @InjectRepository() private readonly wordRepository: WordRepository,
        // @Inject() private security: Security,
    ) {
    }

    /**
     * @param query
     */
    async getAll(query: any) {
        const result = await this.wordRepository.getAll(query);

        console.log(result, '------result-------getAll');
        // return { data, total: result[1] };
    }
}
