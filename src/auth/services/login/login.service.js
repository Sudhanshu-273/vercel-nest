"use strict";
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginService = void 0;
var common_1 = require("@nestjs/common");
var bcrypt = require("bcrypt");
var LoginService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var LoginService = _classThis = /** @class */ (function () {
        function LoginService_1(sequelize, jwtService) {
            this.sequelize = sequelize;
            this.jwtService = jwtService;
        }
        LoginService_1.prototype.loginUser = function (_a) {
            return __awaiter(this, arguments, void 0, function (_b) {
                var username, password, find_user_sql, _c, user, m1, passwordMatch, payload, access_token, validate_token_sql, _d, followings_id, m3, _e, followers_id, m4, followings, followers, err_1;
                var body = _b.body, res = _b.res;
                return __generator(this, function (_f) {
                    switch (_f.label) {
                        case 0:
                            _f.trys.push([0, 7, , 8]);
                            username = body.username, password = body.password;
                            find_user_sql = "select *\n                                           from users\n                                           where username = :username";
                            return [4 /*yield*/, this.sequelize.query(find_user_sql, {
                                    replacements: {
                                        username: username
                                    },
                                    raw: true,
                                    nest: true
                                })];
                        case 1:
                            _c = _f.sent(), user = _c[0], m1 = _c[1];
                            if (!user) {
                                return [2 /*return*/, {
                                        status: false,
                                        message: 'Invalid Credentials'
                                    }];
                            }
                            return [4 /*yield*/, bcrypt.compare(password, user['password'])];
                        case 2:
                            passwordMatch = _f.sent();
                            if (!passwordMatch) {
                                return [2 /*return*/, {
                                        status: false,
                                        message: 'Invalid Credentials'
                                    }];
                            }
                            payload = { user_id: user['id'] };
                            return [4 /*yield*/, this.jwtService.signAsync(payload)];
                        case 3:
                            access_token = _f.sent();
                            validate_token_sql = "insert into tokens (access_token, status)\n                                                values (:access_token, true);";
                            return [4 /*yield*/, this.sequelize.query(validate_token_sql, {
                                    replacements: {
                                        access_token: access_token
                                    }
                                })];
                        case 4:
                            _f.sent();
                            res.cookie('access_token', access_token, {
                                httpOnly: true,
                                secure: false
                            });
                            console.log('Yaha tak chala');
                            return [4 /*yield*/, this.sequelize.query("select *\n                                                                    from followers\n                                                                    where follower_id = :user_id", {
                                    replacements: {
                                        user_id: user['id']
                                    }
                                })];
                        case 5:
                            _d = _f.sent(), followings_id = _d[0], m3 = _d[1];
                            return [4 /*yield*/, this.sequelize.query("select *\n                                                                   from followers\n                                                                   where following_id = :user_id", {
                                    replacements: {
                                        user_id: user['id']
                                    }
                                })];
                        case 6:
                            _e = _f.sent(), followers_id = _e[0], m4 = _e[1];
                            followings = followings_id.map(function (user) { return user['following_id']; });
                            followers = followers_id.map(function (user) { return user['follower_id']; });
                            return [2 /*return*/, {
                                    status: true,
                                    message: 'Logged in successfully',
                                    access_token: access_token,
                                    data: {
                                        user_id: user['id'],
                                        username: user['username'],
                                        email: user['email'],
                                        full_name: user['full_name'],
                                        bio: user['bio'],
                                        followers: followers,
                                        followings: followings
                                    }
                                }];
                        case 7:
                            err_1 = _f.sent();
                            console.log(err_1);
                            throw new common_1.HttpException(err_1, common_1.HttpStatus.FORBIDDEN);
                        case 8: return [2 /*return*/];
                    }
                });
            });
        };
        return LoginService_1;
    }());
    __setFunctionName(_classThis, "LoginService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        LoginService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return LoginService = _classThis;
}();
exports.LoginService = LoginService;
