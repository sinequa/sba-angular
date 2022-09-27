import { app, authentication } from "@microsoft/teams-js";
import { AuthenticationService } from "./authentication.service";

export function TeamsInitializer(authService: AuthenticationService): () => Promise<boolean> {

    const init = () => new Promise<boolean>((resolve, reject) => {
        if(!inIframe()) {
            return resolve(true);
        }

        app.initialize().then(() => {
            console.log("Teams initialized");
            return authentication.getAuthToken();
        }).then(result => {
            console.log("Teams auth token available");
            if(authService) {
                authService.teamsToken = result;
            }
            resolve(true);
        }).catch(error => {
            console.error("Failed to get an auth token for Teams", error);
            reject(error);
        });
    });

    return init;
}

export function inIframe() {
    try {
        return window.self !== window.top;
    } catch (e) {
        return true;
    }
}
