import { decamelizeKeys, camelizeKeys } from 'humps';
import { stringify } from 'query-string';
import ky from 'ky';
import FormData from 'form-data';
import randomstring from 'randomstring';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
}

function __awaiter(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
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
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}

function bundler(services) {
    return function Bundle(options) {
        var _this = this;
        Object.entries(services || {}).forEach(function (_a) {
            var _b = __read(_a, 2), name = _b[0], ser = _b[1];
            _this[name] = new ser(options);
        });
    };
}
function skipAllCaps(key, convert, options) {
    return /^[A-Z0-9_]+$/.test(key) ? key : convert(key, options);
}

function defaultRequest(service, endpoint, _a) {
    var body = _a.body, query = _a.query, sudo = _a.sudo;
    var urlStr = "" + service.url + endpoint;
    if (query) {
        urlStr += "?" + stringify(decamelizeKeys(query), { arrayFormat: 'bracket' });
    }
    var headers = __assign({}, service.headers);
    if (sudo) {
        headers.sudo = "" + sudo;
    }
    return [
        urlStr,
        {
            headers: headers,
            body: body && typeof body !== 'object' ? body : undefined,
            // TODO
            // rejectUnauthorized: service.rejectUnauthorized,
            json: typeof body === 'object' ? decamelizeKeys(body, skipAllCaps) : undefined,
        },
    ];
}
function handleResponse(response) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, headers, status, statusText, rawBody, body;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, response];
                case 1:
                    _a = _b.sent(), headers = _a.headers, status = _a.status, statusText = _a.statusText;
                    return [4 /*yield*/, response.json()];
                case 2:
                    rawBody = _b.sent();
                    if (Array.isArray(body)) {
                        body = rawBody;
                    }
                    else if (typeof rawBody === 'object' && rawBody !== null) {
                        body = camelizeKeys(rawBody);
                    }
                    else {
                        body = {};
                    }
                    return [2 /*return*/, {
                            body: body,
                            headers: headers,
                            status: status,
                            statusText: statusText,
                        }];
            }
        });
    });
}
function get(service, endpoint, options) {
    if (options === void 0) { options = {}; }
    return __awaiter(this, void 0, void 0, function () {
        var _a, showPagination, maxPages, sudo, query, requestOptions, _b, headers, body, pagination, underLimit, more;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    showPagination = options.showPagination, maxPages = options.maxPages, sudo = options.sudo, query = __rest(options, ["showPagination", "maxPages", "sudo"]);
                    requestOptions = defaultRequest(service, endpoint, {
                        query: query,
                        sudo: sudo,
                    });
                    return [4 /*yield*/, handleResponse((_a = service.requester).get.apply(_a, __spread(requestOptions)))];
                case 1:
                    _b = _c.sent(), headers = _b.headers, body = _b.body;
                    pagination = {
                        total: headers['x-total'],
                        next: headers['x-next-page'] || null,
                        current: headers['x-page'] || null,
                        previous: headers['x-prev-page'] || null,
                        perPage: headers['x-per-page'],
                        totalPages: headers['x-total-pages'],
                    };
                    underLimit = maxPages ? pagination.current < maxPages : true;
                    if (!(!query.page && underLimit && pagination.next)) return [3 /*break*/, 3];
                    return [4 /*yield*/, get(service, endpoint, __assign({ page: pagination.next }, options))];
                case 2:
                    more = _c.sent();
                    return [2 /*return*/, __spread((Array.isArray(body) ? body : []), (Array.isArray(more) ? more : []))];
                case 3: return [2 /*return*/, (query.page || maxPages) && showPagination ? { data: body, pagination: pagination } : body];
            }
        });
    });
}
function stream(service, endpoint, options) {
    if (options === void 0) { options = ({}); }
    var _a;
    if (typeof service.requester.stream !== 'function') {
        throw new Error('Stream method is not implementated in requester!');
    }
    return (_a = service.requester).stream.apply(_a, __spread(defaultRequest(service, endpoint, {
        query: options,
    })));
}
function post(service, endpoint, options) {
    if (options === void 0) { options = {}; }
    return __awaiter(this, void 0, void 0, function () {
        var _a, sudo, body, response;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    sudo = options.sudo, body = __rest(options, ["sudo"]);
                    return [4 /*yield*/, handleResponse((_a = service.requester).post.apply(_a, __spread(defaultRequest(service, endpoint, {
                            body: body,
                            sudo: sudo,
                        }))))];
                case 1:
                    response = _b.sent();
                    return [2 /*return*/, response.body];
            }
        });
    });
}
function put(service, endpoint, options) {
    if (options === void 0) { options = {}; }
    return __awaiter(this, void 0, void 0, function () {
        var _a, sudo, body, response;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    sudo = options.sudo, body = __rest(options, ["sudo"]);
                    return [4 /*yield*/, handleResponse((_a = service.requester).put.apply(_a, __spread(defaultRequest(service, endpoint, {
                            body: body,
                        }))))];
                case 1:
                    response = _b.sent();
                    return [2 /*return*/, response.body];
            }
        });
    });
}
function del(service, endpoint, options) {
    if (options === void 0) { options = {}; }
    return __awaiter(this, void 0, void 0, function () {
        var _a, sudo, query, response;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    sudo = options.sudo, query = __rest(options, ["sudo"]);
                    return [4 /*yield*/, handleResponse((_a = service.requester).delete.apply(_a, __spread(defaultRequest(service, endpoint, {
                            query: query,
                        }))))];
                case 1:
                    response = _b.sent();
                    return [2 /*return*/, response.body];
            }
        });
    });
}

var BaseService = /** @class */ (function () {
    function BaseService(_a) {
        var token = _a.token, oauthToken = _a.oauthToken, sudo = _a.sudo, _b = _a.host, host = _b === void 0 ? 'https://gitlab.com' : _b, _c = _a.url, url = _c === void 0 ? '' : _c, _d = _a.version, version = _d === void 0 ? 'v4' : _d, _e = _a.rejectUnauthorized, rejectUnauthorized = _e === void 0 ? true : _e, _f = _a.requester, requester = _f === void 0 ? ky : _f;
        this.url = [host, 'api', version, url].join('/');
        this.headers = {};
        this.rejectUnauthorized = rejectUnauthorized;
        this.requester = requester;
        // Handle auth tokens
        if (oauthToken)
            this.headers.authorization = "Bearer " + oauthToken;
        else if (token)
            this.headers['private-token'] = token;
        // Set sudo
        if (sudo)
            this.headers['Sudo'] = "" + sudo;
    }
    return BaseService;
}());

var Groups = /** @class */ (function (_super) {
    __extends(Groups, _super);
    function Groups() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Groups.prototype.all = function (options) {
        return get(this, 'groups', options);
    };
    Groups.prototype.create = function (options) {
        return post(this, 'groups', options);
    };
    Groups.prototype.createLDAPLink = function (groupId, cn, groupAccess, provider, options) {
        var gId = encodeURIComponent(groupId);
        return post(this, "groups/" + gId + "/ldap_group_links", __assign({ cn: cn,
            groupAccess: groupAccess,
            provider: provider }, options));
    };
    Groups.prototype.edit = function (groupId, options) {
        var gId = encodeURIComponent(groupId);
        return put(this, "groups/" + gId, options);
    };
    Groups.prototype.remove = function (groupId, options) {
        var gId = encodeURIComponent(groupId);
        return del(this, "groups/" + gId, options);
    };
    Groups.prototype.removeLDAPLink = function (groupId, cn, _a) {
        if (_a === void 0) { _a = {}; }
        var provider = _a.provider, options = __rest(_a, ["provider"]);
        var gId = encodeURIComponent(groupId);
        var url = provider ? provider + "/" + cn : "" + cn;
        return del(this, "groups/" + gId + "/ldap_group_links/" + url, options);
    };
    Groups.prototype.search = function (nameOrPath, options) {
        return get(this, 'groups', __assign({ search: nameOrPath }, options));
    };
    Groups.prototype.show = function (groupId, options) {
        var gId = encodeURIComponent(groupId);
        return get(this, "groups/" + gId, options);
    };
    Groups.prototype.subgroups = function (groupId, options) {
        var gId = encodeURIComponent(groupId);
        return get(this, "groups/" + gId + "/subgroups", options);
    };
    Groups.prototype.syncLDAP = function (groupId, options) {
        var gId = encodeURIComponent(groupId);
        return post(this, "groups/" + gId + "/ldap_sync", options);
    };
    return Groups;
}(BaseService));

var ResourceAccessRequests = /** @class */ (function (_super) {
    __extends(ResourceAccessRequests, _super);
    function ResourceAccessRequests(resourceType, options) {
        return _super.call(this, __assign({ url: resourceType }, options)) || this;
    }
    ResourceAccessRequests.prototype.all = function (resourceId) {
        var rId = encodeURIComponent(resourceId);
        return get(this, rId + "/access_requests");
    };
    ResourceAccessRequests.prototype.request = function (resourceId) {
        var rId = encodeURIComponent(resourceId);
        return post(this, rId + "/access_requests");
    };
    ResourceAccessRequests.prototype.approve = function (resourceId, userId, _a) {
        var accessLevel = _a.accessLevel;
        var _b = __read([resourceId, userId].map(encodeURIComponent), 2), rId = _b[0], uId = _b[1];
        return post(this, rId + "/access_requests/" + uId + "/approve", {
            accessLevel: accessLevel,
        });
    };
    ResourceAccessRequests.prototype.deny = function (resourceId, userId) {
        var _a = __read([resourceId, userId].map(encodeURIComponent), 2), rId = _a[0], uId = _a[1];
        return del(this, rId + "/access_requests/" + uId);
    };
    return ResourceAccessRequests;
}(BaseService));

function url(projectId, resourceType, resourceId, awardId, noteId) {
    var _a = __read([projectId, resourceId].map(encodeURIComponent), 2), pId = _a[0], rId = _a[1];
    var output = [pId, resourceType, rId];
    if (noteId)
        output.push('notes', encodeURIComponent(noteId));
    output.push(encodeURIComponent('award_emoji'));
    if (awardId)
        output.push(encodeURIComponent(awardId));
    return output.join('/');
}
var ResourceAwardsEmojis = /** @class */ (function (_super) {
    __extends(ResourceAwardsEmojis, _super);
    function ResourceAwardsEmojis(resourceType, options) {
        var _this = _super.call(this, __assign({ url: 'projects' }, options)) || this;
        _this.resourceType = resourceType;
        return _this;
    }
    ResourceAwardsEmojis.prototype.all = function (projectId, resourceId, noteId, options) {
        return get(this, url(projectId, this.resourceType, resourceId, null, noteId), options);
    };
    ResourceAwardsEmojis.prototype.award = function (projectId, resourceId, name, noteId, options) {
        return post(this, url(projectId, this.resourceType, resourceId, null, noteId), __assign({ name: name }, options));
    };
    ResourceAwardsEmojis.prototype.remove = function (projectId, resourceId, awardId, noteId, options) {
        return del(this, url(projectId, this.resourceType, resourceId, awardId, noteId), options);
    };
    ResourceAwardsEmojis.prototype.show = function (projectId, resourceId, awardId, noteId, options) {
        return get(this, url(projectId, this.resourceType, resourceId, awardId, noteId), options);
    };
    return ResourceAwardsEmojis;
}(BaseService));

var ResourceBadges = /** @class */ (function (_super) {
    __extends(ResourceBadges, _super);
    function ResourceBadges(resourceType, options) {
        return _super.call(this, __assign({ url: resourceType }, options)) || this;
    }
    ResourceBadges.prototype.add = function (resourceId, options) {
        var rId = encodeURIComponent(resourceId);
        return post(this, rId + "/badges", options);
    };
    ResourceBadges.prototype.all = function (resourceId, options) {
        var rId = encodeURIComponent(resourceId);
        return get(this, rId + "/badges", options);
    };
    ResourceBadges.prototype.edit = function (resourceId, badgeId, options) {
        var _a = __read([resourceId, badgeId].map(encodeURIComponent), 2), rId = _a[0], bId = _a[1];
        return put(this, rId + "/badges/" + bId, options);
    };
    ResourceBadges.prototype.preview = function (resourceId, linkUrl, imageUrl, options) {
        var rId = encodeURIComponent(resourceId);
        return get(this, rId + "/badges/render", __assign({ linkUrl: linkUrl, imageUrl: imageUrl }, options));
    };
    ResourceBadges.prototype.remove = function (resourceId, badgeId, options) {
        var _a = __read([resourceId, badgeId].map(encodeURIComponent), 2), rId = _a[0], bId = _a[1];
        return del(this, rId + "/badges/" + bId, options);
    };
    ResourceBadges.prototype.show = function (resourceId, badgeId, options) {
        var _a = __read([resourceId, badgeId].map(encodeURIComponent), 2), rId = _a[0], bId = _a[1];
        return get(this, rId + "/badges/" + bId, options);
    };
    return ResourceBadges;
}(BaseService));

var ResourceCustomAttributes = /** @class */ (function (_super) {
    __extends(ResourceCustomAttributes, _super);
    function ResourceCustomAttributes(resourceType, options) {
        return _super.call(this, __assign({ url: resourceType }, options)) || this;
    }
    ResourceCustomAttributes.prototype.all = function (resourceId, options) {
        var rId = encodeURIComponent(resourceId);
        return get(this, rId + "/custom_attributes", options);
    };
    ResourceCustomAttributes.prototype.set = function (resourceId, customAttributeId, value, options) {
        var _a = __read([resourceId, customAttributeId].map(encodeURIComponent), 2), rId = _a[0], cId = _a[1];
        return put(this, rId + "/custom_attributes/" + cId, __assign({ value: value }, options));
    };
    ResourceCustomAttributes.prototype.remove = function (resourceId, customAttributeId, options) {
        var _a = __read([resourceId, customAttributeId].map(encodeURIComponent), 2), rId = _a[0], cId = _a[1];
        return del(this, rId + "/custom_attributes/" + cId, options);
    };
    ResourceCustomAttributes.prototype.show = function (resourceId, customAttributeId, options) {
        var _a = __read([resourceId, customAttributeId].map(encodeURIComponent), 2), rId = _a[0], cId = _a[1];
        return get(this, rId + "/custom_attributes/" + cId, options);
    };
    return ResourceCustomAttributes;
}(BaseService));

