import { EnvironmentVariables } from './environment.variables'
import { corsConfig } from './cors.config'
import { expressConfig } from './express.config'
import { typeORMConfig } from './typeorm.config'

export const getConfig = () => {
    const configEnvs = process.env as unknown as EnvironmentVariables

    return {
        typeORMConfig: typeORMConfig(configEnvs),
        expressConfig: expressConfig(configEnvs),
        corsConfig: corsConfig(configEnvs)
    }
}
