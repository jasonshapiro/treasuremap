"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var http = require("http");
var https = require("https");
// @todo (enhancement? / possible code smell): use axios. Don't use fetch, don't use default http / https.
/**
 * Note: The REST API that this ClientAPI communicates with allows transactions
 * from exactly one of the 3 clients: Shopper, Retailer, CouponIssuer.
 */
var ClientAPI = /** @class */ (function () {
    /**
     * @constructor
     * @param {string?} hostname The hostname that represents the back-end REST API endpoint.
     * @param {number?} port The port of the back-end REST API endpoint.
     * @param {Boolean?} usingTLS True if using TLS (https), False otherwise (http)
     */
    function ClientAPI(hostname, port, usingTLS) {
        var _this = this;
        /**
         * Creates a shopper in the database associated with the REST API.
         *
         * @param {string} name
         * @param {string} email
         * @param {string} password
         * @param {string} verifyPassword
         * @param {({ status: number, headers: http.IncomingHttpHeaders, body: string }) => void} [cb] do stuff here that depends on the shopper first being created
         * @returns {(void | Promise<{ status: number, headers: http.IncomingHttpHeaders, body: string }>)}
         */
        this.createShopper = function (name, email, password, verifyPassword, cb) {
            return _this.apiHelpers.createUser('createShopper', name, email, password, verifyPassword, cb);
        };
        /**
         * Creates a retailer in the database associated with the REST API.
         *
         * @param {string} name
         * @param {string} email
         * @param {string} password
         * @param {string} verifyPassword
         * @param {({ status: number, headers: http.IncomingHttpHeaders, body: string }) => void} [cb] do stuff here that depends on the retailer first being created
         * @returns {(void | Promise<{ status: number, headers: http.IncomingHttpHeaders, body: string }>)}
         */
        this.createRetailer = function (name, email, password, verifyPassword, cb) {
            return _this.apiHelpers.createUser('createRetailer', name, email, password, verifyPassword, cb);
        };
        /**
         * Creates a couponIssuer in the database associated with the REST API.
         *
         * @param {string} password
         * @param {string} verifyPassword
         * @param {({ status: number, headers: http.IncomingHttpHeaders, body: string }) => void} [cb] do stuff here that depends on the couponIssuer first being created
         * @returns {(void | Promise<{ status: number, headers: http.IncomingHttpHeaders, body: string }>)}
         */
        this.createCouponIssuer = function (password, verifyPassword, cb) {
            return _this.apiHelpers.createCouponIssuer(password, verifyPassword, cb);
        };
        /**
         * 'Logs' the shopper in by calling the provided callback, cb, with an object with a property named `token`.
         * This token will be needed in order to do things that only a shopper has privileges to do.
         *
         * @param {string} username shopper's email
         * @param {string} password shopper's password
         * @param {({token: string, tokenExpiration: string, id: Number}) => void} [cb] a basic authentication token is passed here for client to make authenticated calls (as an authorized shopper) to REST API.
         * @returns {(void | Promise<{ token: string, tokenExpiration: string, id: Number }>)}
         */
        this.loginShopper = function (username, password, cb) {
            return _this.apiHelpers.loginUser('loginShopper', username, password, cb);
        };
        /**
         * 'Logs' the retailer in by calling the provided callback, cb, with an object with a property named `token`.
         * This token will be needed in order to do things that only a retailer has privileges to do.
         *
         * @param {string} username retailer's email
         * @param {string} password retailer's password
         * @param {({token: string, tokenExpiration: string, id: Number}) => void} [cb] a basic authentication token is passed here for client to make authenticated calls (as an authorized retailer) to REST API.
         * @returns {(void | Promise<{ token: string, tokenExpiration: string, id: Number }>)}
         */
        this.loginRetailer = function (username, password, cb) {
            return _this.apiHelpers.loginUser('loginRetailer', username, password, cb);
        };
        /**
         * 'Logs' the couponIssuer in by calling the provided callback, cb, with an object with a property named `token`.
         * This token will be needed in order to do things that only a couponIssuer has privileges to do.
         *
         * @param {string} username couponIssuer's name (should just be "CouponIssuer")
         * @param {string} password couponIssuer's password
         * @param {({token: string, tokenExpiration: string, id: Number}) => void} [cb] a basic authentication token is passed here for client to make authenticated calls (as an authorized couponIssuer) to REST API.
         * @returns {(void | Promise<{ token: string, tokenExpiration: string, id: Number }>)}
         */
        this.loginCouponIssuer = function (password, cb) {
            return _this.apiHelpers.loginCouponIssuer(password, cb);
        };
        /**
         * Updates (or inserts if not yet in database) the shopper's preferences.
         *
         * @param {ShopperPreferencesRequest} shopperPrefs
         * @param {string} token get this from callback passed to loginShopper
         * @param { status: number, headers: string, body: JSON } [cb] sends back response and possibly relevant body to client from REST API
         * @returns {(void | Promise<{ status: number, headers: http.IncomingHttpHeaders, body: string }>)}
         */
        this.upsertShopperPreferences = function (shopperPrefs, token, cb) {
            return _this.apiHelpers.postWithAuthentication('upsertShopperPreferences', shopperPrefs, token, cb);
        };
        /**
         * Update's a shopper's location. This can only be done by an authorized shopper.
         *
         * @param {UpdateShopperLocationRequest} shopperLocation
         * @param {string} token get this from callback passed to loginShopper
         * @param { status: number, headers: string, body: JSON } [cb] sends back response and possibly relevant body to client from REST API
         * @returns {(void | Promise<{ status: number, headers: http.IncomingHttpHeaders, body: string }>)}
         */
        this.updateShopperLocation = function (shopperLocation, token, cb) {
            return _this.apiHelpers.postWithAuthentication('updateShopperLocation', shopperLocation, token, cb);
        };
        /**
         * Gets the relevant coupons for a particular shopper. This can only be done by an authorized shopper.
         *
         * @param {string} token get this from callback passed to loginShopper
         * @param { status: number, headers: string, body: JSON } [cb] sends back response and possibly relevant body to client from REST API
         * @returns {(void | Promise<{ status: number, headers: http.IncomingHttpHeaders, body: string }>)}
         */
        this.getRelevantCoupons = function (token, cb) {
            return _this.apiHelpers.getWithAuthentication('getRelevantCoupons', {}, token, cb);
        };
        /**
         * Processes the coupon for a shopper. This can only be done by an authorized retailer.
         * This is meant to signify that a coupon has been processed (by a retailer) during a
         * transaction at a retail store.
         *
         * @param {ShopperToCouponRequest} shopperToCoupon
         * @param {string} token get this from callback passed to loginRetailer
         * @param { status: number, headers: string, body: JSON } [cb] sends back response and possibly relevant body to client from REST API
         * @returns {(void | Promise<{ status: number, headers: http.IncomingHttpHeaders, body: string }>)}
         */
        this.processCoupon = function (shopperToCoupon, token, cb) {
            return _this.apiHelpers.postWithAuthentication('processCoupon', shopperToCoupon, token, cb);
        };
        /**
         * Posts a new coupon to the database. This can only be done by an authorized couponIssuer
         * (namely, the backend service that will be creating coupons on behalf of each participating
         * retailer, based on a set of criteria that each retailer will need to provide).
         *
         * @param {CreateCouponRequest} createCouponRequest
         * @param {string} token get this from callback passed to loginCouponIssuer
         * @param { status: number, headers: string, body: JSON } [cb] sends back response and possibly relevant body to client from REST API
         * @returns {(void | Promise<{ status: number, headers: http.IncomingHttpHeaders, body: string }>)}
         */
        this.postCoupon = function (createCouponRequest, token, cb) {
            return _this.apiHelpers.postWithAuthentication('postCoupon', createCouponRequest, token, cb);
        };
        /**
         * These functions are essentially private, but are still accessible to the ClientAPI class because
         * they are in the COVE (closed over variable environment.
         * (see: https://www.google.com/search?q=closures+in+javascript .)
         *
         * Also, since the JavaScript engine hoists statement declarations,
         * it's completely valid to declare and define these apiHelpers down
         * below/after they're actually invoked/consumed (in ClientAPI, above).
         * (see: https://www.google.com/search?q=hoisting+in+javascript)
         */
        this.apiHelpers = {
            baseUrl: 'http://riyadshauk.com:8080',
            hostname: 'riyadshauk.com',
            port: 8080,
            routes: {
                createShopper: '/shopper',
                createRetailer: '/retailer',
                /* This is only allowed to be set once, and the name will always be "CouponIssuer",
                * regardless of whatever name the client provides */
                createCouponIssuer: '/couponIssuer',
                loginShopper: '/shopperLogin',
                loginRetailer: '/retailerLogin',
                loginCouponIssuer: '/couponIssuerLogin',
                /* Note: To be 'logged in', provide the Bearer Token recieved in the JSON response
                * from the above log-in endpoints. */
                /* == endpoints only accessible by logged in Shopper == */
                upsertShopperPreferences: '/preferences',
                updateShopperLocation: '/location',
                getRelevantCoupons: '/relevantCoupons',
                /* == endpoint only accessible by logged in Retailer == */
                processCoupon: '/processCoupon',
                /* == endpoint only accessible by logged in CouponIssuer == */
                postCoupon: '/relevantCoupon'
            },
            postWithOptions: function (options, onEnd, data, cb) {
                if (cb !== undefined && !(cb instanceof Function)) {
                    console.error((new Error("Invalid cb passed in!")).stack);
                }
                else if (cb === undefined) {
                    return new Promise(function (resolve, reject) {
                        var lib = _this.apiHelpers.baseUrl.startsWith('https') ? https : http;
                        var req = lib.request(options, function (res) {
                            var body = [];
                            res.on('data', function (chunk) { return body.push(chunk); });
                            res.on('end', function () {
                                resolve(onEnd(res, body.join('')));
                                console.log('No more data in response.');
                            });
                        });
                        if (data !== undefined)
                            req.write(data);
                        req.on('error', function (err) { return reject(err); });
                        req.end();
                    });
                }
                else {
                    var lib = _this.apiHelpers.baseUrl.startsWith('https') ? https : http;
                    var req = lib.request(options, function (res) {
                        res.setEncoding('utf8');
                        var body = [];
                        res.on('data', function (chunk) {
                            body.push(chunk);
                        });
                        res.on('end', function () {
                            cb(onEnd(res, body.join('')));
                            console.log('No more data in response.');
                        });
                    });
                    req.on('error', function (e) {
                        console.error("problem with request: " + e.message);
                    });
                    if (data !== undefined)
                        req.write(data);
                    req.end();
                }
            },
            standardBaseOptions: function (routeKey) {
                return {
                    hostname: _this.apiHelpers.hostname,
                    port: _this.apiHelpers.port,
                    path: _this.apiHelpers.routes[routeKey],
                    method: 'POST'
                };
            },
            createUser: function (routeKey, name, email, password, verifyPassword, cb) {
                var body = {
                    name: name,
                    email: email,
                    password: password,
                    verifyPassword: verifyPassword
                };
                var query = Object.keys(body).reduce(function (acc, key) { return acc += encodeURIComponent(key) + "=" + encodeURIComponent(body[key]) + "&"; }, '');
                var options = __assign({}, _this.apiHelpers.standardBaseOptions(routeKey), { headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Content-Length': Buffer.byteLength(query)
                    } });
                var onEnd = function (res, data) {
                    return { status: res.statusCode, headers: res.headers, body: data };
                };
                return _this.apiHelpers.postWithOptions(options, onEnd, query, cb);
            },
            createCouponIssuer: function (password, verifyPassword, cb) {
                return _this.apiHelpers.createUser('createCouponIssuer', 'CouponIssuer', 'blahEmail', password, verifyPassword, cb);
            },
            loginUser: function (routeKey, username, password, cb) {
                var options = __assign({}, _this.apiHelpers.standardBaseOptions(routeKey), { auth: username + ":" + password });
                var onEnd = function (res, data) {
                    try {
                        var json_1 = JSON.parse(data);
                        var keys = Object.keys(json_1);
                        var id_1 = -1;
                        keys.forEach(function (key) {
                            if (key === 'shopperID' || key === 'retailerID' || key === 'couponIssuerID')
                                id_1 = json_1[key];
                        });
                        return { token: json_1.string, tokenExpiration: json_1.expiresAt, id: id_1 };
                    }
                    catch (e) {
                        console.error('loginUser json\n', e.stack);
                    }
                };
                return _this.apiHelpers.postWithOptions(options, onEnd, undefined, cb);
            },
            loginCouponIssuer: function (password, cb) {
                return _this.apiHelpers.loginUser('loginCouponIssuer', 'CouponIssuer', password, cb);
            },
            sendWithAuthentication: function (routeKey, body, token, baseOptions, cb) {
                var query = Object.keys(body).reduce(function (acc, key) { return acc += encodeURIComponent(key) + "=" + encodeURIComponent(body[key]) + "&"; }, '');
                var options = __assign({}, baseOptions, { headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Content-Length': Buffer.byteLength(query),
                        'Authorization': "Bearer " + token
                    } });
                var onEnd = function (res, data) {
                    return { status: res.statusCode, headers: res.headers, body: data };
                };
                return _this.apiHelpers.postWithOptions(options, onEnd, query, cb);
            },
            postWithAuthentication: function (routeKey, body, token, cb) {
                return _this.apiHelpers.sendWithAuthentication(routeKey, body, token, _this.apiHelpers.standardBaseOptions(routeKey), cb);
            },
            getWithAuthentication: function (routeKey, body, token, cb) {
                var standardBaseOptions = _this.apiHelpers.standardBaseOptions(routeKey);
                standardBaseOptions.method = 'GET';
                return _this.apiHelpers.sendWithAuthentication(routeKey, body, token, standardBaseOptions, cb);
            }
        };
        this.apiHelpers.hostname = hostname || 'riyadshauk.com';
        this.apiHelpers.port = port || 8080;
        this.apiHelpers.baseUrl = (usingTLS ? 'https' : 'http') + "://" + this.apiHelpers.hostname + ":" + String(this.apiHelpers.port);
        console.log("Successfully instantiated a clientAPI with a back-end REST API endpoint of " + this.apiHelpers.baseUrl + " (Note: using " + (usingTLS ? 'HTTPS' : 'HTTP') + "!)");
    }
    return ClientAPI;
}());
module.exports = ClientAPI;
