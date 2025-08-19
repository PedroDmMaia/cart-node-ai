import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Catalog (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.enableShutdownHooks()
    await app.init();
  });

  afterEach(async () => {
    app.close()
  })

  it('should get all products', async () => {
    const response = await request(app.getHttpServer()).get('/catalog')

    expect(response.status).toBe(200)
    expect(response.body).toHaveLength(36)
    expect(response.body[0].store).toHaveProperty('id')
  });

  it('should get products for a search query', async () => {
    const response = await request(app.getHttpServer())
      .get('/catalog')
      .query({ search: 'feijão' })

    expect(response.status).toBe(200)
    expect(response.body).toHaveLength(2)
  })
});
