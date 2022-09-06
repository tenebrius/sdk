import { AxiosRequestConfig } from 'axios';

declare abstract class IStorage {
    abstract auth_token: string | null;
    abstract auth_expires: number | null;
    abstract auth_expires_at: number | null;
    abstract auth_refresh_token: string | null;
    abstract get(key: string): string | null;
    abstract set(key: string, value: string): string;
    abstract delete(key: string): string | null;
}

declare type ID = string | number;
declare type DefaultType = {
    [field: string]: any;
};
declare type SystemType<T> = DefaultType & T;
declare type TypeMap = {
    [k: string]: unknown;
};
declare type TypeOf<T extends TypeMap, K extends keyof T> = T[K] extends undefined ? DefaultType : T[K];
declare type Omit$1<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
declare type PartialBy<T, K extends keyof T> = Omit$1<T, K> & Partial<Pick<T, K>>;
declare type ActivityType = SystemType<{
    action: string;
    ip: string;
    item: string;
    user_agent: string;
    timestamp: string;
    id: number;
    user: string;
    comment: string | null;
    collection: string;
    revisions: [number] | null;
}>;
declare type Comment = SystemType<{
    item: string;
    collection: string;
    comment: string;
}>;
declare type CollectionType = SystemType<{}>;
declare type FieldType = SystemType<{}>;
declare type FileType = SystemType<{}>;
declare type FolderType = SystemType<{}>;
declare type PermissionType = SystemType<{}>;
declare type PresetType = SystemType<{}>;
declare type RelationType = SystemType<{}>;
declare type RevisionType = SystemType<{}>;
declare type RoleType = SystemType<{}>;
declare type SettingType = SystemType<{
    id: 1;
    auth_login_attempts: number;
    auth_password_policy: string | null;
    custom_css: string | null;
    project_color: string | null;
    project_logo: string | null;
    project_name: string;
    project_url: string;
    public_background: string | null;
    public_foreground: string | null;
    public_note: string | null;
    storage_asset_presets: {
        fit: string;
        height: number;
        width: number;
        quality: number;
        key: string;
        withoutEnlargement: boolean;
    }[] | null;
    storage_asset_transform: 'none' | 'all' | 'presets';
}>;
declare type UserType = SystemType<{
    email: string;
}>;
declare type TfaType = SystemType<{
    secret: string;
    otpauth_url: string;
}>;

