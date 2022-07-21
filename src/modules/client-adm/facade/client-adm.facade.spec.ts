import { Sequelize } from "sequelize-typescript";
import ClientAdmFacadeFactory from "../factory/client-adm.facade.factory";
import { ClientModel } from "../repository/client.model";
import ClientRepository from "../repository/client.repository";
import AddClientUseCase from "../usecase/add-client/add-client.usecase";
import ClientAdmFacade from "./client-adm.facade";

describe("ClientAdmFacade Test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([ClientModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a client", async () => {
    const repository = new ClientRepository();
    const addusecase = new AddClientUseCase(repository);
    const facade = new ClientAdmFacade({
      AddUseCase: addusecase,
      FindUseCase: undefined,
    });

    const input = {
      id: "1",
      name: "Client 1",
      email: "client1@email.com",
      address: "address 1",
    };

    await facade.add(input);
    const client = await ClientModel.findOne({ where: { id: "1" } });
    expect(client).toBeDefined();
    expect(client.id).toBe(input.id);
    expect(client.name).toEqual(input.name);
    expect(client.email).toEqual(input.email);
    expect(client.address).toEqual(input.address);
  });

  it("Should find a client", async () => {
    const facade = ClientAdmFacadeFactory.create();

    const input = {
      id: "1",
      name: "Client 1",
      email: "client1@email.com",
      address: "address 1",
    };

    await facade.add(input);
    const client = await facade.find({ id: input.id });
    expect(client).toBeDefined();
    expect(client.id).toBe(input.id);
    expect(client.name).toEqual(input.name);
    expect(client.email).toEqual(input.email);
    expect(client.address).toEqual(input.address);
  });
});