var ResourceDiscussions = /** @class */ (function (_super) {
    __extends(ResourceDiscussions, _super);
    function ResourceDiscussions(resourceType, resource2Type, options) {
        var _this = _super.call(this, __assign({ url: resourceType }, options)) || this;
        _this.resource2Type = resource2Type;
        return _this;
    }
    ResourceDiscussions.prototype.addNote = function (resourceId, resource2Id, discussionId, noteId, content, options) {
        if (!content)
            throw new Error('Missing required content argument');
        var _a = __read([resourceId, resource2Id, discussionId, noteId].map(encodeURIComponent), 4), rId = _a[0], r2Id = _a[1], dId = _a[2], nId = _a[3];
        return put(this, rId + "/" + this.resource2Type + "/" + r2Id + "/discussions/" + dId + "/notes/" + nId, __assign({ body: content }, options));
    };
    ResourceDiscussions.prototype.all = function (resourceId, resource2Id, options) {
        var _a = __read([resourceId, resource2Id].map(encodeURIComponent), 2), rId = _a[0], r2Id = _a[1];
        return get(this, rId + "/" + this.resource2Type + "/" + r2Id + "/discussions", options);
    };
    ResourceDiscussions.prototype.create = function (resourceId, resource2Id, content, options) {
        if (!content)
            throw new Error('Missing required content argument');
        var _a = __read([resourceId, resource2Id].map(encodeURIComponent), 2), rId = _a[0], r2Id = _a[1];
        return post(this, rId + "/" + this.resource2Type + "/" + r2Id + "/discussions", __assign({ body: content }, options));
    };
    ResourceDiscussions.prototype.editNote = function (resourceId, resource2Id, discussionId, noteId, options) {
        var _a = __read([resourceId, resource2Id, discussionId, noteId].map(encodeURIComponent), 4), rId = _a[0], r2Id = _a[1], dId = _a[2], nId = _a[3];
        return put(this, rId + "/" + this.resource2Type + "/" + r2Id + "/discussions/" + dId + "/notes/" + nId, { body: options });
    };
    ResourceDiscussions.prototype.removeNote = function (resourceId, resource2Id, discussionId, noteId, options) {
        var _a = __read([resourceId, resource2Id, discussionId, noteId].map(encodeURIComponent), 4), rId = _a[0], r2Id = _a[1], dId = _a[2], nId = _a[3];
        return del(this, rId + "/" + this.resource2Type + "/" + r2Id + "/discussions/" + dId + "/notes/" + nId, options);
    };
    ResourceDiscussions.prototype.show = function (resourceId, resource2Id, discussionId, options) {
        var _a = __read([resourceId, resource2Id, discussionId].map(encodeURIComponent), 3), rId = _a[0], r2Id = _a[1], dId = _a[2];
        return get(this, rId + "/" + this.resource2Type + "/" + r2Id + "/discussions/" + dId, options);
    };
    return ResourceDiscussions;
}(BaseService));

var ResourceIssueBoards = /** @class */ (function (_super) {
    __extends(ResourceIssueBoards, _super);
    function ResourceIssueBoards(resourceType, options) {
        return _super.call(this, __assign({ url: resourceType }, options)) || this;
    }
    ResourceIssueBoards.prototype.all = function (resourceId, options) {
        var rId = encodeURIComponent(resourceId);
        return get(this, rId + "/boards", options);
    };
    ResourceIssueBoards.prototype.create = function (resourceId, name, options) {
        var rId = encodeURIComponent(resourceId);
        return post(this, rId + "/boards", __assign({ name: name }, options));
    };
    ResourceIssueBoards.prototype.createList = function (resourceId, boardId, labelId, options) {
        var _a = __read([resourceId, boardId].map(encodeURIComponent), 2), rId = _a[0], bId = _a[1];
        return post(this, rId + "/boards/" + bId + "/lists", __assign({ labelId: labelId }, options));
    };
    ResourceIssueBoards.prototype.edit = function (resourceId, boardId, options) {
        var _a = __read([resourceId, boardId].map(encodeURIComponent), 2), rId = _a[0], bId = _a[1];
        return put(this, rId + "/boards/" + bId, options);
    };
    ResourceIssueBoards.prototype.editList = function (resourceId, boardId, listId, position, options) {
        var _a = __read([resourceId, boardId, listId].map(encodeURIComponent), 3), rId = _a[0], bId = _a[1], lId = _a[2];
        return put(this, rId + "/boards/" + bId + "/lists/" + lId, __assign({ position: position }, options));
    };
    ResourceIssueBoards.prototype.lists = function (resourceId, boardId, options) {
        var _a = __read([resourceId, boardId].map(encodeURIComponent), 2), rId = _a[0], bId = _a[1];
        return get(this, rId + "/boards/" + bId + "/lists", options);
    };
    ResourceIssueBoards.prototype.remove = function (resourceId, boardId, options) {
        var _a = __read([resourceId, boardId].map(encodeURIComponent), 2), rId = _a[0], bId = _a[1];
        return del(this, rId + "/boards/" + bId, options);
    };
    ResourceIssueBoards.prototype.removeList = function (resourceId, boardId, listId, options) {
        var _a = __read([resourceId, boardId, listId].map(encodeURIComponent), 3), rId = _a[0], bId = _a[1], lId = _a[2];
        return del(this, rId + "/boards/" + bId + "/lists/" + lId, options);
    };
    ResourceIssueBoards.prototype.show = function (resourceId, boardId, options) {
        var _a = __read([resourceId, boardId].map(encodeURIComponent), 2), rId = _a[0], bId = _a[1];
        return get(this, rId + "/boards/" + bId, options);
    };
    ResourceIssueBoards.prototype.showList = function (resourceId, boardId, listId, options) {
        var _a = __read([resourceId, boardId, listId].map(encodeURIComponent), 3), rId = _a[0], bId = _a[1], lId = _a[2];
        return get(this, rId + "/boards/" + bId + "/lists/" + lId, options);
    };
    return ResourceIssueBoards;
}(BaseService));

var ResourceMembers = /** @class */ (function (_super) {
    __extends(ResourceMembers, _super);
    function ResourceMembers(resourceType, options) {
        return _super.call(this, __assign({ url: resourceType }, options)) || this;
    }
    ResourceMembers.prototype.all = function (resourceId, includeInherited, options) {
        if (includeInherited === void 0) { includeInherited = false; }
        var rId = encodeURIComponent(resourceId);
        var url = [rId, 'members'];
        if (includeInherited)
            url.push('all');
        return get(this, url.join('/'), { options: options });
    };
    ResourceMembers.prototype.add = function (resourceId, userId, accessLevel, options) {
        var _a = __read([resourceId, userId].map(encodeURIComponent), 2), rId = _a[0], uId = _a[1];
        return post(this, rId + "/members", __assign({ userId: uId, accessLevel: accessLevel }, options));
    };
    ResourceMembers.prototype.edit = function (resourceId, userId, accessLevel, options) {
        var _a = __read([resourceId, userId].map(encodeURIComponent), 2), rId = _a[0], uId = _a[1];
        return put(this, rId + "/members/" + uId, __assign({ accessLevel: accessLevel }, options));
    };
    ResourceMembers.prototype.show = function (resourceId, userId, options) {
        var _a = __read([resourceId, userId].map(encodeURIComponent), 2), rId = _a[0], uId = _a[1];
        return get(this, rId + "/members/" + uId, options);
    };
    ResourceMembers.prototype.remove = function (resourceId, userId, options) {
        var _a = __read([resourceId, userId].map(encodeURIComponent), 2), rId = _a[0], uId = _a[1];
        return del(this, rId + "/members/" + uId, options);
    };
    return ResourceMembers;
}(BaseService));

var ResourceMilestones = /** @class */ (function (_super) {
    __extends(ResourceMilestones, _super);
    function ResourceMilestones(resourceType, options) {
        return _super.call(this, __assign({ url: resourceType }, options)) || this;
    }
    ResourceMilestones.prototype.all = function (resourceId, options) {
        var rId = encodeURIComponent(resourceId);
        return get(this, rId + "/milestones", options);
    };
    ResourceMilestones.prototype.create = function (resourceId, title, options) {
        var rId = encodeURIComponent(resourceId);
        return post(this, rId + "/milestones", __assign({ title: title }, options));
    };
    ResourceMilestones.prototype.edit = function (resourceId, milestoneId, options) {
        var _a = __read([resourceId, milestoneId].map(encodeURIComponent), 2), rId = _a[0], mId = _a[1];
        return put(this, rId + "/milestones/" + mId, options);
    };
    ResourceMilestones.prototype.issues = function (resourceId, milestoneId, options) {
        var _a = __read([resourceId, milestoneId].map(encodeURIComponent), 2), rId = _a[0], mId = _a[1];
        return get(this, rId + "/milestones/" + mId + "/issues", options);
    };
    ResourceMilestones.prototype.mergeRequests = function (resourceId, milestoneId, options) {
        var _a = __read([resourceId, milestoneId].map(encodeURIComponent), 2), rId = _a[0], mId = _a[1];
        return get(this, rId + "/milestones/" + mId + "/merge_requests", options);
    };
    ResourceMilestones.prototype.show = function (resourceId, milestoneId, options) {
        var _a = __read([resourceId, milestoneId].map(encodeURIComponent), 2), rId = _a[0], mId = _a[1];
        return get(this, rId + "/milestones/" + mId, options);
    };
    return ResourceMilestones;
}(BaseService));

var ResourceNotes = /** @class */ (function (_super) {
    __extends(ResourceNotes, _super);
    function ResourceNotes(resourceType, resource2Type, options) {
        var _this = _super.call(this, __assign({ url: resourceType }, options)) || this;
        _this.resource2Type = resource2Type;
        return _this;
    }
    ResourceNotes.prototype.all = function (resourceId, resource2Id, options) {
        var _a = __read([resourceId, resource2Id].map(encodeURIComponent), 2), rId = _a[0], r2Id = _a[1];
        return get(this, rId + "/" + this.resource2Type + "/" + r2Id + "/notes", options);
    };
    ResourceNotes.prototype.create = function (resourceId, resource2Id, body, options) {
        var _a = __read([resourceId, resource2Id].map(encodeURIComponent), 2), rId = _a[0], r2Id = _a[1];
        return post(this, rId + "/" + this.resource2Type + "/" + r2Id + "/notes", __assign({ body: body }, options));
    };
    ResourceNotes.prototype.edit = function (resourceId, resource2Id, noteId, body, options) {
        var _a = __read([resourceId, resource2Id, noteId].map(encodeURIComponent), 3), rId = _a[0], r2Id = _a[1], nId = _a[2];
        return put(this, rId + "/" + this.resource2Type + "/" + r2Id + "/notes/" + nId, __assign({ body: body }, options));
    };
    ResourceNotes.prototype.remove = function (resourceId, resource2Id, noteId, options) {
        var _a = __read([resourceId, resource2Id, noteId].map(encodeURIComponent), 3), rId = _a[0], r2Id = _a[1], nId = _a[2];
        return del(this, rId + "/" + this.resource2Type + "/" + r2Id + "/notes/" + nId, options);
    };
    ResourceNotes.prototype.show = function (resourceId, resource2Id, noteId, options) {
        var _a = __read([resourceId, resource2Id, noteId].map(encodeURIComponent), 3), rId = _a[0], r2Id = _a[1], nId = _a[2];
        return get(this, rId + "/" + this.resource2Type + "/" + r2Id + "/notes/" + nId, options);
    };
    return ResourceNotes;
}(BaseService));

var ResourceTemplates = /** @class */ (function (_super) {
    __extends(ResourceTemplates, _super);
    function ResourceTemplates(resourceType, options) {
        return _super.call(this, __assign({ url: ['templates', resourceType].join('/') }, options)) || this;
    }
    ResourceTemplates.prototype.all = function (options) {
        return get(this, '', options);
    };
    ResourceTemplates.prototype.show = function (resourceId, options) {
        var rId = encodeURIComponent(resourceId);
        return post(this, "" + rId, options);
    };
    return ResourceTemplates;
}(BaseService));

var ResourceVariables = /** @class */ (function (_super) {
    __extends(ResourceVariables, _super);
    function ResourceVariables(resourceType, options) {
        return _super.call(this, __assign({ url: resourceType }, options)) || this;
    }
    ResourceVariables.prototype.all = function (resourceId, options) {
        var rId = encodeURIComponent(resourceId);
        return get(this, rId + "/variables", options);
    };
    ResourceVariables.prototype.create = function (resourceId, options) {
        var rId = encodeURIComponent(resourceId);
        return post(this, rId + "/variables", options);
    };
    ResourceVariables.prototype.edit = function (resourceId, keyId, options) {
        var _a = __read([resourceId, keyId].map(encodeURIComponent), 2), rId = _a[0], kId = _a[1];
        return put(this, rId + "/variables/" + kId, options);
    };
    ResourceVariables.prototype.show = function (resourceId, keyId, options) {
        var _a = __read([resourceId, keyId].map(encodeURIComponent), 2), rId = _a[0], kId = _a[1];
        return get(this, rId + "/variables/" + kId, options);
    };
    ResourceVariables.prototype.remove = function (resourceId, keyId, options) {
        var _a = __read([resourceId, keyId].map(encodeURIComponent), 2), rId = _a[0], kId = _a[1];
        return del(this, rId + "/variables/" + kId, options);
    };
    return ResourceVariables;
}(BaseService));

var GroupAccessRequests = /** @class */ (function (_super) {
    __extends(GroupAccessRequests, _super);
    function GroupAccessRequests(options) {
        return _super.call(this, 'groups', options) || this;
    }
    return GroupAccessRequests;
}(ResourceAccessRequests));

var GroupBadges = /** @class */ (function (_super) {
    __extends(GroupBadges, _super);
    function GroupBadges(options) {
        return _super.call(this, 'groups', options) || this;
    }
    return GroupBadges;
}(ResourceBadges));

var GroupCustomAttributes = /** @class */ (function (_super) {
    __extends(GroupCustomAttributes, _super);
    function GroupCustomAttributes(options) {
        return _super.call(this, 'groups', options) || this;
    }
    return GroupCustomAttributes;
}(ResourceCustomAttributes));

var GroupIssueBoards = /** @class */ (function (_super) {
    __extends(GroupIssueBoards, _super);
    function GroupIssueBoards(options) {
        return _super.call(this, 'groups', options) || this;
    }
    return GroupIssueBoards;
}(ResourceIssueBoards));

var GroupMembers = /** @class */ (function (_super) {
    __extends(GroupMembers, _super);
    function GroupMembers(options) {
        return _super.call(this, 'groups', options) || this;
    }
    return GroupMembers;
}(ResourceMembers));

var GroupMilestones = /** @class */ (function (_super) {
    __extends(GroupMilestones, _super);
    function GroupMilestones(options) {
        return _super.call(this, 'groups', options) || this;
    }
    return GroupMilestones;
}(ResourceMilestones));