declare type Field = string;
declare type Item = Record<string, any>;
declare type PartialItem<T> = {
    [P in keyof T]?: T[P] extends Record<string, any> ? PartialItem<T[P]> : T[P];
};
declare type InferQueryType<T extends ManyItems<any> | QueryOne<any>> = 'data' extends keyof T ? T['data'] : T;
declare type OneItem<T extends Item, Q extends QueryOne<T> = Record<string, any>, F extends string[] | false = QueryFields<Q>> = (F extends false ? PartialItem<T> : PickedPartialItem<T, F>) | null | undefined;
declare type ManyItems<T extends Item, Q extends QueryMany<T> = Record<string, any>> = {
    data?: OneItem<T, Q>[] | null;
    meta?: ItemMetadata;
};
declare type ItemMetadata = {
    total_count?: number;
    filter_count?: number;
};
declare type Payload = Record<string, any>;
declare enum Meta {
    TOTAL_COUNT = "total_count",
    FILTER_COUNT = "filter_count"
}
declare type QueryFields<Q extends Record<string, any>> = Q extends Record<'fields', any> ? Q['fields'] extends string ? [Q['fields']] : Q['fields'] extends string[] ? Q['fields'] : false : false;
declare type DeepPathBranchHelper<T, K extends keyof T, V, R extends string> = K extends keyof V ? TreeBranch<T[K], R, V[K]> : K extends keyof (V & {
    [_ in K]: unknown;
}) ? TreeBranch<T[K], R, (V & {
    [_ in K]: unknown;
})[K]> : never;
declare type WildCardHelper<T, K extends keyof T, V, R extends string> = NonNullable<T[K]> extends (infer U)[] ? Extract<NonNullable<U>, Record<string, unknown>> extends never ? TreeLeaf<U> : DeepPathBranchHelper<T, K, V, R> : Extract<NonNullable<T[K]>, Record<string, unknown>> extends never ? TreeLeaf<T[K]> : DeepPathBranchHelper<T, K, V, R>;
declare type DeepPathToObject<Path extends string, T extends Record<string, any>, Val = Record<string, never>> = string extends Path ? never : Path extends `${infer Key}.${infer Rest}` ? Key extends keyof T ? Val & {
    [_ in Key]?: DeepPathBranchHelper<T, Key, Val, Rest>;
} : Key extends '*' ? Rest extends `${infer NextVal}.${string}` ? NextVal extends '*' ? Val & {
    [K in keyof T]: WildCardHelper<T, K, Val, Rest>;
} : Val & {
    [K in keyof T]?: NextVal extends keyof T[K] ? DeepPathBranchHelper<T, K, Val, Rest> : never;
} : Rest extends '*' ? Val & {
    [K in keyof T]: WildCardHelper<T, K, Val, Rest>;
} : Val & {
    [K in keyof T]?: Rest extends keyof T[K] ? DeepPathBranchHelper<T, K, Val, Rest> : never;
} : never : Path extends keyof T ? Val & {
    [K in Path]?: TreeLeaf<T[K]>;
} : Path extends '*' ? Val & {
    [K in keyof T]?: TreeLeaf<T[K]>;
} : never;
declare type TreeBranch<T, Path extends string, Val = Record<string, never>, NT = NonNullable<T>> = NT extends (infer U)[] ? (ArrayTreeBranch<Extract<U, Record<string, unknown>>, Path, Val> | Exclude<U, Record<string, unknown>>)[] : IsUnion<T> extends true ? DeepPathToObject<Path, Extract<T, Record<string, unknown>>, Val> | Exclude<T, Record<string, unknown>> : DeepPathToObject<Path, NT, Val>;
declare type ArrayTreeBranch<U, Path extends string, Val = Record<string, never>, NU = NonNullable<U>> = Extract<NU, Record<string, unknown>> extends infer OB ? Val extends (infer _)[] ? DeepPathToObject<Path, OB, Val[number]> : DeepPathToObject<Path, OB, Val> : Val extends (infer _)[] ? DeepPathToObject<Path, NU, Val[number]> : DeepPathToObject<Path, NU, Val>;
declare type TreeLeaf<T, NT = NonNullable<T>> = NT extends (infer U)[] ? Exclude<NonNullable<U>, Record<string, unknown>>[] : Exclude<NT, Record<string, unknown>>;
declare type UnionToIntersectionFn<TUnion> = (TUnion extends TUnion ? (union: () => TUnion) => void : never) extends (intersection: infer Intersection) => void ? Intersection : never;
declare type LastUnion<TUnion> = UnionToIntersectionFn<TUnion> extends () => infer Last ? Last : never;
declare type UnionToTuple<TUnion, TResult extends Array<unknown> = []> = TUnion[] extends never[] ? TResult : UnionToTuple<Exclude<TUnion, LastUnion<TUnion>>, [...TResult, LastUnion<TUnion>]>;
declare type PickedPartialItem<T extends Item, Fields, Val = Record<string, unknown>> = T extends unknown ? any : Fields extends string[] ? Fields['length'] extends 0 ? T : UnionToTuple<Fields[number]> extends [infer First, ...infer Rest] ? First extends string ? IntersectionToObject<Rest['length'] extends 0 ? DeepPathToObject<First, T, Val> : PickedPartialItem<T, Rest, DeepPathToObject<First, T, Val>>> : never : never : never;
declare type IntersectionToObject<U> = U extends (infer U2)[] ? Array<IntersectionToObject<U2>> : U extends infer O ? O extends string ? string : O extends number ? number : O extends symbol ? symbol : O extends boolean ? boolean : {
    [K in keyof O as unknown extends O[K] ? never : K]: O[K] extends (infer U)[] ? Array<IntersectionToObject<U>> : IsUnion<O[K]> extends true ? IntersectionToObject<O[K]> : O[K] extends Record<string, any> ? IntersectionToObject<O[K]> : O[K];
} : never;
declare type QueryOne<T = unknown> = {
    fields?: T extends unknown ? string | string[] : DotSeparated<T, 5> | DotSeparated<T, 5>[];
    search?: string;
    deep?: Deep<T>;
    export?: 'json' | 'csv' | 'xml';
    filter?: Filter<T>;
};
declare type QueryMany<T> = QueryOne<T> & {
    sort?: Sort<T>;
    limit?: number;
    offset?: number;
    page?: number;
    meta?: keyof ItemMetadata | '*';
    groupBy?: string | string[];
    aggregate?: Aggregate;
    alias?: Record<string, string>;
};
declare type Deep<T> = {
    [K in keyof SingleItem<T>]?: DeepQueryMany<SingleItem<T>[K]>;
};
declare type DeepQueryMany<T> = {
    [K in keyof QueryMany<SingleItem<T>> as `_${string & K}`]: QueryMany<SingleItem<T>>[K];
};
declare type SharedAggregate = {
    avg?: string[];
    avgDistinct?: string[];
    count?: string[];
    countDistinct?: string[];
    sum?: string[];
    sumDistinct?: string[];
    min?: string[];
    max?: string[];
};
declare type Aggregate = {
    [K in keyof SharedAggregate]: string;
};
declare type Sort<T> = (`${Extract<keyof SingleItem<T>, string>}` | `-${Extract<keyof SingleItem<T>, string>}`)[];
declare type FilterOperators<T> = {
    _eq?: T;
    _neq?: T;
    _gt?: T;
    _gte?: T;
    _lt?: T;
    _lte?: T;
    _in?: T[];
    _nin?: T[];
    _between?: [T, T];
    _nbetween?: [T, T];
    _contains?: T;
    _ncontains?: T;
    _starts_with?: T;
    _nstarts_with?: T;
    _ends_with?: T;
    _nends_with?: T;
    _empty?: boolean;
    _nempty?: boolean;
    _nnull?: boolean;
    _null?: boolean;
    _intersects?: T;
    _nintersects?: T;
    _intersects_bbox?: T;
    _nintersects_bbox?: T;
};
declare type LogicalFilterAnd<T> = {
    _and: Filter<T>[];
};
declare type LogicalFilterOr<T> = {
    _or: Filter<T>[];
};
declare type LogicalFilter<T> = LogicalFilterAnd<T> | LogicalFilterOr<T>;
declare type FieldFilter<T> = {
    [K in keyof SingleItem<T>]?: FilterOperators<SingleItem<T>[K]> | FieldFilter<SingleItem<T>[K]>;
};
declare type Filter<T> = LogicalFilter<T> | FieldFilter<T>;
declare type ItemsOptions = {
    requestOptions: TransportRequestOptions;
};
declare type SingleItem<T> = Exclude<Single<T>, ID>;
declare type Single<T> = T extends Array<unknown> ? T[number] : T;
/**
 * CRUD at its finest
 */
