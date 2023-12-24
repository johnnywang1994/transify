import client from "../client";

class Project {
  static create(name: string) {
    return client.project.create({
      data: {
        name,
      },
    });
  }

  static find(idOrName: string | number) {
    const isId =
      typeof idOrName === "number" || !Number.isNaN(Number(idOrName));
    return client.project.findFirst({
      where: {
        id: isId ? Number(idOrName) : undefined,
        name: !isId ? (idOrName as string) : undefined,
      },
      select: {
        id: true,
        name: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  static findMany(skip: number, take: number) {
    return client.project.findMany({
      skip,
      take,
    });
  }

  static delete(id: number) {
    return client.project.delete({
      where: { id },
    });
  }

  static update(id: number, newName: string) {
    return client.project.update({
      where: { id },
      data: {
        name: newName,
      },
    });
  }
}

export default Project;