var GroupProjects = /** @class */ (function (_super) {
    __extends(GroupProjects, _super);
    function GroupProjects() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GroupProjects.prototype.all = function (groupId, options) {
        var gId = encodeURIComponent(groupId);
        return get(this, "groups/" + gId + "/projects", options);
    };
    GroupProjects.prototype.add = function (groupId, projectId, options) {
        var _a = __read([groupId, projectId].map(encodeURIComponent), 2), gId = _a[0], pId = _a[1];
        return post(this, "groups/" + gId + "/projects/" + pId, options);
    };
    return GroupProjects;
}(BaseService));

var GroupVariables = /** @class */ (function (_super) {
    __extends(GroupVariables, _super);
    function GroupVariables(options) {
        return _super.call(this, 'groups', options) || this;
    }
    return GroupVariables;
}(ResourceVariables));

var Epics = /** @class */ (function (_super) {
    __extends(Epics, _super);
    function Epics() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Epics.prototype.all = function (groupId, options) {
        var gId = encodeURIComponent(groupId);
        return get(this, "groups/" + gId + "/epics", options);
    };
    Epics.prototype.create = function (groupId, title, options) {
        var gId = encodeURIComponent(groupId);
        return post(this, "groups/" + gId + "/epics", __assign({ title: title }, options));
    };
    Epics.prototype.edit = function (groupId, epicId, options) {
        var _a = __read([groupId, epicId].map(encodeURIComponent), 2), gId = _a[0], eId = _a[1];
        return put(this, "groups/" + gId + "/epics/" + eId, options);
    };
    Epics.prototype.remove = function (groupId, epicId, options) {
        var _a = __read([groupId, epicId].map(encodeURIComponent), 2), gId = _a[0], eId = _a[1];
        return del(this, "groups/" + gId + "/epics/" + eId, options);
    };
    Epics.prototype.show = function (groupId, epicId, options) {
        var _a = __read([groupId, epicId].map(encodeURIComponent), 2), gId = _a[0], eId = _a[1];
        return get(this, "groups/" + gId + "/epics/" + eId, options);
    };
    return Epics;
}(BaseService));

var EpicIssues = /** @class */ (function (_super) {
    __extends(EpicIssues, _super);
    function EpicIssues() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EpicIssues.prototype.all = function (groupId, epicId, options) {
        var _a = __read([groupId, epicId].map(encodeURIComponent), 2), gId = _a[0], eId = _a[1];
        return get(this, "groups/" + gId + "/epics/" + eId + "/issues", options);
    };
    EpicIssues.prototype.assign = function (groupId, epicId, issueId, options) {
        var _a = __read([groupId, epicId, issueId].map(encodeURIComponent), 3), gId = _a[0], eId = _a[1], iId = _a[2];
        return put(this, "groups/" + gId + "/epics/" + eId + "/issues/" + iId, options);
    };
    EpicIssues.prototype.edit = function (groupId, epicId, issueId, options) {
        var _a = __read([groupId, epicId, issueId].map(encodeURIComponent), 3), gId = _a[0], eId = _a[1], iId = _a[2];
        return del(this, "groups/" + gId + "/epics/" + eId + "/issues/" + iId, options);
    };
    EpicIssues.prototype.remove = function (groupId, epicId, issueId, options) {
        var _a = __read([groupId, epicId, issueId].map(encodeURIComponent), 3), gId = _a[0], eId = _a[1], iId = _a[2];
        return del(this, "groups/" + gId + "/epics/" + eId + "/issues/" + iId, options);
    };
    return EpicIssues;
}(BaseService));

var EpicNotes = /** @class */ (function (_super) {
    __extends(EpicNotes, _super);
    function EpicNotes(options) {
        return _super.call(this, 'groups', 'epics', options) || this;
    }
    return EpicNotes;
}(ResourceNotes));

var EpicDiscussions = /** @class */ (function (_super) {
    __extends(EpicDiscussions, _super);
    function EpicDiscussions(options) {
        return _super.call(this, 'groups', 'epics', options) || this;
    }
    return EpicDiscussions;
}(ResourceDiscussions));

var Users = /** @class */ (function (_super) {
    __extends(Users, _super);
    function Users() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Users.prototype.all = function (options) {
        return get(this, 'users', options);
    };
    Users.prototype.activities = function (options) {
        return get(this, 'users/activities', options);
    };
    Users.prototype.projects = function (userId, options) {
        var uId = encodeURIComponent(userId);
        return get(this, "users/" + uId + "/projects", options);
    };
    Users.prototype.block = function (userId, options) {
        var uId = encodeURIComponent(userId);
        return post(this, "users/" + uId + "/block", options);
    };
    Users.prototype.create = function (options) {
        return post(this, 'users', options);
    };
    Users.prototype.current = function (options) {
        return get(this, 'user', options);
    };
    Users.prototype.edit = function (userId, options) {
        var uId = encodeURIComponent(userId);
        return put(this, "users/" + uId, options);
    };
    Users.prototype.events = function (userId, options) {
        var uId = encodeURIComponent(userId);
        return get(this, "users/" + uId + "/events", options);
    };
    Users.prototype.session = function (email, password, options) {
        return post(this, 'session', __assign({ email: email,
            password: password }, options));
    };
    Users.prototype.search = function (emailOrUsername, options) {
        return get(this, 'users', __assign({ search: emailOrUsername }, options));
    };
    Users.prototype.show = function (userId, options) {
        var uId = encodeURIComponent(userId);
        return get(this, "users/" + uId, options);
    };
    Users.prototype.remove = function (userId, options) {
        var uId = encodeURIComponent(userId);
        return del(this, "users/" + uId, options);
    };
    Users.prototype.unblock = function (userId, options) {
        var uId = encodeURIComponent(userId);
        return post(this, "users/" + uId + "/unblock", options);
    };
    return Users;
}(BaseService));

var UserCustomAttributes = /** @class */ (function (_super) {
    __extends(UserCustomAttributes, _super);
    function UserCustomAttributes(options) {
        return _super.call(this, 'users', options) || this;
    }
    return UserCustomAttributes;
}(ResourceCustomAttributes));

var url$1 = function (userId) { return (userId ? "users/" + encodeURIComponent(userId) + "/emails" : 'user/emails'); };
var UserEmails = /** @class */ (function (_super) {
    __extends(UserEmails, _super);
    function UserEmails() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UserEmails.prototype.all = function (_a) {
        if (_a === void 0) { _a = {}; }
        var userId = _a.userId, options = __rest(_a, ["userId"]);
        return get(this, url$1(userId), options);
    };
    UserEmails.prototype.add = function (email, _a) {
        if (_a === void 0) { _a = {}; }
        var userId = _a.userId, options = __rest(_a, ["userId"]);
        return post(this, url$1(userId), __assign({ email: email }, options));
    };
    UserEmails.prototype.show = function (emailId, options) {
        var eId = encodeURIComponent(emailId);
        return get(this, "user/emails/" + eId, options);
    };
    UserEmails.prototype.remove = function (emailId, _a) {
        if (_a === void 0) { _a = {}; }
        var userId = _a.userId, options = __rest(_a, ["userId"]);
        var eId = encodeURIComponent(emailId);
        return del(this, url$1(userId) + "/" + eId, options);
    };
    return UserEmails;
}(BaseService));

var UserImpersonationTokens = /** @class */ (function (_super) {
    __extends(UserImpersonationTokens, _super);
    function UserImpersonationTokens() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UserImpersonationTokens.prototype.all = function (userId, options) {
        var uId = encodeURIComponent(userId);
        return get(this, "users/" + uId + "/impersonation_tokens", options);
    };
    UserImpersonationTokens.prototype.add = function (userId, name, scopes, expiresAt, options) {
        var uId = encodeURIComponent(userId);
        return post(this, "users/" + uId + "/impersonation_tokens", __assign({ name: name,
            expiresAt: expiresAt,
            scopes: scopes }, options));
    };
    UserImpersonationTokens.prototype.show = function (userId, tokenId, options) {
        var _a = __read([userId, tokenId].map(encodeURIComponent), 2), uId = _a[0], tId = _a[1];
        return get(this, "users/" + uId + "/impersonation_tokens/" + tId, options);
    };
    UserImpersonationTokens.prototype.revoke = function (userId, tokenId, options) {
        var _a = __read([userId, tokenId].map(encodeURIComponent), 2), uId = _a[0], tId = _a[1];
        return del(this, "users/" + uId + "/impersonation_tokens/" + tId, options);
    };
    return UserImpersonationTokens;
}(BaseService));

var url$2 = function (userId) { return (userId ? "users/" + encodeURIComponent(userId) + "/keys" : 'user/keys'); };
var UserKeys = /** @class */ (function (_super) {
    __extends(UserKeys, _super);
    function UserKeys() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UserKeys.prototype.all = function (_a) {
        if (_a === void 0) { _a = {}; }
        var userId = _a.userId, options = __rest(_a, ["userId"]);
        return get(this, url$2(userId), options);
    };
    UserKeys.prototype.create = function (title, key, _a) {
        if (_a === void 0) { _a = {}; }
        var userId = _a.userId, options = __rest(_a, ["userId"]);
        return post(this, url$2(userId), __assign({ title: title,
            key: key }, options));
    };
    UserKeys.prototype.show = function (keyId, options) {
        var kId = encodeURIComponent(keyId);
        return get(this, "user/keys/" + kId, options);
    };
    UserKeys.prototype.remove = function (keyId, _a) {
        if (_a === void 0) { _a = {}; }
        var userId = _a.userId, options = __rest(_a, ["userId"]);
        var kId = encodeURIComponent(keyId);
        return del(this, url$2(userId) + "/" + kId, options);
    };
    return UserKeys;
}(BaseService));

var url$3 = function (userId) { return (userId ? "users/" + encodeURIComponent(userId) + "/gpg_keys" : 'users/gpg_keys'); };
var UserGPGKeys = /** @class */ (function (_super) {
    __extends(UserGPGKeys, _super);
    function UserGPGKeys() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UserGPGKeys.prototype.all = function (_a) {
        if (_a === void 0) { _a = {}; }
        var userId = _a.userId, options = __rest(_a, ["userId"]);
        return get(this, url$3(userId), options);
    };
    UserGPGKeys.prototype.add = function (title, key, _a) {
        if (_a === void 0) { _a = {}; }
        var userId = _a.userId, options = __rest(_a, ["userId"]);
        return post(this, url$3(userId), __assign({ title: title,
            key: key }, options));
    };
    UserGPGKeys.prototype.show = function (keyId, _a) {
        if (_a === void 0) { _a = {}; }
        var userId = _a.userId, options = __rest(_a, ["userId"]);
        var kId = encodeURIComponent(keyId);
        return get(this, url$3(userId) + "/" + kId, options);
    };
    UserGPGKeys.prototype.remove = function (keyId, _a) {
        if (_a === void 0) { _a = {}; }
        var userId = _a.userId, options = __rest(_a, ["userId"]);
        var kId = encodeURIComponent(keyId);
        return del(this, url$3(userId) + "/" + kId, options);
    };
    return UserGPGKeys;
}(BaseService));

var Branches = /** @class */ (function (_super) {
    __extends(Branches, _super);
    function Branches() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Branches.prototype.all = function (projectId, options) {
        var pId = encodeURIComponent(projectId);
        return get(this, "projects/" + pId + "/repository/branches", options);
    };
    Branches.prototype.create = function (projectId, branchName, ref, options) {
        var pId = encodeURIComponent(projectId);
        return post(this, "projects/" + pId + "/repository/branches", __assign({ branch: branchName, ref: ref }, options));
    };
    Branches.prototype.protect = function (projectId, branchName, options) {
        var pId = encodeURIComponent(projectId);
        return post(this, "projects/" + pId + "/protected_branches", __assign({ name: branchName }, options));
    };
    Branches.prototype.remove = function (projectId, branchName, options) {
        var _a = __read([projectId, branchName].map(encodeURIComponent), 2), pId = _a[0], bName = _a[1];
        return del(this, "projects/" + pId + "/repository/branches/" + bName, options);
    };
    Branches.prototype.show = function (projectId, branchName, options) {
        var _a = __read([projectId, branchName].map(encodeURIComponent), 2), pId = _a[0], bName = _a[1];
        return get(this, "projects/" + pId + "/repository/branches/" + bName, options);
    };
    Branches.prototype.unprotect = function (projectId, branchName, options) {
        var _a = __read([projectId, branchName].map(encodeURIComponent), 2), pId = _a[0], bName = _a[1];
        return put(this, "projects/" + pId + "/repository/branches/" + bName + "/unprotect", options);
    };
    return Branches;
}(BaseService));

var Commits = /** @class */ (function (_super) {
    __extends(Commits, _super);
    function Commits() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Commits.prototype.all = function (projectId, options) {
        var pId = encodeURIComponent(projectId);
        return get(this, "projects/" + pId + "/repository/commits", options);
    };
    Commits.prototype.cherryPick = function (projectId, sha, branch, options) {
        var pId = encodeURIComponent(projectId);
        return post(this, "projects/" + pId + "/repository/commits/" + sha + "/cherry_pick", __assign({ branch: branch }, options));
    };
    Commits.prototype.comments = function (projectId, sha, options) {
        var pId = encodeURIComponent(projectId);
        return get(this, "projects/" + pId + "/repository/commits/" + sha + "/comments", options);
    };
    Commits.prototype.create = function (projectId, branch, message, actions, options) {
        if (actions === void 0) { actions = []; }
        var pId = encodeURIComponent(projectId);
        return post(this, "projects/" + pId + "/repository/commits", __assign({ branch: branch, commitMessage: message, actions: actions }, options));
    };
    Commits.prototype.createComment = function (projectId, sha, note, options) {
        var pId = encodeURIComponent(projectId);
        return post(this, "projects/" + pId + "/repository/commits/" + sha + "/comments", __assign({ note: note }, options));
    };
    Commits.prototype.diff = function (projectId, sha, options) {
        var pId = encodeURIComponent(projectId);
        return get(this, "projects/" + pId + "/repository/commits/" + sha + "/diff", options);
    };
    Commits.prototype.editStatus = function (projectId, sha, options) {
        var pId = encodeURIComponent(projectId);
        return post(this, "projects/" + pId + "/statuses/" + sha, options);
    };
    Commits.prototype.references = function (projectId, sha, options) {
        var pId = encodeURIComponent(projectId);
        return get(this, "projects/" + pId + "/repository/commits/" + sha + "/refs", options);
    };
    Commits.prototype.show = function (projectId, sha, options) {
        var pId = encodeURIComponent(projectId);
        return get(this, "projects/" + pId + "/repository/commits/" + sha, options);
    };
    Commits.prototype.status = function (projectId, sha, options) {
        var pId = encodeURIComponent(projectId);
        return get(this, "projects/" + pId + "/repository/commits/" + sha + "/statuses", options);
    };
    Commits.prototype.mergeRequests = function (projectId, sha) {
        var pId = encodeURIComponent(projectId);
        return get(this, "projects/" + pId + "/repository/commits/" + sha + "/merge_requests");
    };
    return Commits;
}(BaseService));

