import { Inject, Service } from 'typedi';

@Service()
export class WordRepository {


    /**
     * @param id
     * 
     */
    async getOne(id: string, clubId: string | undefined) {
        // ...

    }

    /**
     * @param query
     */
    async getAll(query: any) {
        // ...
    }
}
