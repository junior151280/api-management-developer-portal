import { ViewManager } from "@paperbits/common/ui";
import { IWidgetService } from "@paperbits/common/widgets";
import { IInjectorModule, IInjector } from "@paperbits/common/injection";
import { MapiBlobStorage } from "../../persistence";
import { ContentWorkshop } from "./customWidgetList";
import { OperationsSectionToolButton } from "./operationsSection";
import { CreateWidget } from "./createWidget";
import { loadCustomWidgetConfigs } from "./loadCustomWidgetConfigs";
import { CustomWidgetHandlers } from "../custom-widget";

export class CustomWidgetListModule implements IInjectorModule {
    public register(injector: IInjector): void {
        injector.bind("customWidgetWorkshop", ContentWorkshop);
        injector.bind("createWidgetWorkshop", CreateWidget);
        injector.bindToCollection("workshopSections", OperationsSectionToolButton);

        const blobStorage = injector.resolve<MapiBlobStorage>("blobStorage");
        const viewManager = injector.resolve<ViewManager>("viewManager");
        const configsPromise = loadCustomWidgetConfigs(blobStorage, viewManager);
        injector.bindInstance("customWidgetConfigs", configsPromise);
        const widgetService = injector.resolve<IWidgetService>("widgetService");
        configsPromise.then(configs => configs.forEach(config =>
            widgetService.registerWidgetHandler(new CustomWidgetHandlers(config))
        ));
    }
}