var CommitDiscussions = /** @class */ (function (_super) {
    __extends(CommitDiscussions, _super);
    function CommitDiscussions(options) {
        return _super.call(this, 'projects', 'commits', options) || this;
    }
    return CommitDiscussions;
}(ResourceDiscussions));

var Deployments = /** @class */ (function (_super) {
    __extends(Deployments, _super);
    function Deployments() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Deployments.prototype.all = function (projectId, options) {
        var pId = encodeURIComponent(projectId);
        return get(this, "projects/" + pId + "/deployments", options);
    };
    Deployments.prototype.show = function (projectId, deploymentId, options) {
        var _a = __read([projectId, deploymentId].map(encodeURIComponent), 2), pId = _a[0], dId = _a[1];
        return post(this, "projects/" + pId + "/deployments/" + dId, options);
    };
    return Deployments;
}(BaseService));

var DeployKeys = /** @class */ (function (_super) {
    __extends(DeployKeys, _super);
    function DeployKeys() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DeployKeys.prototype.add = function (projectId, options) {
        var pId = encodeURIComponent(projectId);
        return post(this, "projects/" + pId + "/deploy_keys", options);
    };
    DeployKeys.prototype.all = function (projectId, options) {
        var pId = encodeURIComponent(projectId);
        return get(this, "projects/" + pId + "/deploy_keys", options);
    };
    DeployKeys.prototype.show = function (projectId, keyId, options) {
        var _a = __read([projectId, keyId].map(encodeURIComponent), 2), pId = _a[0], kId = _a[1];
        return get(this, "projects/" + pId + "/deploy_keys/" + kId, options);
    };
    DeployKeys.prototype.enable = function (projectId, keyId, options) {
        var _a = __read([projectId, keyId].map(encodeURIComponent), 2), pId = _a[0], kId = _a[1];
        return post(this, "projects/" + pId + "/deploy_keys/" + kId + "/enable", options);
    };
    return DeployKeys;
}(BaseService));

var Environments = /** @class */ (function (_super) {
    __extends(Environments, _super);
    function Environments() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Environments.prototype.all = function (projectId, options) {
        var pId = encodeURIComponent(projectId);
        return get(this, "projects/" + pId + "/environments", options);
    };
    Environments.prototype.create = function (projectId, options) {
        var pId = encodeURIComponent(projectId);
        return post(this, "projects/" + pId + "/environments", options);
    };
    Environments.prototype.edit = function (projectId, environmentId, options) {
        var _a = __read([projectId, environmentId].map(encodeURIComponent), 2), pId = _a[0], eId = _a[1];
        return put(this, "projects/" + pId + "/environments/" + eId, options);
    };
    Environments.prototype.remove = function (projectId, environmentId, options) {
        var _a = __read([projectId, environmentId].map(encodeURIComponent), 2), pId = _a[0], eId = _a[1];
        return del(this, "projects/" + pId + "/environments/" + eId, options);
    };
    Environments.prototype.stop = function (projectId, environmentId, options) {
        var _a = __read([projectId, environmentId].map(encodeURIComponent), 2), pId = _a[0], eId = _a[1];
        return post(this, "projects/" + pId + "/environments/" + eId + "/stop", options);
    };
    return Environments;
}(BaseService));

var Issues = /** @class */ (function (_super) {
    __extends(Issues, _super);
    function Issues() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Issues.prototype.addSpentTime = function (projectId, issueId, duration, options) {
        var _a = __read([projectId, issueId].map(encodeURIComponent), 2), pId = _a[0], iId = _a[1];
        return post(this, "projects/" + pId + "/issues/" + iId + "/add_spent_time", __assign({ duration: duration }, options));
    };
    Issues.prototype.addTimeEstimate = function (projectId, issueId, duration, options) {
        var _a = __read([projectId, issueId].map(encodeURIComponent), 2), pId = _a[0], iId = _a[1];
        return post(this, "projects/" + pId + "/issues/" + iId + "/time_estimate", __assign({ duration: duration }, options));
    };
    Issues.prototype.all = function (_a) {
        var projectId = _a.projectId, options = __rest(_a, ["projectId"]);
        var url = projectId ? "projects/" + encodeURIComponent(projectId) + "/issues" : 'issues';
        return get(this, url, options);
    };
    Issues.prototype.create = function (projectId, options) {
        var pId = encodeURIComponent(projectId);
        return post(this, "projects/" + pId + "/issues", options);
    };
    Issues.prototype.edit = function (projectId, issueId, options) {
        var _a = __read([projectId, issueId].map(encodeURIComponent), 2), pId = _a[0], iId = _a[1];
        return put(this, "projects/" + pId + "/issues/" + iId, options);
    };
    Issues.prototype.link = function (projectId, issueIId, targetProjectId, targetIssueId, options) {
        var _a = __read([projectId, issueIId].map(encodeURIComponent), 2), pId = _a[0], iId = _a[1];
        var _b = __read([targetProjectId, targetIssueId].map(encodeURIComponent), 2), targetpId = _b[0], targetIId = _b[1];
        return post(this, "projects/" + pId + "/issues/" + iId + "/links", __assign({ targetProjectId: targetpId, targetIssueId: targetIId }, options));
    };
    Issues.prototype.participants = function (projectId, issueId, options) {
        var _a = __read([projectId, issueId].map(encodeURIComponent), 2), pId = _a[0], iId = _a[1];
        return get(this, "projects/" + pId + "/issues/" + iId + "/participants", options);
    };
    Issues.prototype.remove = function (projectId, issueId, options) {
        var _a = __read([projectId, issueId].map(encodeURIComponent), 2), pId = _a[0], iId = _a[1];
        return del(this, "projects/" + pId + "/issues/" + iId, options);
    };
    Issues.prototype.resetSpentTime = function (projectId, issueId, options) {
        var _a = __read([projectId, issueId].map(encodeURIComponent), 2), pId = _a[0], iId = _a[1];
        return post(this, "projects/" + pId + "/issues/" + iId + "/reset_spent_time", options);
    };
    Issues.prototype.resetTimeEstimate = function (projectId, issueId, options) {
        var _a = __read([projectId, issueId].map(encodeURIComponent), 2), pId = _a[0], iId = _a[1];
        return post(this, "projects/" + pId + "/issues/" + iId + "/reset_time_estimate", options);
    };
    Issues.prototype.show = function (projectId, issueId, options) {
        var _a = __read([projectId, issueId].map(encodeURIComponent), 2), pId = _a[0], iId = _a[1];
        return get(this, "projects/" + pId + "/issues/" + iId, options);
    };
    Issues.prototype.subscribe = function (projectId, issueId, options) {
        var _a = __read([projectId, issueId].map(encodeURIComponent), 2), pId = _a[0], iId = _a[1];
        return post(this, "projects/" + pId + "/issues/" + iId + "/subscribe", options);
    };
    Issues.prototype.timeStats = function (projectId, issueId, options) {
        var _a = __read([projectId, issueId].map(encodeURIComponent), 2), pId = _a[0], iId = _a[1];
        return get(this, "projects/" + pId + "/issues/" + iId + "/time_stats", options);
    };
    Issues.prototype.unsubscribe = function (projectId, issueId, options) {
        var _a = __read([projectId, issueId].map(encodeURIComponent), 2), pId = _a[0], iId = _a[1];
        return del(this, "projects/" + pId + "/issues/" + iId + "/unsubscribe", options);
    };
    return Issues;
}(BaseService));

var IssueNotes = /** @class */ (function (_super) {
    __extends(IssueNotes, _super);
    function IssueNotes(options) {
        return _super.call(this, 'projects', 'issues', options) || this;
    }
    return IssueNotes;
}(ResourceNotes));

var IssueDiscussions = /** @class */ (function (_super) {
    __extends(IssueDiscussions, _super);
    function IssueDiscussions(options) {
        return _super.call(this, 'projects', 'issues', options) || this;
    }
    return IssueDiscussions;
}(ResourceDiscussions));

var IssueAwardEmojis = /** @class */ (function (_super) {
    __extends(IssueAwardEmojis, _super);
    function IssueAwardEmojis(options) {
        return _super.call(this, 'issues', options) || this;
    }
    return IssueAwardEmojis;
}(ResourceAwardsEmojis));

var Jobs = /** @class */ (function (_super) {
    __extends(Jobs, _super);
    function Jobs() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Jobs.prototype.all = function (projectId, options) {
        var pId = encodeURIComponent(projectId);
        return get(this, "projects/" + pId + "/jobs", options);
    };
    Jobs.prototype.cancel = function (projectId, jobId, options) {
        var _a = __read([projectId, jobId].map(encodeURIComponent), 2), pId = _a[0], jId = _a[1];
        return post(this, "projects/" + pId + "/jobs/" + jId + "/cancel", options);
    };
    Jobs.prototype.downloadSingleArtifactFile = function (projectId, jobId, artifactPath, _a) {
        var _b = _a.stream, stream$$1 = _b === void 0 ? false : _b, options = __rest(_a, ["stream"]);
        var _c = __read([projectId, jobId].map(encodeURIComponent), 2), pId = _c[0], jId = _c[1];
        if (stream$$1) {
            return stream(this, "projects/" + pId + "/jobs/" + jId + "/artifacts/" + artifactPath, options);
        }
        return get(this, "projects/" + pId + "/jobs/" + jId + "/artifacts/" + artifactPath, options);
    };
    Jobs.prototype.downloadLatestArtifactFile = function (projectId, ref, name, _a) {
        var _b = _a.stream, stream$$1 = _b === void 0 ? false : _b, options = __rest(_a, ["stream"]);
        var _c = __read([projectId, ref, name].map(encodeURIComponent), 3), pId = _c[0], rId = _c[1], jobName = _c[2];
        if (stream$$1) {
            return stream(this, "projects/" + pId + "/jobs/artifacts/" + rId + "/download?job=" + jobName, options);
        }
        return get(this, "projects/" + pId + "/jobs/artifacts/" + rId + "/download?job=" + jobName, options);
    };
    Jobs.prototype.downloadTraceFile = function (projectId, jobId, options) {
        var _a = __read([projectId, jobId].map(encodeURIComponent), 2), pId = _a[0], jId = _a[1];
        return get(this, "projects/" + pId + "/jobs/" + jId + "/trace", options);
    };
    Jobs.prototype.erase = function (projectId, jobId, options) {
        var _a = __read([projectId, jobId].map(encodeURIComponent), 2), pId = _a[0], jId = _a[1];
        return post(this, "projects/" + pId + "/jobs/" + jId + "/erase", options);
    };
    Jobs.prototype.keepArtifacts = function (projectId, jobId, options) {
        var _a = __read([projectId, jobId].map(encodeURIComponent), 2), pId = _a[0], jId = _a[1];
        return post(this, "projects/" + pId + "/jobs/" + jId + "/artifacts/keep", options);
    };
    Jobs.prototype.play = function (projectId, jobId, options) {
        var _a = __read([projectId, jobId].map(encodeURIComponent), 2), pId = _a[0], jId = _a[1];
        return post(this, "projects/" + pId + "/jobs/" + jId + "/play", options);
    };
    Jobs.prototype.retry = function (projectId, jobId, options) {
        var _a = __read([projectId, jobId].map(encodeURIComponent), 2), pId = _a[0], jId = _a[1];
        return post(this, "projects/" + pId + "/jobs/" + jId + "/retry", options);
    };
    Jobs.prototype.show = function (projectId, jobId, options) {
        var _a = __read([projectId, jobId].map(encodeURIComponent), 2), pId = _a[0], jId = _a[1];
        return get(this, "projects/" + pId + "/jobs/" + jId, options);
    };
    Jobs.prototype.showPipelineJobs = function (projectId, pipelineId, options) {
        var _a = __read([projectId, pipelineId].map(encodeURIComponent), 2), pId = _a[0], ppId = _a[1];
        return get(this, "projects/" + pId + "/pipelines/" + ppId + "/jobs", options);
    };
    return Jobs;
}(BaseService));

var Labels = /** @class */ (function (_super) {
    __extends(Labels, _super);
    function Labels() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Labels.prototype.all = function (projectId, options) {
        var pId = encodeURIComponent(projectId);
        return get(this, "projects/" + pId + "/labels", options);
    };
    Labels.prototype.create = function (projectId, options) {
        var pId = encodeURIComponent(projectId);
        return post(this, "projects/" + pId + "/labels", options);
    };
    Labels.prototype.edit = function (projectId, labelName, options) {
        var pId = encodeURIComponent(projectId);
        return put(this, "projects/" + pId + "/labels", __assign({ name: labelName }, options));
    };
    Labels.prototype.remove = function (projectId, labelName, options) {
        var pId = encodeURIComponent(projectId);
        return del(this, "projects/" + pId + "/labels", __assign({ name: labelName }, options));
    };
    Labels.prototype.subscribe = function (projectId, labelId, options) {
        var _a = __read([projectId, labelId].map(encodeURIComponent), 2), pId = _a[0], lId = _a[1];
        return post(this, "projects/" + pId + "/issues/" + lId + "/subscribe", options);
    };
    Labels.prototype.unsubscribe = function (projectId, labelId, options) {
        var _a = __read([projectId, labelId].map(encodeURIComponent), 2), pId = _a[0], lId = _a[1];
        return del(this, "projects/" + pId + "/issues/" + lId + "/unsubscribe", options);
    };
    return Labels;
}(BaseService));

