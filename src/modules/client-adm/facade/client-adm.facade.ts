import UseCaseInterface from "../../@shared/usecase/usecase.interface";
import ClientAdmFacadeInterface, {
  AddClientFacadeInputDto,
  FindClientFacadeInputDto,
  FindClientFacadeOutputDto,
} from "./client-adm.facade.interface";

export interface UseCaseProps {
  FindUseCase: UseCaseInterface;
  AddUseCase: UseCaseInterface;
}
export default class ClientAdmFacade implements ClientAdmFacadeInterface {
  private _findUseCase: UseCaseInterface;
  private _addUseCase: UseCaseInterface;

  constructor(useCaseProps: UseCaseProps) {
    this._findUseCase = useCaseProps.FindUseCase;
    this._addUseCase = useCaseProps.AddUseCase;
  }

  async add(input: AddClientFacadeInputDto): Promise<void> {
    await this._addUseCase.execute(input);
  }
  async find(
    input: FindClientFacadeInputDto
  ): Promise<FindClientFacadeOutputDto> {
    return await this._findUseCase.execute(input);
  }
}
