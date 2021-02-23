import {Injectable, OnDestroy} from "@angular/core";
import {IntlService} from "@sinequa/core/intl";
import {NotificationsService} from "@sinequa/core/notification";
import {Subject} from "rxjs";

// eslint-disable-next-line no-var
declare var webkitSpeechRecognition: any;

@Injectable({
  providedIn: "root"
})
export class VoiceRecognitionService implements OnDestroy {
  recognition;
  recognizing = false;
  ignore_onend = false;
  start_timestamp;

  text = new Subject<string>();
  started = new Subject<boolean>();
  available = false;

  constructor(
    private intlService: IntlService,
    private notify: NotificationsService
  ) {}

  init() {
    this.intlService.events.subscribe(() => {
      this.recognition.lang = this.intlService.currentLocale.data?.intl.locale;
    }
    );

    try {
      this.recognition = new webkitSpeechRecognition();
      this.recognition.continuous = false;
      this.recognition.interimResults = true;
      this.recognition.lang = this.intlService.currentLocale.data?.intl.locale;

      this.recognition.addEventListener("error", this.onError);
      this.recognition.addEventListener("result", this.onResult);
      this.recognition.addEventListener("start", this.onStart);
      this.recognition.addEventListener("end", this.onEnd);
      this.available = true;
    } catch (error) {
      this.available = false;
    }
  }

  ngOnDestroy() {
    this.recognition.removeEventListener("error", this.onError);
    this.recognition.removeEventListener("result", this.onResult);
    this.recognition.removeEventListener("start", this.onStart);
    this.recognition.removeEventListener("end", this.onEnd);
  }

  start() {
    if (this.recognizing) {
      this.stop();
      return;
    }

    this.text.next("");
    this.started.next(true);
    this.recognition.start();
  }

  stop() {
    this.recognition.stop();
    this.started.next(false);
  }

  toggleRecognition() {
    if (this.recognizing) {
      this.stop();
    } else {
      this.start();
    }
  }

  private onResult = e => {
    const transcript = Array.from(e.results)
      .map((result: any) => result[0])
      .map(result => result.transcript)
      .join("");

    this.text.next(transcript);
  };

  private onStart = event => {
    this.recognizing = true;
    this.start_timestamp = event.timeStamp;
  };

  private onEnd = () => {
    if (this.ignore_onend) {
      return;
    }
    this.recognizing = false;
    this.started.next(false);
  };

  private onError = event => {
    let message: string = event.error;
    switch (event.error) {
      case "no-speech": {
        message = "No speech was detected.";
        break;
      }
      case "audio-capture": {
        message = "Audio capture failed.";
        break;
      }
      case "not-allowed": {
        if (event.timeStamp - this.start_timestamp < 100) {
          message = "info_blocked";
        } else {
          message = "The user agent is not allowing any speech input to occur for reasons of security, privacy or user preference.";
        }
        break;
      }
      case "aborted": {
        message = "Speech input was aborted somehow, maybe by some user-agent-specific behavior such as UI that lets the user cancel speech input."
        break;
      };
      case "network": {
        message = "Some network communication that was required to complete the recognition failed.";
        break;
      }
      case "service-not-allowed": {
        message = "The user agent is not allowing the web application requested speech service, but would allow some speech service, to be used either because the user agent doesn’t support the selected one or because of reasons of security, privacy or user preference.";
        break;
      }
      case "bad-grammar": {
        message = "There was an error in the speech recognition grammar or semantic tags, or the grammar format or semantic tag format is unsupported.";
        break;
      }
      case "language-not-supported": {
        message = `The language [${this.recognition.lang}] was not supported.`;
        this.recognition.lang = "en-US";
        break;
      }
    }
    this.notify.warning(message);
    this.ignore_onend = true;
    this.started.next(false);
  };
}

export module VoiceRecognitionService {}