var MergeRequests = /** @class */ (function (_super) {
    __extends(MergeRequests, _super);
    function MergeRequests() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MergeRequests.prototype.accept = function (projectId, mergerequestIId, options) {
        var _a = __read([projectId, mergerequestIId].map(encodeURIComponent), 2), pId = _a[0], mIId = _a[1];
        return put(this, "projects/" + pId + "/merge_requests/" + mIId + "/merge", options);
    };
    MergeRequests.prototype.addSpentTime = function (projectId, mergerequestIId, duration, options) {
        var _a = __read([projectId, mergerequestIId].map(encodeURIComponent), 2), pId = _a[0], mIId = _a[1];
        return post(this, "projects/" + pId + "/issues/" + mIId + "/add_spent_time", __assign({ duration: duration }, options));
    };
    MergeRequests.prototype.addTimeEstimate = function (projectId, mergerequestIId, duration, options) {
        var _a = __read([projectId, mergerequestIId].map(encodeURIComponent), 2), pId = _a[0], mIId = _a[1];
        return post(this, "projects/" + pId + "/issues/" + mIId + "/time_estimate", __assign({ duration: duration }, options));
    };
    MergeRequests.prototype.all = function (_a) {
        var projectId = _a.projectId, groupId = _a.groupId, options = __rest(_a, ["projectId", "groupId"]);
        var url;
        if (projectId) {
            url = "projects/" + encodeURIComponent(projectId) + "/merge_requests";
        }
        else if (groupId) {
            url = "groups/" + encodeURIComponent(groupId) + "/merge_requests";
        }
        else {
            url = 'merge_requests';
        }
        return get(this, url, options);
    };
    MergeRequests.prototype.approve = function (projectId, mergerequestIId, options) {
        var _a = __read([projectId, mergerequestIId].map(encodeURIComponent), 2), pId = _a[0], mIId = _a[1];
        return post(this, "projects/" + pId + "/merge_requests/" + mIId + "/approve", options);
    };
    MergeRequests.prototype.approvals = function (projectId, _a) {
        var mergerequestIId = _a.mergerequestIId, options = __rest(_a, ["mergerequestIId"]);
        var _b = __read([projectId, mergerequestIId].map(encodeURIComponent), 2), pId = _b[0], mIId = _b[1];
        var url;
        if (mergerequestIId) {
            url = "projects/" + pId + "/merge_requests/" + mIId + "/approvals";
        }
        else {
            url = "projects/" + pId + "/approvals";
        }
        return get(this, url, options);
    };
    MergeRequests.prototype.approvers = function (projectId, approverIds, approverGroupIds, _a) {
        var mergerequestIId = _a.mergerequestIId, options = __rest(_a, ["mergerequestIId"]);
        var _b = __read([projectId, mergerequestIId].map(encodeURIComponent), 2), pId = _b[0], mIId = _b[1];
        var url;
        if (mergerequestIId) {
            url = "projects/" + pId + "/merge_requests/" + mIId + "/approvals";
        }
        else {
            url = "projects/" + pId + "/approvals";
        }
        return post(this, url, __assign({ approverIds: approverIds, approverGroupIds: approverGroupIds }, options));
    };
    MergeRequests.prototype.cancelOnPipelineSucess = function (projectId, mergerequestIId, options) {
        var _a = __read([projectId, mergerequestIId].map(encodeURIComponent), 2), pId = _a[0], mIId = _a[1];
        return put(this, "projects/" + pId + "/merge_requests/" + mIId + "/cancel_merge_when_pipeline_succeeds", options);
    };
    MergeRequests.prototype.changes = function (projectId, mergerequestIId, options) {
        var _a = __read([projectId, mergerequestIId].map(encodeURIComponent), 2), pId = _a[0], mIId = _a[1];
        return get(this, "projects/" + pId + "/merge_requests/" + mIId + "/changes", options);
    };
    MergeRequests.prototype.closesIssues = function (projectId, mergerequestIId, options) {
        var _a = __read([projectId, mergerequestIId].map(encodeURIComponent), 2), pId = _a[0], mIId = _a[1];
        return get(this, "projects/" + pId + "/merge_requests/" + mIId + "/closes_issues", options);
    };
    MergeRequests.prototype.commits = function (projectId, mergerequestIId, options) {
        var _a = __read([projectId, mergerequestIId].map(encodeURIComponent), 2), pId = _a[0], mIId = _a[1];
        return get(this, "projects/" + pId + "/merge_requests/" + mIId + "/commits", options);
    };
    MergeRequests.prototype.create = function (projectId, sourceBranch, targetBranch, title, options) {
        var pId = encodeURIComponent(projectId);
        return post(this, "projects/" + pId + "/merge_requests", __assign({ id: pId, sourceBranch: sourceBranch,
            targetBranch: targetBranch,
            title: title }, options));
    };
    MergeRequests.prototype.edit = function (projectId, mergerequestIId, options) {
        var _a = __read([projectId, mergerequestIId].map(encodeURIComponent), 2), pId = _a[0], mIId = _a[1];
        return put(this, "projects/" + pId + "/merge_requests/" + mIId, options);
    };
    MergeRequests.prototype.editApprovals = function (projectId, _a) {
        var mergerequestIId = _a.mergerequestIId, options = __rest(_a, ["mergerequestIId"]);
        var _b = __read([projectId, mergerequestIId].map(encodeURIComponent), 2), pId = _b[0], mIId = _b[1];
        var url;
        if (mergerequestIId) {
            url = "projects/" + pId + "/merge_requests/" + mIId + "/approvals";
        }
        else {
            url = "projects/" + pId + "/approvals";
        }
        return post(this, url, options);
    };
    MergeRequests.prototype.pipelines = function (projectId, mergerequestIId, options) {
        var _a = __read([projectId, mergerequestIId].map(encodeURIComponent), 2), pId = _a[0], mIId = _a[1];
        return get(this, "projects/" + pId + "/merge_requests/" + mIId + "/pipelines", options);
    };
    MergeRequests.prototype.remove = function (projectId, mergerequestIId, options) {
        var _a = __read([projectId, mergerequestIId].map(encodeURIComponent), 2), pId = _a[0], mIId = _a[1];
        return del(this, "projects/" + pId + "/merge_requests/" + mIId, options);
    };
    MergeRequests.prototype.resetSpentTime = function (projectId, mergerequestIId, options) {
        var _a = __read([projectId, mergerequestIId].map(encodeURIComponent), 2), pId = _a[0], mIId = _a[1];
        return post(this, "projects/" + pId + "/merge_requests/" + mIId + "/reset_spent_time", options);
    };
    MergeRequests.prototype.resetTimeEstimate = function (projectId, mergerequestIId, options) {
        var _a = __read([projectId, mergerequestIId].map(encodeURIComponent), 2), pId = _a[0], mIId = _a[1];
        return post(this, "projects/" + pId + "/merge_requests/" + mIId + "/reset_time_estimate", options);
    };
    MergeRequests.prototype.show = function (projectId, mergerequestIId, options) {
        var _a = __read([projectId, mergerequestIId].map(encodeURIComponent), 2), pId = _a[0], mIId = _a[1];
        return get(this, "projects/" + pId + "/merge_requests/" + mIId, options);
    };
    MergeRequests.prototype.timeStats = function (projectId, mergerequestIId, options) {
        var _a = __read([projectId, mergerequestIId].map(encodeURIComponent), 2), pId = _a[0], mIId = _a[1];
        return get(this, "projects/" + pId + "/merge_requests/" + mIId + "/time_stats", options);
    };
    MergeRequests.prototype.version = function (projectId, mergerequestIId, versionId, options) {
        var _a = __read([projectId, mergerequestIId, versionId].map(encodeURIComponent), 3), pId = _a[0], mIId = _a[1], vId = _a[2];
        return get(this, "projects/" + pId + "/merge_requests/" + mIId + "/versions/" + vId, options);
    };
    MergeRequests.prototype.versions = function (projectId, mergerequestIId, options) {
        var _a = __read([projectId, mergerequestIId].map(encodeURIComponent), 2), pId = _a[0], mIId = _a[1];
        return get(this, "projects/" + pId + "/merge_requests/" + mIId + "/versions", options);
    };
    MergeRequests.prototype.unapprove = function (projectId, mergerequestIId, options) {
        var _a = __read([projectId, mergerequestIId].map(encodeURIComponent), 2), pId = _a[0], mIId = _a[1];
        return post(this, "projects/" + pId + "/merge_requests/" + mIId + "/approve", options);
    };
    MergeRequests.prototype.unsubscribe = function (projectId, mergerequestIId, options) {
        var _a = __read([projectId, mergerequestIId].map(encodeURIComponent), 2), pId = _a[0], mIId = _a[1];
        return del(this, "projects/" + pId + "/merge_requests/" + mIId + "/unsubscribe", options);
    };
    return MergeRequests;
}(BaseService));

var MergeRequestAwardEmojis = /** @class */ (function (_super) {
    __extends(MergeRequestAwardEmojis, _super);
    function MergeRequestAwardEmojis(options) {
        return _super.call(this, 'merge_requests', options) || this;
    }
    return MergeRequestAwardEmojis;
}(ResourceAwardsEmojis));

var MergeRequestDiscussions = /** @class */ (function (_super) {
    __extends(MergeRequestDiscussions, _super);
    function MergeRequestDiscussions(options) {
        return _super.call(this, 'projects', 'merge_requests', options) || this;
    }
    return MergeRequestDiscussions;
}(ResourceDiscussions));

var MergeRequestNotes = /** @class */ (function (_super) {
    __extends(MergeRequestNotes, _super);
    function MergeRequestNotes(options) {
        return _super.call(this, 'projects', 'merge_requests', options) || this;
    }
    return MergeRequestNotes;
}(ResourceNotes));

var Pipelines = /** @class */ (function (_super) {
    __extends(Pipelines, _super);
    function Pipelines() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Pipelines.prototype.all = function (projectId, options) {
        var pId = encodeURIComponent(projectId);
        return get(this, "projects/" + pId + "/pipelines", options);
    };
    Pipelines.prototype.create = function (projectId, ref, options) {
        var pId = encodeURIComponent(projectId);
        return post(this, "projects/" + pId + "/pipeline", __assign({ ref: ref }, options));
    };
    Pipelines.prototype.show = function (projectId, pipelineId, options) {
        var pId = encodeURIComponent(projectId);
        return get(this, "projects/" + pId + "/pipelines/" + pipelineId, options);
    };
    Pipelines.prototype.retry = function (projectId, pipelineId, options) {
        var pId = encodeURIComponent(projectId);
        return post(this, "projects/" + pId + "/pipelines/" + pipelineId + "/retry", options);
    };
    Pipelines.prototype.cancel = function (projectId, pipelineId, options) {
        var pId = encodeURIComponent(projectId);
        return post(this, "projects/" + pId + "/pipelines/" + pipelineId + "/cancel", options);
    };
    Pipelines.prototype.showJobs = function (projectId, pipelineId, options) {
        var pId = encodeURIComponent(projectId);
        return get(this, "projects/" + pId + "/pipelines/" + pipelineId + "/jobs", options);
    };
    return Pipelines;
}(BaseService));

var PipelineSchedules = /** @class */ (function (_super) {
    __extends(PipelineSchedules, _super);
    function PipelineSchedules() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PipelineSchedules.prototype.all = function (projectId, options) {
        var pId = encodeURIComponent(projectId);
        return get(this, "projects/" + pId + "/pipeline_schedules", options);
    };
    PipelineSchedules.prototype.create = function (projectId, description, ref, cron, options) {
        var pId = encodeURIComponent(projectId);
        return post(this, "projects/" + pId + "/pipeline_schedules", __assign({ description: description,
            ref: ref,
            cron: cron }, options));
    };
    PipelineSchedules.prototype.edit = function (projectId, scheduleId, options) {
        var _a = __read([projectId, scheduleId].map(encodeURIComponent), 2), pId = _a[0], sId = _a[1];
        return put(this, "projects/" + pId + "/pipeline_schedules/" + sId, options);
    };
    PipelineSchedules.prototype.remove = function (projectId, scheduleId, options) {
        var _a = __read([projectId, scheduleId].map(encodeURIComponent), 2), pId = _a[0], sId = _a[1];
        return del(this, "projects/" + pId + "/pipeline_schedules/" + sId, options);
    };
    PipelineSchedules.prototype.show = function (projectId, scheduleId, options) {
        var _a = __read([projectId, scheduleId].map(encodeURIComponent), 2), pId = _a[0], sId = _a[1];
        return get(this, "projects/" + pId + "/pipeline_schedules/" + sId, options);
    };
    PipelineSchedules.prototype.takeOwnership = function (projectId, scheduleId, options) {
        var _a = __read([projectId, scheduleId].map(encodeURIComponent), 2), pId = _a[0], sId = _a[1];
        return post(this, "projects/" + pId + "/pipeline_schedules/" + sId + "/take_ownership", options);
    };
    return PipelineSchedules;
}(BaseService));

var PipelineScheduleVariables = /** @class */ (function (_super) {
    __extends(PipelineScheduleVariables, _super);
    function PipelineScheduleVariables() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PipelineScheduleVariables.prototype.all = function (projectId, pipelineScheduleId, options) {
        var _a = __read([projectId, pipelineScheduleId].map(encodeURIComponent), 2), pId = _a[0], psId = _a[1];
        return get(this, "projects/" + pId + "/pipeline_schedules/" + psId + "/variables", options);
    };
    PipelineScheduleVariables.prototype.create = function (projectId, pipelineScheduleId, options) {
        var _a = __read([projectId, pipelineScheduleId].map(encodeURIComponent), 2), pId = _a[0], psId = _a[1];
        return post(this, "projects/" + pId + "/pipeline_schedules/" + psId + "/variables", options);
    };
    PipelineScheduleVariables.prototype.edit = function (projectId, pipelineScheduleId, keyId, options) {
        var _a = __read([projectId, pipelineScheduleId, keyId].map(encodeURIComponent), 3), pId = _a[0], psId = _a[1], kId = _a[2];
        return put(this, "projects/" + pId + "/pipeline_schedules/" + psId + "/variables/" + kId, options);
    };
    PipelineScheduleVariables.prototype.show = function (projectId, pipelineScheduleId, keyId, options) {
        var _a = __read([projectId, pipelineScheduleId, keyId].map(encodeURIComponent), 3), pId = _a[0], psId = _a[1], kId = _a[2];
        return get(this, "projects/" + pId + "/pipeline_schedules/" + psId + "/variables/" + kId, options);
    };
    PipelineScheduleVariables.prototype.remove = function (projectId, pipelineScheduleId, keyId, options) {
        var _a = __read([projectId, pipelineScheduleId, keyId].map(encodeURIComponent), 3), pId = _a[0], psId = _a[1], kId = _a[2];
        return del(this, "projects/" + pId + "/pipeline_schedules/" + psId + "/variables/" + kId, options);
    };
    return PipelineScheduleVariables;
}(BaseService));