interface IItems<T extends Item> {
    createOne<Q extends QueryOne<T>>(item: PartialItem<T>, query?: Q, options?: ItemsOptions): Promise<OneItem<T, Q>>;
    createMany<Q extends QueryOne<T>>(items: PartialItem<T>[], query?: Q, options?: ItemsOptions): Promise<ManyItems<T, Q>>;
    readOne<Q extends QueryOne<T>>(id: ID, query?: Q, options?: ItemsOptions): Promise<OneItem<T, Q>>;
    readMany<Q extends QueryMany<T>>(ids: ID[], query?: Q, options?: ItemsOptions): Promise<ManyItems<T, Q>>;
    readByQuery<Q extends QueryMany<T>>(query?: Q, options?: ItemsOptions): Promise<ManyItems<T, Q>>;
    updateOne<Q extends QueryOne<T>>(id: ID, item: PartialItem<T>, query?: Q, options?: ItemsOptions): Promise<OneItem<T, Q>>;
    updateMany<Q extends QueryMany<T>>(ids: ID[], item: PartialItem<T>, query?: Q, options?: ItemsOptions): Promise<ManyItems<T, Q>>;
    updateBatch<Q extends QueryMany<T>>(items: PartialItem<T>[], query?: Q, options?: ItemsOptions): Promise<ManyItems<T, Q>>;
    deleteOne(id: ID, options?: ItemsOptions): Promise<void>;
    deleteMany(ids: ID[], options?: ItemsOptions): Promise<void>;
}
declare class EmptyParamError extends Error {
    constructor(paramName?: string);
}
declare type IsUnion<T, U extends T = T> = T extends unknown ? ([U] extends [T] ? false : true) : false;
declare type AppendToPath<Path extends string, Appendix extends string> = Path extends '' ? Appendix : `${Path}.${Appendix}`;
declare type OneLevelUp<Path extends string> = Path extends `${infer Start}.${infer Middle}.${infer Rest}` ? Rest extends `${string}.${string}.${string}` ? `${Start}.${Middle}.${OneLevelUp<Rest>}` : Rest extends `${infer NewMiddle}.${string}` ? `${Start}.${Middle}.${NewMiddle}` : Rest extends string ? `${Start}.${Middle}` : '' : Path extends `${infer Start}.${string}` ? Start : '';
declare type LevelsToAsterisks<Path extends string> = Path extends `${string}.${string}.${infer Rest}` ? Rest extends `${string}.${string}.${string}` ? `*.*.${LevelsToAsterisks<Rest>}` : Rest extends `${string}.${string}` ? `*.*.*.*` : Rest extends string ? `*.*.*` : '' : Path extends `${string}.${string}` ? '*.*' : Path extends '' ? '' : '*';
declare type DefaultAppends<Path extends string, Appendix extends string, Nested extends boolean = true, Prepend extends boolean = true> = AppendToPath<Path, Appendix> | AppendToPath<LevelsToAsterisks<Path>, Appendix> | (Prepend extends true ? AppendToPath<Path, '*'> | AppendToPath<LevelsToAsterisks<Path>, Appendix> | (OneLevelUp<Path> extends '' ? never : AppendToPath<AppendToPath<OneLevelUp<Path>, '*'>, Appendix>) : never) | (Nested extends true ? AppendToPath<AppendToPath<LevelsToAsterisks<Path>, Appendix>, '*'> | AppendToPath<AppendToPath<LevelsToAsterisks<Path>, '*'>, '*'> | AppendToPath<AppendToPath<Path, Appendix>, '*'> | AppendToPath<AppendToPath<Path, '*'>, '*'> | (OneLevelUp<Path> extends '' ? never : AppendToPath<AppendToPath<AppendToPath<OneLevelUp<Path>, '*'>, Appendix>, '*'>) : never);
declare type DotSeparated<T, N extends number, Level extends number[] = [], Path extends string = ''> = Level['length'] extends N ? Path : T extends (infer U)[] ? Extract<U, Record<string, unknown>> extends Record<string, unknown> ? DotSeparated<Extract<U, Record<string, unknown>>, N, Level, Path> : Path : Extract<NonNullable<T>, Record<string, unknown>> extends Record<string, unknown> ? {
    [K in keyof T]: K extends string ? T[K] extends (infer U)[] ? Extract<U, Record<string, unknown>> extends never ? DefaultAppends<Path, K, false> : DotSeparated<Extract<U, Record<string, unknown>>, N, [...Level, 0], AppendToPath<Path, K>> | DefaultAppends<Path, K> : Extract<T[K], Record<string, unknown>> extends never ? DefaultAppends<Path, K, false> : DotSeparated<Extract<T[K], Record<string, unknown>>, N, [...Level, 0], AppendToPath<Path, K>> | DefaultAppends<Path, K> : never;
}[keyof T] : never;

