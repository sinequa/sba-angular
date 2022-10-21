import { app, authentication } from "@microsoft/teams-js";
import { AuthenticationService } from "./authentication.service";

export function TeamsInitializer(authService: AuthenticationService): () => Promise<void> {
    return async () => {
        if(!inIframe()) {
            return Promise.resolve();
        }

        return app.initialize().then(() => {
            console.log("Teams initialized");
            return authentication.getAuthToken();
        }).then(result => {
            console.log("Teams auth token available");
            if(authService) {
                authService.isTeams = true;
            }
        }).catch(error => {
            console.error("Failed to get an auth token for Teams", error);
        });
    };
}

export function inIframe() {
    try {
        return window.self !== window.top;
    } catch (e) {
        return true;
    }
}