var Projects = /** @class */ (function (_super) {
    __extends(Projects, _super);
    function Projects() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Projects.prototype.all = function (options) {
        return get(this, 'projects', options);
    };
    Projects.prototype.archive = function (projectId, options) {
        var pId = encodeURIComponent(projectId);
        return post(this, "projects/" + pId + "/archive", options);
    };
    Projects.prototype.create = function (_a) {
        var userId = _a.userId, options = __rest(_a, ["userId"]);
        var url = userId ? "projects/user/" + encodeURIComponent(userId) : 'projects';
        return post(this, url, options);
    };
    Projects.prototype.edit = function (projectId, options) {
        var pId = encodeURIComponent(projectId);
        return put(this, "projects/" + pId, options);
    };
    Projects.prototype.events = function (projectId, options) {
        var pId = encodeURIComponent(projectId);
        return get(this, "projects/" + pId + "/events", options);
    };
    Projects.prototype.fork = function (projectId, options) {
        var pId = encodeURIComponent(projectId);
        return post(this, "projects/" + pId + "/fork", options);
    };
    Projects.prototype.forks = function (projectId, options) {
        var pId = encodeURIComponent(projectId);
        return get(this, "projects/" + pId + "/forks", options);
    };
    Projects.prototype.languages = function (projectId, options) {
        var pId = encodeURIComponent(projectId);
        return get(this, "projects/" + pId + "/languages", options);
    };
    Projects.prototype.mirrorPull = function (projectId, options) {
        var pId = encodeURIComponent(projectId);
        return post(this, "projects/" + pId + "/mirror/pull", options);
    };
    Projects.prototype.remove = function (projectId, options) {
        var pId = encodeURIComponent(projectId);
        return del(this, "projects/" + pId, options);
    };
    Projects.prototype.search = function (projectName) {
        return get(this, 'projects', { search: projectName });
    };
    Projects.prototype.share = function (projectId, groupId, groupAccess, options) {
        var pId = encodeURIComponent(projectId);
        return post(this, "projects/" + pId + "/share", __assign({ groupId: groupId, groupAccess: groupAccess }, options));
    };
    Projects.prototype.show = function (projectId, options) {
        var pId = encodeURIComponent(projectId);
        return get(this, "projects/" + pId, options);
    };
    Projects.prototype.star = function (projectId, options) {
        var pId = encodeURIComponent(projectId);
        return post(this, "projects/" + pId + "/star", options);
    };
    Projects.prototype.statuses = function (projectId, sha, state, options) {
        var pId = encodeURIComponent(projectId);
        return post(this, "projects/" + pId + "/statuses/" + sha, __assign({ state: state }, options));
    };
    Projects.prototype.transfer = function (projectId, namespaceId) {
        var pId = encodeURIComponent(projectId);
        return put(this, "projects/" + pId + "/transfer", { namespace: namespaceId });
    };
    Projects.prototype.unarchive = function (projectId, options) {
        var pId = encodeURIComponent(projectId);
        return post(this, "projects/" + pId + "/unarchive", options);
    };
    Projects.prototype.unshare = function (projectId, groupId, options) {
        var _a = __read([projectId, groupId].map(encodeURIComponent), 2), pId = _a[0], gId = _a[1];
        return del(this, "projects/" + pId + "/share" + gId, options);
    };
    Projects.prototype.unstar = function (projectId, options) {
        var pId = encodeURIComponent(projectId);
        return post(this, "projects/" + pId + "/unstar", options);
    };
    Projects.prototype.updatePushRule = function (projectId, options) {
        var pId = encodeURIComponent(projectId);
        return put(this, "projects/" + pId + "/push_rule", options);
    };
    Projects.prototype.upload = function (projectId, content, _a) {
        var _b = _a.fileName, fileName = _b === void 0 ? randomstring(8) : _b;
        var pId = encodeURIComponent(projectId);
        var form = new FormData();
        form.append(fileName, {
            file: {
                value: content,
                options: {
                    filename: fileName,
                    contentType: 'application/octet-stream',
                },
            },
        });
        return post(this, "projects/" + pId + "/uploads", form);
    };
    return Projects;
}(BaseService));

var ProjectAccessRequests = /** @class */ (function (_super) {
    __extends(ProjectAccessRequests, _super);
    function ProjectAccessRequests(options) {
        return _super.call(this, 'projects', options) || this;
    }
    return ProjectAccessRequests;
}(ResourceAccessRequests));

var ProjectBadges = /** @class */ (function (_super) {
    __extends(ProjectBadges, _super);
    function ProjectBadges(options) {
        return _super.call(this, 'projects', options) || this;
    }
    return ProjectBadges;
}(ResourceBadges));

var ProjectCustomAttributes = /** @class */ (function (_super) {
    __extends(ProjectCustomAttributes, _super);
    function ProjectCustomAttributes(options) {
        return _super.call(this, 'projects', options) || this;
    }
    return ProjectCustomAttributes;
}(ResourceCustomAttributes));

var ProjectImportExport = /** @class */ (function (_super) {
    __extends(ProjectImportExport, _super);
    function ProjectImportExport() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ProjectImportExport.prototype.download = function (projectId, options) {
        var pId = encodeURIComponent(projectId);
        return get(this, "projects/" + pId + "/export/download", options);
    };
    ProjectImportExport.prototype.exportStatus = function (projectId, options) {
        var pId = encodeURIComponent(projectId);
        return get(this, "projects/" + pId + "/export", options);
    };
    ProjectImportExport.prototype.import = function (content, path, options) {
        var form = new FormData();
        form.append(path, {
            file: {
                value: content,
                options: {
                    filename: path,
                    contentType: 'application/octet-stream',
                },
            },
        });
        return post(this, 'projects/import', __assign({}, form, options));
    };
    ProjectImportExport.prototype.importStatus = function (projectId, options) {
        var pId = encodeURIComponent(projectId);
        return get(this, "projects/" + pId + "/import", options);
    };
    ProjectImportExport.prototype.schedule = function (projectId, options) {
        var pId = encodeURIComponent(projectId);
        return post(this, "projects/" + pId + "/export", options);
    };
    return ProjectImportExport;
}(BaseService));

var ProjectIssueBoards = /** @class */ (function (_super) {
    __extends(ProjectIssueBoards, _super);
    function ProjectIssueBoards(options) {
        return _super.call(this, 'projects', options) || this;
    }
    return ProjectIssueBoards;
}(ResourceIssueBoards));

var ProjectHooks = /** @class */ (function (_super) {
    __extends(ProjectHooks, _super);
    function ProjectHooks() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ProjectHooks.prototype.all = function (projectId, options) {
        var pId = encodeURIComponent(projectId);
        return get(this, "projects/" + pId + "/hooks", options);
    };
    ProjectHooks.prototype.show = function (projectId, hookId, options) {
        var _a = __read([projectId, hookId].map(encodeURIComponent), 2), pId = _a[0], hId = _a[1];
        return get(this, "projects/" + pId + "/hooks/" + hId, options);
    };
    ProjectHooks.prototype.add = function (projectId, url, options) {
        var pId = encodeURIComponent(projectId);
        return post(this, "projects/" + pId + "/hooks", __assign({ url: url }, options));
    };
    ProjectHooks.prototype.edit = function (projectId, hookId, url, options) {
        var _a = __read([projectId, hookId].map(encodeURIComponent), 2), pId = _a[0], hId = _a[1];
        return put(this, "projects/" + pId + "/hooks/" + hId, __assign({ url: url }, options));
    };
    ProjectHooks.prototype.remove = function (projectId, hookId, options) {
        var _a = __read([projectId, hookId].map(encodeURIComponent), 2), pId = _a[0], hId = _a[1];
        return del(this, "projects/" + pId + "/hooks/" + hId, options);
    };
    return ProjectHooks;
}(BaseService));

var ProjectMembers = /** @class */ (function (_super) {
    __extends(ProjectMembers, _super);
    function ProjectMembers(options) {
        return _super.call(this, 'projects', options) || this;
    }
    return ProjectMembers;
}(ResourceMembers));

var ProjectMilestones = /** @class */ (function (_super) {
    __extends(ProjectMilestones, _super);
    function ProjectMilestones(options) {
        return _super.call(this, 'projects', options) || this;
    }
    return ProjectMilestones;
}(ResourceMilestones));

var ProjectSnippets = /** @class */ (function (_super) {
    __extends(ProjectSnippets, _super);
    function ProjectSnippets() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ProjectSnippets.prototype.all = function (projectId, options) {
        var pId = encodeURIComponent(projectId);
        return get(this, "projects/" + pId + "/snippets", options);
    };
    ProjectSnippets.prototype.content = function (projectId, snippetId, options) {
        var _a = __read([projectId, snippetId].map(encodeURIComponent), 2), pId = _a[0], sId = _a[1];
        return get(this, "projects/" + pId + "/snippets/" + sId + "/raw", options);
    };
    ProjectSnippets.prototype.create = function (projectId, title, fileName, code, visibility, options) {
        var pId = encodeURIComponent(projectId);
        return post(this, "projects/" + pId + "/snippets", __assign({ title: title,
            fileName: fileName,
            code: code,
            visibility: visibility }, options));
    };
    ProjectSnippets.prototype.edit = function (projectId, snippetId, options) {
        var _a = __read([projectId, snippetId].map(encodeURIComponent), 2), pId = _a[0], sId = _a[1];
        return put(this, "projects/" + pId + "/snippets/" + sId, options);
    };
    ProjectSnippets.prototype.remove = function (projectId, snippetId, options) {
        var _a = __read([projectId, snippetId].map(encodeURIComponent), 2), pId = _a[0], sId = _a[1];
        return del(this, "projects/" + pId + "/snippets/" + sId, options);
    };
    ProjectSnippets.prototype.show = function (projectId, snippetId, options) {
        var _a = __read([projectId, snippetId].map(encodeURIComponent), 2), pId = _a[0], sId = _a[1];
        return get(this, "projects/" + pId + "/snippets/" + sId, options);
    };
    ProjectSnippets.prototype.userAgentDetails = function (projectId, snippetId, options) {
        var _a = __read([projectId, snippetId].map(encodeURIComponent), 2), pId = _a[0], sId = _a[1];
        return get(this, "projects/" + pId + "/snippets/" + sId + "/user_agent_detail", options);
    };
    return ProjectSnippets;
}(BaseService));

var ProjectSnippetNotes = /** @class */ (function (_super) {
    __extends(ProjectSnippetNotes, _super);
    function ProjectSnippetNotes(options) {
        return _super.call(this, 'projects', 'snippets', options) || this;
    }
    return ProjectSnippetNotes;
}(ResourceNotes));

var ProjectSnippetDiscussions = /** @class */ (function (_super) {
    __extends(ProjectSnippetDiscussions, _super);
    function ProjectSnippetDiscussions(options) {
        return _super.call(this, 'projects', 'snippets', options) || this;
    }
    return ProjectSnippetDiscussions;
}(ResourceDiscussions));

var ProjectSnippetAwardEmojis = /** @class */ (function (_super) {
    __extends(ProjectSnippetAwardEmojis, _super);
    function ProjectSnippetAwardEmojis(options) {
        return _super.call(this, 'issues', options) || this;
    }
    return ProjectSnippetAwardEmojis;
}(ResourceAwardsEmojis));

var ProtectedBranches = /** @class */ (function (_super) {
    __extends(ProtectedBranches, _super);
    function ProtectedBranches() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ProtectedBranches.prototype.all = function (projectId, options) {
        var pId = encodeURIComponent(projectId);
        return get(this, "projects/" + pId + "/protected_branches", options);
    };
    ProtectedBranches.prototype.protect = function (projectId, branchName, options) {
        var pId = encodeURIComponent(projectId);
        return post(this, "projects/" + pId + "/protected_branches", __assign({ name: branchName }, options));
    };
    ProtectedBranches.prototype.show = function (projectId, branchName, options) {
        var _a = __read([projectId, branchName].map(encodeURIComponent), 2), pId = _a[0], bName = _a[1];
        return get(this, "projects/" + pId + "/protected_branches/" + bName, options);
    };
    ProtectedBranches.prototype.unprotect = function (projectId, branchName, options) {
        var _a = __read([projectId, branchName].map(encodeURIComponent), 2), pId = _a[0], bName = _a[1];
        return del(this, "projects/" + pId + "/protected_branches/" + bName, options);
    };
    return ProtectedBranches;
}(BaseService));

var ProtectedTags = /** @class */ (function (_super) {
    __extends(ProtectedTags, _super);
    function ProtectedTags() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ProtectedTags.prototype.all = function (projectId, options) {
        var pId = encodeURIComponent(projectId);
        return get(this, "projects/" + pId + "/protected_tags", options);
    };
    ProtectedTags.prototype.protect = function (projectId, tagName, options) {
        var pId = encodeURIComponent(projectId);
        return post(this, "projects/" + pId + "/protected_tags", __assign({ name: tagName }, options));
    };
    ProtectedTags.prototype.show = function (projectId, tagName, options) {
        var _a = __read([projectId, tagName].map(encodeURIComponent), 2), pId = _a[0], tName = _a[1];
        return get(this, "projects/" + pId + "/protected_tags/" + tName, options);
    };
    ProtectedTags.prototype.unprotect = function (projectId, tagName, options) {
        var _a = __read([projectId, tagName].map(encodeURIComponent), 2), pId = _a[0], tName = _a[1];
        return del(this, "projects/" + pId + "/protected_tags/" + tName, options);
    };
    return ProtectedTags;
}(BaseService));

var ProjectVariables = /** @class */ (function (_super) {
    __extends(ProjectVariables, _super);
    function ProjectVariables(options) {
        return _super.call(this, 'projects', options) || this;
    }
    return ProjectVariables;
}(ResourceVariables));

var Repositories = /** @class */ (function (_super) {
    __extends(Repositories, _super);
    function Repositories() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Repositories.prototype.compare = function (projectId, from, to, options) {
        var pId = encodeURIComponent(projectId);
        return get(this, "projects/" + pId + "/repository/compare", __assign({ from: from,
            to: to }, options));
    };
    Repositories.prototype.contributors = function (projectId, options) {
        var pId = encodeURIComponent(projectId);
        return get(this, "projects/" + pId + "/repository/contributors", options);
    };
    Repositories.prototype.showArchive = function (projectId, options) {
        var pId = encodeURIComponent(projectId);
        return get(this, "projects/" + pId + "/repository/archive", options);
    };
    Repositories.prototype.showBlob = function (projectId, sha, options) {
        var pId = encodeURIComponent(projectId);
        return get(this, "projects/" + pId + "/repository/blobs/" + sha, options);
    };
    Repositories.prototype.showBlobRaw = function (projectId, sha, options) {
        var pId = encodeURIComponent(projectId);
        return get(this, "projects/" + pId + "/repository/blobs/" + sha + "/raw", options);
    };
    Repositories.prototype.tree = function (projectId, options) {
        var pId = encodeURIComponent(projectId);
        return get(this, "projects/" + pId + "/repository/tree", options);
    };
    return Repositories;
}(BaseService));

