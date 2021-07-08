declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
import WebtrekkSmartpixelVue from "../src/index";
import * as wtSmart from "./../../core";

declare interface DataObject {
    [i: number]: string;
}

declare type WebtrekkInitCookie = "1" | "3";

declare type WebtrekkProductStatus =
    | "view"
    | "list"
    | "basket"
    | "confirmation";

declare type WebtrekkTeaserType = "view" | "click" | "product";

declare type WebtrekkTeaserGoal = "order" | "goal" | "both";

declare type WebtrekkContentEngagementSendContentEngagement = 0 | 1 | 2;

declare interface WebtrekkInitProps {
    trackId: string;
    trackDomain: string;
    domain?: string[];
    cookie?: WebtrekkInitCookie;
}

declare interface WebtrekkAdvancedProps {
    secureCookie?: boolean;
    optOutName?: string;
    requestObfuscation?: boolean;
    execCDB?: boolean;
    useCDBCache?: boolean;
    sendViaSDK?: boolean;
    sendViaServer?: {
        activated?: boolean;
        serverDomain?: string;
        serverPath?: string;
        droppedRequests?: number;
        blacklist?: string[];
    };
    useHashForDefaultPageName?: boolean;
    useParamsForDefaultPageName?: string[];
    requestQueue?: {
        activated?: boolean;
        ttl?: number;
        resendInterval?: number;
        size?: number;
    };
    userIdentification?: {
        enableOptOut?: boolean;
        enableAnonymousFunction?: boolean;
        anonymousOptIn?: boolean;
        optOutCookieName?: string;
        anonymousCookieName?: string;
        suppressParameter?: string[];
    };
}

declare interface WebtrekkCampaignProps {
    id: string;
    mediaCode?: string[];
    oncePerSession?: boolean;
    parameter?: DataObject;
}

declare interface WebtrekkCustomerProps {
    id: string;
    email?: string;
    emailRID?: string;
    emailOptin?: boolean;
    firstName?: string;
    lastName?: string;
    telephone?: string;
    gender?: number;
    birthday?: string;
    country?: string;
    city?: string;
    postalCode?: string;
    street?: string;
    streetNumber?: string;
    validation?: boolean;
    category?: DataObject;
}

declare interface WebtrekkOrderProps {
    value: number;
    id?: string;
    currency?: string;
    couponValue?: number;
    paymentMethod?: string;
    shippingService?: string;
    shippingSpeed?: string;
    shippingCosts?: number;
    grossMargin?: number;
    orderStatus?: string;
    parameter?: DataObject;
}

declare interface WebtrekkPageProps {
    name?: string;
    search?: string;
    numberSearchResults?: number;
    errorMessages?: string;
    paywall?: boolean;
    articleTitle?: string;
    contentTags?: string;
    title?: string;
    type?: string;
    length?: string;
    daysSincePublication?: number;
    testVariant?: string;
    testExperiment?: string;
    parameter?: DataObject;
    category?: DataObject;
    goal?: DataObject;
}

declare interface WebtrekkActionProps {
    name: string;
    parameter?: DataObject;
    goal?: DataObject;
}

declare interface WebtrekkProductProps {
    id: string;
    action?: WebtrekkProductStatus;
    cost?: number;
    quantity?: number;
    variant?: string;
    soldOut?: boolean;
    parameter?: DataObject;
    category?: DataObject;
}

declare interface WebtrekkSessionProps {
    loginStatus: string;
    parameter: DataObject;
}

declare interface WebtrekkTeaserProps {
    selector?: string | HTMLElement;
    name: string;
    rank?: string;
    content?: string;
    variant?: string;
    seen?: boolean;
    type?: WebtrekkTeaserType;
    goal?: WebtrekkTeaserGoal;
    value?: string;
}

declare interface WebtrekkTeaserConfig {
    viewPercent?: number;
    viewTime?: number;
    attribution?: "first" | "last" | "all";
    maxSendTeasers?: {
        session?: number;
        page?: number;
    };
    clearConversions?: boolean;
    autoEngagements?: boolean;
}

declare interface WebtrekkProductListConfig {
    viewPercent?: number;
    viewTime?: number;
    sampling?: number;
    maxSendProducts?: {
        session?: number;
        page?: number;
    };
    sendMultipleProductViews?: boolean;
}

declare interface WebtrekkContentEngagementConfig {
    percentageStepsInAnalytics?: number;
    sendContentEngagement?: 0 | 1 | 2;
    percentageReached?: number;
    secondsReached?: number;
    largeBrowserResolution?: number;
    largeBrowserSeconds?: number;
    mediumBrowserResolution?: number;
    mediumBrowserSeconds?: number;
    smallBrowserResolution?: number;
    smallBrowserSeconds?: number;
}

declare interface WebtrekkProductListProps {
    selector?: string | HTMLElement;
    id: string;
    position: number;
    cost?: number;
    quantity?: number;
    variant?: string;
    soldOut?: boolean;
    category?: DataObject;
    parameter?: DataObject;
}

declare interface WebtrekkContentEngagementProps {
    selector: string | HTMLElement;
    name: string;
    percentageStepsInAnalytics: number;
    sendContentEngagement: WebtrekkContentEngagementSendContentEngagement;
    percentageReached: number;
    secondsReached: number;
    largeBrowserResolution: number;
    largeBrowserSeconds: number;
    mediumBrowserResolution: number;
    mediumBrowserSeconds: number;
    smallBrowserResolution: number;
    smallBrowserSeconds: number;
}

interface Webtrekk {
    deactivateAutoTracking: boolean;
    call: (call: (wtSmart: wtSmart) => void) => void;
    init: (data: WebtrekkInitProps) => void;
    advanced: (data: WebtrekkAdvancedProps) => void;
    page: (name: string, data?: WebtrekkPageProps) => void;
    action: (data: WebtrekkActionProps) => void;
    session: (data: WebtrekkSessionProps) => void;
    campaign: (data: WebtrekkCampaignProps) => void;
    customer: (
        id: string,
        data?: WebtrekkCustomerProps,
        validation?: boolean
    ) => void;
    product: (
        action: WebtrekkProductStatus,
        data: WebtrekkProductProps
    ) => void;
    products: (
        action: WebtrekkProductStatus,
        data: WebtrekkProductProps[]
    ) => void;
    order: (data: WebtrekkOrderProps) => void;
    extension: (
        extension: string,
        action?: string,
        config?: { [key: string]: any }
    ) => void;
    track: (keepData?: boolean) => void;
    trackPage: (keepData?: boolean) => void;
    trackAction: (keepData?: boolean) => void;
    clear: () => void;
}

declare module "@vue/runtime-core" {
    interface ComponentCustomProperties {
        $webtrekk: Webtrekk;
    }
}

export default WebtrekkSmartpixelVue;