import { faker } from "@faker-js/faker";
import prisma from "../providers/prisma";
import { User } from "@prisma/client";

export class UserFactory {
  async buildObject(): Promise<User> {
    const data = {
      name: faker.person.firstName(),
      username: faker.internet.userName(),
      password: faker.string.alphanumeric()
    }

    return await prisma.user.create({
      data
    })
  }

  async destroyObject(id: string): Promise<void> {
    const deleteTasks = prisma.task.deleteMany({
      where: {
        userId: id,
      },
    })

    const deleteUser = prisma.user.delete({
      where: {
        id
      },
    })

    await prisma.$transaction([deleteTasks, deleteUser])
  }
}