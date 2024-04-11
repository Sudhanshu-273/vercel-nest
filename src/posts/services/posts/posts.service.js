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
exports.PostsService = void 0;
var common_1 = require("@nestjs/common");
var moment = require("moment");
var PostsService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var PostsService = _classThis = /** @class */ (function () {
        function PostsService_1(sequelize) {
            this.sequelize = sequelize;
        }
        PostsService_1.prototype.addPost = function (_a) {
            return __awaiter(this, arguments, void 0, function (_b) {
                var title, img, date, insert_post_sql, _c, data, m1;
                var body = _b.body, user_id = _b.user_id;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            title = body.title, img = body.img;
                            console.log(img);
                            date = moment().utc().format('YYYY-MM-DD hh-mm');
                            insert_post_sql = "insert into posts (user_id, title, img, date)\n                                         VALUES (:user_id, :title, :img, :date)";
                            return [4 /*yield*/, this.sequelize.query(insert_post_sql, {
                                    replacements: {
                                        user_id: user_id,
                                        title: title,
                                        img: img,
                                        date: date
                                    }
                                })];
                        case 1:
                            _d.sent();
                            return [4 /*yield*/, this.sequelize.query("SELECT p.id                                                        AS post_id,\n                                                              u.id                                                        AS user_id,\n                                                              u.username,\n                                                              p.title,\n                                                              p.img,\n                                                              p.date,\n                                                              COALESCE(like_counts.like_count, 0)                         AS like_count,\n                                                              COALESCE(comment_counts.comment_count, 0)                   AS comment_count,\n                                                              CASE WHEN like_counts.like_count_user > 0 THEN 1 ELSE 0 END AS liked_by_user\n                                                       FROM posts p\n                                                                INNER JOIN\n                                                            users u ON u.id = p.user_id\n                                                                LEFT JOIN (SELECT post_id,\n                                                                                  COUNT(id)               AS like_count,\n                                                                                  SUM(user_id = :user_id) AS like_count_user\n                                                                           FROM likes\n                                                                           GROUP BY post_id) AS like_counts\n                                                                          ON p.id = like_counts.post_id\n                                                                LEFT JOIN (SELECT post_id,\n                                                                                  COUNT(id) AS comment_count\n                                                                           FROM comments\n                                                                           GROUP BY post_id) AS comment_counts\n                                                                          ON p.id = comment_counts.post_id\n                                                       ORDER BY p.date DESC;\n        ", {
                                    replacements: {
                                        user_id: user_id
                                    }
                                })];
                        case 2:
                            _c = _d.sent(), data = _c[0], m1 = _c[1];
                            return [2 /*return*/, {
                                    status: true,
                                    message: 'Post uploaded',
                                    data: data
                                }];
                    }
                });
            });
        };
        PostsService_1.prototype.allPosts = function (_a) {
            return __awaiter(this, arguments, void 0, function (_b) {
                var all_posts_sql, _c, data, m1;
                var user_id = _b.user_id;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            all_posts_sql = "SELECT p.id                                                        AS post_id,\n                                              u.id                                                        AS user_id,\n                                              u.username,\n                                              u.full_name,\n                                              p.title,\n                                              p.img,\n                                              p.date,\n                                              COALESCE(like_counts.like_count, 0)                         AS like_count,\n                                              COALESCE(comment_counts.comment_count, 0)                   AS comment_count,\n                                              CASE WHEN like_counts.like_count_user > 0 THEN 1 ELSE 0 END AS liked_by_user\n                                       FROM posts p\n                                                INNER JOIN\n                                            users u ON u.id = p.user_id\n                                                LEFT JOIN (SELECT post_id,\n                                                                  COUNT(id)               AS like_count,\n                                                                  SUM(user_id = :user_id) AS like_count_user\n                                                           FROM likes\n                                                           GROUP BY post_id) AS like_counts\n                                                          ON p.id = like_counts.post_id\n                                                LEFT JOIN (SELECT post_id,\n                                                                  COUNT(id) AS comment_count\n                                                           FROM comments\n                                                           GROUP BY post_id) AS comment_counts\n                                                          ON p.id = comment_counts.post_id\n                                       ORDER BY p.date DESC;\n        ; ";
                            return [4 /*yield*/, this.sequelize.query(all_posts_sql, {
                                    replacements: {
                                        user_id: user_id
                                    }
                                })];
                        case 1:
                            _c = _d.sent(), data = _c[0], m1 = _c[1];
                            return [2 /*return*/, {
                                    status: true,
                                    message: 'Posts fetched',
                                    data: data
                                }];
                    }
                });
            });
        };
        PostsService_1.prototype.addLike = function (_a) {
            return __awaiter(this, arguments, void 0, function (_b) {
                var add_like_sql, remove_like_sql;
                var user_id = _b.user_id, post_id = _b.post_id, status = _b.status;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            if (!(status == 1)) return [3 /*break*/, 2];
                            add_like_sql = "insert into likes (post_id, user_id)\n                                          values (:post_id, :user_id);";
                            return [4 /*yield*/, this.sequelize.query(add_like_sql, {
                                    replacements: {
                                        post_id: post_id,
                                        user_id: user_id
                                    }
                                })];
                        case 1:
                            _c.sent();
                            return [3 /*break*/, 4];
                        case 2:
                            remove_like_sql = "delete\n                                             from likes\n                                             where user_id = :user_id\n                                               and post_id = :post_id;";
                            return [4 /*yield*/, this.sequelize.query(remove_like_sql, {
                                    replacements: {
                                        user_id: user_id,
                                        post_id: post_id
                                    }
                                })];
                        case 3:
                            _c.sent();
                            _c.label = 4;
                        case 4: return [2 /*return*/, {
                                status: true,
                                message: 'Operation successfull'
                            }];
                    }
                });
            });
        };
        PostsService_1.prototype.addComment = function (_a) {
            return __awaiter(this, arguments, void 0, function (_b) {
                var post_id, content, insert_comment_sql;
                var body = _b.body, user_id = _b.user_id;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            post_id = body.post_id, content = body.content;
                            insert_comment_sql = "insert into comments (post_id, user_id, content, date)\n                                            values (:post_id, :user_id, :content, CURRENT_TIMESTAMP);";
                            return [4 /*yield*/, this.sequelize.query(insert_comment_sql, {
                                    replacements: {
                                        post_id: post_id,
                                        user_id: user_id,
                                        content: content
                                    }
                                })];
                        case 1:
                            _c.sent();
                            return [2 /*return*/, {
                                    status: true,
                                    message: 'Comment Added'
                                }];
                    }
                });
            });
        };
        PostsService_1.prototype.allComments = function (body, user_id) {
            return __awaiter(this, void 0, void 0, function () {
                var post_id, all_comments_sql, _a, data, m1;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            post_id = body.post_id;
                            all_comments_sql = "select c.id as comment_id,\n                                                 u.id as user_id,\n                                                 u.username,\n                                                 c.content,\n                                                 c.post_id,\n                                                 c.date\n                                          from comments c\n                                                   inner join users u on u.id = c.user_id\n                                          where c.post_id = :post_id\n                                          order by date desc ";
                            return [4 /*yield*/, this.sequelize.query(all_comments_sql, {
                                    replacements: {
                                        post_id: post_id
                                    }
                                })];
                        case 1:
                            _a = _b.sent(), data = _a[0], m1 = _a[1];
                            return [2 /*return*/, {
                                    status: true,
                                    data: data
                                }];
                    }
                });
            });
        };
        return PostsService_1;
    }());
    __setFunctionName(_classThis, "PostsService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        PostsService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return PostsService = _classThis;
}();
exports.PostsService = PostsService;
