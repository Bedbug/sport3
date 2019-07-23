import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';

import { User } from '../models/user';
import { Role } from '../models/role';
import { Contest } from '../models/contest';
import { GrandPrize } from '../models/grand-prize';
import { Subscription } from '../models/subscription';


@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // const users: User[] = [
        //     { _id: "1", username: 'admin', password: 'admin', firstName: 'Admin', lastName: 'User', role: Role.Admin },
        //     { _id: "2", username: 'user', password: 'user', firstName: 'Normal', lastName: 'User', role: Role.User }
        // ];

        const Contests: Contest[] = [
            {
                _id: "5be2f82c135a3e1e2d4a6380",
                client: "5be2bfc7135a3e1e2d4a637f",
                promoImage: "./assets/images/prize-promoImage.png",
                promoDetailImage: "./assets/images/contest-bg2.png",
                matches: 3,
                participations: 15000,
                winners: 3,
                titleText: {
                    en: "MENA Clasicos"
                },
                infoText: {
                    "en": "<h4>Lorem ipsum dolor sit amet consectetuer adipiscing elit</h4><p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa <strong>strong</strong>. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede <a class='external ext' href='#'>link</a> mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi.</p><h4>Lorem ipsum dolor sit amet consectetuer adipiscing elit</h4><blockquote>Lorem ipsum dolor sit amet, consectetuer                     adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa <strong>strong</strong>. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequatmassa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In <em>em</em> enim justo, rhoncus ut, imperdiet a, venenatis vitae,                     justo. Nullam <a class='external ext' href='#'>link</a>dictum felis eu pede mollis pretium.</blockquote><h2>Aenean commodo ligula eget dolor aenean massa</h2><p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.                     Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.</p><h2>Aenean commodo ligula eget dolor aenean massa</h2><p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.</p><ul>  <li>Lorem ipsum dolor sit amet consectetuer.</li>  <li>Aenean commodo ligula eget dolor.</li>  <li>Aenean massa cum sociis natoque penatibus.</li></ul><p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.</p>"                    
                },
                smallInfoText: {
                    "en": "Play Europe Elite League and MENA Elite League matches and win"
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

        // const grandPrize: GrandPrize = {
        //     id: "1",
        //     promoImage: "./assets/images/grandprize.png",
        //     titleText: {
        //         "en": "Season 2019 - 2020",
        //         "fa": "Season 2019 - 2020"
        //     },
        //     infoText: { "en": "Play matches this season and increase your chances to win the Grand Prize!",
        //     "fa": "Play matches this season and increase your chances to win the Grand Prize!" },
        //     endToDate: new Date("2019-08-28T23:59:59.000Z"),
        //     created: new Date()
        // }

        const subscription: Subscription = {
            userId: "1",
            ends: new Date("2019-06-28T23:59:59.000Z"),
            status: "canceled"
        }

        const authHeader = request.headers.get('Authorization');
        const isLoggedIn = authHeader && authHeader.startsWith('Bearer fake-jwt-token');
        const roleString = isLoggedIn && authHeader.split('.')[1];
        const role = roleString ? Role[roleString] : null;

        // wrap in delayed observable to simulate server api call
        return of(null).pipe(mergeMap(() => {

            // authenticate - public
            // if (request.url.endsWith('/users/authenticate') && request.method === 'POST') {
            //     const user = users.find(x => x.username === request.body.username && x.password === request.body.password);
            //     if (!user) return error('Username or password is incorrect');
            //     return ok({
            //         _id: user._id,
            //         username: user.username,
            //         firstName: user.firstName,
            //         lastName: user.lastName,
            //         role: user.role,
            //         token: `fake-jwt-token.${user.role}`
            //     });
            // }

            // // get user by id - admin or user (user can only access their own record)
            // if (request.url.match(/\/users\/\d+$/) && request.method === 'GET') {
            //     if (!isLoggedIn) return unauthorised();

            //     // get id from request url
            //     let urlParts = request.url.split('/');
            //     let id = urlParts[urlParts.length - 1];

            //     // only allow normal users access to their own record
            //     const currentUser = users.find(x => x.role === role);
            //     if (id !== currentUser.id && role !== Role.Admin) return unauthorised();

            //     const user = users.find(x => x.id === id);
            //     return ok(user);
            // }

            // // get all users (admin only)
            // if (request.url.endsWith('/users') && request.method === 'GET') {
            //     if (role !== Role.Admin) return unauthorised();
            //     return ok(users);
            // }

            // get all contests (admin only)
            if (request.url.match(/contests/i) && request.method === 'GET') {
                // if (role !== Role.Admin) return unauthorised();
                return ok(Contests);
            }

            // if (request.url.match(/grandprize/i) && request.method === 'GET') {
            //     // if (role !== Role.Admin) return unauthorised();
            //     return ok(grandPrize);
            // }

            
            if (request.url.match(/subscription/i) && request.method === 'POST') {
                // if (role !== Role.Admin) return unauthorised();
                return ok(subscription);
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