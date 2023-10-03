import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { TaskService } from "../task";
import { faker } from '@faker-js/faker';
import { UserFactory } from "../../factories/user.factory";
import { User } from "@prisma/client";
import { object } from "zod";

describe('Task Service tests', () => {
  const taskService = new TaskService()
  const userFactory = new UserFactory()

  let currentUser: User
  beforeAll(async () => {
    currentUser = await userFactory.buildObject()
  })


  afterAll(async () => {
    if (currentUser) await userFactory.destroyObject(currentUser.id)
  })

  it('create invalid task', async () => {
    expect(async () => {
      await taskService.create({
        description: '',
        userId: ''
      })
    }).rejects.toThrow()
  })

  it('creating task with invalid userId', async () => {
    expect(async () => {
      await taskService.create({
        description: 'testing',
        userId: '123'
      })
    }).rejects.toThrowError(
      expect.objectContaining({
        issues: expect.arrayContaining([
          expect.objectContaining({
            validation: 'uuid',
            code: 'invalid_string',
            message: 'Invalid uuid',
            path: [ 'userId' ]
          })
        ])
      })
    )
  })

  it('creating task with valid uuid for userId, but not existing one', async () => {
    expect(async () => {
      await taskService.create({
        description: 'testing',
        userId: faker.string.uuid()
      })
    }).rejects.toThrowError('Invalid user.')
  })

  it('creating a valid task', async () => {
    const description = faker.commerce.productDescription()

    const task = await taskService.create({
      description,
      userId: currentUser.id,
      isDone: false,
      priority: 0
    })

    expect(task).toEqual(
      expect.objectContaining({
        description,
        userId: currentUser.id,
        isDone: false,
        priority: 0
      })
    )
    expect(task).toHaveProperty('id')
  })

  // TODO: all tests could be added below :)
})