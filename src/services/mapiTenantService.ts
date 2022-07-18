import { TenantSettings } from "../contracts/tenantSettings";
import { IApiClient } from "../clients";
import ITenantService from "./ITenantService";

/**
 * A service for management operations with API Management tenant.
 */
export class MapiTenantService implements ITenantService {
    constructor(private readonly apiClient: IApiClient) { }

    /**
     * Returns tenant settings.
     */
    private async getSettings(): Promise<TenantSettings> {
        const result = await this.apiClient.get("/tenant/settings?api-version=2019-12-01", [await this.apiClient.getPortalHeader("getSettings")]);
        return result && result["settings"];
    }

    //TODO: Not implemented.
    public async getServiceSkuName(): Promise<string> {
        return "Developer";
    }

    public async isDelegationEnabled(): Promise<boolean> {
        const tenantSettings = await this.getSettings();
        return tenantSettings && tenantSettings["CustomPortalSettings.DelegationEnabled"] && tenantSettings["CustomPortalSettings.DelegationEnabled"].toLowerCase() === "true";
    }

    public async isSubscriptionDelegationEnabled(): Promise<boolean> {
        const tenantSettings = await this.getSettings();
        return tenantSettings["CustomPortalSettings.DelegatedSubscriptionEnabled"] && tenantSettings["CustomPortalSettings.DelegatedSubscriptionEnabled"].toLowerCase() === "true";
    }
}