import { nanoid } from 'nanoid'
import { IsString,  Length, validate} from 'class-validator'

export class UrlIdentifier {
    @IsString()
    @Length(7,7)
    private _urlIdentifier: string

    private constructor(value:string) {
        this._urlIdentifier = value
    }

    public static generateUrlIdentifer(): UrlIdentifier {
        const urlIdentifer = nanoid(7)
        return new this(urlIdentifer)
    }

    public static async createFrom(urlIdentifer: string): Promise<UrlIdentifier> {
        const newObject =  new this(urlIdentifer)
        const validationErrors = await validate(newObject)
        if(validationErrors.length > 0) {
            throw Error(`Validation error ${JSON.stringify(validationErrors)}`)
        }
        return newObject
    }

    get urlIdentifier(): string {
        return this._urlIdentifier
    }

    public equals(urlIdentifier: UrlIdentifier): boolean {
        return this._urlIdentifier === urlIdentifier._urlIdentifier
    }
}