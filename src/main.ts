import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from 'modules/app'

const bootstrap = async () => {
    const app = await NestFactory.create(AppModule)
    app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }))
    await app.listen(3000)
}

bootstrap()