declare type TransportErrorDescription = {
    message?: string;
    extensions?: Record<string, any> & {
        code?: string;
    };
};
declare type TransportResponse<T, R = any> = {
    raw: R;
    data?: T;
    meta?: ItemMetadata;
    errors?: TransportErrorDescription[];
    status: number;
    statusText?: string;
    headers: any;
};
declare type TransportMethods = 'get' | 'delete' | 'head' | 'options' | 'post' | 'put' | 'patch';
declare type TransportRequestOptions = {
    params?: any;
    headers?: any;
    onUploadProgress?: ((progressEvent: any) => void) | undefined;
};
declare type TransportOptions = TransportRequestOptions & {
    url: string;
    beforeRequest?: (config: AxiosRequestConfig) => Promise<AxiosRequestConfig>;
};
declare abstract class ITransport {
    abstract get<T = any, R = any>(path: string, options?: TransportRequestOptions): Promise<TransportResponse<T, R>>;
    abstract head<T = any, R = any>(path: string, options?: TransportRequestOptions): Promise<TransportResponse<T, R>>;
    abstract options<T = any, R = any>(path: string, options?: TransportRequestOptions): Promise<TransportResponse<T, R>>;
    abstract delete<T = any, P = any, R = any>(path: string, data?: P, options?: TransportRequestOptions): Promise<TransportResponse<T, R>>;
    abstract post<T = any, P = any, R = any>(path: string, data?: P, options?: TransportRequestOptions): Promise<TransportResponse<T, R>>;
    abstract put<T = any, P = any, R = any>(path: string, data?: P, options?: TransportRequestOptions): Promise<TransportResponse<T, R>>;
    abstract patch<T = any, P = any, R = any>(path: string, data?: P, options?: TransportRequestOptions): Promise<TransportResponse<T, R>>;
}
declare class TransportError<T = any, R = any> extends Error {
    readonly errors: TransportErrorDescription[];
    readonly response?: Partial<TransportResponse<T, R>>;
    readonly parent: Error | null;
    constructor(parent: Error | null, response?: Partial<TransportResponse<T, R>>);
}

declare class PasswordsHandler {
    private transport;
    constructor(transport: ITransport);
    request(email: string, reset_url?: string | null): Promise<void>;
    reset(token: string, password: string): Promise<void>;
}

declare type AuthCredentials = {
    email: string;
    password: string;
    otp?: string;
};
declare type AuthToken = string;
declare type AuthTokenType = 'DynamicToken' | 'StaticToken' | null;
declare type AuthResult = {
    access_token: string;
    expires: number;
    refresh_token?: string;
};
declare type AuthMode = 'json' | 'cookie';
declare type AuthOptions = {
    mode?: AuthMode;
    autoRefresh?: boolean;
    msRefreshBeforeExpires?: number;
    staticToken?: string;
    transport: ITransport;
    storage: IStorage;
};
declare abstract class IAuth {
    mode: AuthMode;
    abstract readonly token: Promise<string | null>;
    abstract readonly password: PasswordsHandler;
    abstract login(credentials: AuthCredentials): Promise<AuthResult>;
    abstract refresh(): Promise<AuthResult | false>;
    abstract refreshIfExpired(): Promise<void>;
    abstract static(token: AuthToken): Promise<boolean>;
    abstract logout(): Promise<void>;
}