var RepositoryFiles = /** @class */ (function (_super) {
    __extends(RepositoryFiles, _super);
    function RepositoryFiles() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RepositoryFiles.prototype.create = function (projectId, filePath, branch, content, options) {
        var _a = __read([projectId, filePath].map(encodeURIComponent), 2), pId = _a[0], path = _a[1];
        return post(this, "projects/" + pId + "/repository/files/" + path, __assign({ branch: branch,
            content: content }, options));
    };
    RepositoryFiles.prototype.edit = function (projectId, filePath, branch, content, options) {
        var _a = __read([projectId, filePath].map(encodeURIComponent), 2), pId = _a[0], path = _a[1];
        return put(this, "projects/" + pId + "/repository/files/" + path, __assign({ branch: branch,
            content: content }, options));
    };
    RepositoryFiles.prototype.remove = function (projectId, filePath, branch, options) {
        var _a = __read([projectId, filePath].map(encodeURIComponent), 2), pId = _a[0], path = _a[1];
        return del(this, "projects/" + pId + "/repository/files/" + path, __assign({ branch: branch }, options));
    };
    RepositoryFiles.prototype.show = function (projectId, filePath, ref, options) {
        var _a = __read([projectId, filePath].map(encodeURIComponent), 2), pId = _a[0], path = _a[1];
        return get(this, "projects/" + pId + "/repository/files/" + path, __assign({ ref: ref }, options));
    };
    RepositoryFiles.prototype.showRaw = function (projectId, filePath, ref, options) {
        var _a = __read([projectId, filePath].map(encodeURIComponent), 2), pId = _a[0], path = _a[1];
        return get(this, "projects/" + pId + "/repository/files/" + path + "/raw", __assign({ ref: ref }, options));
    };
    return RepositoryFiles;
}(BaseService));

var Runners = /** @class */ (function (_super) {
    __extends(Runners, _super);
    function Runners() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Runners.prototype.all = function (_a) {
        var projectId = _a.projectId, options = __rest(_a, ["projectId"]);
        var url = projectId ? "projects/" + encodeURIComponent(projectId) + "/runners" : 'runners/all';
        return get(this, url, options);
    };
    Runners.prototype.allOwned = function (options) {
        return get(this, 'runners', options);
    };
    Runners.prototype.edit = function (runnerId, options) {
        var rId = encodeURIComponent(runnerId);
        return put(this, "runners/" + rId, options);
    };
    Runners.prototype.enable = function (projectId, runnerId, options) {
        var _a = __read([projectId, runnerId].map(encodeURIComponent), 2), pId = _a[0], rId = _a[1];
        return post(this, "projects/" + pId + "/runners", __assign({ runnerId: rId }, options));
    };
    Runners.prototype.disable = function (projectId, runnerId, options) {
        var _a = __read([projectId, runnerId].map(encodeURIComponent), 2), pId = _a[0], rId = _a[1];
        return del(this, "projects/" + pId + "/runners/" + rId, options);
    };
    Runners.prototype.jobs = function (runnerId, options) {
        var rId = encodeURIComponent(runnerId);
        return get(this, "runners/" + rId + "/jobs", options);
    };
    Runners.prototype.remove = function (runnerId, options) {
        var rId = encodeURIComponent(runnerId);
        return del(this, "runners/" + rId, options);
    };
    Runners.prototype.show = function (runnerId, options) {
        var rId = encodeURIComponent(runnerId);
        return get(this, "runners/" + rId, options);
    };
    return Runners;
}(BaseService));

var Services = /** @class */ (function (_super) {
    __extends(Services, _super);
    function Services() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Services.prototype.edit = function (projectId, serviceName, options) {
        var pId = encodeURIComponent(projectId);
        return put(this, "projects/" + pId + "/services/" + serviceName, options);
    };
    Services.prototype.remove = function (projectId, serviceName, options) {
        var pId = encodeURIComponent(projectId);
        return del(this, "projects/" + pId + "/services/" + serviceName, options);
    };
    Services.prototype.show = function (projectId, serviceName, options) {
        var pId = encodeURIComponent(projectId);
        return get(this, "projects/" + pId + "/services/" + serviceName, options);
    };
    return Services;
}(BaseService));

var Tags = /** @class */ (function (_super) {
    __extends(Tags, _super);
    function Tags() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Tags.prototype.all = function (projectId, options) {
        var pId = encodeURIComponent(projectId);
        return get(this, "projects/" + pId + "/repository/tags", options);
    };
    Tags.prototype.create = function (projectId, options) {
        var pId = encodeURIComponent(projectId);
        return post(this, "projects/" + pId + "/repository/tags", options);
    };
    Tags.prototype.remove = function (projectId, tagName, options) {
        var _a = __read([projectId, tagName].map(encodeURIComponent), 2), pId = _a[0], tId = _a[1];
        return del(this, "projects/" + pId + "/repository/tags/" + tId, options);
    };
    Tags.prototype.show = function (projectId, tagName, options) {
        var _a = __read([projectId, tagName].map(encodeURIComponent), 2), pId = _a[0], tId = _a[1];
        return get(this, "projects/" + pId + "/repository/tags/" + tId, options);
    };
    return Tags;
}(BaseService));

var Todos = /** @class */ (function (_super) {
    __extends(Todos, _super);
    function Todos() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Todos.prototype.all = function (options) {
        return get(this, 'todos', options);
    };
    Todos.prototype.create = function (projectId, mergerequestId, options) {
        return post(this, "projects/" + projectId + "/merge_requests/" + mergerequestId + "/todo", options);
    };
    Todos.prototype.done = function (_a) {
        var todoId = _a.todoId, options = __rest(_a, ["todoId"]);
        var url = 'mark_as_done';
        if (todoId)
            url = todoId + "/" + url;
        return del(this, "todos/" + url, options);
    };
    return Todos;
}(BaseService));

var Triggers = /** @class */ (function (_super) {
    __extends(Triggers, _super);
    function Triggers() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Triggers.prototype.add = function (projectId, options) {
        var pId = encodeURIComponent(projectId);
        return post(this, "projects/" + pId + "/triggers", options);
    };
    Triggers.prototype.all = function (projectId, options) {
        var pId = encodeURIComponent(projectId);
        return get(this, "projects/" + pId + "/triggers", options);
    };
    Triggers.prototype.edit = function (projectId, triggerId, options) {
        var _a = __read([projectId, triggerId].map(encodeURIComponent), 2), pId = _a[0], tId = _a[1];
        return put(this, "projects/" + pId + "/triggers/" + tId, options);
    };
    Triggers.prototype.remove = function (projectId, triggerId, options) {
        var _a = __read([projectId, triggerId].map(encodeURIComponent), 2), pId = _a[0], tId = _a[1];
        return del(this, "projects/" + pId + "/triggers/" + tId, options);
    };
    Triggers.prototype.show = function (projectId, triggerId, options) {
        var _a = __read([projectId, triggerId].map(encodeURIComponent), 2), pId = _a[0], tId = _a[1];
        return get(this, "projects/" + pId + "/triggers/" + tId, options);
    };
    return Triggers;
}(BaseService));

var PushRule = /** @class */ (function (_super) {
    __extends(PushRule, _super);
    function PushRule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PushRule.prototype.create = function (projectId, options) {
        var pId = encodeURIComponent(projectId);
        return post(this, "projects/" + pId + "/push_rule", options);
    };
    PushRule.prototype.edit = function (projectId, _a) {
        var _b = _a.upsert, options = __rest(_a, ["upsert"]);
        var pId = encodeURIComponent(projectId);
        try {
            return put(this, "projects/" + pId + "/push_rule", options);
        }
        catch (e) {
            if (e.message.includes('exist'))
                return this.create(projectId, options);
            throw e;
        }
    };
    PushRule.prototype.remove = function (projectId, options) {
        var pId = encodeURIComponent(projectId);
        return del(this, "projects/" + pId + "/push_rule", options);
    };
    PushRule.prototype.show = function (projectId, options) {
        var pId = encodeURIComponent(projectId);
        return get(this, "projects/" + pId + "/push_rule", options);
    };
    return PushRule;
}(BaseService));

var ApplicationSettings = /** @class */ (function (_super) {
    __extends(ApplicationSettings, _super);
    function ApplicationSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ApplicationSettings.prototype.all = function (options) {
        return get(this, 'application/settings', options);
    };
    ApplicationSettings.prototype.edit = function (options) {
        return put(this, 'application/settings', options);
    };
    return ApplicationSettings;
}(BaseService));

var BroadcastMessages = /** @class */ (function (_super) {
    __extends(BroadcastMessages, _super);
    function BroadcastMessages() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BroadcastMessages.prototype.all = function (options) {
        return get(this, 'broadcast_messages', options);
    };
    BroadcastMessages.prototype.create = function (options) {
        return post(this, 'broadcast_messages', options);
    };
    BroadcastMessages.prototype.edit = function (broadcastMessageId, options) {
        var bId = encodeURIComponent(broadcastMessageId);
        return put(this, "broadcast_messages/" + bId, options);
    };
    BroadcastMessages.prototype.remove = function (broadcastMessageId) {
        var bId = encodeURIComponent(broadcastMessageId);
        return del(this, "broadcast_messages/" + bId);
    };
    BroadcastMessages.prototype.show = function (broadcastMessageId, options) {
        var bId = encodeURIComponent(broadcastMessageId);
        return get(this, "broadcast_messages/" + bId, options);
    };
    return BroadcastMessages;
}(BaseService));

var Events = /** @class */ (function (_super) {
    __extends(Events, _super);
    function Events() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Events.prototype.all = function (options) {
        return get(this, 'events', options);
    };
    return Events;
}(BaseService));

var FeatureFlags = /** @class */ (function (_super) {
    __extends(FeatureFlags, _super);
    function FeatureFlags() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FeatureFlags.prototype.all = function (options) {
        return get(this, 'features', options);
    };
    FeatureFlags.prototype.set = function (name, options) {
        var encodedName = encodeURIComponent(name);
        return post(this, "features/" + encodedName, options);
    };
    return FeatureFlags;
}(BaseService));

var GeoNodes = /** @class */ (function (_super) {
    __extends(GeoNodes, _super);
    function GeoNodes() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GeoNodes.prototype.all = function (options) {
        return get(this, 'geo_nodes', options);
    };
    GeoNodes.prototype.create = function (geonodeId, options) {
        var gId = encodeURIComponent(geonodeId);
        return post(this, "geo_nodes/" + gId, options);
    };
    GeoNodes.prototype.edit = function (geonodeId, options) {
        var gId = encodeURIComponent(geonodeId);
        return put(this, "geo_nodes/" + gId, options);
    };
    GeoNodes.prototype.failures = function (options) {
        return post(this, 'geo_nodes/current/failures', options);
    };
    GeoNodes.prototype.repair = function (geonodeId, options) {
        var gId = encodeURIComponent(geonodeId);
        return del(this, "geo_nodes/" + gId, options);
    };
    GeoNodes.prototype.show = function (geonodeId, options) {
        var gId = encodeURIComponent(geonodeId);
        return get(this, "geo_nodes/" + gId, options);
    };
    GeoNodes.prototype.status = function (geonodeId, options) {
        var gId = encodeURIComponent(geonodeId);
        return get(this, "geo_nodes/" + gId + "/status", options);
    };
    GeoNodes.prototype.statuses = function (options) {
        return get(this, 'geo_nodes/statuses', options);
    };
    return GeoNodes;
}(BaseService));

var GitignoreTemplates = /** @class */ (function (_super) {
    __extends(GitignoreTemplates, _super);
    function GitignoreTemplates(options) {
        return _super.call(this, 'gitignores', options) || this;
    }
    return GitignoreTemplates;
}(ResourceTemplates));

var GitLabCIYMLTemplates = /** @class */ (function (_super) {
    __extends(GitLabCIYMLTemplates, _super);
    function GitLabCIYMLTemplates(options) {
        return _super.call(this, 'gitlab_ci_ymls', options) || this;
    }
    return GitLabCIYMLTemplates;
}(ResourceTemplates));

var Keys = /** @class */ (function (_super) {
    __extends(Keys, _super);
    function Keys() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Keys.prototype.show = function (keyId, options) {
        var kId = encodeURIComponent(keyId);
        return get(this, "keys/" + kId, options);
    };
    return Keys;
}(BaseService));

var Licence = /** @class */ (function (_super) {
    __extends(Licence, _super);
    function Licence() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Licence.prototype.all = function (options) {
        return get(this, 'licence', options);
    };
    Licence.prototype.create = function (options) {
        return post(this, 'licence', options);
    };
    return Licence;
}(BaseService));

var LicenceTemplates = /** @class */ (function (_super) {
    __extends(LicenceTemplates, _super);
    function LicenceTemplates(options) {
        return _super.call(this, 'licences', options) || this;
    }
    return LicenceTemplates;
}(ResourceTemplates));

var Lint = /** @class */ (function (_super) {
    __extends(Lint, _super);
    function Lint() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Lint.prototype.lint = function (content, options) {
        return post(this, 'lint', __assign({ content: content }, options));
    };
    return Lint;
}(BaseService));

var Namespaces = /** @class */ (function (_super) {
    __extends(Namespaces, _super);
    function Namespaces() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Namespaces.prototype.all = function (options) {
        return get(this, 'namespaces', options);
    };
    Namespaces.prototype.show = function (namespaceId, options) {
        var nId = encodeURIComponent(namespaceId);
        return get(this, "namespaces/" + nId, options);
    };
    return Namespaces;
}(BaseService));

var NotificationSettings = /** @class */ (function (_super) {
    __extends(NotificationSettings, _super);
    function NotificationSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NotificationSettings.prototype.all = function (_a) {
        if (_a === void 0) { _a = {}; }
        var projectId = _a.projectId, groupId = _a.groupId, options = __rest(_a, ["projectId", "groupId"]);
        var url = '';
        if (projectId) {
            url += "projects/" + encodeURIComponent(projectId) + "/";
        }
        else if (groupId) {
            url += "groups/" + encodeURIComponent(groupId) + "/";
        }
        return get(this, url + "notification_settings", options);
    };
    NotificationSettings.prototype.edit = function (_a) {
        if (_a === void 0) { _a = {}; }
        var projectId = _a.projectId, groupId = _a.groupId, options = __rest(_a, ["projectId", "groupId"]);
        var url = '';
        if (projectId) {
            url += "projects/" + encodeURIComponent(projectId) + "/";
        }
        else if (groupId) {
            url += "groups/" + encodeURIComponent(groupId) + "/";
        }
        return put(this, url + "notification_settings", options);
    };
    return NotificationSettings;
}(BaseService));

