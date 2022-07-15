import { Sequelize } from "sequelize-typescript";
import Id from "../../@shared/domain/value-object/id.value-object";
import Product from "../domain/product.entity";
import ProductModel from "./product.model";
import ProductRepository from "./product.repository";

describe("ProductRepository test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("Should create a product", async () => {
    const productProps = {
      id: new Id("1"),
      name: "Product 1",
      description: "Description 1",
      purchasePrice: 100,
      stock: 10,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const product = new Product(productProps);
    const productRepository = new ProductRepository();
    await productRepository.add(product);

    const productDb = await ProductModel.findOne({
      where: { id: productProps.id.id },
    });

    expect(productProps.id.id).toEqual(productDb.id);
    expect(productProps.name).toEqual(productDb.name);
    expect(productProps.description).toEqual(productDb.description);
    expect(productProps.purchasePrice).toEqual(productDb.purchasePrice);
    expect(productProps.stock).toEqual(productDb.stock);
  });

  it("Should find a product", async () => {
    const productRepository = new ProductRepository();

    ProductModel.create({
      id: "2",
      name: "Product 2",
      description: "Description 2",
      purchasePrice: 150,
      stock: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    const product = await productRepository.find("2");

    expect(product.id.id).toEqual("2");
    expect(product.name).toEqual("Product 2");
    expect(product.description).toEqual("Description 2");
    expect(product.purchasePrice).toEqual(150);
    expect(product.stock).toEqual(1);
  });
});
