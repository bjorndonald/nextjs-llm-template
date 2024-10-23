import { Collection, DataAPIClient, Db, VectorDoc } from "@datastax/astra-db-ts";
import { embeddings } from "@/lib/embedding";
import { Document } from "langchain/document";
import { BaseRetriever, BaseRetrieverInput } from "@langchain/core/retrievers";
import { BaseCallbackConfig, CallbackManagerForRetrieverRun, Callbacks } from "@langchain/core/callbacks/manager";
import { DocumentInterface } from "@langchain/core/documents";

interface Project extends VectorDoc {
    text: string,
    doc: string
}

export interface CustomRetrieverInput extends BaseRetrieverInput { }

export class CustomRetriever extends BaseRetriever {
    lc_namespace = ["default_keyspace"];
    private collection: Collection<Project>

    constructor(collection:Collection<Project>, fields?: CustomRetrieverInput) {
        super(fields);
        this.collection = collection
    }

    async similaritySearchVectorWithScore(query: string, k: number, filter: any) {
        if (!this.collection) {
            throw new Error("Must connect to a collection before adding vectors");
        }
       
        const cursor = await this.collection.find(filter ?? {}, {
            limit: k,
            
            includeSimilarity: true,
        });

        const results = [];
        for await (const row of cursor) {
            const { $similarity: similarity, text: content, ...metadata } = row;
            const doc = new Document({
                pageContent: content,
                metadata,
            });
            results.push([doc, similarity]);
        }
        return results;
    }

    async similaritySearch(query: string, k = 50, filter: any = undefined
    ) {
        const results = await this.similaritySearchVectorWithScore(query, k, filter);
        return results.map((result) => result[0]);
    }

    async _getRelevantDocuments(
        query: string,
        runManager?: CallbackManagerForRetrieverRun
    ) {
        try {
            return this.similaritySearch(query, 4, {},) as Promise<DocumentInterface<Record<string, any>>[]>

        } catch (error) {
            throw error
        }
        
    }
}

export default class AstraService {
    private collection: Collection<Project>

    static from = async () => {
        const client = new DataAPIClient(process.env.ASTRA_DB_APPLICATION_TOKEN);
        const dbClient = client.db(process.env.ASTRA_DB_ENDPOINT!);
        dbClient.listCollections({nameOnly: true})
        var collection: Collection<Project>
        const collectionNames = await dbClient.listCollections({ nameOnly: true, keyspace: 'default_keyspace' });
        const collectionName = `documents`
        if (collectionNames.includes(collectionName)){
            collection = await dbClient.collection<Project>(collectionName, {
                keyspace: "default_keyspace"
            })
        } else {
            collection = await dbClient.createCollection<Project>(collectionName, {
                vector: {
                    dimension: 1536,
                    metric: 'cosine',
                    service: {
                        provider: 'openai',
                        modelName: 'text-embedding-3-small',
                        authentication: {
                            providerKey: "OPEN_AI_KEY",
                        },
                    },
                },
                keyspace: 'default_keyspace',
                checkExists: false,
            });
        }
       
        return new AstraService(collection)
    }

    constructor(collection: Collection<Project>) { 
        this.collection = collection
    }

    addDocuments = async (docs: Document<Record<string, any>>[], doc: string) => {
        try {
            const vectors = await embeddings.embedDocuments(docs.map(x => x.pageContent))
            const documents = vectors.map((x, i)=> {
                return {
                    text: docs[i].pageContent,
                    doc,
                }
            })

            const inserted = await this.collection?.insertMany(documents);
            return inserted
        } catch (error) {
            throw error
        }
    }

    getRetriever = async () => {
        const retriever = new CustomRetriever(this.collection!)
        
        return retriever
    }

    getDocRetriever = async (doc: string, project: string) => {
        const cursor = await this.collection?.find({
            $and: [
                { doc: doc, project: project }
            ]
        }, {
            limit: 50
        });

        const texts: {text: string, id: string}[] = []

        for await (const doc of cursor) {
            texts.push({
                text:doc.text,
                id: doc._id as string
            })
        }

        return texts
    }

    deleteDoc = async (doc: string) => {
        await this.collection.deleteMany({ doc });
    }

}