var Markdown = /** @class */ (function (_super) {
    __extends(Markdown, _super);
    function Markdown() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Markdown.prototype.render = function (text, options) {
        return post(this, 'markdown', __assign({ text: text }, options));
    };
    return Markdown;
}(BaseService));

var PagesDomains = /** @class */ (function (_super) {
    __extends(PagesDomains, _super);
    function PagesDomains() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PagesDomains.prototype.all = function (_a) {
        if (_a === void 0) { _a = {}; }
        var projectId = _a.projectId, options = __rest(_a, ["projectId"]);
        var url = projectId ? "projects/" + encodeURIComponent(projectId) + "/" : '';
        return get(this, url + "pages/domains", options);
    };
    PagesDomains.prototype.create = function (projectId, domain, options) {
        var pId = encodeURIComponent(projectId);
        return post(this, "projects/" + pId + "/pages/domains", __assign({ domain: domain }, options));
    };
    PagesDomains.prototype.edit = function (projectId, domain, options) {
        var pId = encodeURIComponent(projectId);
        return put(this, "projects/" + pId + "/pages/domains/" + domain, options);
    };
    PagesDomains.prototype.show = function (projectId, domain, options) {
        var pId = encodeURIComponent(projectId);
        return get(this, "projects/" + pId + "/pages/domains/" + domain, options);
    };
    PagesDomains.prototype.remove = function (projectId, domain, options) {
        var pId = encodeURIComponent(projectId);
        return del(this, "projects/" + pId + "/pages/domains/" + domain, options);
    };
    return PagesDomains;
}(BaseService));

var Search = /** @class */ (function (_super) {
    __extends(Search, _super);
    function Search() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Search.prototype.all = function (scope, search, _a) {
        var projectId = _a.projectId, groupId = _a.groupId, options = __rest(_a, ["projectId", "groupId"]);
        var url = '';
        if (projectId) {
            url += "projects/" + encodeURIComponent(projectId) + "/";
        }
        else if (groupId) {
            url += "groups/" + encodeURIComponent(groupId) + "/";
        }
        return get(this, url + "search", __assign({ scope: scope, search: search }, options));
    };
    return Search;
}(BaseService));

var SidekiqMetrics = /** @class */ (function (_super) {
    __extends(SidekiqMetrics, _super);
    function SidekiqMetrics() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SidekiqMetrics.prototype.queueMetrics = function () {
        return get(this, 'sidekiq/queue_metrics');
    };
    SidekiqMetrics.prototype.processMetrics = function () {
        return get(this, 'sidekiq/process_metrics');
    };
    SidekiqMetrics.prototype.jobStats = function () {
        return get(this, 'sidekiq/job_stats');
    };
    SidekiqMetrics.prototype.compoundMetrics = function () {
        return get(this, 'sidekiq/compound_metrics');
    };
    return SidekiqMetrics;
}(BaseService));

var Snippets = /** @class */ (function (_super) {
    __extends(Snippets, _super);
    function Snippets() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Snippets.prototype.all = function (_a) {
        var p = _a.public, options = __rest(_a, ["public"]);
        var url = p ? 'snippets/public' : 'snippets';
        return get(this, url, options);
    };
    Snippets.prototype.content = function (snippetId, options) {
        var sId = encodeURIComponent(snippetId);
        return get(this, "snippets/" + sId + "/raw", options);
    };
    Snippets.prototype.create = function (title, fileName, content, visibility, options) {
        return post(this, 'snippets', __assign({ title: title,
            fileName: fileName,
            content: content,
            visibility: visibility }, options));
    };
    Snippets.prototype.edit = function (snippetId, options) {
        var sId = encodeURIComponent(snippetId);
        return put(this, "snippets/" + sId, options);
    };
    Snippets.prototype.remove = function (snippetId, options) {
        var sId = encodeURIComponent(snippetId);
        return del(this, "snippets/" + sId, options);
    };
    Snippets.prototype.show = function (snippetId, options) {
        var sId = encodeURIComponent(snippetId);
        return get(this, "snippets/" + sId, options);
    };
    Snippets.prototype.userAgentDetails = function (snippetId, options) {
        var sId = encodeURIComponent(snippetId);
        return get(this, "snippets/" + sId + "/user_agent_detail", options);
    };
    return Snippets;
}(BaseService));

var SystemHooks = /** @class */ (function (_super) {
    __extends(SystemHooks, _super);
    function SystemHooks() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SystemHooks.prototype.add = function (url, options) {
        return post(this, 'hooks', __assign({ url: url }, options));
    };
    SystemHooks.prototype.all = function (options) {
        return get(this, 'hooks', options);
    };
    SystemHooks.prototype.edit = function (hookId, url, options) {
        var hId = encodeURIComponent(hookId);
        return put(this, "hooks/" + hId, __assign({ url: url }, options));
    };
    SystemHooks.prototype.remove = function (hookId, options) {
        var hId = encodeURIComponent(hookId);
        return del(this, "hooks/" + hId, options);
    };
    return SystemHooks;
}(BaseService));

var Version = /** @class */ (function (_super) {
    __extends(Version, _super);
    function Version() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Version.prototype.show = function (options) {
        return get(this, 'version', options);
    };
    return Version;
}(BaseService));

var Wikis = /** @class */ (function (_super) {
    __extends(Wikis, _super);
    function Wikis() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Wikis.prototype.all = function (projectId, options) {
        var pId = encodeURIComponent(projectId);
        return get(this, "projects/" + pId + "/wikis", options);
    };
    Wikis.prototype.create = function (projectId, options) {
        var pId = encodeURIComponent(projectId);
        return post(this, "projects/" + pId + "/wikis", options);
    };
    Wikis.prototype.edit = function (projectId, slug, options) {
        var pId = encodeURIComponent(projectId);
        return put(this, "projects/" + pId + "/wikis/" + slug, options);
    };
    Wikis.prototype.show = function (projectId, slug, options) {
        var pId = encodeURIComponent(projectId);
        return get(this, "projects/" + pId + "/wikis/" + slug, options);
    };
    Wikis.prototype.remove = function (projectId, slug, options) {
        var pId = encodeURIComponent(projectId);
        return del(this, "projects/" + pId + "/wikis/" + slug, options);
    };
    return Wikis;
}(BaseService));

// Groups

var APIServices = /*#__PURE__*/Object.freeze({
    Groups: Groups,
    GroupAccessRequests: GroupAccessRequests,
    GroupBadges: GroupBadges,
    GroupCustomAttributes: GroupCustomAttributes,
    GroupIssueBoards: GroupIssueBoards,
    GroupMembers: GroupMembers,
    GroupMilestones: GroupMilestones,
    GroupProjects: GroupProjects,
    GroupVariables: GroupVariables,
    Epics: Epics,
    EpicIssues: EpicIssues,
    EpicNotes: EpicNotes,
    EpicDiscussions: EpicDiscussions,
    Users: Users,
    UserCustomAttributes: UserCustomAttributes,
    UserEmails: UserEmails,
    UserImpersonationTokens: UserImpersonationTokens,
    UserKeys: UserKeys,
    UserGPGKeys: UserGPGKeys,
    Branches: Branches,
    Commits: Commits,
    CommitDiscussions: CommitDiscussions,
    Deployments: Deployments,
    DeployKeys: DeployKeys,
    Environments: Environments,
    Issues: Issues,
    IssueNotes: IssueNotes,
    IssueDiscussions: IssueDiscussions,
    IssueAwardEmojis: IssueAwardEmojis,
    Jobs: Jobs,
    Labels: Labels,
    MergeRequests: MergeRequests,
    MergeRequestAwardEmojis: MergeRequestAwardEmojis,
    MergeRequestDiscussions: MergeRequestDiscussions,
    MergeRequestNotes: MergeRequestNotes,
    Pipelines: Pipelines,
    PipelineSchedules: PipelineSchedules,
    PipelineScheduleVariables: PipelineScheduleVariables,
    Projects: Projects,
    ProjectAccessRequests: ProjectAccessRequests,
    ProjectBadges: ProjectBadges,
    ProjectCustomAttributes: ProjectCustomAttributes,
    ProjectImportExport: ProjectImportExport,
    ProjectIssueBoards: ProjectIssueBoards,
    ProjectHooks: ProjectHooks,
    ProjectMembers: ProjectMembers,
    ProjectMilestones: ProjectMilestones,
    ProjectSnippets: ProjectSnippets,
    ProjectSnippetNotes: ProjectSnippetNotes,
    ProjectSnippetDiscussions: ProjectSnippetDiscussions,
    ProjectSnippetAwardEmojis: ProjectSnippetAwardEmojis,
    ProtectedBranches: ProtectedBranches,
    ProtectedTags: ProtectedTags,
    ProjectVariables: ProjectVariables,
    Repositories: Repositories,
    RepositoryFiles: RepositoryFiles,
    Runners: Runners,
    Services: Services,
    Tags: Tags,
    Todos: Todos,
    Triggers: Triggers,
    PushRule: PushRule,
    ApplicationSettings: ApplicationSettings,
    BroadcastMessages: BroadcastMessages,
    Events: Events,
    FeatureFlags: FeatureFlags,
    GeoNodes: GeoNodes,
    GitignoreTemplates: GitignoreTemplates,
    GitLabCIYMLTemplates: GitLabCIYMLTemplates,
    Keys: Keys,
    Licence: Licence,
    LicenceTemplates: LicenceTemplates,
    Lint: Lint,
    Namespaces: Namespaces,
    NotificationSettings: NotificationSettings,
    Markdown: Markdown,
    PagesDomains: PagesDomains,
    Search: Search,
    SidekiqMetrics: SidekiqMetrics,
    Snippets: Snippets,
    SystemHooks: SystemHooks,
    Version: Version,
    Wikis: Wikis
});

// Groups
var GroupsBundle = bundler({
    Groups: Groups,
    GroupAccessRequests: GroupAccessRequests,
    GroupBadges: GroupBadges,
    GroupCustomAttributes: GroupCustomAttributes,
    GroupIssueBoards: GroupIssueBoards,
    GroupMembers: GroupMembers,
    GroupMilestones: GroupMilestones,
    GroupProjects: GroupProjects,
    GroupVariables: GroupVariables,
    Epics: Epics,
    EpicIssues: EpicIssues,
    EpicNotes: EpicNotes,
    EpicDiscussions: EpicDiscussions,
});
// Users
var UsersBundle = bundler({
    Users: Users,
    UserCustomAttributes: UserCustomAttributes,
    UserEmails: UserEmails,
    UserImpersonationTokens: UserImpersonationTokens,
    UserKeys: UserKeys,
    UserGPGKeys: UserGPGKeys,
});
// Projects
var ProjectsBundle = bundler({
    Branches: Branches,
    Commits: Commits,
    CommitDiscussions: CommitDiscussions,
    DeployKeys: DeployKeys,
    Deployments: Deployments,
    Environments: Environments,
    Issues: Issues,
    IssueAwardEmojis: IssueAwardEmojis,
    IssueNotes: IssueNotes,
    IssueDiscussions: IssueDiscussions,
    Jobs: Jobs,
    Labels: Labels,
    MergeRequests: MergeRequests,
    MergeRequestAwardEmojis: MergeRequestAwardEmojis,
    MergeRequestDiscussions: MergeRequestDiscussions,
    MergeRequestNotes: MergeRequestNotes,
    Pipelines: Pipelines,
    PipelineSchedules: PipelineSchedules,
    PipelineScheduleVariables: PipelineScheduleVariables,
    Projects: Projects,
    ProjectAccessRequests: ProjectAccessRequests,
    ProjectBadges: ProjectBadges,
    ProjectCustomAttributes: ProjectCustomAttributes,
    ProjectImportExport: ProjectImportExport,
    ProjectIssueBoards: ProjectIssueBoards,
    ProjectHooks: ProjectHooks,
    ProjectMembers: ProjectMembers,
    ProjectMilestones: ProjectMilestones,
    ProjectSnippets: ProjectSnippets,
    ProjectSnippetNotes: ProjectSnippetNotes,
    ProjectSnippetDiscussions: ProjectSnippetDiscussions,
    ProjectSnippetAwardEmojis: ProjectSnippetAwardEmojis,
    ProtectedBranches: ProtectedBranches,
    ProtectedTags: ProtectedTags,
    ProjectVariables: ProjectVariables,
    Repositories: Repositories,
    RepositoryFiles: RepositoryFiles,
    Runners: Runners,
    Services: Services,
    Tags: Tags,
    Triggers: Triggers,
});
// All initialized
var Gitlab = bundler(APIServices);

export { GroupsBundle, UsersBundle, ProjectsBundle, Gitlab, Groups, GroupAccessRequests, GroupBadges, GroupCustomAttributes, GroupIssueBoards, GroupMembers, GroupMilestones, GroupProjects, GroupVariables, Epics, EpicIssues, EpicNotes, EpicDiscussions, Users, UserCustomAttributes, UserEmails, UserImpersonationTokens, UserKeys, UserGPGKeys, Branches, Commits, CommitDiscussions, Deployments, DeployKeys, Environments, Issues, IssueNotes, IssueDiscussions, IssueAwardEmojis, Jobs, Labels, MergeRequests, MergeRequestAwardEmojis, MergeRequestDiscussions, MergeRequestNotes, Pipelines, PipelineSchedules, PipelineScheduleVariables, Projects, ProjectAccessRequests, ProjectBadges, ProjectCustomAttributes, ProjectImportExport, ProjectIssueBoards, ProjectHooks, ProjectMembers, ProjectMilestones, ProjectSnippets, ProjectSnippetNotes, ProjectSnippetDiscussions, ProjectSnippetAwardEmojis, ProtectedBranches, ProtectedTags, ProjectVariables, Repositories, RepositoryFiles, Runners, Services, Tags, Todos, Triggers, PushRule, ApplicationSettings, BroadcastMessages, Events, FeatureFlags, GeoNodes, GitignoreTemplates, GitLabCIYMLTemplates, Keys, Licence, LicenceTemplates, Lint, Namespaces, NotificationSettings, Markdown, PagesDomains, Search, SidekiqMetrics, Snippets, SystemHooks, Version, Wikis };
