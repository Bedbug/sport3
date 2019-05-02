import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';

import { User } from '../models/user';
import { Role } from '../models/role';
import { Contest } from '../models/contest';


@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const users: User[] = [
            { id: 1, username: 'admin', password: 'admin', firstName: 'Admin', lastName: 'User', role: Role.Admin },
            { id: 2, username: 'user', password: 'user', firstName: 'Normal', lastName: 'User', role: Role.User }
        ];

        const Contests: Contest[] = [
            {
                id: "5be2f82c135a3e1e2d4a6380",
                client: "5be2bfc7135a3e1e2d4a637f",
                promoImage: "https://s3-eu-west-1.amazonaws.com/sportimo-media/tournaments/tournament_test_screen.png",
                promoDetailImage: "https://www.beachsoccer.com/system/photos/1585/medium/burjalarab4web.jpg?1446463801",
                titleText: {
                    en: "MENA Clasicos"
                },
                infoText: {
                    "en": "50 Gold coins enter you into the MENA Clasicos tournament.\n Watch all games, play your cards right and win great prizes!\nBrought to you by MBC."
                },
                startFromDate: new Date("2018-08-10T00:00:00.000Z"),
                endToDate: new Date("2019-05-12T23:59:59.000Z"),
                state: "active",
                subscriptionPrice: 150,
                discountText: "12%",
                leaderboardDefinition: "5c04f54a135a3e1e2d4a6384",
                created: new Date("2018-11-07T14:30:00.000Z")
            },
            {
                id: "5be2f82c135a3e1e2d4a6380",
                client: "5be2bfc7135a3e1e2d4a637f",
                promoImage: "https://s3-eu-west-1.amazonaws.com/sportimo-media/tournaments/tournament_test_screen.png",
                promoDetailImage: "https://www.beachsoccer.com/system/photos/1585/medium/burjalarab4web.jpg?1446463801",
                titleText: {
                    en: "MENA Clasicos"
                },
                infoText: {
                    "en": "50 Gold coins enter you into the MENA Clasicos tournament.\n Watch all games, play your cards right and win great prizes!\nBrought to you by MBC."
                },
                startFromDate: new Date("2018-08-10T00:00:00.000Z"),
                endToDate: new Date("2019-05-12T23:59:59.000Z"),
                state: "active",
                subscriptionPrice: 150,
                discountText: "12%",
                leaderboardDefinition: "5c04f54a135a3e1e2d4a6384",
                created: new Date("2018-11-07T14:30:00.000Z")
            }

        ]

        const authHeader = request.headers.get('Authorization');
        const isLoggedIn = authHeader && authHeader.startsWith('Bearer fake-jwt-token');
        const roleString = isLoggedIn && authHeader.split('.')[1];
        const role = roleString ? Role[roleString] : null;

        // wrap in delayed observable to simulate server api call
        return of(null).pipe(mergeMap(() => {

            // authenticate - public
            if (request.url.endsWith('/users/authenticate') && request.method === 'POST') {
                const user = users.find(x => x.username === request.body.username && x.password === request.body.password);
                if (!user) return error('Username or password is incorrect');
                return ok({
                    id: user.id,
                    username: user.username,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    role: user.role,
                    token: `fake-jwt-token.${user.role}`
                });
            }

            // get user by id - admin or user (user can only access their own record)
            if (request.url.match(/\/users\/\d+$/) && request.method === 'GET') {
                if (!isLoggedIn) return unauthorised();

                // get id from request url
                let urlParts = request.url.split('/');
                let id = parseInt(urlParts[urlParts.length - 1]);

                // only allow normal users access to their own record
                const currentUser = users.find(x => x.role === role);
                if (id !== currentUser.id && role !== Role.Admin) return unauthorised();

                const user = users.find(x => x.id === id);
                return ok(user);
            }

            // get all users (admin only)
            if (request.url.endsWith('/users') && request.method === 'GET') {
                if (role !== Role.Admin) return unauthorised();
                return ok(users);
            }

            // get all contests (admin only)
            if (request.url.match(/contests/i) && request.method === 'GET') {
                // if (role !== Role.Admin) return unauthorised();
                return ok(Contests);
            }

            // pass through any requests not handled above
            return next.handle(request);
        }))
            // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
            .pipe(materialize())
            .pipe(delay(500))
            .pipe(dematerialize());

        // private helper functions

        function ok(body) {
            return of(new HttpResponse({ status: 200, body }));
        }

        function unauthorised() {
            return throwError({ status: 401, error: { message: 'Unauthorised' } });
        }

        function error(message) {
            return throwError({ status: 400, error: { message } });
        }
    }
}

export let fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};