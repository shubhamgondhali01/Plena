import { Module, Logger } from '@nestjs/common';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import * as mongoose from 'mongoose';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/nestjs', {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    }),
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  private readonly logger = new Logger(AppModule.name);

  constructor() {
    mongoose.connection.on('connected', () => {
      this.logger.log('Connected to MongoDB');
    });

    mongoose.connection.on('error', (err) => {
      this.logger.error(`Error connecting to MongoDB: ${err.message}`);
    });

    mongoose.connection.on('disconnected', () => {
      this.logger.warn('Disconnected from MongoDB');
    });
  }
}
