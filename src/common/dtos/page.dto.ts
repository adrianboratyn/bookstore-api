import { PageInfoDto } from './page-info.dto';

export class PageDto<T> {
  data: T[];
  info: PageInfoDto;

  constructor(data: T[], info: PageInfoDto) {
    this.data = data;
    this.info = info;
  }
}
