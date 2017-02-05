/**
 * Created by Sif on 2/4/17.
 */
import GOOGLEConnector from '../connectors/swapi'

export default class BaseModel {
  protected connector: GOOGLEConnector

  constructor(connector) {
    this.connector = connector
  }

  public getConnections(urls: Array<string>) {
    return this.connector.loader.loadMany(urls)
  }
  public getConnection(url: string) {
    return this.connector.loader.load(url)
  }
}
