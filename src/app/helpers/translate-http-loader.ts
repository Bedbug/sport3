import { HttpClient } from '@angular/common/http';

import { TranslateLoader } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface TranslateHttpOptions {
	prefix?: string;
	suffix?: string;
	useKeyForEmptyTranslations?: boolean;
}

const defaultOptions: TranslateHttpOptions = {
	prefix: '/assets/i18n/',
	suffix: '.json',
	useKeyForEmptyTranslations: true
};

export class TranslateHttpLoader implements TranslateLoader {

	public constructor(protected http: HttpClient, protected options?: TranslateHttpOptions) {
		this.options = { ...defaultOptions, ...options };
	}

	public getTranslation(lang: string): Observable<Object> {
		return this.http.get(`${this.options.prefix}${lang}${this.options.suffix}`).pipe(
			map(translations => {
				if (this.options.useKeyForEmptyTranslations) {
					Object.keys(translations).forEach(key => {
						if (key.length && !translations[key].length) {
							translations[key] = "__"+key;
						}else{
							translations[key] = "__"+translations[key];
						}
					});
				}
				return translations;
			})
		);
	}
}