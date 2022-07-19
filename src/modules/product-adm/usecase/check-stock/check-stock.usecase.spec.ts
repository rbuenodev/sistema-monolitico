import Id from "../../../@shared/domain/value-object/id.value-object";
import Product from "../../domain/product.entity";
import CheckStockUsecase from "./check-stock.usecase";

const product = new Product({
  id: new Id("1"),
  name: "Product",
  description: "Product description",
  purchasePrice: 100,
  stock: 10,
});

const MockRepository = () => {
  return {
    add: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(product)),
  };
};

describe("CheckStockUsecase unit test", () => {
  it("should get stock of a product", async () => {
    const productRepository = MockRepository();
    const checkStockUseCase = new CheckStockUsecase(productRepository);
    const input = { id: "1" };

    const result = await checkStockUseCase.execute({ productId: "1" });
    expect(productRepository.find).toHaveBeenCalled();
    expect(result.productId).toEqual(input.id);
    expect(result.stock).toBe(10);
  });
});