declare class ItemsHandler<T extends Item> implements IItems<T> {
    protected transport: ITransport;
    protected endpoint: string;
    protected collection: string;
    constructor(collection: string, transport: ITransport);
    readOne<Q extends QueryOne<T>>(id: ID, query?: Q, options?: ItemsOptions): Promise<OneItem<T, Q>>;
    readMany<Q extends QueryMany<T>>(ids: ID[], query?: Q, options?: ItemsOptions): Promise<ManyItems<T, Q>>;
    readByQuery<Q extends QueryMany<T>>(query?: Q, options?: ItemsOptions): Promise<ManyItems<T, Q>>;
    createOne<Q extends QueryOne<T>>(item: PartialItem<T>, query?: Q, options?: ItemsOptions): Promise<OneItem<T, Q>>;
    createMany<Q extends QueryMany<T>>(items: PartialItem<T>[], query?: Q, options?: ItemsOptions): Promise<ManyItems<T, Q>>;
    updateOne<Q extends QueryOne<T>>(id: ID, item: PartialItem<T>, query?: Q, options?: ItemsOptions): Promise<OneItem<T, Q>>;
    updateMany<Q extends QueryMany<T>>(ids: ID[], data: PartialItem<T>, query?: Q, options?: ItemsOptions): Promise<ManyItems<T, Q>>;
    updateBatch<Q extends QueryMany<T>>(data: PartialItem<T>[], query?: Q, options?: ItemsOptions): Promise<ManyItems<T, Q>>;
    updateByQuery<Q extends QueryMany<T>>(updateQuery: QueryMany<T>, data: PartialItem<T>, query?: Q, options?: ItemsOptions): Promise<ManyItems<T, Q>>;
    deleteOne(id: ID, options?: ItemsOptions): Promise<void>;
    deleteMany(ids: ID[], options?: ItemsOptions): Promise<void>;
}

declare class CommentsHandler<T> {
    private transport;
    constructor(transport: ITransport);
    create(comment: Comment): Promise<ActivityItem<T>>;
    update(comment_activity_id: ID, comment: string): Promise<ActivityItem<T>>;
    delete(comment_activity_id: ID): Promise<void>;
}

/**
 * Activity handler
 */

declare type ActivityItem<T = DefaultType> = ActivityType & T;
declare class ActivityHandler<T = DefaultType> extends ItemsHandler<ActivityItem<T>> {
    private _comments;
    constructor(transport: ITransport);
    get comments(): CommentsHandler<T>;
}

/**
 * Collections handler
 */

declare type CollectionItem<T = DefaultType> = CollectionType & T;
declare class CollectionsHandler<T = CollectionItem> {
    transport: ITransport;
    constructor(transport: ITransport);
    readOne(collection: string): Promise<OneItem<T>>;
    readAll(): Promise<ManyItems<T>>;
    createOne(collection: PartialItem<T>): Promise<OneItem<T>>;
    createMany(collections: PartialItem<T>[]): Promise<ManyItems<T>>;
    updateOne(collection: string, item: PartialItem<T>, query?: QueryOne<T>): Promise<OneItem<T>>;
    deleteOne(collection: string): Promise<void>;
}

/**
 * Fields handler
 */

declare type FieldItem<T = DefaultType> = FieldType & T;
declare class FieldsHandler<T = FieldItem> {
    transport: ITransport;
    constructor(transport: ITransport);
    readOne(collection: string, id: ID): Promise<OneItem<T>>;
    readMany(collection: string): Promise<ManyItems<T>>;
    readAll(): Promise<ManyItems<T>>;
    createOne(collection: string, item: PartialItem<T>): Promise<OneItem<T>>;
    updateOne(collection: string, field: string, item: PartialItem<T>): Promise<OneItem<T>>;
    deleteOne(collection: string, field: string): Promise<void>;
}

/**
 * Files handler
 */

declare type FileItem<T = DefaultType> = FileType & T;
declare class FilesHandler<T = DefaultType> extends ItemsHandler<FileItem<T>> {
    constructor(transport: ITransport);
    import(body: {
        url: string;
        data?: PartialItem<T>;
    }): Promise<OneItem<T>>;
}

/**
 * Folders handler
 */

declare type FolderItem<T = DefaultType> = FolderType & T;
declare class FoldersHandler<T = DefaultType> extends ItemsHandler<FolderItem<T>> {
    constructor(transport: ITransport);
}

/**
 * Permissions handler
 */

