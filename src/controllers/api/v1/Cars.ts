
import Base from './Base'

class Cars extends Base {
  public async carsList() {
    return [];
  }

  initRoutes(): Base {
    this.router.get(`${Cars.prefix}/cars`)
    return this;
  }

}
