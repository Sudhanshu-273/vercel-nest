"use strict";
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
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
exports.UsersController = void 0;
var common_1 = require("@nestjs/common");
var auth_guard_1 = require("../../../auth/auth.guard");
var swagger_1 = require("@nestjs/swagger");
var UsersController = function () {
    var _classDecorators = [(0, common_1.Controller)('users'), (0, swagger_1.ApiBearerAuth)(), (0, common_1.UseGuards)(auth_guard_1.AuthGuard), (0, swagger_1.ApiTags)('Users')];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _users_decorators;
    var _updateUser_decorators;
    var _addFollower_decorators;
    var _removeFollower_decorators;
    var _allFollowers_decorators;
    var _chatUsers_decorators;
    var _fetchChats_decorators;
    var _setChat_decorators;
    var UsersController = _classThis = /** @class */ (function () {
        function UsersController_1(usersService) {
            this.usersService = (__runInitializers(this, _instanceExtraInitializers), usersService);
        }
        UsersController_1.prototype.users = function (req, id) {
            return __awaiter(this, void 0, void 0, function () {
                var user_id;
                return __generator(this, function (_a) {
                    user_id = req['user'].user_id;
                    console.log(user_id);
                    return [2 /*return*/, this.usersService.getUsers(user_id, id)];
                });
            });
        };
        UsersController_1.prototype.updateUser = function (body, req) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    console.log(req, body);
                    return [2 /*return*/, this.usersService.updateUser({ body: body, user_id: req['user']['user_id'] })];
                });
            });
        };
        UsersController_1.prototype.addFollower = function (req, body) {
            return __awaiter(this, void 0, void 0, function () {
                var user_id, following_id;
                return __generator(this, function (_a) {
                    user_id = req['user'].user_id;
                    following_id = body.following_id;
                    return [2 /*return*/, this.usersService.addFollower({ user_id: user_id, following_id: following_id })];
                });
            });
        };
        UsersController_1.prototype.removeFollower = function (req, body) {
            return __awaiter(this, void 0, void 0, function () {
                var user_id, following_id;
                return __generator(this, function (_a) {
                    user_id = req['user'].user_id;
                    following_id = body.following_id;
                    console.log('Ye unfollow call nahi hua kya', user_id);
                    return [2 /*return*/, this.usersService.removeFollower({ user_id: user_id, following_id: following_id })];
                });
            });
        };
        UsersController_1.prototype.allFollowers = function (req) {
            return __awaiter(this, void 0, void 0, function () {
                var user_id;
                return __generator(this, function (_a) {
                    user_id = req['user'].user_id;
                    return [2 /*return*/, this.usersService.allFollowers(user_id)];
                });
            });
        };
        UsersController_1.prototype.chatUsers = function (req) {
            return __awaiter(this, void 0, void 0, function () {
                var user_id;
                return __generator(this, function (_a) {
                    user_id = req['user'].user_id;
                    return [2 /*return*/, this.usersService.chatUsers(user_id)];
                });
            });
        };
        UsersController_1.prototype.fetchChats = function (req, chat_user_id) {
            var user_id = req['user'].user_id;
            return this.usersService.fetchChats(user_id, chat_user_id);
        };
        UsersController_1.prototype.setChat = function (body, req) {
            var user_id = req['user'].user_id;
            return this.usersService.setChat(body, user_id);
        };
        return UsersController_1;
    }());
    __setFunctionName(_classThis, "UsersController");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _users_decorators = [(0, common_1.Get)('profile/:id')];
        _updateUser_decorators = [(0, common_1.Post)('update')];
        _addFollower_decorators = [(0, common_1.Post)('follow')];
        _removeFollower_decorators = [(0, common_1.Post)('unfollow')];
        _allFollowers_decorators = [(0, common_1.Get)('followers')];
        _chatUsers_decorators = [(0, common_1.Get)('chat/profiles')];
        _fetchChats_decorators = [(0, common_1.Get)('chats/:chat_user_id')];
        _setChat_decorators = [(0, common_1.Post)('chat/set')];
        __esDecorate(_classThis, null, _users_decorators, { kind: "method", name: "users", static: false, private: false, access: { has: function (obj) { return "users" in obj; }, get: function (obj) { return obj.users; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _updateUser_decorators, { kind: "method", name: "updateUser", static: false, private: false, access: { has: function (obj) { return "updateUser" in obj; }, get: function (obj) { return obj.updateUser; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _addFollower_decorators, { kind: "method", name: "addFollower", static: false, private: false, access: { has: function (obj) { return "addFollower" in obj; }, get: function (obj) { return obj.addFollower; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _removeFollower_decorators, { kind: "method", name: "removeFollower", static: false, private: false, access: { has: function (obj) { return "removeFollower" in obj; }, get: function (obj) { return obj.removeFollower; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _allFollowers_decorators, { kind: "method", name: "allFollowers", static: false, private: false, access: { has: function (obj) { return "allFollowers" in obj; }, get: function (obj) { return obj.allFollowers; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _chatUsers_decorators, { kind: "method", name: "chatUsers", static: false, private: false, access: { has: function (obj) { return "chatUsers" in obj; }, get: function (obj) { return obj.chatUsers; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _fetchChats_decorators, { kind: "method", name: "fetchChats", static: false, private: false, access: { has: function (obj) { return "fetchChats" in obj; }, get: function (obj) { return obj.fetchChats; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _setChat_decorators, { kind: "method", name: "setChat", static: false, private: false, access: { has: function (obj) { return "setChat" in obj; }, get: function (obj) { return obj.setChat; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        UsersController = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return UsersController = _classThis;
}();
exports.UsersController = UsersController;