declare type PermissionItem<T = DefaultType> = PermissionType & T;
declare class PermissionsHandler<T = DefaultType> extends ItemsHandler<PermissionItem<T>> {
    constructor(transport: ITransport);
}

/**
 * Presets handler
 */

declare type PresetItem<T = DefaultType> = PresetType & T;
declare class PresetsHandler<T = DefaultType> extends ItemsHandler<PresetItem<T>> {
    constructor(transport: ITransport);
}

/**
 * Relations handler
 */

declare type RelationItem<T = DefaultType> = RelationType & T;
declare class RelationsHandler<T = RelationItem> {
    transport: ITransport;
    constructor(transport: ITransport);
    readOne(collection: string, id: ID): Promise<OneItem<T>>;
    readMany(collection: string): Promise<ManyItems<T>>;
    readAll(): Promise<ManyItems<T>>;
    createOne(item: PartialItem<T>): Promise<OneItem<T>>;
    updateOne(collection: string, field: string, item: PartialItem<T>): Promise<OneItem<T>>;
    deleteOne(collection: string, field: string): Promise<void>;
}

/**
 * Revisions handler
 */

declare type RevisionItem<T = DefaultType> = RevisionType & T;
declare class RevisionsHandler<T = DefaultType> extends ItemsHandler<RevisionItem<T>> {
    constructor(transport: ITransport);
}

/**
 * Roles handler
 */

declare type RoleItem<T = DefaultType> = RoleType & T;
declare class RolesHandler<T = DefaultType> extends ItemsHandler<RoleItem<T>> {
    constructor(transport: ITransport);
}

/**
 * Server handler
 */

declare type ServerInfo = {
    project: {
        project_name: string;
        project_logo: string | null;
        project_color: string;
        public_foreground: string | null;
        public_background: string | null;
        public_note: string;
        custom_css: string;
    };
    directus?: {
        version: string;
    };
    node?: {
        version: string;
        uptime: number;
    };
    os?: {
        type: string;
        version: string;
        uptime: number;
        totalmem: number;
    };
};
declare class ServerHandler {
    private transport;
    constructor(transport: ITransport);
    ping(): Promise<'pong'>;
    info(): Promise<ServerInfo>;
    oas(): Promise<any>;
}

/**
 * CRUD at its finest
 */
interface ISingleton<T extends Item> {
    read<Q extends QueryOne<T>>(query?: Q): Promise<OneItem<T, Q>>;
    update<Q extends QueryOne<T>>(item: PartialItem<T>, query?: Q): Promise<OneItem<T, Q>>;
}

declare class SingletonHandler<T> implements ISingleton<T> {
    protected collection: string;
    protected transport: ITransport;
    protected endpoint: string;
    constructor(collection: string, transport: ITransport);
    read<Q extends QueryOne<T>>(query?: Q): Promise<OneItem<T, Q>>;
    update<Q extends QueryOne<T>>(data: PartialItem<T>, _query?: Q): Promise<OneItem<T, Q>>;
}

/**
 * Settings handler
 */

declare type SettingItem<T = DefaultType> = SettingType & T;
declare class SettingsHandler<T = SettingItem> extends SingletonHandler<T> {
    constructor(transport: ITransport);
}

declare class InvitesHandler {
    private transport;
    constructor(transport: ITransport);
    send(email: string, role: ID, invite_url?: string): Promise<void>;
    accept(token: ID, password: string): Promise<void>;
}

declare type TfaItem<T = DefaultType> = TfaType & T;
declare class TFAHandler {
    private transport;
    constructor(transport: ITransport);
    generate(password: string): Promise<TfaItem>;
    enable(secret: string, otp: string): Promise<void>;
    disable(otp: string): Promise<void>;
}

declare class MeHandler<T> {
    private _transport;
    private _tfa?;
    constructor(transport: ITransport);
    get tfa(): TFAHandler;
    read(query?: QueryOne<T>): Promise<PartialItem<T>>;
    update(data: PartialItem<T>, query?: QueryOne<T>): Promise<PartialItem<T>>;
}

/**
 * Users handler
 */

declare type UserItem<T = DefaultType> = UserType & T;
declare class UsersHandler<T = DefaultType> extends ItemsHandler<UserItem<T>> {
    private _invites?;
    private _me?;
    constructor(transport: ITransport);
    get invites(): InvitesHandler;
    get me(): MeHandler<UserItem<T>>;
}

/**
 * Utils handler
 */

declare class UtilsHandler {
    private transport;
    constructor(transport: ITransport);
    random: {
        string: (length?: number) => Promise<string>;
    };
    hash: {
        generate: (string: string) => Promise<string>;
        verify: (string: string, hash: string) => Promise<boolean>;
    };
    sort(collection: string, item: ID, to: ID): Promise<void>;
    revert(revision: ID): Promise<void>;
}

