import { Contract } from "@paperbits/common";
import { IModelBinder } from "@paperbits/common/editing";
import { SigninModel } from "./signinModel";
import { SigninContract } from "./signinContract";


const nodeType = "signin";
const oldNodeType = "userSignin";

export class SigninModelBinder implements IModelBinder<SigninModel> {
    public canHandleModel(model: Object): boolean {
        return model instanceof SigninModel;
    }

    public async contractToModel(contract: SigninContract): Promise<SigninModel> {
        const model = new SigninModel();
        model.styles = contract.styles || {};

        return model;
    }

    public canHandleContract(contract: Contract): boolean {
        return contract.type === nodeType || contract.type === oldNodeType;
    }

    public modelToContract(model: SigninModel): Contract {
        const contract: SigninContract = {
            type: nodeType,
            styles: model.styles
        };

        return contract;
    }
}
