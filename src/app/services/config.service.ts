import { Injectable, APP_INITIALIZER } from '@angular/core';

import { Observable, Subject, BehaviorSubject } from 'rxjs';

import { environment } from '../../environments/environment'; //path to your environment files
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ConfigService {

    private _config: Object
    private _env: string;
    inited:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    
    constructor(private _http: HttpClient) { }

    load() {
        return new Promise((resolve, reject) => {
            this._env = 'development';
// Initially this._env was notified by the build configuration env			
//            if (environment.production)
// It is changed so as to be notified by the current NODE_ENV environmental variable (set in a Heroku app)
// so that we can have both a dev and a prod deployments in the same heroku pipeline.
            if (process.env.NODE_ENV === 'production')
                this._env = 'production';

            this._http.get('assets/config/' + this._env + '.json')               
                .subscribe((data) => {
                    // this._config = data.json();
                    this._config = data;
                    this.inited.next(true);
                    resolve(true);
                },
                (error: any) => {
                    console.error(error);
                    return Observable.throw(error.json().error || 'Server error');
                });
        });
    }
    // Is app in the development mode?
    isDevmode() {
        return this._env === 'development';
    }
    getClient(): string {
        return this._config["CLIENT_ID"];
    }
    // Gets API route based on the provided key
    getApi(key: string): string {
        return this._config["API_ENDPOINTS"][key];
    }
    // Gets a value of specified property in the configuration file
    get(key: any) {
        return this._config[key];
    }
}

export function ConfigFactory(config: ConfigService) {
    return () => config.load();
}

export function init() {
    return {
        provide: APP_INITIALIZER,
        useFactory: ConfigFactory,
        deps: [ConfigService],
        multi: true
    }
}

const ConfigModule = {
    init: init
}

export { ConfigModule };