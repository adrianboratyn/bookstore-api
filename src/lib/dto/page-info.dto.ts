import { PageDtoParameters } from 'lib/interface'

export class PageInfoDto {
    page: number
    limit: number
    itemCount: number
    pageCount: number
    hasPreviousPage: boolean
    hasNextPage: boolean

    constructor({ pageOptionsDto, itemCount }: PageDtoParameters) {
        this.page = pageOptionsDto.page
        this.limit = pageOptionsDto.limit
        this.itemCount = itemCount
        this.pageCount = Math.ceil(this.itemCount / this.limit)
        this.hasPreviousPage = this.page > 1
        this.hasNextPage = this.page < this.pageCount
    }
}