declare class GraphQLHandler {
    private transport;
    constructor(transport: ITransport);
    private request;
    items<T>(query: string, variables?: any): Promise<TransportResponse<T>>;
    system<T>(query: string, variables?: any): Promise<TransportResponse<T>>;
}

declare type DirectusTypes = {
    activity: undefined;
    collections: undefined;
    fields: undefined;
    files: undefined;
    folders: undefined;
    permissions: undefined;
    presets: undefined;
    relations: undefined;
    revisions: undefined;
    roles: undefined;
    settings: undefined;
    users: undefined;
};
interface IDirectusBase {
    readonly url: string;
    readonly auth: IAuth;
    readonly storage: IStorage;
    readonly transport: ITransport;
    readonly server: ServerHandler;
    readonly utils: UtilsHandler;
    readonly graphql: GraphQLHandler;
}
interface IDirectus<T extends TypeMap> extends IDirectusBase {
    readonly activity: ActivityHandler<TypeOf<T, 'directus_activity'>>;
    readonly collections: CollectionsHandler<TypeOf<T, 'directus_collections'>>;
    readonly files: FilesHandler<TypeOf<T, 'directus_files'>>;
    readonly fields: FieldsHandler<TypeOf<T, 'directus_fields'>>;
    readonly folders: FoldersHandler<TypeOf<T, 'directus_folders'>>;
    readonly permissions: PermissionsHandler<TypeOf<T, 'directus_permissions'>>;
    readonly presets: PresetsHandler<TypeOf<T, 'directus_presets'>>;
    readonly revisions: RevisionsHandler<TypeOf<T, 'directus_revisions'>>;
    readonly relations: RelationsHandler<TypeOf<T, 'directus_relations'>>;
    readonly roles: RolesHandler<TypeOf<T, 'directus_roles'>>;
    readonly users: UsersHandler<TypeOf<T, 'directus_users'>>;
    readonly settings: SettingsHandler<TypeOf<T, 'directus_settings'>>;
    items<C extends string, I = TypeOf<T, C>>(collection: C): IItems<I>;
    singleton<C extends string, I = TypeOf<T, C>>(collection: C): ISingleton<I>;
}

declare type StorageOptions = {
    prefix?: string;
};
declare abstract class BaseStorage extends IStorage {
    protected prefix: string;
    get auth_token(): string | null;
    set auth_token(value: string | null);
    get auth_expires(): number | null;
    set auth_expires(value: number | null);
    get auth_expires_at(): number | null;
    set auth_expires_at(value: number | null);
    get auth_refresh_token(): string | null;
    set auth_refresh_token(value: string | null);
    abstract get(key: string): string | null;
    abstract set(key: string, value: string): string;
    abstract delete(key: string): string | null;
    constructor(options?: StorageOptions);
}

declare class MemoryStorage extends BaseStorage {
    private values;
    get(key: string): string | null;
    set(key: string, value: string): string;
    delete(key: string): string | null;
    private key;
}

declare class LocalStorage extends BaseStorage {
    get(key: string): string | null;
    set(key: string, value: string): string;
    delete(key: string): string | null;
    private key;
}

/**
 * Transport implementation
 */
declare class Transport extends ITransport {
    private axios;
    private config;
    constructor(config: TransportOptions);
    beforeRequest(config: AxiosRequestConfig): Promise<AxiosRequestConfig>;
    get url(): string;
    protected request<T = any, R = any>(method: TransportMethods, path: string, data?: Record<string, any>, options?: Omit<TransportOptions, 'url'>): Promise<TransportResponse<T, R>>;
    get<T = any>(path: string, options?: TransportOptions): Promise<TransportResponse<T>>;
    head<T = any>(path: string, options?: TransportOptions): Promise<TransportResponse<T>>;
    options<T = any>(path: string, options?: TransportOptions): Promise<TransportResponse<T>>;
    delete<T = any, D = any>(path: string, data?: D, options?: TransportOptions): Promise<TransportResponse<T>>;
    put<T = any, D = any>(path: string, data?: D, options?: TransportOptions): Promise<TransportResponse<T>>;
    post<T = any, D = any>(path: string, data?: D, options?: TransportOptions): Promise<TransportResponse<T>>;
    patch<T = any, D = any>(path: string, data?: D, options?: TransportOptions): Promise<TransportResponse<T>>;
}

