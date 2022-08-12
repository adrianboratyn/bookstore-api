import { PageInfoDto } from './page-info.dto'

export class PageDto<T> {
    data: Array<T>
    info: PageInfoDto

    constructor(data: Array<T>, info: PageInfoDto) {
        this.data = data
        this.info = info
    }
}
