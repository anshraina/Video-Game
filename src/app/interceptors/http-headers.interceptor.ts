import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class HttpHeadersInterceptor implements HttpInterceptor {
    constructor() {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        req = req.clone({
            setHeaders: {
                'x-rapidapi-key': '73c1cdc7ffmshdc356678e2e4eb9p13d11ejsn23811c4216a0',
                'x-rapid-host': 'rawg-video-games-database.p.rapidapi.com',
            },
            setParams : {
                'key': '078bbd4c4b9c436082375961756e9a8f'
            }
        });
        return next.handle(req);
    }
}