declare type AuthStorage<T extends AuthTokenType = 'DynamicToken'> = {
    access_token: T extends 'DynamicToken' | 'StaticToken' ? string : null;
    expires: T extends 'DynamicToken' ? number : null;
    refresh_token?: T extends 'DynamicToken' ? string : null;
};
declare class Auth extends IAuth {
    autoRefresh: boolean;
    msRefreshBeforeExpires: number;
    staticToken: string;
    private _storage;
    private _transport;
    private passwords?;
    private _refreshPromise?;
    constructor(options: AuthOptions);
    get storage(): IStorage;
    get transport(): ITransport;
    get token(): Promise<string | null>;
    get password(): PasswordsHandler;
    private resetStorage;
    private updateStorage;
    refreshIfExpired(): Promise<void>;
    refresh(): Promise<AuthResult | false>;
    login(credentials: AuthCredentials): Promise<AuthResult>;
    static(token: AuthToken): Promise<boolean>;
    logout(): Promise<void>;
}

declare type DirectusStorageOptions = StorageOptions & {
    mode?: 'LocalStorage' | 'MemoryStorage';
};
declare type DirectusOptions = {
    auth?: IAuth | PartialBy<AuthOptions, 'transport' | 'storage'>;
    transport?: ITransport | TransportOptions;
    storage?: IStorage | DirectusStorageOptions;
};
declare class Directus<T extends TypeMap> implements IDirectus<T> {
    private _url;
    private _options?;
    private _auth;
    private _transport;
    private _storage;
    private _activity?;
    private _collections?;
    private _fields?;
    private _files?;
    private _folders?;
    private _permissions?;
    private _presets?;
    private _relations?;
    private _revisions?;
    private _roles?;
    private _users?;
    private _server?;
    private _utils?;
    private _graphql?;
    private _settings?;
    private _items;
    private _singletons;
    constructor(url: string, options?: DirectusOptions);
    get url(): string;
    get auth(): IAuth;
    get storage(): IStorage;
    get transport(): ITransport;
    get activity(): ActivityHandler<TypeOf<T, 'directus_activity'>>;
    get collections(): CollectionsHandler<TypeOf<T, 'directus_collections'>>;
    get fields(): FieldsHandler<TypeOf<T, 'directus_fields'>>;
    get files(): FilesHandler<TypeOf<T, 'directus_files'>>;
    get folders(): FoldersHandler<TypeOf<T, 'directus_folders'>>;
    get permissions(): PermissionsHandler<TypeOf<T, 'directus_permissions'>>;
    get presets(): PresetsHandler<TypeOf<T, 'directus_presets'>>;
    get relations(): RelationsHandler<TypeOf<T, 'directus_relations'>>;
    get revisions(): RevisionsHandler<TypeOf<T, 'directus_revisions'>>;
    get roles(): RolesHandler<TypeOf<T, 'directus_roles'>>;
    get users(): UsersHandler<TypeOf<T, 'directus_users'>>;
    get settings(): SettingsHandler<TypeOf<T, 'directus_settings'>>;
    get server(): ServerHandler;
    get utils(): UtilsHandler;
    get graphql(): GraphQLHandler;
    singleton<C extends string, I = TypeOf<T, C>>(collection: C): ISingleton<I>;
    items<C extends string, I = TypeOf<T, C>>(collection: C): IItems<I>;
}

export { ActivityHandler, ActivityItem, ActivityType, Aggregate, Auth, AuthCredentials, AuthMode, AuthOptions, AuthResult, AuthStorage, AuthToken, AuthTokenType, BaseStorage, CollectionItem, CollectionType, CollectionsHandler, Comment, CommentsHandler, Deep, DeepQueryMany, DefaultType, Directus, DirectusOptions, DirectusStorageOptions, DirectusTypes, EmptyParamError, Field, FieldFilter, FieldItem, FieldType, FieldsHandler, FileItem, FileType, FilesHandler, Filter, FilterOperators, FolderItem, FolderType, FoldersHandler, IAuth, ID, IDirectus, IDirectusBase, IItems, ISingleton, IStorage, ITransport, InferQueryType, Item, ItemMetadata, ItemsHandler, ItemsOptions, LocalStorage, LogicalFilter, LogicalFilterAnd, LogicalFilterOr, ManyItems, MemoryStorage, Meta, Omit$1 as Omit, OneItem, PartialBy, PartialItem, Payload, PermissionItem, PermissionType, PermissionsHandler, PickedPartialItem, PresetItem, PresetType, PresetsHandler, QueryFields, QueryMany, QueryOne, RelationItem, RelationType, RelationsHandler, RevisionItem, RevisionType, RevisionsHandler, RoleItem, RoleType, RolesHandler, ServerHandler, ServerInfo, SettingItem, SettingType, SettingsHandler, SharedAggregate, Sort, StorageOptions, SystemType, TfaType, Transport, TransportError, TransportErrorDescription, TransportMethods, TransportOptions, TransportRequestOptions, TransportResponse, TypeMap, TypeOf, UserItem, UserType, UsersHandler, UtilsHandler };
