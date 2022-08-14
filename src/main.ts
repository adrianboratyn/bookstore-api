import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import { getConfig } from 'lib/config'
import { AppModule } from 'modules/app'

const bootstrap = async () => {
    const { expressConfig, corsConfig } = getConfig()
    const { port, host } = expressConfig

    const app = await NestFactory.create<NestExpressApplication>(AppModule)
    app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }))
    app.enableCors(corsConfig)

    await app.listen(port, host)
}

bootstrap()
