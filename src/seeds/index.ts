import "dotenv/config";
import Project from "../models/project";
import Translation from "../models/translation";

async function main() {
  const project1 = await Project.create("super-maju");
  const project2 = await Project.create("cute-maju");

  await Promise.all([
    Translation.create(project1.id, "en", "home", {
      title: "Super Maju Home",
    }),
    Translation.create(project1.id, "en", "admin", {
      title: "Super Maju Admin",
    }),
    Translation.create(project1.id, "tw", "home", {
      title: "超級麻糬之家",
    }),
    Translation.create(project1.id, "tw", "admin", {
      title: "超級麻糬後台",
    }),
    Translation.create(project2.id, "en", "home", {
      title: "Cute Maju Home",
    }),
    Translation.create(project2.id, "en", "admin", {
      title: "Cute Maju Admin",
    }),
    Translation.create(project2.id, "tw", "home", {
      title: "可愛麻糬之家",
    }),
    Translation.create(project2.id, "tw", "admin", {
      title: "可愛麻糬後台",
    }),
  ]);
}

main();
