import AUTODATAConnector from '../connectors/autodata'

export default class BaseModel {
  protected connector: AUTODATAConnector

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
