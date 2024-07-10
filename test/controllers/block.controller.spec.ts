// // block.controller.spec.ts

// import { Test, TestingModule } from '@nestjs/testing';
// import { BlockController } from './block.controller';
// import { UsersService } from '../services/users.service';
// import { getModelToken } from '@nestjs/mongoose';
// import { User } from '../src/users/models/user.model';
// import * as request from 'supertest';

// describe('BlockController', () => {
//   let blockController: BlockController;
//   let app: any;

//   beforeAll(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       controllers: [BlockController],
//       providers: [
//         UsersService,
//         {
//           provide: getModelToken('User'),
//           useValue: {} // Mock or stub your User model here if needed
//         }
//       ],
//     }).compile();

//     blockController = module.get<BlockController>(BlockController);
//     app = module.createNestApplication();
//     await app.init();
//   });

//   afterAll(async () => {
//     await app.close();
//   });

//   it('should block a user', async () => {
//     const userId = 'user_id_to_block'; // Replace with a valid user ID
//     const response = await request(app.getHttpServer())
//       .post(`/block/${userId}`)
//       .expect(201); // Adjust the expected HTTP status code as per your implementation

//     // Add assertions to verify the response if needed
//   });

//   it('should unblock a user', async () => {
//     const userId = 'user_id_to_unblock'; // Replace with a valid user ID
//     const response = await request(app.getHttpServer())
//       .delete(`/block/${userId}`)
//       .expect(200); // Adjust the expected HTTP status code as per your implementation

//     // Add assertions to verify the response if needed
//   });
// });
