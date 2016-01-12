var MyApp;
(function (MyApp) {
    var Services;
    (function (Services) {
        var AccountService = (function () {
            function AccountService($q, $http, $window) {
                this.$q = $q;
                this.$http = $http;
                this.$window = $window;
            }
            AccountService.prototype.storeUserInfo = function (userInfo) {
                this.$window.sessionStorage.setItem('token', userInfo.access_token);
                for (var prop in userInfo) {
                    if (prop.indexOf('claim_') == 0) {
                        this.$window.sessionStorage.setItem(prop, userInfo[prop]);
                    }
                }
            };
            AccountService.prototype.getClaim = function (type) {
                return this.$window.sessionStorage.getItem('claim_' + type);
            };
            AccountService.prototype.login = function (loginUser) {
                var _this = this;
                return this.$q(function (resolve, reject) {
                    var data = "grant_type=password&username=" + loginUser.userName + "&password=" + loginUser.password;
                    _this.$http.post('/Token', data, {
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                    }).success(function (result) {
                        _this.storeUserInfo(result);
                        resolve();
                    }).error(function (result) {
                        reject(result);
                    });
                });
            };
            AccountService.prototype.register = function (userLogin) {
                var _this = this;
                return this.$q(function (resolve, reject) {
                    _this.$http.post('/api/account/register', userLogin)
                        .then(function (result) {
                        resolve(result);
                    })
                        .catch(function (result) {
                        var messages = [];
                        for (var prop in result.data.modelState) {
                            messages = messages.concat(result.data.modelState[prop]);
                        }
                        reject(messages);
                    });
                });
            };
            AccountService.prototype.logout = function () {
                this.$window.sessionStorage.clear();
            };
            AccountService.prototype.isLoggedIn = function () {
                return this.$window.sessionStorage.getItem('token');
            };
            AccountService.prototype.registerExternal = function (email, token) {
                var _this = this;
                return this.$q(function (resolve, reject) {
                    _this.$http.post('/api/account/registerExternal', { email: email }, { headers: { Authorization: 'Bearer ' + token } })
                        .then(function (result) {
                        resolve(result);
                    })
                        .catch(function (result) {
                        var messages = [];
                        for (var prop in result.data.modelState) {
                            messages = messages.concat(result.data.modelState[prop]);
                        }
                        reject(messages);
                    });
                });
            };
            AccountService.prototype.getUserInfo = function (externalAccessToken) {
                var _this = this;
                return this.$q(function (resolve, reject) {
                    _this.$http.get('/api/account/userinfo', { headers: { Authorization: 'Bearer ' + externalAccessToken } })
                        .then(function (result) {
                        resolve(result.data);
                    })
                        .catch(function (result) {
                        var messages = [];
                        for (var prop in result.data.modelState) {
                            messages = messages.concat(result.data.modelState[prop]);
                        }
                        return messages;
                    });
                });
            };
            AccountService.prototype.getExternalLogins = function () {
                var _this = this;
                return this.$q(function (resolve, reject) {
                    var url = "api/Account/ExternalLogins?returnUrl=%2FexternalLogin&generateState=true";
                    _this.$http.get(url).then(function (result) {
                        resolve(result.data);
                    }).catch(function (result) {
                        reject(result);
                    });
                });
            };
            AccountService.prototype.confirmEmail = function (userId, code) {
                var _this = this;
                return this.$q(function (resolve, reject) {
                    var data = {
                        userId: userId,
                        code: code
                    };
                    _this.$http.post('/api/account/confirmEmail', data).then(function (result) {
                        resolve(result.data);
                    }).catch(function (result) {
                        reject(result);
                    });
                });
            };
            AccountService.prototype.parseOAuthResponse = function (token) {
                var results = {};
                token.split('&').forEach(function (item) {
                    var pair = item.split('=');
                    results[pair[0]] = pair[1];
                });
                return results;
            };
            return AccountService;
        })();
        Services.AccountService = AccountService;
        angular.module('MyApp').service('accountService', AccountService);
    })(Services = MyApp.Services || (MyApp.Services = {}));
})(MyApp || (MyApp = {}));
