import client from "../client";

class Translation {
  static create(projectId: number, lang: string, ns: string, data: Object) {
    return client.translation.create({
      data: {
        projectId,
        lang: lang,
        namespace: ns,
        data: JSON.stringify(data),
      },
    });
  }

  static find(projectName: string, lang: string, ns: string) {
    return client.translation.findMany({
      where: {
        project: {
          name: projectName,
        },
        lang: lang === "all" ? undefined : lang,
        namespace: ns === "all" ? undefined : ns,
      },
      select: {
        id: true,
        projectId: true,
        lang: true,
        namespace: true,
        data: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  static findById(id: number) {
    return client.translation.findFirst({
      where: { id },
      select: {
        id: true,
        projectId: true,
        lang: true,
        namespace: true,
        data: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  static delete(id: number) {
    return client.translation.delete({
      where: { id },
    });
  }

  static async updateKey(
    id: number,
    key: string,
    value?: string,
    prevKey?: string
  ) {
    if (Number.isNaN(id)) {
      throw Error("Invalid format of id");
    }
    const result = await Translation.findById(id);
    if (!result?.data) {
      throw Error("Translation not found");
    }
    const data = JSON.parse(result.data);
    data[key] = value; // if value not defined => delete key
    if (!!prevKey && key !== prevKey) {
      data[prevKey] = undefined; // delete prevKey
    }
    return await client.translation.update({
      where: { id },
      data: {
        data: JSON.stringify(data),
      },
    });
  }
}

export default Translation;
