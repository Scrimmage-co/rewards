import {GameEventType, ScrimmageBaseApiTagType} from "@scrimmage/schemas";

export interface WebsocketUpdatesApi {
    subscribeOnRefreshEvents(callback: (tags: ScrimmageBaseApiTagType[]) => void) : void;
    subscribeOnGameEvents(callback: (events: GameEventType[]) => void) : void;
}