export enum NodeEnv {
    Development = 'development',
    Staging = 'staging',
    Production = 'production',
    Test = 'test'
}

export enum TimeIntervalMs {
    Second = 1000,
    Minute = TimeIntervalMs.Second * 60,
    Hour = TimeIntervalMs.Minute * 60,
    Day = TimeIntervalMs.Hour * 24
}
