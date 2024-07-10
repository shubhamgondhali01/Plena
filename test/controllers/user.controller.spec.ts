
// // user.controller.spec.ts

// import { Test, TestingModule } from '@nestjs/testing';
// import { UserController } from './user.controller';
// import { UsersService } from '../services/users.service';
// import { getModelToken } from '@nestjs/mongoose';
// import { User } from '../models/user.model';
// import * as request from 'supertest';

// describe('UserController', () => {
//   let userController: UserController;
//   let app: any;

//   beforeAll(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       controllers: [UserController],
//       providers: [
//         UsersService,
//         {
//           provide: getModelToken('User'),
//           useValue: {} // Mock or stub your User model here if needed
//         }
//       ],
//     }).compile();

//     userController = module.get<UserController>(UserController);
//     app = module.createNestApplication();
//     await app.init();
//   });

//   afterAll(async () => {
//     await app.close();
//   });

//   it('should create a new user', async () => {
//     const newUser: User = {
//       id: '1',
//       name: 'John',
//       surname: 'Doe',
//       username: 'johndoe',
//       birthdate: new Date('1990-01-01')
//     };

//     const response = await request(app.getHttpServer())
//       .post('/users')
//       .send(newUser)
//       .expect(201);

//     expect(response.body).toMatchObject(newUser);
//   });

//   it('should get all users', async () => {
//     const response = await request(app.getHttpServer())
//       .get('/users')
//       .expect(200);

//     expect(response.body).toBeInstanceOf(Array);
//   });

//   it('should get a user by ID', async () => {
//     const userId = '1';
//     const response = await request(app.getHttpServer())
//       .get(`/users/${userId}`)
//       .expect(200);

//     expect(response.body.id).toBe(userId);
//   });

//   it('should delete a user by ID', async () => {
//     const userId = '1';
//     await request(app.getHttpServer())
//       .delete(`/users/${userId}`)
//       .expect(200);

//     // Verify user is deleted
//     const response = await request(app.getHttpServer())
//       .get(`/users/${userId}`)
//       .expect(404);
//   });

//   it('should search users by username', async () => {
//     const username = 'johndoe';
//     const response = await request(app.getHttpServer())
//       .get(`/users/search?username=${username}`)
//       .expect(200);

//     expect(response.body.length).toBeGreaterThan(0);
//     expect(response.body[0].username).toBe(username);
//   });

//   it('should search users by age range', async () => {
//     const minAge = 30;
//     const maxAge = 40;
//     const response = await request(app.getHttpServer())
//       .get(`/users/search?minAge=${minAge}&maxAge=${maxAge}`)
//       .expect(200);

//     // Verify response contains users within the age range
//     response.body.forEach((user: User) => {
//       const userBirthYear = new Date(user.birthdate).getFullYear();
//       const currentYear = new Date().getFullYear();
//       const userAge = currentYear - userBirthYear;
//       expect(userAge).toBeGreaterThanOrEqual(minAge);
//       expect(userAge).toBeLessThanOrEqual(maxAge);
//     });
//   });
// });
