import { app, authentication } from "@microsoft/teams-js";
import { AuthenticationService } from "./authentication.service";

export function TeamsInitializer(authService: AuthenticationService): () => Promise<boolean> {

    const init = () => new Promise<boolean>((resolve, reject) => {
        if(!inIframe()) {
            return resolve(true);
        }

        console.log("Teams init", app);
        app.initialize().then(() => {
            console.log("teams initialized");
            return authentication.getAuthToken();
        }).then(result => {
            console.log("success callback:", result);
            if(authService) {
                authService.teamsToken = result;
            }
            resolve(true);
        }).catch(error => {
            console.error("failure callback:", error);
            reject(error);
        });
        app.getContext().then(context => console.log("Context",context));
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
