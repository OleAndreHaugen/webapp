const manager = p9.manager ? p9.manager : modules.typeorm.getConnection().manager;

const webapp = await manager.find("webapp", {
    select: ["id", "name", "description", "updatedAt", "changedBy"],
    order: {
        name: "ASC",
    },
});

result.data = webapp;
complete();
