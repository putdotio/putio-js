import PutioAPIClient from "../index";

export default class User {
  private client: PutioAPIClient;

  constructor(client: PutioAPIClient) {
    this.client = client;
  }

  public Info(params: any) {
    return this.client.get("/account/info", {
      params
    });
  }

  public Settings() {
    return this.client.get("/account/settings");
  }

  public SaveSettings(settings: object) {
    return this.client.post("/account/settings", {
      data: settings
    });
  }

  public Config() {
    return this.client.get("/config");
  }

  public SaveConfig(config: object) {
    return this.client.put("/config", {
      data: { config }
    });
  }

  public ClearData(data = {}) {
    return this.client.post("/account/clear", {
      data
    });
  }

  public Destroy(password: string) {
    return this.client.post("/account/destroy", {
      data: {
        current_password: password
      }
    });
  }
}
