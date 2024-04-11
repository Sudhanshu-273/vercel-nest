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
exports.UsersService = void 0;
var common_1 = require("@nestjs/common");
var UsersService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var UsersService = _classThis = /** @class */ (function () {
        function UsersService_1(sequelize) {
            this.sequelize = sequelize;
        }
        UsersService_1.prototype.getUsers = function (user_id, id) {
            return __awaiter(this, void 0, void 0, function () {
                var user_details_sql, _a, user_details, m1, _b, isFollowing, m2, _c, followings, m3, _d, followers, m4;
                return __generator(this, function (_e) {
                    switch (_e.label) {
                        case 0:
                            user_details_sql = "select u.id, u.username, u.email, u.full_name, COUNT(p.id) as total_posts\n                                          from users u\n                                                   inner join posts p on p.user_id = u.id\n                                          where u.id = :user_id\n                                          group by u.id;";
                            return [4 /*yield*/, this.sequelize.query(user_details_sql, {
                                    replacements: {
                                        user_id: id
                                    }
                                })];
                        case 1:
                            _a = _e.sent(), user_details = _a[0][0], m1 = _a[1];
                            return [4 /*yield*/, this.sequelize.query("select COUNT(*) as isFollow\n                                                                from followers\n                                                                where follower_id = :user_id\n                                                                  and following_id = :id", {
                                    replacements: {
                                        user_id: user_id,
                                        id: id
                                    }
                                })];
                        case 2:
                            _b = _e.sent(), isFollowing = _b[0][0], m2 = _b[1];
                            return [4 /*yield*/, this.sequelize.query("select COUNT(*) as followings\n                                                               from followers\n                                                               where follower_id = :id", {
                                    replacements: {
                                        id: id
                                    }
                                })];
                        case 3:
                            _c = _e.sent(), followings = _c[0][0], m3 = _c[1];
                            return [4 /*yield*/, this.sequelize.query("select COUNT(*) as followers\n                                                              from followers\n                                                              where following_id = :id", {
                                    replacements: {
                                        id: id
                                    }
                                })];
                        case 4:
                            _d = _e.sent(), followers = _d[0][0], m4 = _d[1];
                            return [2 /*return*/, {
                                    status: true,
                                    data: {
                                        user: user_details,
                                        isFollowing: isFollowing,
                                        followings: followings,
                                        followers: followers
                                    }
                                }];
                    }
                });
            });
        };
        UsersService_1.prototype.updateUser = function (_a) {
            return __awaiter(this, arguments, void 0, function (_b) {
                var get_user_details_sql, _c, user, m1, payload, username, email, bio, full_name, update_user_sql;
                var body = _b.body, user_id = _b.user_id;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            get_user_details_sql = "select *\n                                              from users\n                                              where id = :user_id";
                            return [4 /*yield*/, this.sequelize.query(get_user_details_sql, {
                                    replacements: {
                                        user_id: user_id
                                    }
                                })];
                        case 1:
                            _c = _d.sent(), user = _c[0][0], m1 = _c[1];
                            payload = {
                                username: user['username'],
                                email: user['email'],
                                bio: user['bio'],
                                full_name: user['full_name']
                            };
                            console.log(payload);
                            username = body.username, email = body.email, bio = body.bio, full_name = body.full_name;
                            if (username) {
                                payload.username = username;
                            }
                            if (email) {
                                payload.email = email;
                            }
                            if (bio) {
                                payload.bio = bio;
                            }
                            if (full_name) {
                            }
                            update_user_sql = "update users\n                                         set username  = :username,\n                                             email     = :email,\n                                             bio       = :bio,\n                                             full_name = :full_name\n                                         where id = :user_id";
                            return [4 /*yield*/, this.sequelize.query(update_user_sql, {
                                    replacements: {
                                        username: payload.username,
                                        email: payload.email,
                                        bio: payload.bio,
                                        full_name: full_name,
                                        user_id: user_id
                                    }
                                })];
                        case 2:
                            _d.sent();
                            return [2 /*return*/, {
                                    status: true,
                                    message: 'Profile updated successfully'
                                }];
                    }
                });
            });
        };
        UsersService_1.prototype.addFollower = function (_a) {
            return __awaiter(this, arguments, void 0, function (_b) {
                var add_follower_sql, err_1;
                var user_id = _b.user_id, following_id = _b.following_id;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            _c.trys.push([0, 2, , 3]);
                            if (user_id === following_id) {
                                throw new common_1.HttpException('Cannot follow self.', common_1.HttpStatus.BAD_REQUEST);
                            }
                            add_follower_sql = "insert into followers (follower_id, following_id)\n                                              values (:follower_id, :following_id)";
                            return [4 /*yield*/, this.sequelize.query(add_follower_sql, {
                                    replacements: {
                                        follower_id: user_id,
                                        following_id: following_id
                                    }
                                })];
                        case 1:
                            _c.sent();
                            return [2 /*return*/, {
                                    status: true
                                }];
                        case 2:
                            err_1 = _c.sent();
                            throw new common_1.HttpException(err_1, common_1.HttpStatus.BAD_REQUEST);
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        UsersService_1.prototype.removeFollower = function (_a) {
            return __awaiter(this, arguments, void 0, function (_b) {
                var remove_follower_sql, err_2;
                var user_id = _b.user_id, following_id = _b.following_id;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            _c.trys.push([0, 2, , 3]);
                            console.log('Query nahi chali');
                            if (user_id === following_id) {
                                throw new common_1.HttpException('Cannot unfollow self.', common_1.HttpStatus.BAD_REQUEST);
                            }
                            console.log('Query nahi chali');
                            remove_follower_sql = "delete\n                                                 from followers\n                                                 where follower_id = :user_id\n                                                   and following_id = :following_id";
                            return [4 /*yield*/, this.sequelize.query(remove_follower_sql, {
                                    replacements: {
                                        user_id: user_id,
                                        following_id: following_id
                                    }
                                })];
                        case 1:
                            _c.sent();
                            console.log('Query nahi chali');
                            return [2 /*return*/, {
                                    status: true
                                }];
                        case 2:
                            err_2 = _c.sent();
                            console.log(err_2);
                            throw new common_1.HttpException(err_2, common_1.HttpStatus.BAD_REQUEST);
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        UsersService_1.prototype.allFollowers = function (user_id) {
            return __awaiter(this, void 0, void 0, function () {
                var _a, followings_id, m1, _b, followers_id, m2, followings, followers;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0: return [4 /*yield*/, this.sequelize.query("select *\n                                                                from followers\n                                                                where follower_id = :user_id", {
                                replacements: {
                                    user_id: user_id
                                }
                            })];
                        case 1:
                            _a = _c.sent(), followings_id = _a[0], m1 = _a[1];
                            return [4 /*yield*/, this.sequelize.query("select *\n                                                               from followers\n                                                               where following_id = :user_id", {
                                    replacements: {
                                        user_id: user_id
                                    }
                                })];
                        case 2:
                            _b = _c.sent(), followers_id = _b[0], m2 = _b[1];
                            followings = followings_id.map(function (user) { return user['following_id']; });
                            followers = followers_id.map(function (user) { return user['follower_id']; });
                            return [2 /*return*/, {
                                    status: true,
                                    data: {
                                        followers: followers,
                                        followings: followings
                                    }
                                }];
                    }
                });
            });
        };
        UsersService_1.prototype.chatUsers = function (user_id) {
            return __awaiter(this, void 0, void 0, function () {
                var get_users_sql, _a, followings, m2;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            get_users_sql = "select u.id as following_id, u.username\n                                       from followers f\n                                                inner join users u on f.following_id = u.id\n                                       where follower_id = :user_id";
                            return [4 /*yield*/, this.sequelize.query(get_users_sql, {
                                    replacements: {
                                        user_id: user_id
                                    }
                                })];
                        case 1:
                            _a = _b.sent(), followings = _a[0], m2 = _a[1];
                            return [2 /*return*/, {
                                    status: true,
                                    data: followings
                                }];
                    }
                });
            });
        };
        UsersService_1.prototype.fetchChats = function (user_id, chat_user_id) {
            return __awaiter(this, void 0, void 0, function () {
                var sql, _a, chats, m1;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            sql = "select *\n                             from chats\n                             where (sender_id = :user_id and receiver_id = :chat_user_id)\n                                or (sender_id = :chat_user_id and receiver_id = :user_id)\n                             order by date desc LIMIT 10;";
                            return [4 /*yield*/, this.sequelize.query(sql, {
                                    replacements: {
                                        user_id: user_id,
                                        chat_user_id: chat_user_id
                                    }
                                })];
                        case 1:
                            _a = _b.sent(), chats = _a[0], m1 = _a[1];
                            return [2 /*return*/, {
                                    status: true,
                                    chats: chats
                                }];
                    }
                });
            });
        };
        UsersService_1.prototype.setChat = function (body, user_id) {
            return __awaiter(this, void 0, void 0, function () {
                var receiver_id, message, set_chat_sql, data;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            receiver_id = body.receiver_id, message = body.message;
                            set_chat_sql = "insert into chats (message, sender_id, receiver_id)\n                                      VALUES (:message, :sender_id, :receiver_id)";
                            return [4 /*yield*/, this.sequelize.query(set_chat_sql, {
                                    replacements: {
                                        message: message,
                                        sender_id: user_id,
                                        receiver_id: receiver_id
                                    }
                                })];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, this.fetchChats(user_id, receiver_id)];
                        case 2:
                            data = _a.sent();
                            return [2 /*return*/, {
                                    status: true,
                                    chats: data.chats
                                }];
                    }
                });
            });
        };
        return UsersService_1;
    }());
    __setFunctionName(_classThis, "UsersService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        UsersService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return UsersService = _classThis;
}();
exports.UsersService = UsersService;
